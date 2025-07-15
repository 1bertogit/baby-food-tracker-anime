import { useEffect } from 'react';

interface StaticSEOProps {
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
  type: 'website' as const,
  url: 'https://baby-food-tracker.vercel.app/',
  canonical: 'https://baby-food-tracker.vercel.app/'
};

export const StaticSEOHead: React.FC<StaticSEOProps> = ({
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
  // Merge with defaults
  const seo = {
    title: title || DEFAULT_SEO.title,
    description: description || DEFAULT_SEO.description,
    keywords: keywords || DEFAULT_SEO.keywords,
    image: image || DEFAULT_SEO.image,
    imageAlt: imageAlt || DEFAULT_SEO.imageAlt,
    url: url || DEFAULT_SEO.url,
    siteName: siteName || DEFAULT_SEO.siteName,
    locale: locale || DEFAULT_SEO.locale,
    author: author || DEFAULT_SEO.author,
    canonical: canonical || DEFAULT_SEO.canonical,
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