import os
import json
import joblib
import pandas as pd
from typing import Dict, Any, List
from .schemas import ShopperSessionInput, PredictionResponse, DriverItem

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "models", "online_shoppers_best_model.pkl")
METADATA_PATH = os.path.join(CURRENT_DIR, "models", "online_shoppers_model_metadata.json")

_model = None
_metadata = None

def get_metadata() -> Dict[str, Any]:
    global _metadata
    if _metadata is None:
        if os.path.exists(METADATA_PATH):
            with open(METADATA_PATH, "r") as f:
                _metadata = json.load(f)
        else:
            _metadata = {
                "best_model_name": "Random Forest",
                "feature_names": [
                    "Administrative", "Administrative_Duration", "Informational", "Informational_Duration",
                    "ProductRelated", "ProductRelated_Duration", "BounceRates", "ExitRates", "PageValues",
                    "SpecialDay", "Month", "OperatingSystems", "Browser", "Region", "TrafficType",
                    "VisitorType", "Weekend"
                ]
            }
    return _metadata

def get_model():
    global _model
    if _model is None:
        if os.path.exists(MODEL_PATH):
            _model = joblib.load(MODEL_PATH)
        else:
            raise FileNotFoundError(f"Model artifact not found at {MODEL_PATH}")
    return _model

def analyze_drivers(data: ShopperSessionInput, proba: float) -> List[DriverItem]:
    drivers: List[DriverItem] = []

    # PageValues (strongest global feature in dataset)
    if data.PageValues > 15.0:
        drivers.append(DriverItem(
            feature="PageValues",
            impact="positive",
            description=f"Elevated Page Value ({data.PageValues:.1f}) provides the strongest statistical signal for cart conversion.",
            magnitude=0.92
        ))
    elif data.PageValues > 0.0:
        drivers.append(DriverItem(
            feature="PageValues",
            impact="positive",
            description=f"Positive Page Value ({data.PageValues:.1f}) suggests moderate purchase intent during navigation.",
            magnitude=0.55
        ))
    else:
        drivers.append(DriverItem(
            feature="PageValues",
            impact="negative",
            description="Zero Page Value indicates the visitor has not viewed high-converting transactional pages yet.",
            magnitude=0.75
        ))

    # ExitRates & BounceRates
    if data.ExitRates > 0.06:
        drivers.append(DriverItem(
            feature="ExitRates",
            impact="negative",
            description=f"High Exit Rate ({(data.ExitRates * 100):.1f}%) indicates high drop-off likelihood and funnel friction.",
            magnitude=0.78
        ))
    elif data.ExitRates < 0.025:
        drivers.append(DriverItem(
            feature="ExitRates",
            impact="positive",
            description=f"Low Exit Rate ({(data.ExitRates * 100):.1f}%) indicates strong session stickiness and deep interest.",
            magnitude=0.62
        ))

    if data.BounceRates > 0.04:
        drivers.append(DriverItem(
            feature="BounceRates",
            impact="negative",
            description=f"Bounce Rate of {(data.BounceRates * 100):.1f}% reveals disengagement across viewed pages.",
            magnitude=0.65
        ))

    # ProductRelated activity
    if data.ProductRelated >= 30 or data.ProductRelated_Duration >= 1000:
        drivers.append(DriverItem(
            feature="ProductRelated",
            impact="positive",
            description=f"Extensive catalog exploration ({data.ProductRelated} product pages, {data.ProductRelated_Duration:.0f}s) indicates active buying consideration.",
            magnitude=0.70
        ))
    elif data.ProductRelated <= 3:
        drivers.append(DriverItem(
            feature="ProductRelated",
            impact="negative",
            description=f"Very brief catalog inspection ({data.ProductRelated} page) indicates top-of-funnel or casual browsing.",
            magnitude=0.50
        ))

    # Month seasonality
    if data.Month in ["Nov", "Dec"]:
        drivers.append(DriverItem(
            feature="Month",
            impact="positive",
            description=f"Session in {data.Month} aligns with peak holiday and promotional conversion cycles.",
            magnitude=0.60
        ))
    elif data.Month in ["Feb"]:
        drivers.append(DriverItem(
            feature="Month",
            impact="neutral",
            description="Historically lower baseline purchasing frequency in February sessions.",
            magnitude=0.30
        ))

    # Visitor type
    if data.VisitorType == "Returning_Visitor":
        drivers.append(DriverItem(
            feature="VisitorType",
            impact="positive",
            description="Returning visitors carry higher familiarity and baseline transaction frequency.",
            magnitude=0.45
        ))

    return drivers[:4]

def generate_recommendations(data: ShopperSessionInput, proba: float, pred: int) -> List[str]:
    recs: List[str] = []

    if proba >= 0.65:
        recs.append("Streamline the checkout journey: Activate 1-click Express Checkout (Apple Pay, Shop Pay, PayPal) to remove payment friction.")
        recs.append("Surface urgency micro-signals: Display verified stock scarcity ('Only 3 remaining') or same-day shipping cutoffs.")
        if data.ExitRates > 0.04:
            recs.append("Prevent last-minute abandonment: Deploy an unintrusive exit-intent banner offering free express shipping.")
    elif proba >= 0.35:
        recs.append("Trigger personalized incentive: Present a 10% limited-time conversion voucher for items currently in cart.")
        recs.append("Elevate trust & social proof: Display verified buyer reviews and hassle-free 30-day return guarantees.")
        if data.PageValues == 0:
            recs.append("Guide towards commercial pages: Feature 'Frequently Bought Together' bundles or curated bestsellers.")
    else:
        recs.append("Reduce discovery friction: Provide smart search filters, sizing guides, and transparent pricing information.")
        recs.append("Encourage soft micro-conversions: Offer a 'Save to Wishlist' or 'Email Cart Link' option for future revisits.")
        recs.append("Optimize page load speed and layout clarity to lower the elevated bounce rate.")

    return recs

def predict_session(data: ShopperSessionInput) -> PredictionResponse:
    model = get_model()
    metadata = get_metadata()

    # Create DataFrame with exact column order expected by ColumnTransformer
    row_dict = data.model_dump()
    df = pd.DataFrame([row_dict])

    # Predict using the trained pipeline
    raw_pred = model.predict(df)[0]
    prediction = int(raw_pred)

    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(df)[0]
        # Class 0: No Purchase, Class 1: Purchase
        no_purchase_prob = float(probabilities[0])
        purchase_prob = float(probabilities[1])
    else:
        purchase_prob = 1.0 if prediction == 1 else 0.0
        no_purchase_prob = 1.0 - purchase_prob

    if purchase_prob >= 0.70:
        intent_level = "Very High"
    elif purchase_prob >= 0.50:
        intent_level = "High"
    elif purchase_prob >= 0.25:
        intent_level = "Moderate"
    else:
        intent_level = "Low"

    confidence = round(max(purchase_prob, no_purchase_prob), 4)
    label = "Purchase" if prediction == 1 else "No Purchase"

    drivers = analyze_drivers(data, purchase_prob)
    recommendations = generate_recommendations(data, purchase_prob, prediction)

    return PredictionResponse(
        prediction=prediction,
        prediction_label=label,
        purchase_probability=round(purchase_prob, 4),
        no_purchase_probability=round(no_purchase_prob, 4),
        confidence=confidence,
        intent_level=intent_level,
        drivers=drivers,
        recommendations=recommendations,
        metadata={
            "model_name": metadata.get("best_model_name", "Random Forest Classifier"),
            "pipeline_type": "ColumnTransformer + RandomForestClassifier",
            "feature_count": len(row_dict),
            "status": "ready"
        }
    )
