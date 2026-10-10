"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1 text-xs font-medium text-slate-300 mb-5">
          <Sparkles className="h-3.5 w-3.5 text-slate-400" />
          <span>E-Commerce Behavioral Conversion Intelligence</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-100 max-w-3xl mx-auto leading-tight">
          Predict Shopper Purchase Intent in Real Time
        </h1>

        {/* Narrative Description */}
        <p className="mt-3.5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Operationalized Random Forest pipeline trained on 12,330 e-commerce sessions.
          Simulate browsing vectors, detect conversion thresholds, and evaluate session drivers.
        </p>

        {/* Telemetry metrics cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto">
          <div className="rounded-lg border border-slate-800 bg-slate-800/40 p-3.5 text-center transition-colors hover:border-slate-700/80">
            <div className="text-xl sm:text-2xl font-semibold text-slate-100 tabular-nums">12,330</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Sessions Studied</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-800/40 p-3.5 text-center transition-colors hover:border-slate-700/80">
            <div className="text-xl sm:text-2xl font-semibold text-emerald-400 tabular-nums">90.6%</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Test Accuracy</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-800/40 p-3.5 text-center transition-colors hover:border-slate-700/80">
            <div className="text-xl sm:text-2xl font-semibold text-slate-100 tabular-nums">0.659</div>
            <div className="text-xs font-medium text-slate-400 mt-1">F1-Score Champion</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-800/40 p-3.5 text-center transition-colors hover:border-slate-700/80">
            <div className="text-xl sm:text-2xl font-semibold text-slate-100 tabular-nums">17</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Session Dimensions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
