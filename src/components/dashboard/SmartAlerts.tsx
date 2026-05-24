"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Zap,
  Brain,
  TrendingUp,
  Clock,
  Search
} from "lucide-react";
import { Alert } from "@/types";
import { generateId, getSeverityColor, getSeverityBg } from "@/lib/utils";

interface SmartAlertsProps {
  alerts?: Alert[];
}

export default function SmartAlerts({ alerts: propAlerts }: SmartAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>(propAlerts || []);
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const generateDemoAlerts = (): Alert[] => {
    return [
      {
        id: generateId(),
        type: "cpu",
        severity: "critical",
        message: "CPU usage above 90% on payment-service",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        service: "payment-service",
        resolved: false,
        aiCategory: "Resource Exhaustion",
        aiConfidence: 95,
        aiRecommendation: "Scale up payment-service instances or investigate memory leak",
      },
      {
        id: generateId(),
        type: "memory",
        severity: "high",
        message: "Memory usage above 85% on auth-service",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        service: "auth-service",
        resolved: false,
        aiCategory: "Memory Pressure",
        aiConfidence: 88,
        aiRecommendation: "Monitor memory trends and consider horizontal scaling",
      },
      {
        id: generateId(),
        type: "latency",
        severity: "high",
        message: "API latency exceeded 2000ms threshold",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        service: "api-gateway",
        resolved: false,
        aiCategory: "Performance Degradation",
        aiConfidence: 92,
        aiRecommendation: "Check database query performance and connection pool",
      },
      {
        id: generateId(),
        type: "error_rate",
        severity: "critical",
        message: "Error rate spike detected (15%)",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        service: "payment-service",
        resolved: false,
        aiCategory: "Service Failure",
        aiConfidence: 97,
        aiRecommendation: "Immediate investigation required - likely cascading failure",
      },
      {
        id: generateId(),
        type: "disk",
        severity: "medium",
        message: "Disk space low on database server (20% remaining)",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        service: "database",
        resolved: false,
        aiCategory: "Infrastructure Warning",
        aiConfidence: 85,
        aiRecommendation: "Plan disk expansion or log cleanup within 24 hours",
      },
    ];
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "cpu": return <Zap className="w-4 h-4" />;
      case "memory": return <TrendingUp className="w-4 h-4" />;
      case "latency": return <Clock className="w-4 h-4" />;
      case "error_rate": return <XCircle className="w-4 h-4" />;
      case "disk": return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== "all" && alert.severity !== filter) return false;
    if (searchQuery && !alert.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <div className="card pointer-events-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Smart Alert Engine
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-primary" />
            AI-Powered
          </div>
          <span className="text-sm text-muted-foreground">
            {alerts.filter(a => !a.resolved).length} active
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4 pointer-events-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alerts..."
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
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pointer-events-auto">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedAlert(alert)}
            className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg ${
              alert.resolved ? "opacity-50 bg-card/30" : getSeverityBg(alert.severity)
            } pointer-events-auto`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${alert.resolved ? "bg-green-500/20" : getSeverityBg(alert.severity)}`}>
                  <div className={getSeverityColor(alert.severity)}>
                    {getAlertIcon(alert.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium uppercase ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">{alert.service}</span>
                    {alert.aiCategory && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {alert.aiCategory}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleString()}
                  </p>
                  {alert.aiConfidence && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-input rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                          style={{ width: `${alert.aiConfidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.aiConfidence}% confidence</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!alert.resolved && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resolveAlert(alert.id);
                    }}
                    className="p-2 rounded-lg hover:bg-card transition-colors pointer-events-auto"
                    title="Mark as resolved"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Alert Details */}
      {selectedAlert && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl glass border border-border/50 pointer-events-auto"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold">Alert Details</h3>
            <button
              onClick={() => setSelectedAlert(null)}
              className="text-muted-foreground hover:text-foreground pointer-events-auto"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Severity:</span>
              <span className={`font-medium uppercase ${getSeverityColor(selectedAlert.severity)}`}>
                {selectedAlert.severity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{selectedAlert.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{selectedAlert.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timestamp:</span>
              <span className="font-medium">{selectedAlert.timestamp.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${selectedAlert.resolved ? "text-green-500" : "text-yellow-500"}`}>
                {selectedAlert.resolved ? "Resolved" : "Active"}
              </span>
            </div>
            {selectedAlert.aiCategory && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Category:</span>
                  <span className="font-medium">{selectedAlert.aiCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <span className="font-medium">{selectedAlert.aiConfidence}%</span>
                </div>
                <div className="mt-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-muted-foreground">{selectedAlert.aiRecommendation}</p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
