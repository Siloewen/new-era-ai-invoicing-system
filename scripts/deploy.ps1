Write-Host "🚀 Deploying Invoicing System to Render..." -ForegroundColor Green

# Check if render CLI is installed
try {
    $renderVersion = render --version
    Write-Host "✅ Render CLI found: $renderVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Render CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "   https://render.com/docs/install-cli" -ForegroundColor Yellow
    exit 1
}

# Login to Render
Write-Host "📝 Logging into Render..." -ForegroundColor Yellow
render login

# Deploy using render.yaml
Write-Host "🔧 Deploying services from render.yaml..." -ForegroundColor Yellow
render blueprint apply

Write-Host "✅ Deployment initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Wait for the services to build and deploy (this may take 5-10 minutes)" -ForegroundColor White
Write-Host "2. Check the deployment status in your Render dashboard" -ForegroundColor White
Write-Host "3. Once deployed, your services will be available at:" -ForegroundColor White
Write-Host "   - Backend: https://invoicing-backend.onrender.com" -ForegroundColor White
Write-Host "   - Frontend: https://invoicing-frontend.onrender.com" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Render Dashboard: https://dashboard.render.com" -ForegroundColor Cyan 