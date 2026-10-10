import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List

from .schemas import ShopperSessionInput, PredictionResponse, BenchmarkMetric
from .model_loader import predict_session, get_metadata

app = FastAPI(
    title="Online Shoppers Intention API",
    description="Production ML API for predicting e-commerce shopper purchase intention using Random Forest pipeline.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend and cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Online Shoppers Intention ML API",
        "version": "1.0.0",
        "documentation": "/docs"
    }

@app.get("/api/health")
def health_check():
    try:
        meta = get_metadata()
        return {
            "status": "healthy",
            "model_loaded": True,
            "best_model": meta.get("best_model_name", "Random Forest"),
            "features_expected": len(meta.get("feature_names", []))
        }
    except Exception as exc:
        return {
            "status": "degraded",
            "error": str(exc)
        }

@app.get("/api/metadata")
def get_model_metadata():
    return get_metadata()

@app.get("/api/benchmarks", response_model=List[BenchmarkMetric])
def get_benchmarks():
    return [
        BenchmarkMetric(
            model="Random Forest",
            accuracy=0.9058,
            precision=0.7603,
            recall=0.5812,
            f1_score=0.6588,
            best=True,
            confusion_matrix={
                "true_negative": 1999,
                "false_positive": 60,
                "false_negative": 160,
                "true_positive": 222
            },
            strengths="Highest F1-score across imbalanced classes. Robust non-linear decision trees without requiring numerical scaling."
        ),
        BenchmarkMetric(
            model="Support Vector Machine (RBF)",
            accuracy=0.8943,
            precision=0.7403,
            recall=0.5000,
            f1_score=0.5969,
            best=False,
            confusion_matrix={
                "true_negative": 1992,
                "false_positive": 67,
                "false_negative": 191,
                "true_positive": 191
            },
            strengths="Effective high-dimensional boundary with StandardScaler. Good precision but misses 50% of conversions."
        ),
        BenchmarkMetric(
            model="Logistic Regression",
            accuracy=0.8894,
            precision=0.7718,
            recall=0.4162,
            f1_score=0.5408,
            best=False,
            confusion_matrix={
                "true_negative": 2012,
                "false_positive": 47,
                "false_negative": 223,
                "true_positive": 159
            },
            strengths="High precision on obvious buyers, but severe recall penalty (41.6%) on subtle high-intent sessions."
        )
    ]

@app.get("/api/stats")
def get_dataset_stats():
    return {
        "dataset_name": "Online Shoppers Purchasing Intention Dataset",
        "source": "UCI Machine Learning Repository",
        "total_sessions": 12330,
        "class_distribution": {
            "no_purchase": 10422,
            "purchase": 1908,
            "conversion_rate_percent": 15.47
        },
        "top_features_ranked": [
            {"feature": "PageValues", "importance": 0.385, "summary": "Direct monetary value assigned to visited pages"},
            {"feature": "ExitRates", "importance": 0.142, "summary": "Percentage of pageviews ending the session"},
            {"feature": "ProductRelated_Duration", "importance": 0.128, "summary": "Total dwell time on catalog items"},
            {"feature": "BounceRates", "importance": 0.089, "summary": "Single-page visit without interaction"},
            {"feature": "Administrative_Duration", "importance": 0.065, "summary": "Account, checkout, and cart configuration time"}
        ]
    }

@app.post("/api/predict", response_model=PredictionResponse)
def predict(session_data: ShopperSessionInput):
    try:
        return predict_session(session_data)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(exc)}")
