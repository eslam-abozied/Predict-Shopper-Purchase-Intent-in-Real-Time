"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { PresetsSelector } from "@/components/PresetsSelector";
import { ShopperSimulator } from "@/components/ShopperSimulator";
import { ProbabilityGauge } from "@/components/ProbabilityGauge";
import { DriverAnalysis } from "@/components/DriverAnalysis";
import { Recommendations } from "@/components/Recommendations";
import { ModelBenchmarks } from "@/components/ModelBenchmarks";
import { DatasetExplorer } from "@/components/DatasetExplorer";
import { Footer } from "@/components/Footer";

import { ShopperSession, PredictionResult, Preset } from "@/lib/types";
import { DEFAULT_SESSION, PRESETS } from "@/lib/constants";
import { Activity } from "lucide-react";

export default function Home() {
  const [session, setSession] = useState<ShopperSession>(DEFAULT_SESSION);
  const [currentPresetId, setCurrentPresetId] = useState<string | null>("high-intent");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const runPrediction = useCallback(async (currentData: ShopperSession) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentData),
      });

      if (response.ok) {
        const result: PredictionResult = await response.json();
        setPrediction(result);
      } else {
        console.error("Inference request failed with status:", response.status);
      }
    } catch (err) {
      console.error("Inference error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial simulation on load using default preset
  useEffect(() => {
    const defaultPreset = PRESETS.find((p) => p.id === "high-intent");
    if (defaultPreset) {
      setSession(defaultPreset.data);
      runPrediction(defaultPreset.data);
    } else {
      runPrediction(DEFAULT_SESSION);
    }
  }, [runPrediction]);

  const handleSelectPreset = (preset: Preset) => {
    setCurrentPresetId(preset.id);
    setSession(preset.data);
    runPrediction(preset.data);
  };

  const handleResetToDefault = () => {
    setCurrentPresetId(null);
    setSession(DEFAULT_SESSION);
    runPrediction(DEFAULT_SESSION);
  };

  const handleSessionChange = (newSession: ShopperSession) => {
    setCurrentPresetId(null);
    setSession(newSession);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <HeroBanner />

        <div id="simulator" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Quick Archetype Preset Selector */}
          <PresetsSelector
            currentPresetId={currentPresetId}
            onSelectPreset={handleSelectPreset}
            onResetToDefault={handleResetToDefault}
          />

          {/* Interactive Command Center Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: 17-Feature Simulator (7 cols) */}
            <div className="lg:col-span-7">
              <ShopperSimulator
                session={session}
                onChange={handleSessionChange}
                onSimulate={() => runPrediction(session)}
                isLoading={isLoading}
              />
            </div>

            {/* Right Column: Live Decision Intelligence (5 cols) */}
            <div className="lg:col-span-5 sticky top-20">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-5">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Live Propensity Assessment
                    </h3>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Real-Time Inference
                  </span>
                </div>

                {/* Animated Propensity Gauge */}
                <ProbabilityGauge prediction={prediction} isLoading={isLoading} />

                {/* Driver Breakdown */}
                {prediction && <DriverAnalysis drivers={prediction.drivers} />}

                {/* Prescriptive Interventions */}
                {prediction && <Recommendations recommendations={prediction.recommendations} />}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Model Benchmarks & Comparison Matrix */}
        <ModelBenchmarks />

        {/* Section 3: Dataset Insights & Feature Importance */}
        <DatasetExplorer />
      </main>

      <Footer />
    </div>
  );
}
