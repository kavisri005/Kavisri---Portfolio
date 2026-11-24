import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isAdminRoute: boolean;
  activeAdminTab: string;
  projectIdParam?: string;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      // Also support hash routing fallback if nested path rewriting is sandboxed
      if (window.location.hash.startsWith('#/')) {
        return window.location.hash.slice(1);
      }
      return path || '/';
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.slice(1));
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    try {
      window.history.pushState({}, '', path);
    } catch {
      // If pushState is restricted in iframe, fallback to hash
      window.location.hash = `#${path}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isAdminRoute = currentPath.startsWith('/admin');

  // Derive active admin tab from path
  const getActiveAdminTab = (): string => {
    if (!isAdminRoute) return 'public';
    if (currentPath === '/admin/login') return 'login';
    if (currentPath === '/admin' || currentPath === '/admin/') return 'dashboard';
    
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return parts[1]; // e.g. 'profile', 'skills', 'projects', 'experience', etc.
    }
    return 'dashboard';
  };

  // Derive projectId parameter for /admin/projects/:id or /admin/projects/new
  const getProjectIdParam = (): string | undefined => {
    if (currentPath.startsWith('/admin/projects/')) {
      const id = currentPath.replace('/admin/projects/', '');
      return id || undefined;
    }
    return undefined;
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        isAdminRoute,
        activeAdminTab: getActiveAdminTab(),
        projectIdParam: getProjectIdParam(),
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
