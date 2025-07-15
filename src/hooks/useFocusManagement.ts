import { useEffect, useRef, MutableRefObject } from 'react';

interface UseFocusManagementProps {
  isOpen: boolean;
  initialFocusRef?: MutableRefObject<HTMLElement | null>;
  returnFocusRef?: MutableRefObject<HTMLElement | null>;
}

export function useFocusManagement({
  isOpen,
  initialFocusRef,
  returnFocusRef
}: UseFocusManagementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Get all focusable elements within a container
  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors));
  };

  // Trap focus within the container
  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !containerRef.current) return;

    const focusableElements = getFocusableElements(containerRef.current);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  // Handle escape key
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Modal should handle its own closing logic
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Set initial focus
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (containerRef.current) {
        const focusableElements = getFocusableElements(containerRef.current);
        focusableElements[0]?.focus();
      }

      // Add event listeners
      document.addEventListener('keydown', trapFocus);
      document.addEventListener('keydown', handleEscape);

      // Cleanup function
      return () => {
        document.removeEventListener('keydown', trapFocus);
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      // Return focus to previously focused element
      const elementToFocus = returnFocusRef?.current || previouslyFocusedElement.current;
      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }, [isOpen, initialFocusRef, returnFocusRef]);

  return {
    containerRef,
    getFocusableElements
  };
}

// Hook for managing focus announcements
export function useFocusAnnouncement() {
  const announcementRef = useRef<HTMLDivElement>(null);

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
      announcementRef.current.setAttribute('aria-live', priority);
      
      // Clear after announcement
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  const getAnnouncementProps = () => ({
    ref: announcementRef,
    'aria-live': 'polite' as const,
    'aria-atomic': true,
    className: 'sr-only'
  });

  return {
    announce,
    getAnnouncementProps
  };
} 