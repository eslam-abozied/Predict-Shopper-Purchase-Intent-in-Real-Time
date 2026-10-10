export interface ShopperSession {
  Administrative: number;
  Administrative_Duration: number;
  Informational: number;
  Informational_Duration: number;
  ProductRelated: number;
  ProductRelated_Duration: number;
  BounceRates: number;
  ExitRates: number;
  PageValues: number;
  SpecialDay: number;
  Month: "Feb" | "Mar" | "May" | "Oct" | "June" | "Jul" | "Aug" | "Nov" | "Sep" | "Dec";
  OperatingSystems: number;
  Browser: number;
  Region: number;
  TrafficType: number;
  VisitorType: "Returning_Visitor" | "New_Visitor" | "Other";
  Weekend: boolean;
}

export interface DriverItem {
  feature: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
  magnitude: number;
}

export interface PredictionResult {
  prediction: number;
  prediction_label: "Purchase" | "No Purchase";
  purchase_probability: number;
  no_purchase_probability: number;
  confidence: number;
  intent_level: "Very High" | "High" | "Moderate" | "Low";
  drivers: DriverItem[];
  recommendations: string[];
  metadata?: {
    model_name: string;
    pipeline_type: string;
    feature_count: number;
    status: string;
  };
}

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  expectedOutcome: "Purchase" | "No Purchase";
  data: ShopperSession;
}

export interface BenchmarkMetric {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  best: boolean;
  confusion_matrix: {
    true_negative: number;
    false_positive: number;
    false_negative: number;
    true_positive: number;
  };
  strengths: string;
}

export interface DatasetStats {
  dataset_name: string;
  source: string;
  total_sessions: number;
  class_distribution: {
    no_purchase: number;
    purchase: number;
    conversion_rate_percent: number;
  };
  top_features_ranked: Array<{
    feature: string;
    importance: number;
    summary: string;
  }>;
}
