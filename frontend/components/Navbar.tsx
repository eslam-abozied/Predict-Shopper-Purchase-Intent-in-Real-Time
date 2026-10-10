"use client";

import React from "react";
import { ShoppingBag, Activity, BarChart3, Database } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-100 shadow-sm">
            <ShoppingBag className="h-4.5 w-4.5 text-slate-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-slate-100 sm:text-base">CartPulse AI</span>
              <span className="rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700/80">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Shopper Intention Intelligence Engine</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium text-slate-400">
          <a
            href="#simulator"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-800 hover:text-slate-100 transition-colors"
          >
            <Activity className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">Simulator</span>
          </a>
          <a
            href="#benchmarks"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-800 hover:text-slate-100 transition-colors"
          >
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">Benchmarks</span>
          </a>
          <a
            href="#dataset"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-800 hover:text-slate-100 transition-colors"
          >
            <Database className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">Dataset & Features</span>
          </a>
        </nav>

        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Random Forest Pipeline • 90.6% Acc
          </div>
        </div>
      </div>
    </header>
  );
}
