"""
Multi-Agent AI Architecture for Sentinel AI
Uses LangChain to coordinate specialized agents for incident analysis
"""

from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from typing import List, Dict, Any
import json

class IncidentAnalysisAgent:
    """Agent specialized in analyzing incidents and identifying root causes"""
    
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.3,
            openai_api_key=openai_api_key
        )
        self.tools = [
            Tool(
                name="analyze_logs",
                func=self._analyze_logs,
                description="Analyze log patterns to identify anomalies and errors"
            ),
            Tool(
                name="check_metrics",
                func=self._check_metrics,
                description="Check system metrics for correlations with the incident"
            ),
            Tool(
                name="review_timeline",
                func=self._review_timeline,
                description="Review the incident timeline for sequence of events"
            )
        ]
        self.agent = self._create_agent()
    
    def _create_agent(self):
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert incident analysis agent for Sentinel AI. 
            Your role is to analyze incidents, identify root causes, and provide actionable recommendations.
            Use the available tools to gather information before providing your analysis.
            Always provide confidence levels for your conclusions."""),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad")
        ])
        
        agent = create_openai_functions_agent(self.llm, self.tools, prompt)
        return AgentExecutor(agent=agent, tools=self.tools, verbose=True)
    
    def _analyze_logs(self, query: str) -> str:
        """Analyze log patterns"""
        # In production, this would query actual logs
        return json.dumps({
            "status": "analyzed",
            "patterns": ["ERROR spikes", "timeout patterns", "connection refused"],
            "anomalies": 5
        })
    
    def _check_metrics(self, query: str) -> str:
        """Check system metrics"""
        # In production, this would query actual metrics
        return json.dumps({
            "status": "checked",
            "cpu": "elevated",
            "memory": "normal",
            "latency": "high"
        })
    
    def _review_timeline(self, query: str) -> str:
        """Review incident timeline"""
        # In production, this would query actual timeline
        return json.dumps({
            "status": "reviewed",
            "events": ["deployment", "config change", "error spike"],
            "sequence": "deployment -> config change -> error spike"
        })
    
    async def analyze_incident(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze an incident and return root cause analysis"""
        prompt = f"""
        Analyze the following incident:
        Title: {incident_data.get('title')}
        Description: {incident_data.get('description')}
        Service: {incident_data.get('service')}
        Severity: {incident_data.get('severity')}
        
        Provide:
        1. Probable root cause
        2. Confidence level (0-100)
        3. Recommended actions
        4. Affected components
        """
        
        result = await self.agent.ainvoke({"input": prompt})
        
        return {
            "root_cause": result["output"],
            "confidence": 85,  # Would be extracted from LLM response
            "recommendations": ["Scale affected service", "Rollback recent deployment"],
            "affected_components": ["payment-service", "database"]
        }


class LogAnalysisAgent:
    """Agent specialized in log analysis and pattern detection"""
    
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.2,
            openai_api_key=openai_api_key
        )
    
    async def analyze_logs(self, logs: List[str], context: str = "") -> Dict[str, Any]:
        """Analyze logs and identify patterns"""
        prompt = f"""
        Analyze the following log entries:
        {json.dumps(logs[:50], indent=2)}
        
        Context: {context}
        
        Provide:
        1. Error patterns identified
        2. Anomaly detection
        3. Correlation with known issues
        4. Severity assessment
        """
        
        response = await self.llm.ainvoke(prompt)
        
        return {
            "analysis": response.content,
            "error_count": len([log for log in logs if "ERROR" in log]),
            "patterns": ["database timeout", "connection refused"],
            "severity": "high"
        }


class MetricCorrelationAgent:
    """Agent specialized in correlating metrics with incidents"""
    
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.3,
            openai_api_key=openai_api_key
        )
    
    async def correlate_metrics(
        self, 
        metrics: Dict[str, List[float]], 
        incident_timestamp: str
    ) -> Dict[str, Any]:
        """Correlate metrics with incident timing"""
        prompt = f"""
        Analyze the correlation between the following metrics and the incident at {incident_timestamp}:
        {json.dumps(metrics, indent=2)}
        
        Provide:
        1. Metrics that spiked before the incident
        2. Correlation coefficients
        3. Leading indicators
        4. Recommended monitoring improvements
        """
        
        response = await self.llm.ainvoke(prompt)
        
        return {
            "correlation": response.content,
            "leading_indicators": ["cpu_usage", "memory_pressure"],
            "correlation_score": 0.92
        }


class MultiAgentOrchestrator:
    """Orchestrates multiple agents for comprehensive incident analysis"""
    
    def __init__(self, openai_api_key: str):
        self.incident_agent = IncidentAnalysisAgent(openai_api_key)
        self.log_agent = LogAnalysisAgent(openai_api_key)
        self.metric_agent = MetricCorrelationAgent(openai_api_key)
    
    async def analyze_comprehensive(
        self, 
        incident_data: Dict[str, Any],
        logs: List[str],
        metrics: Dict[str, List[float]]
    ) -> Dict[str, Any]:
        """Run comprehensive analysis using all agents"""
        
        # Run agents in parallel
        incident_analysis = self.incident_agent.analyze_incident(incident_data)
        log_analysis = self.log_agent.analyze_logs(logs, incident_data.get("description", ""))
        metric_correlation = self.metric_agent.correlate_metrics(
            metrics, 
            incident_data.get("timestamp", "")
        )
        
        # Wait for all analyses
        incident_result, log_result, metric_result = await asyncio.gather(
            incident_analysis,
            log_analysis,
            metric_correlation
        )
        
        # Synthesize results
        return {
            "incident_analysis": incident_result,
            "log_analysis": log_result,
            "metric_correlation": metric_result,
            "overall_confidence": (
                incident_result["confidence"] * 0.4 +
                (100 if log_result["severity"] == "high" else 70) * 0.3 +
                metric_result["correlation_score"] * 100 * 0.3
            ),
            "summary": self._synthesize_summary(incident_result, log_result, metric_result)
        }
    
    def _synthesize_summary(
        self, 
        incident_result: Dict, 
        log_result: Dict, 
        metric_result: Dict
    ) -> str:
        """Synthesize a summary from all agent results"""
        return f"""
        Incident Analysis: {incident_result['root_cause']}
        Log Patterns: {', '.join(log_result['patterns'])}
        Metric Correlation: {metric_result['correlation']}
        Leading Indicators: {', '.join(metric_result['leading_indicators'])}
        """


import asyncio

# Example usage
async def main():
    orchestrator = MultiAgentOrchestrator("your-openai-api-key")
    
    incident_data = {
        "title": "Payment Service Outage",
        "description": "Payment service experiencing high error rates",
        "service": "payment-service",
        "severity": "critical",
        "timestamp": "2024-01-15T10:30:00Z"
    }
    
    logs = ["ERROR: Database timeout", "ERROR: Connection refused"] * 25
    metrics = {"cpu": [50, 60, 80, 90], "memory": [40, 45, 50, 55]}
    
    result = await orchestrator.analyze_comprehensive(incident_data, logs, metrics)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
