#!/bin/bash

echo "🚀 Iniciando Baby Food Tracker..."

# Kill any existing servers
pkill -f "vite\|node\|python.*server\|serve" 2>/dev/null

# Try different approaches
echo "📡 Tentativa 1: Vite dev server"
if command -v npm &> /dev/null; then
    timeout 5s npm run dev &
    sleep 3
    if curl -s http://localhost:5173 &> /dev/null; then
        echo "✅ Vite funcionando em: http://localhost:5173"
        open http://localhost:5173
        exit 0
    fi
fi

echo "📡 Tentativa 2: Serve (porta 8080)"
if command -v npx &> /dev/null; then
    cd dist
    timeout 5s npx serve . -p 8080 &
    sleep 3
    if curl -s http://localhost:8080 &> /dev/null; then
        echo "✅ Serve funcionando em: http://localhost:8080"
        open http://localhost:8080
        exit 0
    fi
    cd ..
fi

echo "📡 Tentativa 3: Python server (porta 9000)"
if command -v python3 &> /dev/null; then
    cd dist
    timeout 5s python3 -m http.server 9000 &
    sleep 3
    if curl -s http://localhost:9000 &> /dev/null; then
        echo "✅ Python funcionando em: http://localhost:9000"
        open http://localhost:9000
        exit 0
    fi
    cd ..
fi

echo "📡 Tentativa 4: Abrir arquivo diretamente"
if [ -f "dist/index.html" ]; then
    echo "✅ Abrindo arquivo HTML diretamente"
    open dist/index.html
    exit 0
fi

echo "❌ Nenhum servidor funcionou. Verifique sua configuração de rede."