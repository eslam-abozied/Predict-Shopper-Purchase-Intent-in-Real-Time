"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-5 border-t border-slate-800 pt-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-slate-400" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Tailored CRO Interventions
        </h4>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-850/50 p-2.5 text-xs text-slate-300"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
