"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Filter,
  Search,
  Zap
} from "lucide-react";
import { Service } from "@/types";
import { generateId } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState<"all" | "healthy" | "degraded" | "down">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    setServices(generateDemoServices());
  }, []);

  const filteredServices = services.filter(service => {
    if (filter !== "all" && service.status !== filter) return false;
    if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-500 bg-green-500/20 border-green-500/50";
      case "degraded": return "text-yellow-500 bg-yellow-500/20 border-yellow-500/50";
      case "down": return "text-red-500 bg-red-500/20 border-red-500/50";
      default: return "text-gray-500 bg-gray-500/20 border-gray-500/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle2 className="w-5 h-5" />;
      case "degraded": return <AlertTriangle className="w-5 h-5" />;
      case "down": return <XCircle className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
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
          <h1 className="text-3xl font-bold mb-2">Services</h1>
          <p className="text-muted-foreground">Monitor service health, performance, and dependencies</p>
        </div>
        <button className="btn-primary flex items-center gap-2 pointer-events-auto">
          <Zap className="w-5 h-5" />
          Add Service
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
            placeholder="Search services..."
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
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <div className="text-2xl font-bold">{services.length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-sm text-muted-foreground">Healthy</span>
          </div>
          <div className="text-2xl font-bold">{services.filter(s => s.status === "healthy").length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Degraded</span>
          </div>
          <div className="text-2xl font-bold">{services.filter(s => s.status === "degraded").length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <span className="text-sm text-muted-foreground">Down</span>
          </div>
          <div className="text-2xl font-bold">{services.filter(s => s.status === "down").length}</div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedService(service)}
            className={`card p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg pointer-events-auto ${
              service.status === "healthy" ? "border-green-500/30" :
              service.status === "degraded" ? "border-yellow-500/30" :
              "border-red-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getStatusColor(service.status)}`}>
                {getStatusIcon(service.status)}
              </div>
              <div className={`w-3 h-3 rounded-full ${
                service.status === "healthy" ? "bg-green-500" :
                service.status === "degraded" ? "bg-yellow-500 animate-pulse" :
                "bg-red-500 animate-pulse"
              }`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <div className={`text-sm font-medium mb-4 ${
              service.status === "healthy" ? "text-green-500" :
              service.status === "degraded" ? "text-yellow-500" :
              "text-red-500"
            }`}>
              {service.status.toUpperCase()}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">CPU:</span>
                <span className="ml-1 font-medium">{service.cpu}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Memory:</span>
                <span className="ml-1 font-medium">{service.memory}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Latency:</span>
                <span className="ml-1 font-medium">{service.latency}ms</span>
              </div>
              <div>
                <span className="text-muted-foreground">Errors:</span>
                <span className="ml-1 font-medium">{service.errorRate}%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Uptime:</span>
                <span className="font-medium">{service.uptime}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Service Details */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 card pointer-events-auto"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-semibold">Service Details</h2>
            <button
              onClick={() => setSelectedService(null)}
              className="text-muted-foreground hover:text-foreground pointer-events-auto"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Service Name:</span>
                <p className="font-medium">{selectedService.name}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Status:</span>
                <p className={`font-medium ${getStatusColor(selectedService.status).split(' ')[0]}`}>{selectedService.status}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">CPU Usage:</span>
                <p className="font-medium">{selectedService.cpu}%</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Memory Usage:</span>
                <p className="font-medium">{selectedService.memory}%</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Latency:</span>
                <p className="font-medium">{selectedService.latency}ms</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Error Rate:</span>
                <p className="font-medium">{selectedService.errorRate}%</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Uptime:</span>
                <p className="font-medium">{selectedService.uptime}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function generateDemoServices(): Service[] {
  return [
    { id: generateId(), name: "api-gateway", status: "healthy", cpu: 45, memory: 52, latency: 45, errorRate: 0.1, uptime: 99.9 },
    { id: generateId(), name: "auth-service", status: "degraded", cpu: 78, memory: 85, latency: 320, errorRate: 2.5, uptime: 99.5 },
    { id: generateId(), name: "payment-service", status: "down", cpu: 95, memory: 98, latency: 2500, errorRate: 15, uptime: 98.2 },
    { id: generateId(), name: "order-service", status: "healthy", cpu: 55, memory: 60, latency: 120, errorRate: 0.3, uptime: 99.8 },
    { id: generateId(), name: "user-service", status: "healthy", cpu: 42, memory: 48, latency: 85, errorRate: 0.2, uptime: 99.9 },
    { id: generateId(), name: "notification-service", status: "healthy", cpu: 38, memory: 45, latency: 95, errorRate: 0.1, uptime: 99.9 },
    { id: generateId(), name: "analytics-service", status: "healthy", cpu: 62, memory: 70, latency: 180, errorRate: 0.5, uptime: 99.7 },
    { id: generateId(), name: "cache-service", status: "degraded", cpu: 88, memory: 92, latency: 450, errorRate: 3.2, uptime: 99.3 },
    { id: generateId(), name: "email-service", status: "healthy", cpu: 35, memory: 42, latency: 75, errorRate: 0.1, uptime: 99.9 },
  ];
}
