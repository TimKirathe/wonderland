"use client";

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideRight' | 'slideLeft' | 'bounceIn' | 'scaleRotate' | 'expandCenter' | 'pulse' | 'slideDownRight' | 'cascadeUp' | 'zoomFade' | 'slideRotateLeft' | 'popIn' | 'floatUp' | 'driftIn' | 'spiralIn' | 'slideInBounce' | 'expandUp' | 'slideUp' | 'fadeSlideUp';
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
    const useEaseIn = ['scaleRotate', 'expandCenter', 'pulse', 'popIn', 'spiralIn', 'expandUp'].includes(animation);
    const useEaseInOut = ['floatUp', 'driftIn'].includes(animation);
    const useBounce = ['slideInBounce'].includes(animation);
    const baseClasses = `transition-all duration-700 ${useBounce ? 'ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]' : useEaseIn ? 'ease-in' : useEaseInOut ? 'ease-in-out' : 'ease-out'}`;
    
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
      zoomFade: {
        initial: 'opacity-0 scale-110',
        animate: 'opacity-100 scale-100',
      },
      slideRotateLeft: {
        initial: 'opacity-0 -translate-x-16 -rotate-2',
        animate: 'opacity-100 translate-x-0 rotate-0',
      },
      popIn: {
        initial: 'opacity-0 scale-50',
        animate: 'opacity-100 scale-100',
      },
      floatUp: {
        initial: 'opacity-0 translate-y-16 translate-x-2',
        animate: 'opacity-100 translate-y-0 translate-x-0',
      },
      driftIn: {
        initial: 'opacity-0 translate-x-20 rotate-1',
        animate: 'opacity-100 translate-x-0 rotate-0',
      },
      spiralIn: {
        initial: 'opacity-0 scale-0 rotate-180',
        animate: 'opacity-100 scale-100 rotate-0',
      },
      slideInBounce: {
        initial: 'opacity-0 -translate-x-12',
        animate: 'opacity-100 translate-x-0',
      },
      expandUp: {
        initial: 'opacity-0 scale-y-0 translate-y-8',
        animate: 'opacity-100 scale-y-100 translate-y-0',
      },
      slideUp: {
        initial: 'opacity-0 translate-y-12',
        animate: 'opacity-100 translate-y-0',
      },
      fadeSlideUp: {
        initial: 'opacity-0 translate-y-6',
        animate: 'opacity-100 translate-y-0',
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