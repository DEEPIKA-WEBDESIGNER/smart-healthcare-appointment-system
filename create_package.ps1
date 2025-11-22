# PowerShell script to create downloadable package
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Smart Healthcare Appointment System" -ForegroundColor Green
Write-Host "Creating Download Package..." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$sourcePath = Get-Location
$zipFileName = "Smart_Healthcare_System.zip"
$zipPath = Join-Path $sourcePath $zipFileName

# Remove existing zip if present
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Removed existing package..." -ForegroundColor Yellow
}

# Create zip archive
$itemsToZip = @(
    "backend",
    "frontend",
    ".env",
    ".gitignore",
    "package.json",
    "database_schema.sql",
    "README.md",
    "SETUP_INSTRUCTIONS.md"
)

Write-Host "Compressing files..." -ForegroundColor Yellow

Compress-Archive -Path $itemsToZip -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Package created successfully!" -ForegroundColor Green
Write-Host "File: $zipFileName" -ForegroundColor Green
Write-Host "Location: $zipPath" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now download and share this zip file." -ForegroundColor White
Write-Host "Extract it and follow SETUP_INSTRUCTIONS.md to get started." -ForegroundColor White
Write-Host ""

# Get file size
$fileSize = (Get-Item $zipPath).Length / 1MB
Write-Host "Package size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Yellow
