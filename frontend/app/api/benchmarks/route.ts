import { NextResponse } from "next/server";
import { INITIAL_BENCHMARKS } from "@/lib/constants";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${backendUrl}/api/benchmarks`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // fallback
  }
  return NextResponse.json(INITIAL_BENCHMARKS);
}
