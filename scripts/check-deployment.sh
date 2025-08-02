#!/bin/bash

echo "🔍 Checking deployment status..."

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Please install it first."
    exit 1
fi

echo "📊 Service Status:"
echo "=================="

# List all services
render ps

echo ""
echo "🌐 Service URLs:"
echo "================"
echo "Backend: https://invoicing-backend.onrender.com"
echo "Frontend: https://invoicing-frontend.onrender.com"
echo ""
echo "🔗 Dashboard: https://dashboard.render.com" 