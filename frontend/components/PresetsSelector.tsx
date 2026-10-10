"use client";

import React from "react";
import { PRESETS } from "@/lib/constants";
import { Preset } from "@/lib/types";
import { SlidersHorizontal, CheckCircle2, XCircle } from "lucide-react";

interface PresetsSelectorProps {
  currentPresetId: string | null;
  onSelectPreset: (preset: Preset) => void;
  onResetToDefault: () => void;
}

export function PresetsSelector({
  currentPresetId,
  onSelectPreset,
  onResetToDefault,
}: PresetsSelectorProps) {
  return (
    <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Visitor Archetype Presets
          </h2>
        </div>
        <button
          onClick={onResetToDefault}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline decoration-slate-700 underline-offset-4 self-start sm:self-auto"
        >
          Reset to default session
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {PRESETS.map((preset) => {
          const isSelected = currentPresetId === preset.id;
          const isPurchase = preset.expectedOutcome === "Purchase";

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`group flex flex-col items-start justify-between rounded-lg border p-3.5 text-left transition-all duration-150 ${
                isSelected
                  ? "border-slate-500 bg-slate-800 text-slate-100 shadow-sm"
                  : "border-slate-800 bg-slate-850/60 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300"
              }`}
            >
              <div className="w-full">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-medium text-sm text-slate-100">
                    {preset.name}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      isPurchase
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-400 border border-slate-700/80"
                    }`}
                  >
                    {isPurchase ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <XCircle className="h-3 w-3 text-slate-400" />
                    )}
                    {preset.expectedOutcome}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-snug line-clamp-2 mt-1">
                  {preset.description}
                </p>
              </div>

              <div className="mt-3 text-[11px] font-mono text-slate-500">
                PageVal: {preset.data.PageValues.toFixed(1)} • {preset.data.Month}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
