"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Bell,
  Plus
} from "lucide-react";
import { Incident, Service, Alert, Prediction } from "@/types";
import { generateId, getSeverityColor, getSeverityBg } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function DashboardOverview() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  useEffect(() => {
    setIncidents(generateDemoIncidents());
    setServices(generateDemoServices());
    setAlerts(generateDemoAlerts());
    setPredictions(generateDemoPredictions());
  }, []);

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
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Real-time incident monitoring and AI-powered analysis</p>
        </div>
        <button className="btn-primary flex items-center gap-2 pointer-events-auto">
          <Plus className="w-5 h-5" />
          Create Incident
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <div className="text-3xl font-bold mb-1">{incidents.length}</div>
          <div className="text-sm text-muted-foreground">Active Incidents</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-8 h-8 text-accent" />
            <span className="text-green-500 text-sm font-medium">99.9%</span>
          </div>
          <div className="text-3xl font-bold mb-1">{services.filter(s => s.status === "healthy").length}/{services.length}</div>
          <div className="text-sm text-muted-foreground">Healthy Services</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            <span className="text-red-500 text-sm font-medium">+5</span>
          </div>
          <div className="text-3xl font-bold mb-1">{alerts.filter(a => !a.resolved).length}</div>
          <div className="text-sm text-muted-foreground">Unresolved Alerts</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-secondary" />
            <span className="text-green-500 text-sm font-medium">-45%</span>
          </div>
          <div className="text-3xl font-bold mb-1">2.3m</div>
          <div className="text-sm text-muted-foreground">Avg MTTR</div>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="col-span-2 card pointer-events-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Incidents</h2>
            <button className="text-primary text-sm hover:underline pointer-events-auto">View All</button>
          </div>
          <div className="space-y-4">
            {incidents.slice(0, 5).map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedIncident(incident)}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${getSeverityBg(incident.severity)} pointer-events-auto`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${getSeverityColor(incident.severity)}`} />
                    <div>
                      <h3 className="font-semibold">{incident.title}</h3>
                      <p className="text-sm text-muted-foreground">{incident.service}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBg(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{incident.timestamp.toLocaleTimeString()}</span>
                  <span>Confidence: {incident.confidence}%</span>
                  <span className={getSeverityColor(incident.severity)}>{incident.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="card pointer-events-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              AI Predictions
            </h2>
          </div>
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-card/50 border border-border/50 pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{prediction.service}</span>
                  <span className="text-primary font-bold">{prediction.probability}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{prediction.type}</p>
                <div className="w-full bg-input rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                    style={{ width: `${prediction.probability}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{prediction.recommendation}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Status */}
        <div className="col-span-2 card pointer-events-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Service Status</h2>
            <button className="text-primary text-sm hover:underline pointer-events-auto">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all hover:scale-[1.02] pointer-events-auto ${
                  service.status === "healthy" ? "bg-green-500/10 border-green-500/30" :
                  service.status === "degraded" ? "bg-yellow-500/10 border-yellow-500/30" :
                  "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{service.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === "healthy" ? "bg-green-500" :
                    service.status === "degraded" ? "bg-yellow-500" :
                    "bg-red-500"
                  } animate-pulse`} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="ml-1">{service.cpu}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Memory:</span>
                    <span className="ml-1">{service.memory}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="ml-1">{service.latency}ms</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Errors:</span>
                    <span className="ml-1">{service.errorRate}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="card pointer-events-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Recent Alerts
            </h2>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 6).map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg border ${getSeverityBg(alert.severity)} ${alert.resolved ? 'opacity-50' : ''} pointer-events-auto`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 ${getSeverityColor(alert.severity)} mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.service} • {alert.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Demo Data Generators
function generateDemoIncidents(): Incident[] {
  return [
    {
      id: generateId(),
      title: "Payment Service Timeout",
      description: "Deployment v2.4 caused memory leak in payment-service resulting in CPU saturation and cascading API timeout failures",
      severity: "critical",
      status: "active",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      service: "payment-service",
      confidence: 92,
      affectedServices: ["payment-service", "order-service", "user-service"],
      rootCause: "Memory leak in payment-service after deployment v2.4",
      metrics: { errorRate: 15, latency: 2500, cpu: 95, memory: 98 },
    },
    {
      id: generateId(),
      title: "Database Connection Pool Exhaustion",
      description: "High query load causing connection pool exhaustion in PostgreSQL primary",
      severity: "high",
      status: "investigating",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      service: "database",
      confidence: 87,
      affectedServices: ["database", "api-service"],
      metrics: { errorRate: 8, latency: 1200, cpu: 78, memory: 85 },
    },
    {
      id: generateId(),
      title: "Auth Service Latency Spike",
      description: "Unusual latency spikes in authentication service during peak hours",
      severity: "medium",
      status: "active",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      service: "auth-service",
      confidence: 75,
      affectedServices: ["auth-service"],
      metrics: { errorRate: 2, latency: 800, cpu: 65, memory: 72 },
    },
    {
      id: generateId(),
      title: "CDN Cache Miss Rate Increase",
      description: "CDN cache miss rate increased from 5% to 25% affecting static asset delivery",
      severity: "medium",
      status: "resolved",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      service: "cdn",
      confidence: 88,
      affectedServices: ["cdn", "frontend"],
      metrics: { errorRate: 0, latency: 200, cpu: 45, memory: 50 },
    },
    {
      id: generateId(),
      title: "Third-Party API Rate Limit",
      description: "Stripe API rate limiting causing payment processing delays",
      severity: "low",
      status: "closed",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      service: "payment-gateway",
      confidence: 95,
      affectedServices: ["payment-service"],
      metrics: { errorRate: 1, latency: 500, cpu: 35, memory: 40 },
    },
  ];
}

function generateDemoServices(): Service[] {
  return [
    { id: generateId(), name: "api-gateway", status: "healthy", cpu: 45, memory: 52, latency: 45, errorRate: 0.1, uptime: 99.9 },
    { id: generateId(), name: "auth-service", status: "degraded", cpu: 78, memory: 85, latency: 320, errorRate: 2.5, uptime: 99.5 },
    { id: generateId(), name: "payment-service", status: "down", cpu: 95, memory: 98, latency: 2500, errorRate: 15, uptime: 98.2 },
    { id: generateId(), name: "order-service", status: "healthy", cpu: 55, memory: 60, latency: 120, errorRate: 0.3, uptime: 99.8 },
    { id: generateId(), name: "user-service", status: "healthy", cpu: 42, memory: 48, latency: 85, errorRate: 0.2, uptime: 99.9 },
    { id: generateId(), name: "notification-service", status: "healthy", cpu: 38, memory: 45, latency: 95, errorRate: 0.1, uptime: 99.9 },
  ];
}

function generateDemoAlerts(): Alert[] {
  return [
    { id: generateId(), type: "cpu", severity: "critical", message: "CPU usage above 90% for 5 minutes", timestamp: new Date(), service: "payment-service", resolved: false },
    { id: generateId(), type: "memory", severity: "high", message: "Memory usage above 85%", timestamp: new Date(Date.now() - 1000 * 60 * 2), service: "auth-service", resolved: false },
    { id: generateId(), type: "latency", severity: "medium", message: "API latency above 300ms", timestamp: new Date(Date.now() - 1000 * 60 * 5), service: "auth-service", resolved: false },
    { id: generateId(), type: "error", severity: "high", message: "Error rate above 5%", timestamp: new Date(Date.now() - 1000 * 60 * 10), service: "payment-service", resolved: false },
    { id: generateId(), type: "deployment", severity: "medium", message: "New deployment detected", timestamp: new Date(Date.now() - 1000 * 60 * 15), service: "payment-service", resolved: true },
    { id: generateId(), type: "database", severity: "low", message: "Slow query detected", timestamp: new Date(Date.now() - 1000 * 60 * 20), service: "database", resolved: true },
  ];
}

function generateDemoPredictions(): Prediction[] {
  return [
    { id: generateId(), service: "auth-service", type: "Memory exhaustion risk", probability: 82, timeframe: "20 minutes", recommendation: "Scale up memory or investigate memory leak" },
    { id: generateId(), service: "payment-service", type: "CPU saturation", probability: 95, timeframe: "10 minutes", recommendation: "Immediate rollback or scale horizontally" },
    { id: generateId(), service: "database", type: "Connection pool exhaustion", probability: 67, timeframe: "30 minutes", recommendation: "Increase connection pool size" },
  ];
}
