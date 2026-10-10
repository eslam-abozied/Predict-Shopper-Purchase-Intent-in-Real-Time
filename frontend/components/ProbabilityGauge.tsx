"use client";

import React from "react";
import { PredictionResult } from "@/lib/types";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProbabilityGaugeProps {
  prediction: PredictionResult | null;
  isLoading: boolean;
}

export function ProbabilityGauge({ prediction, isLoading }: ProbabilityGaugeProps) {
  if (isLoading || !prediction) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[260px]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-slate-800 border-t-slate-400 animate-spin" />
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">Evaluating session vectors through Random Forest...</p>
      </div>
    );
  }

  const prob = prediction.purchase_probability;
  const percent = Math.round(prob * 100);
  const isPurchase = prediction.prediction === 1;

  // Refined circular gauge calculations (thinner 6px stroke)
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (prob * circumference);

  // Soft, natural semantic colors
  const statusColor = isPurchase
    ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
    : "text-slate-300 border-slate-700 bg-slate-800/80";

  const ringColor = isPurchase
    ? "stroke-emerald-400"
    : prob >= 0.35
    ? "stroke-amber-400"
    : "stroke-slate-500";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Refined SVG Circular Ring Gauge with thin, clean 6px stroke */}
      <div className="relative flex items-center justify-center h-44 w-44">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 160 160">
          {/* Subtle background track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Clean animated fill track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className={`${ringColor} transition-all duration-500 ease-out`}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100 tabular-nums">
            {percent}%
          </span>
          <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400 mt-1">
            Purchase Likelihood
          </span>
        </div>
      </div>

      {/* Decision Pill Banner */}
      <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-medium ${statusColor}`}>
        {isPurchase ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <XCircle className="h-3.5 w-3.5 text-slate-400" />
        )}
        <span>{isPurchase ? "Purchase Intention Detected" : "No Purchase Expected"}</span>
      </div>

      {/* Detailed metrics summary row */}
      <div className="mt-5 grid grid-cols-3 gap-2 w-full max-w-sm border-t border-slate-800 pt-4 text-center">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Intent Tier</div>
          <div className="text-xs font-semibold text-slate-100 mt-0.5">{prediction.intent_level}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Confidence</div>
          <div className="text-xs font-semibold text-slate-100 mt-0.5 tabular-nums">
            {Math.round(prediction.confidence * 100)}%
          </div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Pipeline</div>
          <div className="text-xs font-semibold text-slate-300 mt-0.5">Random Forest</div>
        </div>
      </div>
    </div>
  );
}
