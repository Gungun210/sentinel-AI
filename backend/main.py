from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import json
import asyncio
from datetime import datetime
from typing import List
import random

# Demo data generators
def generate_demo_metrics():
    return {
        "timestamp": datetime.now().isoformat(),
        "cpu": random.uniform(20, 95),
        "memory": random.uniform(30, 98),
        "latency": random.uniform(50, 2500),
        "error_rate": random.uniform(0, 15),
        "request_rate": random.uniform(100, 5000),
    }

def generate_demo_incident():
    incidents = [
        {
            "id": f"inc-{random.randint(1000, 9999)}",
            "title": "Payment Service Timeout",
            "description": "Deployment v2.4 caused memory leak in payment-service",
            "severity": random.choice(["critical", "high", "medium", "low"]),
            "status": "active",
            "timestamp": datetime.now().isoformat(),
            "service": "payment-service",
            "confidence": random.randint(70, 95),
        },
        {
            "id": f"inc-{random.randint(1000, 9999)}",
            "title": "Database Connection Pool Exhaustion",
            "description": "High query load causing connection pool exhaustion",
            "severity": random.choice(["critical", "high", "medium", "low"]),
            "status": "investigating",
            "timestamp": datetime.now().isoformat(),
            "service": "database",
            "confidence": random.randint(70, 95),
        },
    ]
    return random.choice(incidents)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(broadcast_metrics())
    yield
    # Shutdown
    pass

app = FastAPI(
    title="Sentinel AI API",
    description="AI-Powered Incident Root Cause Analyzer",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Sentinel AI API",
        "version": "1.0.0",
        "status": "operational",
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/incidents")
async def get_incidents():
    return {
        "incidents": [
            {
                "id": "inc-1001",
                "title": "Payment Service Timeout",
                "description": "Deployment v2.4 caused memory leak in payment-service resulting in CPU saturation",
                "severity": "critical",
                "status": "active",
                "timestamp": datetime.now().isoformat(),
                "service": "payment-service",
                "confidence": 92,
                "affected_services": ["payment-service", "order-service"],
                "metrics": {"error_rate": 15, "latency": 2500, "cpu": 95, "memory": 98},
            },
            {
                "id": "inc-1002",
                "title": "Database Connection Pool Exhaustion",
                "description": "High query load causing connection pool exhaustion",
                "severity": "high",
                "status": "investigating",
                "timestamp": datetime.now().isoformat(),
                "service": "database",
                "confidence": 87,
                "affected_services": ["database", "api-service"],
                "metrics": {"error_rate": 8, "latency": 1200, "cpu": 78, "memory": 85},
            },
        ]
    }

@app.get("/api/services")
async def get_services():
    return {
        "services": [
            {"id": "svc-1", "name": "api-gateway", "status": "healthy", "cpu": 45, "memory": 52, "latency": 45, "error_rate": 0.1},
            {"id": "svc-2", "name": "auth-service", "status": "degraded", "cpu": 78, "memory": 85, "latency": 320, "error_rate": 2.5},
            {"id": "svc-3", "name": "payment-service", "status": "down", "cpu": 95, "memory": 98, "latency": 2500, "error_rate": 15},
            {"id": "svc-4", "name": "order-service", "status": "healthy", "cpu": 55, "memory": 60, "latency": 120, "error_rate": 0.3},
        ]
    }

@app.get("/api/alerts")
async def get_alerts():
    return {
        "alerts": [
            {"id": "alt-1", "type": "cpu", "severity": "critical", "message": "CPU usage above 90%", "timestamp": datetime.now().isoformat(), "service": "payment-service", "resolved": False},
            {"id": "alt-2", "type": "memory", "severity": "high", "message": "Memory usage above 85%", "timestamp": datetime.now().isoformat(), "service": "auth-service", "resolved": False},
        ]
    }

@app.get("/api/predictions")
async def get_predictions():
    return {
        "predictions": [
            {"id": "pred-1", "service": "auth-service", "type": "Memory exhaustion risk", "probability": 82, "timeframe": "20 minutes", "recommendation": "Scale up memory"},
            {"id": "pred-2", "service": "payment-service", "type": "CPU saturation", "probability": 95, "timeframe": "10 minutes", "recommendation": "Immediate rollback"},
        ]
    }

@app.post("/api/ai/analyze")
async def analyze_incident(data: dict):
    # Simulate AI analysis
    await asyncio.sleep(1)
    return {
        "root_cause": "Memory leak in payment-service after deployment v2.4",
        "confidence": 92,
        "recommendation": "Rollback to v2.3 and investigate memory leak in payment processing module",
        "affected_services": ["payment-service", "order-service", "user-service"],
        "severity": "critical",
        "explanation": "The deployment v2.4 introduced a memory leak in the payment processing module that causes gradual memory exhaustion. This leads to CPU saturation as the system struggles to allocate memory, resulting in cascading API timeout failures across dependent services.",
    }

@app.post("/api/ai/chat")
async def ai_chat(data: dict):
    question = data.get("question", "")
    # Simulate AI response
    await asyncio.sleep(0.5)
    
    responses = {
        "payment": "The payment service is experiencing a memory leak caused by deployment v2.4. CPU usage is at 95% and memory at 98%. I recommend an immediate rollback to v2.3.",
        "cpu": "The CPU spike is caused by memory exhaustion in the payment-service. The service is trying to allocate memory but failing, causing high CPU usage as it retries.",
        "deployment": "The most recent deployment (v2.4) to payment-service is suspicious. It was deployed 10 minutes ago and correlates with the incident start time.",
        "default": "Based on the current metrics, I detect anomalies in the payment-service. The service is showing 95% CPU and 98% memory usage with a 15% error rate. Would you like me to investigate further?",
    }
    
    key = "default"
    if "payment" in question.lower():
        key = "payment"
    elif "cpu" in question.lower():
        key = "cpu"
    elif "deployment" in question.lower():
        key = "deployment"
    
    return {
        "response": responses[key],
        "confidence": random.randint(75, 95),
        "sources": ["logs", "metrics", "traces"],
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo back or process
            await websocket.send_json({"type": "echo", "data": data})
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def broadcast_metrics():
    """Broadcast real-time metrics to all connected clients"""
    while True:
        await asyncio.sleep(2)
        metrics = generate_demo_metrics()
        await manager.broadcast({"type": "metrics", "data": metrics})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
