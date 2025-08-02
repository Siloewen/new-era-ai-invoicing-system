#!/bin/bash

echo "🚀 Deploying Invoicing System to Render..."

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Please install it first:"
    echo "   https://render.com/docs/install-cli"
    exit 1
fi

# Login to Render
echo "📝 Logging into Render..."
render login

# Deploy using render.yaml
echo "🔧 Deploying services from render.yaml..."
render blueprint apply

echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Wait for the services to build and deploy (this may take 5-10 minutes)"
echo "2. Check the deployment status in your Render dashboard"
echo "3. Once deployed, your services will be available at:"
echo "   - Backend: https://invoicing-backend.onrender.com"
echo "   - Frontend: https://invoicing-frontend.onrender.com"
echo ""
echo "🔗 Render Dashboard: https://dashboard.render.com" 