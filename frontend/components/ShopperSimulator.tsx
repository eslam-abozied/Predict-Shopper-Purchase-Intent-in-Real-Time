"use client";

import React, { useState } from "react";
import { ShopperSession } from "@/lib/types";
import { Sliders, Layers, Clock, Calendar, RefreshCw } from "lucide-react";

interface ShopperSimulatorProps {
  session: ShopperSession;
  onChange: (session: ShopperSession) => void;
  onSimulate: () => void;
  isLoading: boolean;
}

export function ShopperSimulator({
  session,
  onChange,
  onSimulate,
  isLoading,
}: ShopperSimulatorProps) {
  const [activeTab, setActiveTab] = useState<"catalog" | "funnel" | "context">("catalog");

  const update = <K extends keyof ShopperSession>(key: K, value: ShopperSession[K]) => {
    onChange({
      ...session,
      [key]: value,
    });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-slate-400" />
            Session Vector Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Modify behavioral variables to observe real-time model decision boundary shifts
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "catalog"
                ? "bg-slate-800 text-slate-100 border border-slate-700/80 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Catalog & Dwell
          </button>
          <button
            onClick={() => setActiveTab("funnel")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "funnel"
                ? "bg-slate-800 text-slate-100 border border-slate-700/80 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Funnel Metrics
          </button>
          <button
            onClick={() => setActiveTab("context")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "context"
                ? "bg-slate-800 text-slate-100 border border-slate-700/80 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Context & Device
          </button>
        </div>
      </div>

      {/* Tab 1: Catalog & Dwell Time */}
      {activeTab === "catalog" && (
        <div className="space-y-4">
          {/* ProductRelated */}
          <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <Layers className="h-4 w-4 text-slate-400" />
                Product Related Pages Visited
              </label>
              <span className="font-mono text-xs font-semibold text-slate-200 tabular-nums">
                {session.ProductRelated} pages
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              value={session.ProductRelated}
              onChange={(e) => update("ProductRelated", parseInt(e.target.value) || 0)}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-slate-300"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              Volume of inventory and product detail pages viewed during this session.
            </p>
          </div>

          {/* ProductRelated_Duration */}
          <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                Product Dwell Time (Duration)
              </label>
              <span className="font-mono text-xs font-semibold text-slate-200 tabular-nums">
                {session.ProductRelated_Duration.toFixed(0)} sec ({(session.ProductRelated_Duration / 60).toFixed(1)} min)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={3600}
              step={10}
              value={session.ProductRelated_Duration}
              onChange={(e) => update("ProductRelated_Duration", parseFloat(e.target.value) || 0)}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-slate-300"
            />
          </div>

          {/* Administrative and Informational grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Administrative Pages (Cart / Account)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={session.Administrative}
                  onChange={(e) => update("Administrative", parseInt(e.target.value) || 0)}
                  className="w-20 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-100 focus:border-slate-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400 font-mono">
                  Dur: {session.Administrative_Duration.toFixed(0)}s
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={600}
                value={session.Administrative_Duration}
                onChange={(e) => update("Administrative_Duration", parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-800 rounded-lg mt-3 cursor-pointer accent-slate-300"
              />
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Informational Pages (About / Policies)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={session.Informational}
                  onChange={(e) => update("Informational", parseInt(e.target.value) || 0)}
                  className="w-20 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-100 focus:border-slate-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400 font-mono">
                  Dur: {session.Informational_Duration.toFixed(0)}s
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={400}
                value={session.Informational_Duration}
                onChange={(e) => update("Informational_Duration", parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-800 rounded-lg mt-3 cursor-pointer accent-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Funnel Metrics */}
      {activeTab === "funnel" && (
        <div className="space-y-4">
          {/* PageValues: Soft semantic card */}
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <label className="text-xs font-semibold text-slate-200">
                  Page Values (Commercial Traffic Index)
                </label>
                <span className="rounded px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  Top Predictor
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                {session.PageValues.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Average value of the pages visited before completing a transaction. High values strongly correlate with purchase.
            </p>
            <input
              type="range"
              min={0}
              max={80}
              step={0.5}
              value={session.PageValues}
              onChange={(e) => update("PageValues", parseFloat(e.target.value) || 0)}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
              <span>0 (No transactional pages)</span>
              <span>25 (Standard Cart)</span>
              <span>80+ (High-Ticket Flow)</span>
            </div>
          </div>

          {/* ExitRates and BounceRates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Exit Rate
                </label>
                <span className="font-mono text-xs font-semibold text-slate-200 tabular-nums">
                  {(session.ExitRates * 100).toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={0.20}
                step={0.002}
                value={session.ExitRates}
                onChange={(e) => update("ExitRates", parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-slate-300"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Proportion of pageviews that were the final in session.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Bounce Rate
                </label>
                <span className="font-mono text-xs font-semibold text-slate-200 tabular-nums">
                  {(session.BounceRates * 100).toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={0.20}
                step={0.002}
                value={session.BounceRates}
                onChange={(e) => update("BounceRates", parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-slate-300"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Single-page visit percentage without subsequent action.
              </p>
            </div>
          </div>

          {/* SpecialDay */}
          <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                Special Day Proximity (Mother's Day, Valentine's, Campaign)
              </label>
              <span className="font-mono text-xs font-semibold text-slate-200 tabular-nums">
                {session.SpecialDay.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1.0}
              step={0.1}
              value={session.SpecialDay}
              onChange={(e) => update("SpecialDay", parseFloat(e.target.value) || 0)}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-slate-300"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Context & Device */}
      {activeTab === "context" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Month */}
            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3.5">
              <label className="text-xs font-medium text-slate-400 block mb-1.5">
                Calendar Month
              </label>
              <select
                value={session.Month}
                onChange={(e) => update("Month", e.target.value as any)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-100 focus:border-slate-500 focus:outline-none"
              >
                {["Feb", "Mar", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                  <option key={m} value={m}>
                    {m} {["Nov", "Dec"].includes(m) ? "• Peak Season" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* VisitorType */}
            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3.5">
              <label className="text-xs font-medium text-slate-400 block mb-1.5">
                Visitor Cohort
              </label>
              <select
                value={session.VisitorType}
                onChange={(e) => update("VisitorType", e.target.value as any)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-100 focus:border-slate-500 focus:outline-none"
              >
                <option value="Returning_Visitor">Returning Visitor</option>
                <option value="New_Visitor">New Visitor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Weekend */}
            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3.5">
              <label className="text-xs font-medium text-slate-400 block mb-1.5">
                Day of Week
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update("Weekend", false)}
                  className={`flex-1 rounded-md py-1.5 text-xs font-medium border transition-colors ${
                    !session.Weekend
                      ? "bg-slate-800 text-slate-100 border-slate-600"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  Weekday
                </button>
                <button
                  type="button"
                  onClick={() => update("Weekend", true)}
                  className={`flex-1 rounded-md py-1.5 text-xs font-medium border transition-colors ${
                    session.Weekend
                      ? "bg-slate-800 text-slate-100 border-slate-600"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  Weekend
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3">
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Operating System</label>
              <select
                value={session.OperatingSystems}
                onChange={(e) => update("OperatingSystems", parseInt(e.target.value) || 1)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
                  <option key={v} value={v}>OS Type {v}</option>
                ))}
              </select>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3">
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Browser</label>
              <select
                value={session.Browser}
                onChange={(e) => update("Browser", parseInt(e.target.value) || 1)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100"
              >
                {Array.from({ length: 13 }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v}>Browser {v}</option>
                ))}
              </select>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3">
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Region</label>
              <select
                value={session.Region}
                onChange={(e) => update("Region", parseInt(e.target.value) || 1)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100"
              >
                {Array.from({ length: 9 }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v}>Region {v}</option>
                ))}
              </select>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-850/50 p-3">
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Traffic Referral</label>
              <select
                value={session.TrafficType}
                onChange={(e) => update("TrafficType", parseInt(e.target.value) || 1)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v}>Traffic Type {v}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Execute Prediction Button - Linear / Vercel style high-contrast button */}
      <div className="mt-6 flex items-center justify-end">
        <button
          onClick={onSimulate}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-md bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition-all hover:bg-white active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Evaluating..." : "Re-evaluate Intention"}</span>
        </button>
      </div>
    </div>
  );
}
