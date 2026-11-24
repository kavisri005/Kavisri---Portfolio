import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CMSProvider } from './context/CMSContext';
import { RouterProvider } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <CMSProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </CMSProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);

