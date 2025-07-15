import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  src: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function useLazyImage({
  src,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError
}: UseLazyImageOptions) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(imgElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isIntersecting) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isIntersecting, onLoad, onError]);

  return {
    imgRef,
    src: imageSrc,
    isLoading,
    hasError,
    isIntersecting
  };
}

// Hook for lazy loading multiple images
export function useLazyImages(_images: string[], _options?: Omit<UseLazyImageOptions, 'src'>) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  const loadImage = (src: string) => {
    if (loadedImages.has(src) || loadingImages.has(src)) return;

    setLoadingImages(prev => new Set(prev).add(src));

    const img = new Image();
    
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(src));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
      setErrorImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
    };

    img.onerror = () => {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
      setErrorImages(prev => new Set(prev).add(src));
    };

    img.src = src;
  };

  const preloadImages = (imagesToPreload: string[]) => {
    imagesToPreload.forEach(loadImage);
  };

  return {
    loadedImages,
    loadingImages,
    errorImages,
    loadImage,
    preloadImages,
    isLoaded: (src: string) => loadedImages.has(src),
    isLoading: (src: string) => loadingImages.has(src),
    hasError: (src: string) => errorImages.has(src)
  };
} 