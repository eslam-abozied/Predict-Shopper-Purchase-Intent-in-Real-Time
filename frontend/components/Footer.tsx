"use client";

import React from "react";
import { ShoppingBag, ShieldCheck, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] py-10 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-100">CartPulse AI</span>
              <p className="text-xs text-slate-400">Online Shoppers Purchasing Intention Intelligence Suite</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-slate-400" />
              FastAPI + scikit-learn
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
              Next.js 14 App Router
            </span>
            <span className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-[11px] text-slate-300">
              Vercel Deployment Ready
            </span>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/80 pt-5 text-center text-xs text-slate-500">
          Built for production conversion intelligence. English only UI.
        </div>
      </div>
    </footer>
  );
}
