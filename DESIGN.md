# Design System & Visual Specification (Linear / Vercel Modern SaaS)

<!-- impeccable:design-schema 1 -->

## Design Identity: CartPulse AI (Modern SaaS Standards)

### Visual Philosophy & Direction
A refined, human-crafted conversion intelligence interface adhering to modern SaaS dashboard standards (Linear, Vercel, Stripe). It eliminates generic AI tropes—such as neon purple halos, harsh cyan highlights, and pitch-black voids—in favor of grounded slate surfaces, 1px structural borders, and understated semantic states.

---

## 1. Color Tokens & Surface Hierarchy

| Token Role | Color Value / Class | Description & Rationale |
| :--- | :--- | :--- |
| **Canvas Background** | `#0F172A` (`slate-900`) | Grounded, neutral dark slate foundation (avoids pitch-black and dark electric blue). |
| **Card Surface** | `#151F32` / `#1E293B` (`slate-850` / `slate-800`) | Crisp, elevated card surfaces with subtle depth. |
| **Borders & Dividers** | `border-slate-800` / `border-slate-700` | Subdued 1px architectural lines, eliminating heavy glow or neon rings. |
| **Primary Text** | `#F8FAFC` (`slate-50`) | Crisp off-white ensuring high contrast (≥7:1) without eye fatigue. |
| **Secondary Text** | `#94A3B8` (`slate-400`) | Muted, legible slate-gray for descriptions and body copy. |
| **Technical & Metadata** | `#64748B` (`slate-500`) | Subtle neutral gray for feature labels, units, and timestamps. |
| **Primary Button / CTA** | `bg-slate-100 text-slate-900` | Vercel/Linear style high-contrast primary action (hover: `bg-white`). |
| **Active Tabs & Pills** | `bg-slate-800 border-slate-700` | Refined dark active states rather than neon purple tracks. |
| **Positive / Purchase** | `text-emerald-400 bg-emerald-500/10 border-emerald-500/20` | Soft, natural semantic indicator with low-opacity pill backgrounds. |
| **Risk / Negative** | `text-rose-400 bg-rose-500/10 border-rose-500/20` | Soft semantic rose for friction barriers and high exit rates. |
| **Caution / Moderate** | `text-amber-400 bg-amber-500/10 border-amber-500/20` | Subtle amber indicator for moderate probabilities and bounce alerts. |

---

## 2. Component Refinements & Micro-Interactions

- **Refined Circular Gauge**:
  - Reduced stroke thickness from 10px to a clean, elegant 6px.
  - Subdued background track (`stroke-slate-800`).
  - Natural semantic arc without outer glowing drop-shadows.
  - Centered typography: `text-3xl sm:text-4xl font-semibold text-slate-100 tabular-nums`.

- **Precision Sliders & Inputs**:
  - Thin 6px range track (`bg-slate-800`) with custom off-white thumb (`#F8FAFC`, 14px, subtle border).
  - Numerical inputs with clean 1px borders (`border-slate-700 bg-slate-900`) and focused slate rings (`focus:border-slate-500`).

- **Archetype Presets**:
  - Refined card buttons with discrete active borders (`border-slate-500 bg-slate-800`) and compact outcome badges.

- **Confusion Matrix & Benchmarks**:
  - Clean monochromatic 2x2 grid with tabular counts and subtle champion pill badge (`bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`).
