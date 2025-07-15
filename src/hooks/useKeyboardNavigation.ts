import { useEffect, useRef, KeyboardEvent } from 'react';

interface UseKeyboardNavigationProps {
  items: string[];
  activeItem: string;
  onItemChange: (item: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

export function useKeyboardNavigation({
  items,
  activeItem,
  onItemChange,
  orientation = 'horizontal'
}: UseKeyboardNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = items.indexOf(activeItem);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    let newIndex = activeIndex;

    switch (key) {
      case 'ArrowRight':
        if (orientation === 'horizontal') {
          event.preventDefault();
          newIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          event.preventDefault();
          newIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
        }
        break;
      case 'ArrowDown':
        if (orientation === 'vertical') {
          event.preventDefault();
          newIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
        }
        break;
      case 'ArrowUp':
        if (orientation === 'vertical') {
          event.preventDefault();
          newIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== activeIndex) {
      onItemChange(items[newIndex]);
    }
  };

  // Focus management
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const activeButton = container.querySelector(`[data-tab-id="${activeItem}"]`) as HTMLButtonElement;
      if (activeButton && document.activeElement !== activeButton) {
        activeButton.focus();
      }
    }
  }, [activeItem]);

  return {
    containerRef,
    handleKeyDown,
    activeIndex
  };
} 