"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  X, 
  Brain, 
  Sparkles,
  User,
  Bot,
  ChevronDown,
  Lightbulb
} from "lucide-react";
import { AICopilotMessage } from "@/types";
import { generateId } from "@/lib/utils";

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AICopilotMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      content: "Hi! I'm your AI incident copilot. Ask me anything about your infrastructure, incidents, or services. I can help you analyze logs, identify root causes, and recommend fixes.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Why did payment service fail?",
    "What caused the CPU spike?",
    "Show suspicious deployments",
    "Which service is unstable?",
    "Explain the current incident",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: AICopilotMessage = {
      id: generateId(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const assistantMessage: AICopilotMessage = {
        id: generateId(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes("payment") || q.includes("fail")) {
      return `**Payment Service Analysis**

The payment service is currently experiencing a critical failure. Here's what I found:

**Root Cause:** Memory leak in deployment v2.4
- CPU usage: 95% (critical)
- Memory usage: 98% (critical)
- Error rate: 15% (elevated)
- Latency: 2500ms (severe)

**Timeline:**
- 10:02 AM - Deployment v2.4 triggered
- 10:04 AM - CPU spike detected
- 10:05 AM - Error rate increased
- 10:08 AM - Memory exhaustion

**Recommendation:** Immediate rollback to v2.3 and investigate the payment processing module for memory leaks.

**Confidence:** 92%`;
    }
    
    if (q.includes("cpu") || q.includes("spike")) {
      return `**CPU Spike Analysis**

I detected a significant CPU spike across multiple services:

**Affected Services:**
1. **payment-service** - 95% CPU (critical)
2. **auth-service** - 78% CPU (high)
3. **database** - 78% CPU (high)

**Correlation:** The CPU spike correlates with the deployment v2.4 to payment-service at 10:02 AM. The memory leak is causing the CPU to work harder trying to allocate memory.

**Pattern:** This is a classic memory exhaustion pattern where the CPU spikes as the system struggles with memory allocation failures.

**Action:** Scale horizontally or rollback the deployment.`;
    }
    
    if (q.includes("deployment")) {
      return `**Suspicious Deployments**

I analyzed recent deployments and found:

**High Risk:**
- **payment-service v2.4** (10:02 AM)
  - Status: Suspicious
  - Risk Score: 95/100
  - Correlation: Directly linked to current incident
  - Recommendation: Immediate rollback

**Recent Deployments:**
- auth-service v3.1 (9:45 AM) - Healthy
- order-service v2.8 (9:30 AM) - Healthy
- api-gateway v1.5 (9:15 AM) - Healthy

**Recommendation:** Rollback payment-service to v2.3 immediately.`;
    }
    
    if (q.includes("unstable") || q.includes("service")) {
      return `**Service Stability Analysis**

Current service health status:

**Critical:**
- payment-service (DOWN)
  - CPU: 95%, Memory: 98%
  - Error rate: 15%
  - Status: Unstable

**Degraded:**
- auth-service
  - CPU: 78%, Memory: 85%
  - Latency: 320ms (elevated)
  - Status: At risk

**Healthy:**
- api-gateway, order-service, user-service, notification-service

**Prediction:** auth-service has 82% probability of failure in the next 20 minutes if current trends continue.`;
    }
    
    return `Based on your query, I've analyzed the current infrastructure state:

**Current Overview:**
- 1 critical incident (payment-service)
- 1 degraded service (auth-service)
- 4 healthy services
- 2 unresolved alerts

**Key Metrics:**
- Overall system health: 67%
- Average latency: 746ms
- Total error rate: 4.2%

Would you like me to dive deeper into any specific area?`;
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow z-[100] pointer-events-auto"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[400px] h-[600px] glass rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden border border-border/50 pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-primary/20 to-secondary/20 pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Copilot</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-card transition-colors pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pointer-events-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""} pointer-events-auto`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" 
                      ? "bg-gradient-to-br from-secondary to-purple-600" 
                      : "bg-gradient-to-br from-primary to-cyan-600"
                  }`}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-xl pointer-events-auto ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-secondary/20 to-purple-600/20 border border-secondary/50"
                      : "bg-gradient-to-br from-primary/20 to-cyan-600/20 border border-primary/50"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 pointer-events-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-primary/20 to-cyan-600/20 border border-primary/50 p-3 rounded-xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 pointer-events-auto">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <Lightbulb className="w-3 h-3" />
                  Suggested questions
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-card border border-border/50 hover:border-primary/50 transition-colors pointer-events-auto"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border/50 pointer-events-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask about incidents, services, logs..."
                  className="flex-1 px-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="p-2 rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors pointer-events-auto"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
