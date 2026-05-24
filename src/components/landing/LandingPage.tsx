"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Brain, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Cpu,
  Database,
  Globe,
  Lock,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">Sentinel AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/50 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Incident Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">AI-Powered Incident</span>
              <br />
              <span className="text-foreground">Intelligence for Modern</span>
              <br />
              <span className="text-gradient">Engineering Teams</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Stop wasting hours searching logs and dashboards during outages. 
              Sentinel AI automatically detects anomalies, identifies root causes, 
              and recommends fixes in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/dashboard" className="btn-primary text-lg">
                Start Monitoring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/dashboard" className="btn-secondary text-lg">
                Launch Dashboard
              </Link>
            </div>

            {/* Animated Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: "MTTR Reduced", value: "85%", icon: TrendingUp },
                { label: "Incidents Detected", value: "10K+", icon: Activity },
                { label: "Services Monitored", value: "500+", icon: Cpu },
                { label: "Uptime Guaranteed", value: "99.9%", icon: CheckCircle2 },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <metric.icon className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold text-gradient mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Enterprise-Grade Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, analyze, and resolve incidents with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Root Cause Analysis",
                description: "Automatically identify the root cause of incidents using advanced AI algorithms",
                color: "text-primary",
              },
              {
                icon: Activity,
                title: "Real-Time Monitoring",
                description: "Monitor logs, metrics, and traces in real-time with intelligent alerting",
                color: "text-secondary",
              },
              {
                icon: Shield,
                title: "Predictive Analytics",
                description: "Predict potential outages before they happen with ML-powered forecasting",
                color: "text-accent",
              },
              {
                icon: Database,
                title: "Log Analysis Engine",
                description: "Upload, stream, and analyze logs with AI-powered pattern detection",
                color: "text-primary",
              },
              {
                icon: Globe,
                title: "Service Topology",
                description: "Visualize your entire infrastructure with animated dependency graphs",
                color: "text-secondary",
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description: "Bank-grade security with SOC 2 compliance and data encryption",
                color: "text-accent",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color.split('-')[1]}-500/20 to-${feature.color.split('-')[1]}-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">How Sentinel AI Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From monitoring to resolution in minutes, not hours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Connect", description: "Connect your services and infrastructure" },
              { step: "02", title: "Monitor", description: "AI continuously monitors logs and metrics" },
              { step: "03", title: "Detect", description: "Anomalies are detected instantly" },
              { step: "04", title: "Resolve", description: "Get AI-powered recommendations" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-gradient mb-4 opacity-30">{item.step}</div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Trusted by Engineering Teams</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Sentinel AI reduced our MTTR by 85%. The AI root cause analysis is incredibly accurate.",
                author: "Sarah Chen",
                role: "VP of Engineering, TechCorp",
              },
              {
                quote: "We went from spending hours on incident analysis to getting answers in minutes. Game changer.",
                author: "Michael Roberts",
                role: "SRE Lead, StartupXYZ",
              },
              {
                quote: "The predictive analytics have saved us from multiple potential outages. Worth every penny.",
                author: "Emily Watson",
                role: "DevOps Manager, Enterprise Inc",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <p className="text-lg mb-6">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Simple, Transparent Pricing</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$99",
                features: ["5 Services", "1M Events/month", "Basic AI Analysis", "Email Support"],
              },
              {
                name: "Pro",
                price: "$299",
                features: ["50 Services", "10M Events/month", "Advanced AI", "Priority Support", "Predictive Analytics"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: ["Unlimited Services", "Unlimited Events", "Custom AI Models", "24/7 Support", "SLA Guarantee"],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card relative ${plan.popular ? 'border-2 border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gradient mb-6">{plan.price}<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className={`w-full block text-center py-3 rounded-xl font-medium transition-all ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-gradient">Sentinel AI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Sentinel AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
