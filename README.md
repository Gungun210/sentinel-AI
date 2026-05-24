# Sentinel AI - AI-Powered Incident Root Cause Analyzer

A world-class, enterprise-grade AI observability platform for modern engineering teams. Monitor logs, analyze incidents, detect anomalies, and identify probable root causes with AI.

## 🚀 Features

### Core Capabilities
- **AI Incident Analyzer** - Automatically identify root causes with 92%+ confidence
- **Real-Time Dashboard** - Live metrics with animated graphs and system health overview
- **AI Chat Copilot** - Conversational AI assistant for incident investigation
- **Incident Timeline** - Cinematic, animated incident replay with color-coded severity
- **Service Topology Map** - Interactive infrastructure dependency graph with animated connections
- **Smart Alert Engine** - AI-powered alert categorization and false positive reduction
- **Predictive Analytics** - ML-powered outage prediction with probability scores
- **Log Analysis Engine** - Upload, stream, and analyze logs with AI interpretation

### Premium UI/UX
- Dark mode with deep black (#050816) and dark navy (#0F172A) backgrounds
- Glassmorphism effects with backdrop blur
- Smooth animations using Framer Motion
- Premium gradient accents (cyan, electric blue, purple, neon green)
- Responsive design for desktop, tablet, and mobile
- Enterprise-grade polish inspired by Datadog, Grafana, and Linear

## 🏗️ Architecture

### Frontend Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Interactive charts
- **React Flow** - Service topology visualization
- **Lucide Icons** - Modern icon set
- **ShadCN UI** - Premium UI components

### Backend Stack
- **FastAPI** - High-performance Python web framework
- **WebSockets** - Real-time streaming
- **PostgreSQL** - Primary database
- **Prisma ORM** - Type-safe database access
- **OpenAI API** - AI analysis
- **LangChain** - AI agent orchestration

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

### Frontend Setup

```bash
# Navigate to project directory
cd sentinel-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python main.py
```

### Database Setup

```bash
# Install Prisma CLI
npm install -g prisma

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sentinel_ai"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key"

# Backend
BACKEND_URL="http://localhost:8000"
```

## 📁 Project Structure

```
sentinel-ai/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   │   ├── ai/            # AI components
│   │   │   └── AICopilot.tsx
│   │   ├── dashboard/     # Dashboard components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── IncidentTimeline.tsx
│   │   │   ├── ServiceTopology.tsx
│   │   │   └── LogAnalysis.tsx
│   │   ├── landing/       # Landing page components
│   │   │   └── LandingPage.tsx
│   │   ├── ui/            # ShadCN UI components
│   │   ├── charts/        # Chart components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── utils/             # Helper utilities
├── backend/               # FastAPI backend
│   ├── main.py           # Main application
│   ├── requirements.txt   # Python dependencies
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── ai/              # AI agents
│   └── models/          # Database models
├── prisma/              # Database schema
│   └── schema.prisma
├── package.json         # Node dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # Tailwind config
└── next.config.js       # Next.js config
```

## 🎯 Usage

### Accessing the Application

1. **Landing Page**: Navigate to `http://localhost:3000`
2. **Dashboard**: Navigate to `http://localhost:3000/dashboard`
3. **Backend API**: Navigate to `http://localhost:8000`

### Key Features

#### AI Chat Copilot
- Click the floating chat button in the bottom-right corner
- Ask questions about incidents, services, or logs
- Get AI-powered analysis and recommendations

#### Incident Timeline
- View chronological incident events
- Color-coded severity indicators
- AI-generated incident summaries

#### Service Topology
- Interactive infrastructure map
- Click nodes to view service details
- Real-time status indicators

#### Log Analysis
- Upload log files (.log, .txt)
- Filter by log level (error, warn, info, debug)
- AI-powered pattern detection

## 🤖 AI Integration

### Multi-Agent Architecture

The platform uses multiple specialized AI agents:

1. **Log Analysis Agent** - Analyzes log patterns and anomalies
2. **Metrics Correlation Agent** - Correlates metrics across services
3. **Incident Severity Agent** - Determines incident severity
4. **Recommendation Agent** - Generates fix recommendations
5. **Predictive Failure Agent** - Predicts potential outages
6. **Deployment Risk Agent** - Assesses deployment risks

### AI Capabilities

- Root cause identification with confidence scores
- Natural language incident explanations
- Automated fix recommendations
- Predictive analytics with probability calculations
- Log pattern detection and clustering

## 🎨 Design System

### Color Palette

- **Background**: #050816 (deep black)
- **Card**: #0F172A (dark navy)
- **Primary**: #06B6D4 (cyan)
- **Secondary**: #8B5CF6 (purple)
- **Accent**: #10B981 (neon green)
- **Destructive**: #EF4444 (red)

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, 2xl-5xl
- **Body**: Regular, base-lg
- **Muted**: text-muted-foreground

### Components

- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient with hover glow effects
- **Inputs**: Premium focus states with glowing borders
- **Animations**: Smooth transitions with Framer Motion

## 📊 Demo Data

The platform includes realistic demo data for:
- 5 active incidents with varying severity
- 6 services with health metrics
- 6 alerts with different types
- 3 AI predictions with probability scores
- Sample log entries for analysis

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Backend Deployment (Docker)

```bash
# Build Docker image
docker build -t sentinel-ai-backend .

# Run container
docker run -p 8000:8000 sentinel-ai-backend
```

### Database (Supabase/Railway)

1. Create PostgreSQL database
2. Update `DATABASE_URL` in `.env`
3. Run migrations: `npx prisma migrate deploy`

## 🔒 Security

- JWT authentication
- Google OAuth integration
- Encrypted data at rest
- SOC 2 compliance ready
- Rate limiting on API endpoints

## 📈 Performance

- Optimized bundle size with code splitting
- Lazy loading for heavy components
- Memoization for expensive computations
- Efficient state management with Zustand
- Skeleton loaders for better perceived performance

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by Datadog, Grafana, and Linear
- Built with Next.js, FastAPI, and OpenAI
- Icons by Lucide
- UI components by ShadCN


---

**Built with ❤️ for modern engineering teams**
