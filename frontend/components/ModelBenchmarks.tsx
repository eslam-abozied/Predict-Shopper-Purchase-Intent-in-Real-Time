"use client";

import React, { useState } from "react";
import { INITIAL_BENCHMARKS } from "@/lib/constants";
import { Award, BarChart3, CheckCircle2, Info } from "lucide-react";

export function ModelBenchmarks() {
  const [selectedModel, setSelectedModel] = useState<string>("Random Forest");

  const activeMetric = INITIAL_BENCHMARKS.find((m) => m.model === selectedModel) || INITIAL_BENCHMARKS[0];
  const cm = activeMetric.confusion_matrix;

  return (
    <section id="benchmarks" className="py-12 border-t border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-0.5 text-xs font-medium text-slate-300 mb-2.5">
              <Award className="h-3.5 w-3.5 text-slate-400" />
              Empirical Evaluation
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
              Model Comparison & Benchmark Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Evaluated on the hidden test set (2,441 sessions). Because the dataset exhibits significant class imbalance (84.5% non-purchasing baseline), 
              <strong> F1-Score</strong> was the primary selection criterion.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-850 border border-slate-800 rounded-lg px-3 py-1.5 self-start md:self-auto font-mono">
            Test Split: 20% (2,441 samples)
          </div>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {INITIAL_BENCHMARKS.map((m) => {
            const isSelected = selectedModel === m.model;

            return (
              <div
                key={m.model}
                onClick={() => setSelectedModel(m.model)}
                className={`relative cursor-pointer rounded-xl border p-4.5 transition-all duration-150 ${
                  isSelected
                    ? "border-slate-500 bg-slate-850 text-slate-100 shadow-sm"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-850/40 text-slate-300"
                }`}
              >
                {m.best && (
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    Selected Champion
                  </div>
                )}

                <div className="flex items-center justify-between mb-3 pr-24">
                  <h3 className="text-sm font-semibold text-slate-100">{m.model}</h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="rounded-md bg-slate-900 p-2 border border-slate-800">
                    <span className="text-[10px] uppercase font-medium text-slate-400 block">Accuracy</span>
                    <span className="text-sm font-semibold text-slate-100 tabular-nums">
                      {(m.accuracy * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-md bg-slate-900 p-2 border border-slate-800">
                    <span className="text-[10px] uppercase font-medium text-slate-400 block">F1-Score</span>
                    <span className={`text-sm font-semibold tabular-nums ${m.best ? "text-emerald-400" : "text-slate-200"}`}>
                      {(m.f1_score * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-md bg-slate-900 p-2 border border-slate-800">
                    <span className="text-[10px] uppercase font-medium text-slate-400 block">Precision</span>
                    <span className="text-sm font-semibold text-slate-100 tabular-nums">
                      {(m.precision * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-md bg-slate-900 p-2 border border-slate-800">
                    <span className="text-[10px] uppercase font-medium text-slate-400 block">Recall</span>
                    <span className="text-sm font-semibold text-slate-100 tabular-nums">
                      {(m.recall * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.strengths}
                </p>
              </div>
            );
          })}
        </div>

        {/* Confusion Matrix Inspection Area */}
        <div className="rounded-xl border border-slate-800 bg-slate-850/50 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-400" />
                Test Confusion Matrix: {selectedModel}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated on 2,059 non-purchase sessions and 382 actual purchasing sessions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* 2x2 Grid */}
            <div className="max-w-md mx-auto w-full">
              <div className="grid grid-cols-2 gap-2.5 text-center">
                {/* True Negative */}
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
                  <span className="text-[10px] font-medium text-slate-400 uppercase block mb-1">
                    True Negative (TN)
                  </span>
                  <span className="text-xl font-semibold text-slate-100 tabular-nums">
                    {cm.true_negative}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Correct No-Purchase ({((cm.true_negative / 2059) * 100).toFixed(1)}%)
                  </span>
                </div>

                {/* False Positive */}
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
                  <span className="text-[10px] font-medium text-slate-400 uppercase block mb-1">
                    False Positive (FP)
                  </span>
                  <span className="text-xl font-semibold text-slate-100 tabular-nums">
                    {cm.false_positive}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Predicted Purchase, bounced ({((cm.false_positive / 2059) * 100).toFixed(1)}%)
                  </span>
                </div>

                {/* False Negative */}
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
                  <span className="text-[10px] font-medium text-slate-400 uppercase block mb-1">
                    False Negative (FN)
                  </span>
                  <span className="text-xl font-semibold text-slate-100 tabular-nums">
                    {cm.false_negative}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Missed conversions ({((cm.false_negative / 382) * 100).toFixed(1)}%)
                  </span>
                </div>

                {/* True Positive */}
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
                  <span className="text-[10px] font-medium text-slate-400 uppercase block mb-1">
                    True Positive (TP)
                  </span>
                  <span className="text-xl font-semibold text-emerald-400 tabular-nums">
                    {cm.true_positive}
                  </span>
                  <span className="text-[10px] text-emerald-500/80 block mt-1">
                    Captured conversions ({((cm.true_positive / 382) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Explanatory Callout */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-200 font-medium text-xs">
                <Info className="h-4 w-4 text-slate-400" />
                Why Random Forest Outperformed Logistic Regression and SVM
              </div>
              <p className="leading-relaxed">
                In e-commerce conversion datasets, an empty model predicting "No Purchase" for 100% of visitors would achieve an <strong>84.5% naive accuracy</strong> while delivering zero business utility.
              </p>
              <p className="leading-relaxed">
                While Logistic Regression achieved high precision (77.2%), it suffered a low recall of 41.6%—missing over 58% of actual buyers. <strong>Random Forest boosted recall to 58.1%</strong> with a balanced F1-Score of 0.6588, making it the most effective operational model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
