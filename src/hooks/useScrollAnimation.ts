import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animateOnce?: boolean;
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  animateOnce = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is available (not in SSR)
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: show content immediately if IntersectionObserver is not available
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only animate on downward scroll and if not already animated
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            setIsVisible(true);
            if (animateOnce) {
              hasAnimatedRef.current = true;
              observer.unobserve(element);
            }
          } else if (!animateOnce && !entry.isIntersecting) {
            // Reset for re-animation if animateOnce is false
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, animateOnce]);

  return { ref, isVisible };
}