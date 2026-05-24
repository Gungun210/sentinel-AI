"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Database as DatabaseIcon, 
  Globe, 
  Shield,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Service } from "@/types";
import { getSeverityBg } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  type: "service" | "database" | "external" | "gateway";
  status: "healthy" | "degraded" | "down";
  x: number;
  y: number;
  metrics?: {
    cpu: number;
    memory: number;
    latency: number;
  };
}

interface Edge {
  from: string;
  to: string;
  status: "healthy" | "degraded";
  traffic: number;
}

export default function ServiceTopology() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    { id: "gateway", label: "API Gateway", type: "gateway", status: "healthy", x: 400, y: 50, metrics: { cpu: 45, memory: 52, latency: 45 } },
    { id: "auth", label: "Auth Service", type: "service", status: "degraded", x: 200, y: 180, metrics: { cpu: 78, memory: 85, latency: 320 } },
    { id: "payment", label: "Payment Service", type: "service", status: "down", x: 400, y: 180, metrics: { cpu: 95, memory: 98, latency: 2500 } },
    { id: "order", label: "Order Service", type: "service", status: "healthy", x: 600, y: 180, metrics: { cpu: 55, memory: 60, latency: 120 } },
    { id: "user", label: "User Service", type: "service", status: "healthy", x: 200, y: 310, metrics: { cpu: 42, memory: 48, latency: 85 } },
    { id: "database", label: "PostgreSQL", type: "database", status: "degraded", x: 400, y: 310, metrics: { cpu: 78, memory: 85, latency: 1200 } },
    { id: "stripe", label: "Stripe API", type: "external", status: "healthy", x: 600, y: 310, metrics: { cpu: 0, memory: 0, latency: 200 } },
  ];

  const edges: Edge[] = [
    { from: "gateway", to: "auth", status: "degraded", traffic: 1500 },
    { from: "gateway", to: "payment", status: "degraded", traffic: 800 },
    { from: "gateway", to: "order", status: "healthy", traffic: 2200 },
    { from: "auth", to: "database", status: "degraded", traffic: 500 },
    { from: "payment", to: "database", status: "degraded", traffic: 300 },
    { from: "payment", to: "stripe", status: "healthy", traffic: 200 },
    { from: "order", to: "database", status: "degraded", traffic: 400 },
    { from: "order", to: "user", status: "healthy", traffic: 600 },
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "gateway": return <Globe className="w-6 h-6" />;
      case "database": return <DatabaseIcon className="w-6 h-6" />;
      case "external": return <Shield className="w-6 h-6" />;
      default: return <Server className="w-6 h-6" />;
    }
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case "healthy": return "from-green-500 to-emerald-600";
      case "degraded": return "from-yellow-500 to-orange-500";
      case "down": return "from-red-500 to-rose-600";
      default: return "from-gray-500 to-slate-600";
    }
  };

  const getEdgeColor = (status: string) => {
    return status === "healthy" ? "stroke-green-500" : "stroke-red-500";
  };

  return (
    <div className="card pointer-events-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Service Topology
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            Healthy
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            Degraded
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            Down
          </span>
        </div>
      </div>

      <div className="relative h-[500px] bg-card/50 rounded-xl overflow-hidden pointer-events-auto">
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={getEdgeColor(edge.status)}
                  strokeWidth={2}
                  strokeDasharray={edge.status === "healthy" ? "0" : "5,5"}
                  opacity={0.5}
                />
                <circle
                  cx={(fromNode.x + toNode.x) / 2}
                  cy={(fromNode.y + toNode.y) / 2}
                  r={4}
                  fill={edge.status === "healthy" ? "#22c55e" : "#ef4444"}
                  className="animate-pulse"
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute cursor-pointer group pointer-events-auto"
            style={{
              left: node.x - 60,
              top: node.y - 40,
              width: 120,
              height: 80,
            }}
            onClick={() => setSelectedNode(node)}
          >
            <div className={`w-full h-full rounded-xl bg-gradient-to-br ${getNodeColor(node.status)} p-3 flex flex-col items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-background pointer-events-auto`}>
              <div className="text-white mb-1">
                {getNodeIcon(node.type)}
              </div>
              <span className="text-white text-xs font-medium text-center">{node.label}</span>
              <div className={`w-2 h-2 rounded-full mt-1 ${
                node.status === "healthy" ? "bg-green-300" :
                node.status === "degraded" ? "bg-yellow-300 animate-pulse" :
                "bg-red-300 animate-pulse"
              }`} />
            </div>
          </motion.div>
        ))}

        {/* Selected Node Details */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass border border-border/50 pointer-events-auto"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getNodeColor(selectedNode.status)}`}>
                  <div className="text-white">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{selectedNode.label}</h3>
                  <p className={`text-sm ${selectedNode.status === "healthy" ? "text-green-500" : selectedNode.status === "degraded" ? "text-yellow-500" : "text-red-500"}`}>
                    {selectedNode.status.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-muted-foreground hover:text-foreground pointer-events-auto"
              >
                ✕
              </button>
            </div>
            {selectedNode.metrics && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">CPU</p>
                  <p className="text-lg font-bold">{selectedNode.metrics.cpu}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Memory</p>
                  <p className="text-lg font-bold">{selectedNode.metrics.memory}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Latency</p>
                  <p className="text-lg font-bold">{selectedNode.metrics.latency}ms</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-green-500" />
          <span>Healthy Connection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-500" style={{ background: "repeating-linear-gradient(90deg, #ef4444 0, #ef4444 4px, transparent 4px, transparent 8px)" }} />
          <span>Degraded Connection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Traffic Flow</span>
        </div>
      </div>
    </div>
  );
}
