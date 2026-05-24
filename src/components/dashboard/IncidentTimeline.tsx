"use client";

import { motion } from "framer-motion";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Database,
  GitBranch,
  Activity,
  TrendingDown,
  Shield
} from "lucide-react";
import { TimelineEvent } from "@/types";
import { generateId, getSeverityColor, getSeverityBg } from "@/lib/utils";

interface IncidentTimelineProps {
  incidentId?: string;
}

export default function IncidentTimeline({ incidentId }: IncidentTimelineProps) {
  const events: TimelineEvent[] = [
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      event: "Deployment Triggered",
      severity: "low",
      details: "Deployment v2.4 initiated for payment-service",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      event: "Deployment Completed",
      severity: "low",
      details: "Payment-service successfully deployed to production",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 6),
      event: "CPU Spike Detected",
      severity: "high",
      details: "CPU usage on payment-service exceeded 90% threshold",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      event: "Error Rate Increased",
      severity: "high",
      details: "Error rate jumped from 0.5% to 15% on payment-service",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      event: "API Latency Crossed Threshold",
      severity: "critical",
      details: "API latency exceeded 2000ms threshold, cascading failures detected",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      event: "AI Detected Memory Leak",
      severity: "critical",
      details: "AI analysis identified probable memory leak in payment processing module",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      event: "Rollback Recommended",
      severity: "critical",
      details: "AI recommends immediate rollback to v2.3 to mitigate impact",
    },
  ];

  const getEventIcon = (event: string) => {
    if (event.includes("Deployment")) return <GitBranch className="w-5 h-5" />;
    if (event.includes("CPU")) return <Activity className="w-5 h-5" />;
    if (event.includes("Error")) return <AlertTriangle className="w-5 h-5" />;
    if (event.includes("Latency")) return <TrendingDown className="w-5 h-5" />;
    if (event.includes("Memory")) return <Database className="w-5 h-5" />;
    if (event.includes("Rollback")) return <Shield className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  return (
    <div className="card pointer-events-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Incident Timeline
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Critical
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            High
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Low
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent pointer-events-none" />

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-16 group pointer-events-auto"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 w-5 h-5 rounded-full border-4 border-background flex items-center justify-center ${
                event.severity === "critical" ? "bg-red-500" :
                event.severity === "high" ? "bg-orange-500" :
                "bg-green-500"
              } group-hover:scale-125 transition-transform pointer-events-auto`}>
                <div className={`w-2 h-2 rounded-full ${
                  event.severity === "critical" ? "bg-red-500" :
                  event.severity === "high" ? "bg-orange-500" :
                  "bg-green-500"
                } animate-pulse`} />
              </div>

              {/* Event Card */}
              <div className={`p-4 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg ${getSeverityBg(event.severity)} pointer-events-auto`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getSeverityBg(event.severity)}`}>
                      <div className={getSeverityColor(event.severity)}>
                        {getEventIcon(event.event)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.event}</h3>
                      <p className="text-sm text-muted-foreground">{event.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBg(event.severity)}`}>
                    {event.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{event.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 pointer-events-auto"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">AI Summary</h4>
            <p className="text-sm text-muted-foreground">
              The incident began with deployment v2.4 at 10:02 AM. Within 4 minutes, CPU spiked to 95% and error rate increased to 15%. 
              AI analysis identified a memory leak in the payment processing module. Immediate rollback to v2.3 is recommended.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
