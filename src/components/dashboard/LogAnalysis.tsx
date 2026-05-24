"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  AlertTriangle,
  Info,
  Bug,
  Brain,
  Download,
  Trash2,
  Zap
} from "lucide-react";
import { LogEntry } from "@/types";
import { generateId } from "@/lib/utils";

export default function LogAnalysis() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [filter, setFilter] = useState<"all" | "error" | "warn" | "info" | "debug">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate log parsing
      const demoLogs = generateDemoLogs();
      setLogs(demoLogs);
    }
  };

  const generateDemoLogs = (): LogEntry[] => {
    return [
      {
        id: generateId(),
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        level: "error",
        service: "payment-service",
        message: "OutOfMemoryError: Java heap space in PaymentProcessor.processPayment()",
        metadata: { thread: "pool-2-thread-7", stack_trace: "at PaymentProcessor.processPayment(PaymentProcessor.java:245)" },
      },
      {
        id: generateId(),
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        level: "error",
        service: "payment-service",
        message: "Connection timeout to database after 30000ms",
        metadata: { thread: "pool-2-thread-3", database: "postgresql-primary" },
      },
      {
        id: generateId(),
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        level: "warn",
        service: "payment-service",
        message: "High memory usage detected: 95% of heap allocated",
        metadata: { thread: "JVM-Monitor", heap_used: "2.8GB", heap_max: "3GB" },
      },
      {
        id: generateId(),
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        level: "error",
        service: "payment-service",
        message: "Payment processing failed: Unable to allocate memory for transaction",
        metadata: { transaction_id: "tx_123456", amount: "$250.00" },
      },
      {
        id: generateId(),
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
        level: "info",
        service: "payment-service",
        message: "Deployment v2.4 completed successfully",
        metadata: { version: "2.4", deploy_time: "10:02 AM" },
      },
      {
        id: generateId(),
        timestamp: new Date(Date.now() - 1000 * 60 * 0.5),
        level: "debug",
        service: "payment-service",
        message: "Starting payment processing thread pool",
        metadata: { pool_size: "50", queue_size: "1000" },
      },
    ];
  };

  const analyzeLogs = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "text-red-500 bg-red-500/20 border-red-500/50";
      case "warn": return "text-yellow-500 bg-yellow-500/20 border-yellow-500/50";
      case "info": return "text-blue-500 bg-blue-500/20 border-blue-500/50";
      case "debug": return "text-gray-500 bg-gray-500/20 border-gray-500/50";
      default: return "text-gray-500 bg-gray-500/20 border-gray-500/50";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error": return <AlertTriangle className="w-4 h-4" />;
      case "warn": return <AlertTriangle className="w-4 h-4" />;
      case "info": return <Info className="w-4 h-4" />;
      case "debug": return <Bug className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filter !== "all" && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="card pointer-events-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Log Analysis Engine
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={analyzeLogs}
            disabled={logs.length === 0 || isAnalyzing}
            className="btn-primary flex items-center gap-2 text-sm py-2 pointer-events-auto"
          >
            <Brain className="w-4 h-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </button>
        </div>
      </div>

      {/* Upload Area */}
      {logs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-dashed border-border/50 rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer pointer-events-auto"
        >
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".log,.txt"
            className="hidden"
            id="log-upload"
          />
          <label htmlFor="log-upload" className="cursor-pointer pointer-events-auto">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Upload Log Files</p>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop log files or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .log and .txt files up to 100MB
            </p>
          </label>
        </motion.div>
      )}

      {/* Log Viewer */}
      {logs.length > 0 && (
        <>
          {/* Controls */}
          <div className="flex items-center gap-4 mb-4 pointer-events-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search logs..."
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
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
            <button
              onClick={() => setLogs([])}
              className="p-2 rounded-lg hover:bg-card transition-colors pointer-events-auto"
              title="Clear logs"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-card transition-colors pointer-events-auto"
              title="Download logs"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* AI Analysis Summary */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 pointer-events-auto"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Zap className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="font-medium">AI Analysis in Progress...</p>
                  <p className="text-sm text-muted-foreground">Analyzing log patterns and anomalies</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Log Entries */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto pointer-events-auto">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedLog(log)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] ${getLevelColor(log.level)} pointer-events-auto`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-background/50">
                    {getLevelIcon(log.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase">{log.level}</span>
                      <span className="text-xs text-muted-foreground">{log.service}</span>
                      <span className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{log.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Log Details */}
          {selectedLog && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl glass border border-border/50 pointer-events-auto"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">Log Details</h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-muted-foreground hover:text-foreground pointer-events-auto"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span className={`font-medium uppercase ${getLevelColor(selectedLog.level).split(' ')[0]}`}>{selectedLog.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{selectedLog.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="font-medium">{selectedLog.timestamp.toLocaleString()}</span>
                </div>
                <div className="mt-3">
                  <span className="text-muted-foreground">Message:</span>
                  <p className="mt-1 p-2 bg-input rounded-lg font-mono text-xs">{selectedLog.message}</p>
                </div>
                {selectedLog.metadata && (
                  <div className="mt-3">
                    <span className="text-muted-foreground">Metadata:</span>
                    <pre className="mt-1 p-2 bg-input rounded-lg text-xs overflow-x-auto">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
