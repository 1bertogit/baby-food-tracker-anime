#!/bin/bash

# Script para abrir o Baby Food Tracker

echo "🚀 Abrindo Baby Food Tracker..."

# Opção 1: Abrir arquivo HTML diretamente
if [ -f "/Users/humbertolopes/PROJETOS/Testes/Baby-App/sbc-cursor-starter-kit/dist/index.html" ]; then
    echo "✅ Abrindo app no navegador..."
    open "/Users/humbertolopes/PROJETOS/Testes/Baby-App/sbc-cursor-starter-kit/dist/index.html"
    echo ""
    echo "📱 App aberto!"
    echo ""
    echo "🎯 Para testar o onboarding:"
    echo "1. Clique em 'Tutorial Completo'"
    echo "2. Ou abra o Console (F12) e digite:"
    echo "   localStorage.removeItem('baby-food-onboarding-completed');"
    echo "   location.reload();"
else
    echo "❌ Arquivo não encontrado. Execute 'npm run build' primeiro."
fi