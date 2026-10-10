"use client";

import React from "react";
import { INITIAL_DATASET_STATS } from "@/lib/constants";
import { Database, PieChart, Layers, ArrowUpRight } from "lucide-react";

export function DatasetExplorer() {
  const stats = INITIAL_DATASET_STATS;

  return (
    <section id="dataset" className="py-12 border-t border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-0.5 text-xs font-medium text-slate-300 mb-2.5">
              <Database className="h-3.5 w-3.5 text-slate-400" />
              Dataset Intelligence
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
              Dataset Anatomy & Feature Importance
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Trained and validated on 12,330 real-world e-commerce browsing sessions. Discover which behavioral signals govern purchasing decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Class Imbalance Breakdown */}
          <div className="rounded-xl border border-slate-800 bg-slate-850/50 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <PieChart className="h-4 w-4 text-slate-400" />
                Target Class Imbalance
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                  <span>No Purchase (Class 0)</span>
                  <span className="font-mono text-slate-400 tabular-nums">
                    {stats.class_distribution.no_purchase.toLocaleString()} (84.53%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-slate-600" style={{ width: "84.53%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-emerald-400 mb-1.5 font-medium">
                  <span>Purchase Completed (Class 1)</span>
                  <span className="font-mono text-emerald-400 tabular-nums">
                    {stats.class_distribution.purchase.toLocaleString()} (15.47%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: "15.47%" }} />
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3.5">
              Because 84.5% of sessions conclude without a transaction, conventional classification models that prioritize global accuracy often fail to capture genuine buying patterns.
            </p>
          </div>

          {/* Top Feature Importance Ranking */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-850/50 p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4 text-slate-400" />
              Global Random Forest Feature Importances
            </h3>

            <div className="space-y-3.5">
              {stats.top_features_ranked.map((f, i) => (
                <div key={f.feature} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">#{i + 1}</span>
                      <span className="font-mono font-medium text-slate-200">{f.feature}</span>
                      <span className="text-slate-400 hidden sm:inline">• {f.summary}</span>
                    </div>
                    <span className="font-mono font-semibold text-slate-200 tabular-nums">
                      {(f.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-300"
                      style={{ width: `${(f.importance / 0.385) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-400 flex items-start gap-2.5">
              <ArrowUpRight className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">PageValues</strong> alone accounts for ~38.5% of tree split decisions across the forest. If a visitor encounters pages that historically generated revenue, the likelihood of checkout surges exponentially.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
