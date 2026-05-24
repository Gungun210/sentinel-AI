"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Brain, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Zap,
  Activity,
  Filter,
  Search
} from "lucide-react";
import { Prediction } from "@/types";
import { generateId } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    setPredictions(generateDemoPredictions());
  }, []);

  const filteredPredictions = predictions.filter(prediction => {
    const riskLevel = prediction.probability >= 80 ? "high" : prediction.probability >= 50 ? "medium" : "low";
    if (filter !== "all" && riskLevel !== filter) return false;
    if (searchQuery && !prediction.service.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getRiskColor = (probability: number) => {
    if (probability >= 80) return "text-red-500 bg-red-500/20 border-red-500/50";
    if (probability >= 50) return "text-yellow-500 bg-yellow-500/20 border-yellow-500/50";
    return "text-green-500 bg-green-500/20 border-green-500/50";
  };

  const getRiskLevel = (probability: number) => {
    if (probability >= 80) return "high";
    if (probability >= 50) return "medium";
    return "low";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Predictive Analytics</h1>
          <p className="text-muted-foreground">AI-powered predictions to prevent incidents before they occur</p>
        </div>
        <button className="btn-primary flex items-center gap-2 pointer-events-auto">
          <Brain className="w-5 h-5" />
          Run Analysis
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 pointer-events-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search predictions..."
            className="pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full pointer-events-auto"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Total Predictions</span>
          </div>
          <div className="text-2xl font-bold">{predictions.length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span className="text-sm text-muted-foreground">High Risk</span>
          </div>
          <div className="text-2xl font-bold">{predictions.filter(p => p.probability >= 80).length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Medium Risk</span>
          </div>
          <div className="text-2xl font-bold">{predictions.filter(p => p.probability >= 50 && p.probability < 80).length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-sm text-muted-foreground">Accuracy</span>
          </div>
          <div className="text-2xl font-bold">94.2%</div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredPredictions.map((prediction, index) => (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedPrediction(prediction)}
            className={`card p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg pointer-events-auto ${getRiskColor(prediction.probability)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${getRiskColor(prediction.probability)}`}>
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{prediction.service}</h3>
                  <p className="text-sm text-muted-foreground">{prediction.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{prediction.probability}%</div>
                <div className="text-xs text-muted-foreground">probability</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="w-full bg-input rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                  style={{ width: `${prediction.probability}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{prediction.timeframe}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(prediction.probability)}`}>
                {getRiskLevel(prediction.probability).toUpperCase()} RISK
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{prediction.recommendation}</p>
          </motion.div>
        ))}
      </div>

      {/* Selected Prediction Details */}
      {selectedPrediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 card pointer-events-auto"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-semibold">Prediction Details</h2>
            <button
              onClick={() => setSelectedPrediction(null)}
              className="text-muted-foreground hover:text-foreground pointer-events-auto"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Service:</span>
                <p className="font-medium">{selectedPrediction.service}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Prediction Type:</span>
                <p className="font-medium">{selectedPrediction.type}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Probability:</span>
                <p className={`font-medium ${getRiskColor(selectedPrediction.probability).split(' ')[0]}`}>{selectedPrediction.probability}%</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                <p className="font-medium">{selectedPrediction.timeframe}</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Recommendation:</span>
              <p className="mt-1">{selectedPrediction.recommendation}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/30">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-medium">AI Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This prediction is based on historical patterns, current metrics, and machine learning models trained on your infrastructure data. 
                The confidence level indicates the model's certainty in this prediction.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Model Performance */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="card p-6 pointer-events-auto">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Model Accuracy</h3>
          </div>
          <div className="text-3xl font-bold mb-2">94.2%</div>
          <p className="text-sm text-muted-foreground">Overall prediction accuracy over the last 30 days</p>
        </div>
        <div className="card p-6 pointer-events-auto">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">True Positives</h3>
          </div>
          <div className="text-3xl font-bold mb-2">127</div>
          <p className="text-sm text-muted-foreground">Incidents correctly predicted and prevented</p>
        </div>
        <div className="card p-6 pointer-events-auto">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold">Avg Lead Time</h3>
          </div>
          <div className="text-3xl font-bold mb-2">18m</div>
          <p className="text-sm text-muted-foreground">Average time between prediction and incident</p>
        </div>
      </div>
    </motion.div>
  );
}

function generateDemoPredictions(): Prediction[] {
  return [
    { 
      id: generateId(), 
      service: "auth-service", 
      type: "Memory exhaustion risk", 
      probability: 82, 
      timeframe: "20 minutes", 
      recommendation: "Scale up memory or investigate memory leak" 
    },
    { 
      id: generateId(), 
      service: "payment-service", 
      type: "CPU saturation", 
      probability: 95, 
      timeframe: "10 minutes", 
      recommendation: "Immediate rollback or scale horizontally" 
    },
    { 
      id: generateId(), 
      service: "database", 
      type: "Connection pool exhaustion", 
      probability: 67, 
      timeframe: "30 minutes", 
      recommendation: "Increase connection pool size" 
    },
    { 
      id: generateId(), 
      service: "api-gateway", 
      type: "Rate limit breach", 
      probability: 45, 
      timeframe: "45 minutes", 
      recommendation: "Monitor traffic patterns and prepare scaling" 
    },
    { 
      id: generateId(), 
      service: "cache-service", 
      type: "Cache invalidation storm", 
      probability: 72, 
      timeframe: "25 minutes", 
      recommendation: "Review cache configuration and invalidation strategy" 
    },
    { 
      id: generateId(), 
      service: "notification-service", 
      type: "Queue backlog", 
      probability: 38, 
      timeframe: "1 hour", 
      recommendation: "Monitor queue depth and worker performance" 
    },
  ];
}
