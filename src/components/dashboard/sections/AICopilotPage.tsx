"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  MessageSquare, 
  Send, 
  Sparkles,
  Zap,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Analyze the recent payment service incident",
  "What are the current system health metrics?",
  "Predict potential failures in the next hour",
  "Generate a summary of today's incidents",
  "Recommend optimizations for auth service",
];

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Copilot for incident intelligence. I can help you analyze incidents, predict failures, and optimize your infrastructure. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateAIResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("incident") || lowerQuery.includes("payment")) {
      return "Based on my analysis of the recent payment service incident, I've identified a memory leak in the PaymentProcessor component that occurred after deployment v2.4. The CPU saturation reached 95% with a 15% error rate. I recommend an immediate rollback to v2.3 and investigating the heap allocation patterns in the payment processing thread pool.";
    }
    
    if (lowerQuery.includes("health") || lowerQuery.includes("metrics")) {
      return "Current system health overview: 5 out of 6 services are healthy. Auth service is showing degraded performance with 78% CPU and 320ms latency. Payment service is currently down. The overall system uptime is at 99.7%. I recommend immediate attention to the payment service and monitoring of auth service metrics.";
    }
    
    if (lowerQuery.includes("predict") || lowerQuery.includes("failure")) {
      return "My predictive models indicate a 95% probability of CPU saturation in payment service within the next 10 minutes, and an 82% risk of memory exhaustion in auth service within 20 minutes. I recommend scaling both services horizontally and investigating the recent deployment changes.";
    }
    
    if (lowerQuery.includes("summary") || lowerQuery.includes("today")) {
      return "Today's incident summary: 5 total incidents (1 critical, 1 high, 2 medium, 1 low). The payment service timeout is the most critical issue affecting 3 services. Average MTTR is 2.3 minutes, which is 45% better than last week. 3 services are at risk of failure in the next hour based on predictive analysis.";
    }
    
    if (lowerQuery.includes("optimize") || lowerQuery.includes("auth")) {
      return "For auth service optimization, I recommend: 1) Increase connection pool size from 50 to 100, 2) Implement request caching for JWT validation, 3) Add horizontal scaling during peak hours, 4) Monitor memory usage patterns for potential leaks. These changes should reduce latency by 40% and improve throughput by 35%.";
    }
    
    return "I've analyzed your query. Based on the current system state and historical data, I can provide insights on incidents, service health, predictions, and optimization strategies. Would you like me to focus on a specific area or service?";
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
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
          <h1 className="text-3xl font-bold mb-2">AI Copilot</h1>
          <p className="text-muted-foreground">Your intelligent assistant for incident analysis and infrastructure insights</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-xl">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Conversations</span>
          </div>
          <div className="text-2xl font-bold">{messages.length}</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-6 h-6 text-secondary" />
            <span className="text-sm text-muted-foreground">AI Insights</span>
          </div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-accent" />
            <span className="text-sm text-muted-foreground">Predictions</span>
          </div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="card pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-orange-500" />
            <span className="text-sm text-muted-foreground">Avg Response</span>
          </div>
          <div className="text-2xl font-bold">1.2s</div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card pointer-events-auto">
        {/* Messages */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto mb-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-card border border-border/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.role === "assistant" && (
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.role === "assistant" && (
                        <>
                          <span>•</span>
                          <CheckCircle2 className="w-3 h-3" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-card border border-border/50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Brain className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Suggested prompts:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="px-4 py-2 bg-input border border-border rounded-xl text-sm hover:border-primary/50 transition-colors pointer-events-auto"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything about your infrastructure..."
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-12 pointer-events-auto"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="card p-6 pointer-events-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Real-Time Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Analyze incidents as they happen with instant AI-powered insights and recommendations
          </p>
        </div>
        <div className="card p-6 pointer-events-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary/20">
              <Brain className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-semibold">Predictive Intelligence</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Predict potential failures before they occur with advanced machine learning models
          </p>
        </div>
        <div className="card p-6 pointer-events-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold">Smart Recommendations</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get actionable recommendations for optimization and incident resolution
          </p>
        </div>
      </div>
    </motion.div>
  );
}
