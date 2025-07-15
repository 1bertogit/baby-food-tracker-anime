# Guia de SEO - Baby Food Tracker

## Visão Geral

O sistema de SEO do Baby Food Tracker foi projetado para ser flexível, performático e fácil de usar. Ele inclui componentes para gerenciar meta tags, dados estruturados, preloads e otimizações de performance.

## Componentes Disponíveis

### 1. SEOHead - Componente Principal

```tsx
import { SEOHead } from '@/components/seo/SEOHead';

<SEOHead
  title="Título da Página"
  description="Descrição da página"
  keywords={['palavra1', 'palavra2']}
  type="website" // ou "article"
  structuredData={schemaData}
/>
```

### 2. StaticSEOHead - Sem Router

Para uso fora do contexto do React Router:

```tsx
import { StaticSEOHead } from '@/components/seo/StaticSEOHead';

<StaticSEOHead
  title="Título"
  description="Descrição"
  url="https://exemplo.com/pagina"
  canonical="https://exemplo.com/pagina"
/>
```

### 3. PageSEO - Configurações Pré-definidas

```tsx
import { PageSEO } from '@/components/seo/PageSEO';

<PageSEO 
  page="home" // "home" | "foods" | "schedule" | "allergies"
  customTitle="Título Personalizado (opcional)"
/>
```

### 4. ResourcePreloader - Preload de Recursos

```tsx
import { ResourcePreloader } from '@/components/seo/ResourcePreloader';

<ResourcePreloader
  resources={[
    { href: '/font.woff2', as: 'font', type: 'font/woff2' },
    { href: '/image.jpg', as: 'image' }
  ]}
  priority="high"
/>
```

### 5. SEOBreadcrumb - Breadcrumbs com SEO

```tsx
import { SEOBreadcrumb } from '@/components/seo/PageSEO';

<SEOBreadcrumb
  items={[
    { name: 'Home', href: '/' },
    { name: 'Alimentos', href: '/foods' },
    { name: 'Frutas', href: '/foods/fruits' }
  ]}
/>
```

## Hooks Disponíveis

### 1. useSEO - Gerenciamento Dinâmico

```tsx
import { useSEO } from '@/components/seo/SEOHead';

const { 
  updateSEO, 
  generateBreadcrumbStructuredData,
  generateArticleStructuredData,
  generateFAQStructuredData 
} = useSEO();

// Atualizar SEO dinamicamente
updateSEO({
  title: 'Novo Título',
  description: 'Nova descrição'
});

// Gerar dados estruturados
const breadcrumbData = generateBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Página', url: '/page' }
]);
```

### 2. usePageSEO - SEO por Página

```tsx
import { usePageSEO } from '@/components/seo/PageSEO';

const { updatePageSEO, defaultConfig } = usePageSEO('home');

// Atualizar SEO da página
const newSEO = updatePageSEO({
  title: 'Título Personalizado',
  keywords: ['nova', 'palavra-chave']
});
```

### 3. useResourcePreloader - Preload Dinâmico

```tsx
import { useResourcePreloader } from '@/components/seo/ResourcePreloader';

const { 
  preloadScript, 
  preloadStyle, 
  preloadFont, 
  preloadImage 
} = useResourcePreloader();

// Preload de recursos
preloadScript('/script.js');
preloadFont('/font.woff2', { crossOrigin: 'anonymous' });
preloadImage('/image.jpg');
```

## Configurações Pré-definidas

### seoConfigs

```tsx
import { seoConfigs } from '@/components/seo/SEOHead';

// Configurações disponíveis:
// - seoConfigs.home
// - seoConfigs.foods
// - seoConfigs.schedule
// - seoConfigs.allergies
```

### commonPreloads

```tsx
import { commonPreloads } from '@/components/seo/ResourcePreloader';

// Preloads comuns:
// - commonPreloads.fonts
// - commonPreloads.images
// - commonPreloads.api
```

## Dados Estruturados (Schema.org)

### Artigo

```tsx
const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título do Artigo",
  "description": "Descrição do artigo",
  "author": {
    "@type": "Person",
    "name": "Autor"
  },
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-02"
};

<SEOHead structuredData={articleData} />
```

### FAQ

```tsx
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pergunta 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resposta 1"
      }
    }
  ]
};
```

### Breadcrumb

```tsx
const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://exemplo.com/"
    }
  ]
};
```

## Boas Práticas

### 1. Hierarquia de Componentes

```tsx
// ✅ Correto - SEOHead dentro do Router
<Router>
  <SEOHead />
  <Routes>...</Routes>
</Router>

// ❌ Incorreto - SEOHead fora do Router
<SEOHead />
<Router>
  <Routes>...</Routes>
</Router>
```

### 2. Preload de Recursos Críticos

```tsx
// ✅ Preload recursos críticos no App
<ResourcePreloader
  resources={[...commonPreloads.fonts, ...commonPreloads.images]}
  priority="high"
/>
```

### 3. SEO Específico por Página

```tsx
// ✅ Use PageSEO para páginas padrão
<PageSEO page="home" />

// ✅ Use SEOHead para páginas customizadas
<SEOHead
  title="Página Específica"
  description="Descrição específica"
  type="article"
/>
```

### 4. Dados Estruturados

```tsx
// ✅ Sempre inclua dados estruturados relevantes
<SEOHead
  title="Artigo"
  structuredData={generateArticleStructuredData({
    title: "Artigo",
    description: "Descrição",
    author: "Autor",
    publishedTime: "2024-01-01"
  })}
/>
```

## Otimizações de Performance

### 1. Lazy Loading

```tsx
// Componentes são carregados sob demanda
const LazyComponent = lazy(() => import('./Component'));

<Suspense fallback={<LazyLoader />}>
  <LazyComponent />
</Suspense>
```

### 2. Code Splitting

O Vite está configurado para dividir automaticamente:
- `vendor`: React, React DOM
- `ui`: Componentes UI (Radix, Lucide)
- `forms`: Validação (Zod)
- `utils`: Utilitários (clsx, tailwind-merge)

### 3. Preload Inteligente

```tsx
// Preload apenas recursos críticos
<ResourcePreloader
  resources={criticalResources}
  priority="high"
/>

// Preload recursos secundários
<ResourcePreloader
  resources={secondaryResources}
  priority="low"
/>
```

## Monitoramento e Análise

### Scripts Disponíveis

```bash
# Análise de bundle
npm run perf:bundle

# Build com análise
npm run build:analyze

# Lighthouse
npm run perf:lighthouse
```

### Métricas Importantes

- **Bundle Total**: < 2MB
- **JavaScript**: < 1MB
- **CSS**: < 200KB
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## Troubleshooting

### Erro: useLocation() fora do Router

```tsx
// ❌ Problema
<SEOHead /> // Fora do Router

// ✅ Solução 1
<Router>
  <SEOHead />
</Router>

// ✅ Solução 2
<StaticSEOHead /> // Não depende do Router
```

### Meta Tags Não Atualizando

```tsx
// ✅ Certifique-se de que o componente está sendo re-renderizado
useEffect(() => {
  // Força atualização quando dados mudam
}, [title, description]);
```

### Preloads Duplicados

```tsx
// ✅ O sistema verifica automaticamente duplicatas
const existingLink = document.querySelector(
  `link[rel="preload"][href="${href}"]`
);
```

## Exemplo Completo

```tsx
import { FC } from 'react';
import { PageSEO } from '@/components/seo/PageSEO';
import { SEOBreadcrumb } from '@/components/seo/PageSEO';
import { ResourcePreloader } from '@/components/seo/ResourcePreloader';

const FoodsPage: FC = () => {
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Alimentos', href: '/foods' }
  ];

  const pageResources = [
    { href: '/foods-data.json', as: 'fetch' as const },
    { href: '/foods-bg.jpg', as: 'image' as const }
  ];

  return (
    <>
      <PageSEO page="foods" />
      <SEOBreadcrumb items={breadcrumbItems} />
      <ResourcePreloader resources={pageResources} />
      
      <main>
        <h1>Alimentos para Bebês</h1>
        {/* Conteúdo da página */}
      </main>
    </>
  );
};

export default FoodsPage;
```

Este sistema fornece uma base sólida para SEO e performance, sendo flexível o suficiente para diferentes necessidades do projeto. 