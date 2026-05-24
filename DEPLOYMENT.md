# Deployment Guide - Sentinel AI

This guide provides comprehensive instructions for deploying Sentinel AI to production.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ and npm installed
- PostgreSQL database (or use Docker)
- OpenAI API key
- Domain name configured (optional)

## Environment Variables

Copy `.env.example` to `.env` and configure the following:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sentinel_ai

# OpenAI API
OPENAI_API_KEY=your-openai-api-key

# Backend
BACKEND_URL=http://localhost:8000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Build and start all services:**
```bash
docker-compose up -d
```

2. **Run database migrations:**
```bash
docker-compose exec backend npx prisma migrate deploy
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Option 2: Manual Deployment

#### Backend Deployment

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Run database migrations:**
```bash
cd ..
npx prisma migrate deploy
```

5. **Start the backend server:**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend Deployment

1. **Install dependencies:**
```bash
npm install
```

2. **Build the application:**
```bash
npm run build
```

3. **Start the production server:**
```bash
npm start
```

### Option 3: Cloud Deployment

#### Vercel (Frontend)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Configure environment variables in Vercel dashboard**

#### Railway/Render (Backend)

1. **Push code to GitHub**
2. **Connect repository to Railway/Render**
3. **Configure environment variables**
4. **Deploy**

#### AWS/Azure/GCP

For major cloud providers, consider using:
- **AWS:** ECS + RDS + API Gateway
- **Azure:** App Service + Azure SQL + API Management
- **GCP:** Cloud Run + Cloud SQL + API Gateway

## Database Setup

### Using Docker (Recommended)

The docker-compose.yml includes PostgreSQL configuration.

### Manual Setup

1. **Create database:**
```sql
CREATE DATABASE sentinel_ai;
```

2. **Run migrations:**
```bash
npx prisma migrate deploy
```

3. **Seed database (optional):**
```bash
npx prisma db seed
```

## SSL/HTTPS Configuration

### Using Nginx (Recommended)

1. **Install Nginx:**
```bash
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Obtain SSL certificate:**
```bash
sudo certbot --nginx -d your-domain.com
```

### Using Cloudflare

1. **Add domain to Cloudflare**
2. **Configure DNS records**
3. **Enable SSL/TLS**
4. **Configure page rules for routing**

## Performance Optimization

### Frontend

1. **Enable caching in Next.js config**
2. **Use CDN for static assets**
3. **Implement image optimization**
4. **Enable compression**

### Backend

1. **Use connection pooling**
2. **Implement Redis caching**
3. **Enable database query optimization**
4. **Use async operations**

## Monitoring and Logging

### Application Monitoring

- **Sentry:** Error tracking
- **Datadog:** APM and infrastructure monitoring
- **Prometheus + Grafana:** Metrics and visualization

### Logging

- Backend logs are configured in `main.py`
- Frontend errors can be sent to monitoring service
- Configure log rotation for production

## Security Considerations

1. **Environment Variables:** Never commit `.env` files
2. **API Keys:** Rotate regularly and use secrets management
3. **Database:** Use strong passwords and restrict access
4. **HTTPS:** Always use SSL in production
5. **Rate Limiting:** Implement on API endpoints
6. **Input Validation:** Validate all user inputs
7. **CORS:** Configure properly for your domain

## Scaling

### Horizontal Scaling

1. **Load Balancer:** Use Nginx or cloud LB
2. **Multiple Instances:** Run multiple backend/frontend instances
3. **Database:** Use managed database with read replicas

### Vertical Scaling

1. **Increase CPU/RAM:** Based on load
2. **Database Optimization:** Indexes and query optimization
3. **Caching:** Redis for frequently accessed data

## Backup and Recovery

### Database Backups

```bash
# Backup
pg_dump sentinel_ai > backup.sql

# Restore
psql sentinel_ai < backup.sql
```

### Automated Backups

- Configure automated backups in cloud provider
- Store backups in multiple regions
- Test recovery procedures regularly

## Troubleshooting

### Common Issues

1. **Port conflicts:** Change ports in docker-compose.yml
2. **Database connection:** Check DATABASE_URL and network
3. **CORS errors:** Configure CORS in backend
4. **Build failures:** Check Node.js version and dependencies

### Logs

```bash
# Docker logs
docker-compose logs -f

# Backend logs
docker-compose logs backend

# Frontend logs
docker-compose logs frontend
```

## Maintenance

### Regular Tasks

1. **Update dependencies:** Monthly
2. **Security patches:** As soon as available
3. **Database maintenance:** Weekly
4. **Log rotation:** Configure based on volume
5. **Backup verification:** Weekly

## Support

For issues or questions:
- Check the main README.md
- Review documentation
- Open an issue on GitHub
- Contact support team
