"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  Plus,
  Filter,
  Search
} from "lucide-react";
import { Incident } from "@/types";
import { generateId, getSeverityColor, getSeverityBg } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  useEffect(() => {
    setIncidents(generateDemoIncidents());
  }, []);

  const filteredIncidents = incidents.filter(incident => {
    if (filter !== "all" && incident.severity !== filter) return false;
    if (searchQuery && !incident.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
          <h1 className="text-3xl font-bold mb-2">Incidents</h1>
          <p className="text-muted-foreground">Monitor and manage all incidents across your infrastructure</p>
        </div>
        <button className="btn-primary flex items-center gap-2 pointer-events-auto">
          <Plus className="w-5 h-5" />
          Create Incident
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
            placeholder="Search incidents..."
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

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <div className="text-2xl font-bold">{incidents.length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span className="text-sm text-muted-foreground">Critical</span>
          </div>
          <div className="text-2xl font-bold">{incidents.filter(i => i.severity === "critical").length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
          <div className="text-2xl font-bold">{incidents.filter(i => i.status === "active").length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-green-500" />
            <span className="text-sm text-muted-foreground">Resolved</span>
          </div>
          <div className="text-2xl font-bold">{incidents.filter(i => i.status === "resolved").length}</div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="card pointer-events-auto">
        <div className="space-y-4">
          {filteredIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedIncident(incident)}
              className={`p-6 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg ${getSeverityBg(incident.severity)} pointer-events-auto`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${getSeverityBg(incident.severity)}`}>
                    <AlertTriangle className={`w-6 h-6 ${getSeverityColor(incident.severity)}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{incident.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{incident.service}</span>
                      <span>•</span>
                      <span>{incident.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityBg(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    incident.status === "active" ? "bg-red-500/20 text-red-500" :
                    incident.status === "investigating" ? "bg-yellow-500/20 text-yellow-500" :
                    incident.status === "resolved" ? "bg-green-500/20 text-green-500" :
                    "bg-gray-500/20 text-gray-500"
                  }`}>
                    {incident.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{incident.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="ml-2 font-medium">{incident.confidence}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Affected Services:</span>
                  <span className="ml-2 font-medium">{incident.affectedServices.join(", ")}</span>
                </div>
                {incident.metrics && (
                  <>
                    <div>
                      <span className="text-muted-foreground">Error Rate:</span>
                      <span className="ml-2 font-medium">{incident.metrics.errorRate}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="ml-2 font-medium">{incident.metrics.latency}ms</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Incident Details */}
      {selectedIncident && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 card pointer-events-auto"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-semibold">Incident Details</h2>
            <button
              onClick={() => setSelectedIncident(null)}
              className="text-muted-foreground hover:text-foreground pointer-events-auto"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Title:</span>
                <p className="font-medium">{selectedIncident.title}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Service:</span>
                <p className="font-medium">{selectedIncident.service}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Severity:</span>
                <p className={`font-medium ${getSeverityColor(selectedIncident.severity)}`}>{selectedIncident.severity}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Status:</span>
                <p className="font-medium">{selectedIncident.status}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Timestamp:</span>
                <p className="font-medium">{selectedIncident.timestamp.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <p className="font-medium">{selectedIncident.confidence}%</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Description:</span>
              <p className="mt-1">{selectedIncident.description}</p>
            </div>
            {selectedIncident.rootCause && (
              <div>
                <span className="text-sm text-muted-foreground">Root Cause:</span>
                <p className="mt-1">{selectedIncident.rootCause}</p>
              </div>
            )}
            {selectedIncident.affectedServices && (
              <div>
                <span className="text-sm text-muted-foreground">Affected Services:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedIncident.affectedServices.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

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
