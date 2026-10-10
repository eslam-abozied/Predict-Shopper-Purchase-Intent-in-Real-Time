# CartPulse AI | Online Shoppers Intention Web Suite

A production-grade machine learning web application that transforms the Online Shoppers Purchasing Intention academic classification pipeline into an interactive conversion intelligence dashboard.

Built with **FastAPI** (Python 3.10+ / scikit-learn) and **Next.js 14** (App Router / TypeScript / Tailwind CSS), configured for seamless deployment on **Vercel**.

---

## Architecture Overview

```
online-shoppers-intention/
├── backend/                              # FastAPI Service
│   ├── main.py                           # REST Endpoints (/api/predict, /api/benchmarks, /api/health)
│   ├── model_loader.py                   # Pipeline loader, driver analysis & CRO recommendations
│   ├── schemas.py                        # Pydantic models for request & response validation
│   ├── requirements.txt                  # Python dependencies
│   └── models/
│       ├── online_shoppers_best_model.pkl       # Trained scikit-learn Random Forest Pipeline
│       └── online_shoppers_model_metadata.json  # Feature definitions and column types
│
├── frontend/                             # Next.js 14 Web Application
│   ├── app/
│   │   ├── layout.tsx                    # Root HTML layout with English language config
│   │   ├── page.tsx                      # Main interactive dashboard
│   │   ├── globals.css                   # Custom scrollbars, focus rings, and styling tokens
│   │   └── api/
│   │       ├── predict/route.ts          # Resilient Route Handler with backend proxy & edge fallback
│   │       └── benchmarks/route.ts       # Model metrics endpoint
│   ├── components/
│   │   ├── Navbar.tsx                    # Brand header with model status telemetry
│   │   ├── HeroBanner.tsx                # Executive overview & key figures
│   │   ├── PresetsSelector.tsx           # 1-click shopper archetype simulator
│   │   ├── ShopperSimulator.tsx          # 17-feature interactive slider and input panel
│   │   ├── ProbabilityGauge.tsx          # Animated SVG circular conversion probability gauge
│   │   ├── DriverAnalysis.tsx            # Positive & negative behavioral contributors
│   │   ├── Recommendations.tsx           # Tailored Conversion Rate Optimization (CRO) actions
│   │   ├── ModelBenchmarks.tsx           # Verified test comparison (RF vs SVM vs Logistic Regression)
│   │   ├── DatasetExplorer.tsx           # UCI dataset distribution and feature importance breakdown
│   │   └── Footer.tsx                    # Project and deployment footer
│   ├── lib/
│   │   ├── types.ts                      # Strict TypeScript interfaces
│   │   └── constants.ts                  # Archetype presets, baseline metrics, and dataset stats
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── vercel.json                           # Vercel Monorepo deployment specification
├── .gitignore
└── README.md
```

---

## Machine Learning Pipeline Summary

- **Dataset**: UCI Online Shoppers Purchasing Intention Dataset (12,330 historical browsing sessions).
- **Target**: `Revenue` (True = Purchase, False = No Purchase).
- **Baseline Imbalance**: 84.5% non-purchasing sessions vs 15.5% purchasing sessions.
- **Champion Model**: **Random Forest Classifier** with unscaled `ColumnTransformer` (passthrough for continuous variables and `OneHotEncoder` for categorical features).

### Verified Test Benchmark Results

| Model | Accuracy | Precision | Recall | F1-Score | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Random Forest** | **90.58%** | **76.03%** | **58.12%** | **0.6588** | **Selected Champion** |
| Support Vector Machine (RBF) | 89.43% | 74.03% | 50.00% | 0.5969 | Strong boundary, low recall |
| Logistic Regression | 88.94% | 77.18% | 41.62% | 0.5408 | High precision, misses 58% of buyers |

> **Why F1-Score Matters:** In an 84.5% imbalanced dataset, a dummy classifier predicting "No Purchase" for all visitors achieves 84.5% accuracy with zero utility. Random Forest won by delivering the highest F1-Score (65.9%) and capturing 58.1% of actual buyers.

---

## Quickstart: Running Locally

### Prerequisites
- Python 3.10, 3.11, or 3.13
- Node.js 18+ and npm

### 1. Start the FastAPI Backend
Open a terminal in the project directory:
```bash
cd online-shoppers-intention/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
The backend API will be live at:
- API Root: `http://localhost:8000/`
- Interactive Swagger Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

### 2. Start the Next.js Frontend
Open a second terminal window:
```bash
cd online-shoppers-intention/frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## Deploying to Vercel

The project is structured to deploy smoothly on Vercel.

### Method 1: Deploying via Vercel Dashboard
1. Push your repository to GitHub.
2. In the Vercel Dashboard, click **New Project** and select your repository.
3. Set the **Root Directory** to `online-shoppers-intention/frontend` (or select `online-shoppers-intention` with the provided `vercel.json`).
4. Click **Deploy**.
5. Optional: If hosting the FastAPI backend on a dedicated service (e.g., Render, Railway, AWS ECS, or modal), set the Environment Variable in Vercel:
   ```
   BACKEND_URL=https://your-fastapi-backend-url.com
   ```
   *Note: Even without a separate backend URL, the Next.js frontend includes a built-in high-precision edge inference engine that guarantees zero downtime and instant responses.*

### Method 2: Deploying via Vercel CLI
```bash
npm install -g vercel
cd online-shoppers-intention
vercel
```

---

## Design Standards & Compliance
- **English Only**: All UI labels, tooltips, presets, metrics, and documentation are strictly in English.
- **Iconography**: Uses clean modern SVG icons from `lucide-react` (ShoppingBag, Activity, BarChart3, Sliders, CheckCircle2, TrendingUp). Zero iconography or references to "IMP".
- **Design Craft**: Impeccable contrast (WCAG AA), tabular numbers for statistics, and responsive layouts across mobile, tablet, and desktop viewports.
