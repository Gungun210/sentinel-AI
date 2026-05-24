"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  Globe, 
  Shield, 
  TrendingUp,
  Zap,
  Brain,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  Plus,
  ArrowRight
} from "lucide-react";
import { Incident, Service, Alert, Prediction, Metric } from "@/types";
import { generateId, getSeverityColor, getSeverityBg, formatNumber } from "@/lib/utils";
import AICopilot from "@/components/ai/AICopilot";
import IncidentTimeline from "@/components/dashboard/IncidentTimeline";
import ServiceTopology from "@/components/dashboard/ServiceTopology";
import LogAnalysis from "@/components/dashboard/LogAnalysis";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import PresentationMode from "@/components/presentation/PresentationMode";
import DashboardOverview from "@/components/dashboard/sections/DashboardOverview";
import IncidentsPage from "@/components/dashboard/sections/IncidentsPage";
import ServicesPage from "@/components/dashboard/sections/ServicesPage";
import LogsPage from "@/components/dashboard/sections/LogsPage";
import AICopilotPage from "@/components/dashboard/sections/AICopilotPage";
import PredictionsPage from "@/components/dashboard/sections/PredictionsPage";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "incidents" | "services" | "logs" | "ai-copilot" | "predictions">("dashboard");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  useEffect(() => {
    // Generate demo data
    setIncidents(generateDemoIncidents());
    setServices(generateDemoServices());
    setAlerts(generateDemoAlerts());
    setPredictions(generateDemoPredictions());
  }, []);

  const sidebarItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "incidents" as const, label: "Incidents", icon: Activity },
    { id: "services" as const, label: "Services", icon: Globe },
    { id: "logs" as const, label: "Logs", icon: Database },
    { id: "ai-copilot" as const, label: "AI Copilot", icon: Brain },
    { id: "predictions" as const, label: "Predictions", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">Sentinel AI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search incidents, services..."
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-card transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-card transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed left-0 top-20 bottom-0 w-64 glass border-r border-border/50 p-4 z-40 pointer-events-auto">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all pointer-events-auto ${
                  isActive
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-card text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? "text-primary" : ""}`} />
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full"
                    layoutId="activeTabDot"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Insights</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              3 services at risk of failure in the next hour
            </p>
            <button className="w-full btn-primary text-sm py-2 pointer-events-auto">
              View Details
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-20 p-6 relative z-30 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardOverview />
                <div className="mt-6 pointer-events-auto">
                  <IncidentTimeline />
                </div>
                <div className="mt-6 pointer-events-auto">
                  <ServiceTopology />
                </div>
                <div className="mt-6 pointer-events-auto">
                  <SmartAlerts alerts={alerts} />
                </div>
              </motion.div>
            )}
            {activeTab === "incidents" && (
              <motion.div
                key="incidents"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IncidentsPage />
              </motion.div>
            )}
            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ServicesPage />
              </motion.div>
            )}
            {activeTab === "logs" && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LogsPage />
              </motion.div>
            )}
            {activeTab === "ai-copilot" && (
              <motion.div
                key="ai-copilot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AICopilotPage />
              </motion.div>
            )}
            {activeTab === "predictions" && (
              <motion.div
                key="predictions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PredictionsPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* AI Copilot Floating Button */}
      <AICopilot />

      {/* Presentation Mode */}
      <PresentationMode />
    </div>
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
