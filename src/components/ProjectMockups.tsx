import React from 'react';
import { Search, MapPin, Tag, ArrowUpRight, BarChart3, TrendingUp, Sun, Wind, Droplets, PieChart, Database, Activity, RefreshCw } from 'lucide-react';

export const CampusFindMockup: React.FC = () => {
  return (
    <div className="w-full bg-[#0d121c] border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-4 font-sans text-xs">
      {/* App Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
            CF
          </div>
          <span className="font-semibold text-slate-200 tracking-wide text-xs">CampusFind</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Campus Portal</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] text-emerald-400 font-medium">Live Listings</span>
        </div>
      </div>

      {/* Search & Filter Mockup */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-slate-400">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400 text-[11px]">Search lost calculator, ID card, notebooks...</span>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1">
          <span>+ Post Item</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 mb-3 text-[10px]">
        <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">All Items (14)</span>
        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">Lost (8)</span>
        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">Found (6)</span>
        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">Engineering Block</span>
      </div>

      {/* Mock Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Item 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-1.5">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
              LOST
            </span>
            <span className="text-[10px] text-slate-500">2 hrs ago</span>
          </div>
          <p className="font-semibold text-slate-200 text-xs mb-1">Scientific Calculator (Casio fx-991ES)</p>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span>CSE Lab 2, 2nd Floor</span>
          </div>
          <div className="flex justify-between items-center pt-1.5 border-t border-slate-800/80 text-[10px]">
            <span className="text-slate-400">Claim Contact</span>
            <span className="text-cyan-400 font-medium">View Details →</span>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-1.5">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              FOUND
            </span>
            <span className="text-[10px] text-slate-500">Today, 10:15 AM</span>
          </div>
          <p className="font-semibold text-slate-200 text-xs mb-1">College Student ID Card & Lanyard</p>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span>Central Library Reference Section</span>
          </div>
          <div className="flex justify-between items-center pt-1.5 border-t border-slate-800/80 text-[10px]">
            <span className="text-slate-400">Handed to Security</span>
            <span className="text-emerald-400 font-medium">Claim Item →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EnergyDashboardMockup: React.FC = () => {
  return (
    <div className="w-full bg-[#0d121c] border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-4 font-sans text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-200 tracking-wide text-xs">Renewable Energy Analytics</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Power BI Model</span>
          <span className="text-cyan-400">Monthly View</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Solar Yield</span>
            <Sun className="w-3 h-3 text-amber-400" />
          </div>
          <div className="text-sm font-bold text-slate-100">Generation</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> Trend Monitored
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Wind Output</span>
            <Wind className="w-3 h-3 text-sky-400" />
          </div>
          <div className="text-sm font-bold text-slate-100">Analysis</div>
          <div className="text-[9px] text-sky-400 flex items-center gap-0.5 mt-0.5">
            <Activity className="w-2.5 h-2.5" /> Peak Load Sync
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Sustainability</span>
            <Droplets className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-slate-100">KPI Visuals</div>
          <div className="text-[9px] text-emerald-400 mt-0.5">
            Planned Metrics
          </div>
        </div>
      </div>

      {/* Chart Visualizations Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Generation vs Consumption Trend */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-semibold text-slate-300">Generation vs Consumption</span>
            <span className="text-[9px] text-slate-500">Power BI Visual</span>
          </div>
          <div className="h-16 flex items-end justify-between gap-1 px-1 pt-2 pb-1 bg-slate-950/60 rounded border border-slate-900">
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-cyan-500/70 rounded-t h-8"></div>
              <span className="text-[8px] text-slate-500">Q1</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-cyan-500/70 rounded-t h-12"></div>
              <span className="text-[8px] text-slate-500">Q2</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-cyan-500/70 rounded-t h-10"></div>
              <span className="text-[8px] text-slate-500">Q3</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-cyan-500/70 rounded-t h-14"></div>
              <span className="text-[8px] text-slate-500">Q4</span>
            </div>
          </div>
        </div>

        {/* Energy Source Mix */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-semibold text-slate-300">Clean Source Mix</span>
            <PieChart className="w-3 h-3 text-slate-500" />
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between text-slate-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Solar Energy</span>
              <span className="text-slate-300 font-mono">Monitored</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> Wind Energy</span>
              <span className="text-slate-300 font-mono">Tracked</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Hydro Balance</span>
              <span className="text-slate-300 font-mono">Analyzed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EcommerceReturnsMockup: React.FC = () => {
  return (
    <div className="w-full bg-[#0d121c] border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-4 font-sans text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
            py
          </div>
          <span className="font-semibold text-slate-200 tracking-wide text-xs">Return Rate Investigation</span>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] text-indigo-400 font-mono">
          <span>Pandas • Matplotlib</span>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-3 gap-1.5 mb-3 text-center text-[10px]">
        <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
          <span className="text-slate-400 block text-[9px]">STEP 1</span>
          <span className="font-semibold text-slate-200">Data Cleaning</span>
        </div>
        <div className="p-1.5 bg-indigo-950/40 rounded border border-indigo-500/30">
          <span className="text-indigo-300 block text-[9px]">STEP 2</span>
          <span className="font-semibold text-indigo-200">EDA & Stats</span>
        </div>
        <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
          <span className="text-slate-400 block text-[9px]">STEP 3</span>
          <span className="font-semibold text-slate-200">Recommendations</span>
        </div>
      </div>

      {/* Code / Visualization Window */}
      <div className="bg-slate-950 rounded-lg border border-slate-900 p-2.5 font-mono text-[10.5px] text-slate-300 mb-2.5">
        <div className="flex items-center justify-between text-slate-500 pb-1.5 mb-1.5 border-b border-slate-900 text-[9px]">
          <span>return_analysis.py</span>
          <span>Python 3.10</span>
        </div>
        <div className="text-slate-400">
          <span className="text-indigo-400">import</span> pandas <span className="text-indigo-400">as</span> pd<br />
          <span className="text-indigo-400">import</span> matplotlib.pyplot <span className="text-indigo-400">as</span> plt<br />
          <span className="text-slate-500"># Exploratory analysis on return categories</span><br />
          returns_df = df.groupby(<span className="text-emerald-400">'category'</span>)[<span className="text-emerald-400">'is_returned'</span>].mean()<br />
          plt.figure(figsize=(8, 4))
        </div>
      </div>

      {/* Output / Insights summary */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-2 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 text-slate-300">
          <RefreshCw className="w-3 h-3 text-cyan-400" />
          <span>Key driver analysis identified actionable reduction points</span>
        </div>
        <span className="text-indigo-400 font-medium">Data-Driven</span>
      </div>
    </div>
  );
};
