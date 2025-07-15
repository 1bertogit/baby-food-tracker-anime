import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: Record<string, any>;
  preload?: Array<{
    href: string;
    as: 'script' | 'style' | 'font' | 'image';
    type?: string;
    crossOrigin?: string;
  }>;
}

const DEFAULT_SEO = {
  title: 'Baby Food Tracker - Introdução Alimentar Segura e Prática',
  description: 'Acompanhe a introdução alimentar do seu bebê de forma prática e segura. Cronograma completo, testes de alergia, controle de suplementos e muito mais.',
  keywords: ['baby food', 'introdução alimentar', 'bebê', 'alimentação', 'cronograma', 'alergia', 'suplementos', 'BLW', 'papinha', 'pediatria', 'nutrição infantil'],
  image: 'https://baby-food-tracker.vercel.app/icons/icon-512x512.svg',
  imageAlt: 'Baby Food Tracker - App para introdução alimentar',
  siteName: 'Baby Food Tracker',
  locale: 'pt_BR',
  author: 'Baby Food Tracker Team',
  type: 'website' as const
};

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  imageAlt,
  url,
  type = 'website',
  siteName,
  locale,
  author,
  publishedTime,
  modifiedTime,
  canonical,
  noindex = false,
  nofollow = false,
  structuredData,
  preload = []
}) => {
  let location;
  
  try {
    location = useLocation();
  } catch (error) {
    // If useLocation fails, we're outside Router context
    location = { pathname: '/' };
  }
  
  // Merge with defaults
  const seo = {
    title: title || DEFAULT_SEO.title,
    description: description || DEFAULT_SEO.description,
    keywords: keywords || DEFAULT_SEO.keywords,
    image: image || DEFAULT_SEO.image,
    imageAlt: imageAlt || DEFAULT_SEO.imageAlt,
    url: url || `https://baby-food-tracker.vercel.app${location.pathname}`,
    siteName: siteName || DEFAULT_SEO.siteName,
    locale: locale || DEFAULT_SEO.locale,
    author: author || DEFAULT_SEO.author,
    canonical: canonical || `https://baby-food-tracker.vercel.app${location.pathname}`,
    type
  };

  useEffect(() => {
    // Update document title
    document.title = seo.title;
    
    // Helper function to update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Update basic meta tags
    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords.join(', '));
    updateMetaTag('author', seo.author);
    
    // Update robots meta tag
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow'
    ].join(', ');
    updateMetaTag('robots', robotsContent);
    
    // Update Open Graph tags
    updateMetaTag('og:title', seo.title, true);
    updateMetaTag('og:description', seo.description, true);
    updateMetaTag('og:image', seo.image, true);
    updateMetaTag('og:image:alt', seo.imageAlt, true);
    updateMetaTag('og:url', seo.url, true);
    updateMetaTag('og:type', seo.type, true);
    updateMetaTag('og:site_name', seo.siteName, true);
    updateMetaTag('og:locale', seo.locale, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seo.title);
    updateMetaTag('twitter:description', seo.description);
    updateMetaTag('twitter:image', seo.image);
    updateMetaTag('twitter:image:alt', seo.imageAlt);
    
    // Update article-specific tags
    if (type === 'article') {
      updateMetaTag('og:type', 'article', true);
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
      if (seo.author) {
        updateMetaTag('article:author', seo.author, true);
      }
    }
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonical);
    
    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'dynamic-structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
    // Add preload links
    preload.forEach(resource => {
      const existingLink = document.querySelector(
        `link[rel="preload"][href="${resource.href}"]`
      );
      
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        
        if (resource.type) link.type = resource.type;
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
        
        document.head.appendChild(link);
      }
    });
    
  }, [seo, noindex, nofollow, type, publishedTime, modifiedTime, structuredData, preload]);

  return null; // This component doesn't render anything
};

// Hook for dynamic SEO updates
export function useSEO() {
  const location = useLocation();
  
  const updateSEO = (seoData: Partial<SEOProps>) => {
    // This would trigger a re-render of SEOHead component
    // In a real app, you might use a context or state management
    console.log('SEO updated:', seoData);
  };
  
  const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };
  
  const generateArticleStructuredData = (article: {
    title: string;
    description: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    image?: string;
  }) => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "datePublished": article.publishedTime,
      "dateModified": article.modifiedTime || article.publishedTime,
      "image": article.image,
      "publisher": {
        "@type": "Organization",
        "name": "Baby Food Tracker",
        "logo": {
          "@type": "ImageObject",
          "url": "https://baby-food-tracker.vercel.app/icons/icon-512x512.svg"
        }
      }
    };
  };
  
  const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };
  
  return {
    updateSEO,
    generateBreadcrumbStructuredData,
    generateArticleStructuredData,
    generateFAQStructuredData,
    currentPath: location.pathname
  };
}

// Common SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Baby Food Tracker - Introdução Alimentar Segura e Prática',
    description: 'Acompanhe a introdução alimentar do seu bebê de forma prática e segura. Cronograma completo, testes de alergia, controle de suplementos e muito mais.',
    keywords: ['baby food', 'introdução alimentar', 'bebê', 'alimentação', 'cronograma', 'alergia', 'suplementos', 'BLW', 'papinha', 'pediatria', 'nutrição infantil']
  },
  
  foods: {
    title: 'Alimentos para Bebês - Cronograma de Introdução Alimentar',
    description: 'Descubra quais alimentos introduzir para seu bebê e quando. Cronograma completo com idades recomendadas e dicas de segurança.',
    keywords: ['alimentos bebê', 'cronograma alimentar', 'introdução alimentar', 'primeiros alimentos', 'nutrição infantil']
  },
  
  schedule: {
    title: 'Cronograma de Introdução Alimentar - Baby Food Tracker',
    description: 'Cronograma personalizado para introdução alimentar do seu bebê. Acompanhe o progresso e receba lembretes importantes.',
    keywords: ['cronograma alimentar', 'introdução alimentar', 'planejamento alimentar', 'bebê 6 meses', 'primeiros alimentos']
  },
  
  allergies: {
    title: 'Testes de Alergia Alimentar - Introdução Segura',
    description: 'Aprenda como fazer testes de alergia alimentar seguros durante a introdução alimentar. Dicas e orientações importantes.',
    keywords: ['alergia alimentar', 'teste alergia', 'introdução segura', 'reações alérgicas', 'segurança alimentar bebê']
  }
}; 