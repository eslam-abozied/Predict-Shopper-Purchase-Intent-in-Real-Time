import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CartPulse AI | Online Shopper Intention Intelligence",
  description: "Real-time e-commerce purchasing propensity simulator, Random Forest classification engine, and behavioral funnel intelligence.",
  keywords: ["e-commerce", "machine learning", "shopper intention", "conversion optimization", "fastapi", "nextjs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0f172a] text-slate-100 antialiased selection:bg-slate-700/60 selection:text-white">
        {children}
      </body>
    </html>
  );
}
