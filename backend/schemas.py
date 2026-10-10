from pydantic import BaseModel, Field
from typing import List, Literal, Optional, Dict, Any

class ShopperSessionInput(BaseModel):
    Administrative: int = Field(default=0, ge=0, description="Number of administrative pages visited")
    Administrative_Duration: float = Field(default=0.0, ge=0.0, description="Total time spent on administrative pages (seconds)")
    Informational: int = Field(default=0, ge=0, description="Number of informational pages visited")
    Informational_Duration: float = Field(default=0.0, ge=0.0, description="Total time spent on informational pages (seconds)")
    ProductRelated: int = Field(default=15, ge=0, description="Number of product-related pages visited")
    ProductRelated_Duration: float = Field(default=450.0, ge=0.0, description="Total time spent on product-related pages (seconds)")
    BounceRates: float = Field(default=0.01, ge=0.0, le=1.0, description="Average bounce rate of pages visited")
    ExitRates: float = Field(default=0.03, ge=0.0, le=1.0, description="Average exit rate of pages visited")
    PageValues: float = Field(default=12.5, ge=0.0, description="Average page value measured by e-commerce tracking")
    SpecialDay: float = Field(default=0.0, ge=0.0, le=1.0, description="Closeness of browsing date to holiday/campaign")
    Month: Literal["Feb", "Mar", "May", "Oct", "June", "Jul", "Aug", "Nov", "Sep", "Dec"] = Field(
        default="Nov", description="Month of the session"
    )
    OperatingSystems: int = Field(default=2, ge=1, le=8, description="Operating system code (1-8)")
    Browser: int = Field(default=2, ge=1, le=13, description="Browser code (1-13)")
    Region: int = Field(default=1, ge=1, le=9, description="Geographic region code (1-9)")
    TrafficType: int = Field(default=2, ge=1, le=20, description="Traffic referral type code (1-20)")
    VisitorType: Literal["Returning_Visitor", "New_Visitor", "Other"] = Field(
        default="Returning_Visitor", description="Visitor cohort status"
    )
    Weekend: bool = Field(default=False, description="Whether the session occurred on a weekend")

class DriverItem(BaseModel):
    feature: str
    impact: Literal["positive", "negative", "neutral"]
    description: str
    magnitude: float

class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="Binary target: 1 for Purchase, 0 for No Purchase")
    prediction_label: str = Field(..., description="'Purchase' or 'No Purchase'")
    purchase_probability: float = Field(..., description="Likelihood of transaction between 0.0 and 1.0")
    no_purchase_probability: float = Field(..., description="Likelihood of no transaction between 0.0 and 1.0")
    confidence: float = Field(..., description="Confidence score")
    intent_level: Literal["Very High", "High", "Moderate", "Low"] = Field(..., description="Qualitative intent tier")
    drivers: List[DriverItem] = Field(default_factory=list, description="Top behavioral contributors")
    recommendations: List[str] = Field(default_factory=list, description="Prescriptive conversion optimization actions")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Pipeline and inference metadata")

class BenchmarkMetric(BaseModel):
    model: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    best: bool = False
    confusion_matrix: Dict[str, int]
    strengths: str
