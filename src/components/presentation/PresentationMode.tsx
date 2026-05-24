"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, X, Maximize2, Minimize2 } from "lucide-react";

interface PresentationStep {
  id: number;
  title: string;
  description: string;
  action: () => void;
  duration: number;
}

export default function PresentationMode() {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const steps: PresentationStep[] = [
    {
      id: 1,
      title: "Welcome to Sentinel AI",
      description: "AI-Powered Incident Intelligence for modern engineering teams",
      action: () => console.log("Step 1: Welcome"),
      duration: 5000,
    },
    {
      id: 2,
      title: "Real-Time Dashboard",
      description: "Monitor your infrastructure with live metrics and animated graphs",
      action: () => console.log("Step 2: Dashboard"),
      duration: 5000,
    },
    {
      id: 3,
      title: "AI Chat Copilot",
      description: "Get instant insights with our AI-powered assistant",
      action: () => console.log("Step 3: AI Copilot"),
      duration: 5000,
    },
    {
      id: 4,
      title: "Incident Timeline",
      description: "Track incidents with cinematic visualizations",
      action: () => console.log("Step 4: Timeline"),
      duration: 5000,
    },
    {
      id: 5,
      title: "Service Topology",
      description: "Visualize your service dependencies and health",
      action: () => console.log("Step 5: Topology"),
      duration: 5000,
    },
    {
      id: 6,
      title: "Smart Alerts",
      description: "AI-powered alert categorization and recommendations",
      action: () => console.log("Step 6: Alerts"),
      duration: 5000,
    },
    {
      id: 7,
      title: "Log Analysis",
      description: "Analyze logs with AI interpretation",
      action: () => console.log("Step 7: Logs"),
      duration: 5000,
    },
    {
      id: 8,
      title: "Predictive Analytics",
      description: "Predict issues before they happen",
      action: () => console.log("Step 8: Predictions"),
      duration: 5000,
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && isActive) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, steps[currentStep].duration);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isActive, currentStep, steps]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const startPresentation = () => {
    setIsActive(true);
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const stopPresentation = () => {
    setIsActive(false);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isActive) {
    return (
      <button
        onClick={startPresentation}
        className="fixed bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 z-[100] pointer-events-auto"
      >
        <Play className="w-5 h-5" />
        Start Demo
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background pointer-events-auto">
      {/* Presentation Overlay */}
      <AnimatePresence>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center p-8 pointer-events-auto"
        >
          <div className="max-w-4xl w-full text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Step {currentStep + 1} of {steps.length}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              {steps[currentStep].title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-12"
            >
              {steps[currentStep].description}
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto max-w-md"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl pointer-events-auto">
        <button
          onClick={previousStep}
          disabled={currentStep === 0}
          className="p-2 rounded-lg hover:bg-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
        >
          <SkipForward className="w-5 h-5 rotate-180" />
        </button>
        
        <button
          onClick={togglePlayPause}
          className="p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors pointer-events-auto"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="p-2 rounded-lg hover:bg-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
        >
          <SkipForward className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-card transition-colors pointer-events-auto"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={stopPresentation}
          className="p-2 rounded-lg hover:bg-card transition-colors text-red-500 pointer-events-auto"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Step Indicators */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(index)}
            className={`w-2 h-2 rounded-full transition-all pointer-events-auto ${
              index === currentStep
                ? "w-8 bg-primary"
                : index < currentStep
                ? "bg-primary/50"
                : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
