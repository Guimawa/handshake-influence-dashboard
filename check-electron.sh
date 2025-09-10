#!/usr/bin/env bash
set -euo pipefail
echo "=== Pré-contrôles ==="
node -v; npm -v || true
echo "=== Git status ==="
git status --porcelain || true

echo "=== Install deps ==="
npm ci

echo "=== Lint ==="
npx eslint . --ext .js,.ts || true

echo "=== Typecheck ==="
if [ -f tsconfig.json ]; then
  npx tsc --noEmit
else
  echo "pas de TypeScript détecté, skip typecheck"
fi

echo "=== Tests unitaires ==="
if npm run | grep -q " test"; then
  npm test || echo "Tests KO — voir sortie ci-dessus" 
else
  echo "aucun script 'test' trouvé dans package.json"
fi

echo "=== Rebuild natifs ==="
npx electron-rebuild -f || true

echo "=== Build (prod) ==="
if npm run | grep -q " build"; then
  npm run build || echo "Build KO"
else
  echo "aucun script 'build' trouvé"
fi

echo "=== Lancement dev Electron (logs -> electron-dev.log) ==="
export ELECTRON_ENABLE_LOGGING=1
export ELECTRON_ENABLE_STACK_DUMPING=1
export NODE_ENV=development
npx electron . 2>&1 | tee electron-dev.log
