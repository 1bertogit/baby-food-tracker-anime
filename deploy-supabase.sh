#!/bin/bash

# Deploy script para o Baby Food Tracker no Supabase
# Uso: ./deploy-supabase.sh <project-ref>

# Verificar se o projeto foi fornecido
if [ -z "$1" ]; then
  echo "Por favor, forneça o ID do projeto Supabase"
  echo "Uso: ./deploy-supabase.sh <project-ref>"
  exit 1
fi

PROJECT_REF=$1

echo "🚀 Iniciando deploy para o projeto Supabase: $PROJECT_REF"

# Verificar se o Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
  echo "❌ Supabase CLI não encontrado. Instalando..."
  brew install supabase/tap/supabase
fi

# Login no Supabase (se necessário)
echo "🔑 Verificando login no Supabase..."
supabase projects list &> /dev/null || (echo "🔄 Fazendo login no Supabase..." && supabase login)

# Vincular ao projeto
echo "🔗 Vinculando ao projeto Supabase..."
supabase link --project-ref $PROJECT_REF

# Aplicar migrações de banco de dados
echo "💾 Aplicando migrações de banco de dados..."
supabase db push

# Criar bucket de Storage (se ainda não existir)
echo "📦 Verificando buckets de Storage..."
supabase storage list buckets | grep -q "baby-food-tracker-files" || (
  echo "🔄 Criando bucket de Storage..."
  supabase storage create bucket baby-food-tracker-files
)

# Build do frontend
echo "🏗️ Buildando o frontend..."
npm run build

# Exibe instruções finais
echo ""
echo "✅ Deploy preparado com sucesso!"
echo ""
echo "Para finalizar o deploy do frontend, siga um dos métodos abaixo:"
echo ""
echo "📂 OPÇÃO 1: Supabase Hosting (recomendado)"
echo "  1. Acesse https://app.supabase.com/project/$PROJECT_REF/storage/sites"
echo "  2. Clique em 'New Site'"
echo "  3. Faça upload dos arquivos da pasta 'dist/'"
echo ""
echo "🚀 OPÇÃO 2: Vercel/Netlify"
echo "  1. Conecte seu repositório"
echo "  2. Configure as variáveis de ambiente:"
echo "     - VITE_SUPABASE_URL=https://$PROJECT_REF.supabase.co"
echo "     - VITE_SUPABASE_ANON_KEY=(disponível no painel do Supabase)"
echo ""
echo "Para mais informações, consulte o arquivo SUPABASE-DEPLOY.md" 