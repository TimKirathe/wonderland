'use client';

import { useEffect } from 'react';
import { performanceMonitor } from '@/lib/performance';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring is initialized in the lib/performance.ts constructor
    // This component ensures it's loaded on the client side
    
    // Mark when the app becomes interactive
    performanceMonitor.markCustomTiming('app-interactive');
    
    // You can add more custom performance marks here
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}