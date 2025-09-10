# Script de diagnostic Electron pour Windows PowerShell
Write-Host "=== Pré-contrôles ===" -ForegroundColor Green
node -v; npm -v

Write-Host "=== Git status ===" -ForegroundColor Green
git status --porcelain

Write-Host "=== Install deps ===" -ForegroundColor Green
npm ci

Write-Host "=== Lint ===" -ForegroundColor Green
try { npx eslint . --ext .js,.ts } catch { Write-Host "ESLint non configuré" }

Write-Host "=== Typecheck ===" -ForegroundColor Green
if (Test-Path "tsconfig.json") {
    npx tsc --noEmit
} else {
    Write-Host "pas de TypeScript détecté, skip typecheck"
}

Write-Host "=== Tests unitaires ===" -ForegroundColor Green
$testScript = npm run 2>$null | Select-String "test"
if ($testScript) {
    npm test
} else {
    Write-Host "aucun script 'test' trouvé dans package.json"
}

Write-Host "=== Rebuild natifs ===" -ForegroundColor Green
try { npx electron-rebuild -f } catch { Write-Host "electron-rebuild non disponible" }

Write-Host "=== Build (prod) ===" -ForegroundColor Green
$buildScript = npm run 2>$null | Select-String "build"
if ($buildScript) {
    npm run build
} else {
    Write-Host "aucun script 'build' trouvé"
}

Write-Host "=== Lancement dev Electron (logs -> electron-dev.log) ===" -ForegroundColor Green
$env:ELECTRON_ENABLE_LOGGING="1"
$env:ELECTRON_ENABLE_STACK_DUMPING="1"
$env:NODE_ENV="development"
npx electron . 2>&1 | Tee-Object electron-dev.log
