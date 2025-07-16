# Guia de Deploy no Supabase - Baby Food Tracker

Este documento fornece um guia completo para implantar o Baby Food Tracker no Supabase.

## 1. Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- [Supabase CLI](https://supabase.com/docs/guides/cli) instalada
- Node.js e npm instalados

## 2. Configuração inicial

### 2.1 Login no Supabase CLI

```bash
supabase login
```

### 2.2 Vincular ao projeto

```bash
supabase link --project-ref <id-do-projeto>
```

Substitua `<id-do-projeto>` pelo ID do seu projeto no Supabase.

## 3. Banco de Dados

### 3.1 Aplicar migrações

O esquema do banco de dados está definido no arquivo `supabase/migrations/20250716_initial_schema.sql`. Para aplicar:

```bash
supabase db push
```

Este comando criará as tabelas necessárias com as permissões de Row Level Security apropriadas.

## 4. Autenticação

A autenticação do Supabase já está configurada no projeto. Certifique-se de que a autenticação por e-mail esteja habilitada no seu projeto do Supabase.

## 5. Storage (opcional)

Se você planeja usar o Storage para armazenar imagens ou arquivos:

```bash
supabase storage create bucket baby-food-tracker-files
```

Configure as permissões do bucket conforme necessário no painel de controle do Supabase.

## 6. Deploy do Frontend

### 6.1 Build do projeto

```bash
npm run build
```

Isso gera os arquivos estáticos na pasta `dist/`.

### 6.2 Opção 1: Supabase Hosting

1. Acesse o painel do Supabase, vá em "Storage" e depois em "Sites"
2. Faça upload da pasta `dist/`
3. Configure seu domínio personalizado (se aplicável)

### 6.3 Opção 2: Vercel/Netlify

1. Conecte o repositório ao Vercel ou Netlify
2. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL=https://<id-do-projeto>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=<chave-anônima>`
3. Configure o comando de build: `npm run build`
4. Configure o diretório de publicação: `dist`

## 7. Variáveis de ambiente

O aplicativo usa as seguintes variáveis de ambiente:

- `VITE_SUPABASE_URL`: URL do seu projeto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima para acesso público

## 8. Verificação pós-deploy

Depois de implantar, verifique se:

1. A autenticação está funcionando
2. Os dados são salvos corretamente no banco de dados
3. As políticas de Row Level Security estão funcionando conforme esperado

## 9. Solução de problemas

### 9.1 Erro de CORS

Se ocorrerem erros de CORS, verifique as configurações de CORS no painel do Supabase em:
Settings > API > CORS > Allowed Origins

### 9.2 Problemas de autenticação

Verifique as configurações de autenticação no painel do Supabase em:
Settings > Authentication

### 9.3 Erros de Row Level Security

Verifique as políticas RLS nas tabelas do banco de dados através do SQL Editor.

## 10. Manutenção contínua

Para fazer alterações no esquema do banco de dados:

1. Crie um novo arquivo de migração em `supabase/migrations/`
2. Execute `supabase db push` para aplicar as alterações

## 11. Backup

Configure backups regulares do banco de dados no painel do Supabase em:
Settings > Database > Backups

---

Para suporte adicional, consulte a [documentação do Supabase](https://supabase.com/docs). 