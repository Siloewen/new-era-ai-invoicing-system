# Deployment Guide - Invoicing System

This guide will help you deploy the Invoicing System to Render.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Render CLI**: Install the Render CLI
   ```bash
   # macOS
   brew install render
   
   # Windows
   # Download from https://render.com/docs/install-cli
   
   # Linux
   curl -s https://render.com/docs/install-cli | bash
   ```

## Quick Deploy

### Windows Users
1. **Login to Render**:
   ```powershell
   render login
   ```

2. **Deploy using the PowerShell script**:
   ```powershell
   .\scripts\deploy.ps1
   ```

### macOS/Linux Users
1. **Login to Render**:
   ```bash
   render login
   ```

2. **Deploy using the bash script**:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

## Manual Deployment

If you prefer to deploy manually:

1. **Push your code to GitHub** (if not already done)

2. **Create services in Render Dashboard**:
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically create the services defined in `render.yaml`

## Services Overview

The deployment creates the following services:

### Backend API (`invoicing-backend`)
- **Type**: Web Service
- **Runtime**: Node.js
- **URL**: `https://invoicing-backend.onrender.com`
- **Features**:
  - REST API endpoints
  - Database integration
  - File uploads
  - PDF generation

### Frontend (`invoicing-frontend`)
- **Type**: Web Service
- **Runtime**: Node.js (Next.js)
- **URL**: `https://invoicing-frontend.onrender.com`
- **Features**:
  - React/Next.js application
  - Modern UI with Tailwind CSS
  - Responsive design

### Database (`invoicing-database`)
- **Type**: PostgreSQL
- **Plan**: Starter
- **Features**:
  - Persistent data storage
  - Automatic backups
  - Connection pooling

### Redis (`invoicing-redis`)
- **Type**: Redis
- **Plan**: Starter
- **Features**:
  - Caching
  - Session storage
  - Queue management

## Environment Variables

The following environment variables are automatically configured:

### Backend
- `NODE_ENV`: production
- `PORT`: 10000
- `DATABASE_URL`: Auto-configured from PostgreSQL database
- `REDIS_URL`: Auto-configured from Redis service
- `JWT_SECRET`: Auto-generated
- `FRONTEND_URL`: https://invoicing-frontend.onrender.com

### Frontend
- `NEXT_PUBLIC_API_URL`: https://invoicing-backend.onrender.com

## Post-Deployment

1. **Database Migration**: The backend will automatically run Prisma migrations on startup

2. **Seed Data**: You may want to add initial data:
   ```bash
   # Connect to your backend service and run:
   npm run prisma:studio
   ```

3. **Custom Domain** (Optional):
   - Go to your service settings in Render
   - Add your custom domain
   - Update DNS records

## Monitoring

- **Logs**: Available in the Render dashboard for each service
- **Metrics**: CPU, memory, and request metrics
- **Health Checks**: Automatic health monitoring

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correctly set
   - Check if database is running

3. **CORS Errors**:
   - Backend CORS is configured for the frontend URL
   - Check browser console for specific errors

### Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **Render Support**: Available in the dashboard

## Cost Estimation

- **Starter Plan**: $7/month per service
- **Database**: $7/month
- **Redis**: $7/month
- **Total**: ~$28/month for all services

## Scaling

When ready to scale:
1. Upgrade to higher plans in Render dashboard
2. Add more instances for web services
3. Consider using Render's auto-scaling features

## Checking Deployment Status

### Windows Users
```powershell
.\scripts\check-deployment.ps1
```

### macOS/Linux Users
```bash
./scripts/check-deployment.sh
``` 