import { useEffect, useState } from 'react';

interface SwipeGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
  maxSwipeTime?: number;
}

interface TouchPosition {
  x: number;
  y: number;
  time: number;
}

export const useSwipeGesture = (element: HTMLElement | null, config: SwipeGestureConfig) => {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null);

  const {
    onSwipeLeft,
    onSwipeRight,
    minSwipeDistance = 50,
    maxSwipeTime = 500
  } = config;

  useEffect(() => {
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      });
      setTouchEnd(null);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchEnd({
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      });
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart.x - touchEnd.x;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      const timeElapsed = touchEnd.time - touchStart.time;
      
      // Check if swipe is fast enough and has minimum distance
      if (timeElapsed <= maxSwipeTime && Math.abs(distance) > minSwipeDistance) {
        // Check if it's more horizontal than vertical
        const verticalDistance = Math.abs(touchStart.y - touchEnd.y);
        const horizontalDistance = Math.abs(distance);
        
        if (horizontalDistance > verticalDistance) {
          if (isLeftSwipe && onSwipeLeft) {
            onSwipeLeft();
          } else if (isRightSwipe && onSwipeRight) {
            onSwipeRight();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, touchStart, touchEnd, onSwipeLeft, onSwipeRight, minSwipeDistance, maxSwipeTime]);

  return { touchStart, touchEnd };
};