"use client";

import React from "react";
import { DriverItem } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DriverAnalysisProps {
  drivers: DriverItem[];
}

export function DriverAnalysis({ drivers }: DriverAnalysisProps) {
  if (!drivers || drivers.length === 0) return null;

  return (
    <div className="mt-5 border-t border-slate-800 pt-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Key Conversion Drivers
        </h4>
        <span className="text-[10px] text-slate-500 font-mono">Statistical Impact</span>
      </div>

      <div className="space-y-2.5">
        {drivers.map((driver, index) => {
          const isPositive = driver.impact === "positive";
          const isNegative = driver.impact === "negative";

          return (
            <div
              key={index}
              className="rounded-lg border border-slate-800 bg-slate-850/50 p-3 transition-colors hover:border-slate-700/80"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded text-xs ${
                      isPositive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : isNegative
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : isNegative ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : (
                      <Minus className="h-3 w-3" />
                    )}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-200">
                    {driver.feature}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isPositive
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : isNegative
                      ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                      : "text-slate-400 bg-slate-800 border-slate-700"
                  }`}
                >
                  {isPositive ? "Positive Pull" : isNegative ? "Friction Barrier" : "Neutral"}
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                {driver.description}
              </p>

              {/* Refined 1px magnitude bar */}
              <div className="mt-2.5 h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isPositive ? "bg-emerald-400" : isNegative ? "bg-rose-400" : "bg-slate-500"
                  }`}
                  style={{ width: `${Math.round(driver.magnitude * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
