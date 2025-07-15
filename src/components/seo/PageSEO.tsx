import { SEOHead, seoConfigs } from './SEOHead';

interface PageSEOProps {
  page: 'home' | 'foods' | 'schedule' | 'allergies';
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  structuredData?: Record<string, any>;
}

export const PageSEO: React.FC<PageSEOProps> = ({
  page,
  customTitle,
  customDescription,
  customKeywords,
  structuredData
}) => {
  const config = seoConfigs[page];
  
  return (
    <SEOHead
      title={customTitle || config.title}
      description={customDescription || config.description}
      keywords={customKeywords || config.keywords}
      structuredData={structuredData}
    />
  );
};

// Hook para facilitar o uso do SEO em páginas
export function usePageSEO(page: 'home' | 'foods' | 'schedule' | 'allergies') {
  const updatePageSEO = (updates: {
    title?: string;
    description?: string;
    keywords?: string[];
    structuredData?: Record<string, any>;
  }) => {
    const config = seoConfigs[page];
    
    // Update document title immediately
    if (updates.title) {
      document.title = updates.title;
    } else {
      document.title = config.title;
    }
    
    // You could also trigger a re-render of PageSEO here
    // In a real app, you might use a context or state management
    return {
      title: updates.title || config.title,
      description: updates.description || config.description,
      keywords: updates.keywords || config.keywords,
      structuredData: updates.structuredData
    };
  };
  
  return {
    updatePageSEO,
    defaultConfig: seoConfigs[page]
  };
}

// Breadcrumb component with SEO
export const SEOBreadcrumb: React.FC<{
  items: Array<{ name: string; href: string }>;
}> = ({ items }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://baby-food-tracker.vercel.app${item.href}`
    }))
  };
  
  return (
    <>
      <SEOHead structuredData={structuredData} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === items.length - 1 ? (
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {item.name}
                </span>
              ) : (
                <a 
                  href={item.href}
                  className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}; 