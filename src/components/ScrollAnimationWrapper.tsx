"use client";

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideRight' | 'slideLeft' | 'bounceIn' | 'scaleRotate' | 'expandCenter' | 'pulse' | 'slideDownRight' | 'cascadeUp';
  threshold?: number;
}

export default function ScrollAnimationWrapper({
  children,
  delay = 0,
  className = '',
  animation = 'fadeUp',
  threshold = 0.1,
}: ScrollAnimationWrapperProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const getAnimationClasses = () => {
    // Use ease-in for card animations, ease-out for others
    const useEaseIn = ['scaleRotate', 'expandCenter', 'pulse'].includes(animation);
    const baseClasses = `transition-all duration-700 ${useEaseIn ? 'ease-in' : 'ease-out'}`;
    
    const animationVariants = {
      fadeUp: {
        initial: 'opacity-0 translate-y-8',
        animate: 'opacity-100 translate-y-0',
      },
      fadeIn: {
        initial: 'opacity-0',
        animate: 'opacity-100',
      },
      scaleIn: {
        initial: 'opacity-0 scale-95',
        animate: 'opacity-100 scale-100',
      },
      slideRight: {
        initial: 'opacity-0 -translate-x-8',
        animate: 'opacity-100 translate-x-0',
      },
      slideLeft: {
        initial: 'opacity-0 translate-x-8',
        animate: 'opacity-100 translate-x-0',
      },
      bounceIn: {
        initial: 'opacity-0 scale-75',
        animate: 'opacity-100 scale-100',
      },
      scaleRotate: {
        initial: 'opacity-0 scale-90 rotate-3',
        animate: 'opacity-100 scale-100 rotate-0',
      },
      expandCenter: {
        initial: 'opacity-0 scale-0',
        animate: 'opacity-100 scale-100',
      },
      pulse: {
        initial: 'opacity-0 scale-95',
        animate: 'opacity-100 scale-100',
      },
      slideDownRight: {
        initial: 'opacity-0 -translate-x-12 -translate-y-12',
        animate: 'opacity-100 translate-x-0 translate-y-0',
      },
      cascadeUp: {
        initial: 'opacity-0 translate-y-12 scale-95',
        animate: 'opacity-100 translate-y-0 scale-100',
      },
    };

    const variant = animationVariants[animation];
    return `${baseClasses} ${isVisible ? variant.animate : variant.initial}`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}