import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: 'script' | 'style' | 'font' | 'image' | 'fetch' | 'document';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
  integrity?: string;
}

interface ResourcePreloaderProps {
  resources: PreloadResource[];
  priority?: 'high' | 'low' | 'auto';
  onLoad?: (resource: PreloadResource) => void;
  onError?: (resource: PreloadResource, error: Error) => void;
}

export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  resources,
  priority = 'auto',
  onLoad,
  onError
}) => {
  useEffect(() => {
    const preloadedElements: HTMLLinkElement[] = [];
    
    resources.forEach(resource => {
      // Check if resource is already preloaded
      const existingLink = document.querySelector(
        `link[rel="preload"][href="${resource.href}"]`
      );
      
      if (existingLink) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      if (resource.media) link.media = resource.media;
      if (resource.integrity) link.integrity = resource.integrity;
      
      // Set priority if supported
      if ('fetchPriority' in link) {
        (link as any).fetchPriority = priority;
      }
      
      // Add event listeners
      link.addEventListener('load', () => {
        onLoad?.(resource);
      });
      
      link.addEventListener('error', () => {
        onError?.(resource, new Error(`Failed to preload ${resource.href}`));
      });
      
      document.head.appendChild(link);
      preloadedElements.push(link);
    });
    
    // Cleanup function
    return () => {
      preloadedElements.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [resources, priority, onLoad, onError]);
  
  return null; // This component doesn't render anything
};

// Hook for dynamic resource preloading
export function useResourcePreloader() {
  const preloadResource = (resource: PreloadResource) => {
    const existingLink = document.querySelector(
      `link[rel="preload"][href="${resource.href}"]`
    );
    
    if (existingLink) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) link.type = resource.type;
    if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
    if (resource.media) link.media = resource.media;
    if (resource.integrity) link.integrity = resource.integrity;
    
    document.head.appendChild(link);
    
    return link;
  };
  
  const preloadScript = (src: string, options?: { 
    type?: string; 
    crossOrigin?: string; 
    integrity?: string;
  }) => {
    return preloadResource({
      href: src,
      as: 'script',
      type: options?.type || 'text/javascript',
      crossOrigin: options?.crossOrigin as any,
      integrity: options?.integrity
    });
  };
  
  const preloadStyle = (href: string, options?: { 
    media?: string; 
    crossOrigin?: string; 
    integrity?: string;
  }) => {
    return preloadResource({
      href,
      as: 'style',
      type: 'text/css',
      media: options?.media,
      crossOrigin: options?.crossOrigin as any,
      integrity: options?.integrity
    });
  };
  
  const preloadFont = (href: string, options?: { 
    type?: string; 
    crossOrigin?: string;
  }) => {
    return preloadResource({
      href,
      as: 'font',
      type: options?.type || 'font/woff2',
      crossOrigin: options?.crossOrigin as any || 'anonymous'
    });
  };
  
  const preloadImage = (src: string, options?: { 
    crossOrigin?: string;
  }) => {
    return preloadResource({
      href: src,
      as: 'image',
      crossOrigin: options?.crossOrigin as any
    });
  };
  
  const preloadFetch = (url: string, options?: { 
    crossOrigin?: string;
  }) => {
    return preloadResource({
      href: url,
      as: 'fetch',
      crossOrigin: options?.crossOrigin as any || 'anonymous'
    });
  };
  
  return {
    preloadResource,
    preloadScript,
    preloadStyle,
    preloadFont,
    preloadImage,
    preloadFetch
  };
}

// Common preload configurations
export const commonPreloads = {
  // Critical fonts
  fonts: [
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      as: 'font' as const,
      type: 'font/woff2',
      crossOrigin: 'anonymous' as const
    }
  ],
  
  // Critical images
  images: [
    {
      href: '/icons/icon-192x192.svg',
      as: 'image' as const,
      type: 'image/svg+xml'
    }
  ],
  
  // API endpoints that might be needed
  api: [
    {
      href: '/api/foods',
      as: 'fetch' as const,
      crossOrigin: 'anonymous' as const
    }
  ]
}; 