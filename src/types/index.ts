export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "investigating" | "resolved" | "closed";
  timestamp: Date;
  service: string;
  rootCause?: string;
  confidence: number;
  affectedServices: string[];
  metrics: {
    errorRate: number;
    latency: number;
    cpu: number;
    memory: number;
  };
}

export interface Metric {
  timestamp: Date;
  value: number;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down";
  cpu: number;
  memory: number;
  latency: number;
  errorRate: number;
  uptime: number;
}

export interface Alert {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  message: string;
  timestamp: Date;
  service: string;
  resolved: boolean;
  aiCategory?: string;
  aiConfidence?: number;
  aiRecommendation?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  event: string;
  severity: "critical" | "high" | "medium" | "low";
  details: string;
}

export interface Prediction {
  id: string;
  service: string;
  type: string;
  probability: number;
  timeframe: string;
  recommendation: string;
}

export interface AICopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "warn" | "error" | "debug";
  service: string;
  message: string;
  metadata?: Record<string, any>;
}
