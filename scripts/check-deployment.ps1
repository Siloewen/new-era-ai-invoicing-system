Write-Host "🔍 Checking deployment status..." -ForegroundColor Green

# Check if render CLI is installed
try {
    $renderVersion = render --version
    Write-Host "✅ Render CLI found: $renderVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Render CLI not found. Please install it first." -ForegroundColor Red
    exit 1
}

Write-Host "📊 Service Status:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

# List all services
render ps

Write-Host ""
Write-Host "🌐 Service URLs:" -ForegroundColor Cyan
Write-Host "================" -ForegroundColor Cyan
Write-Host "Backend: https://invoicing-backend.onrender.com" -ForegroundColor White
Write-Host "Frontend: https://invoicing-frontend.onrender.com" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Dashboard: https://dashboard.render.com" -ForegroundColor Cyan 