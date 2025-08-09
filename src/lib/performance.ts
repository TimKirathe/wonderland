export interface PerformanceMetrics {
  pageLoad?: number;
  domContentLoaded?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
  timeToInteractive?: number;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Monitor page load times
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.metrics.pageLoad = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        this.reportMetrics();
      }
    });

    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      this.observeWebVitals();
    }

    // Monitor long tasks
    this.observeLongTasks();
  }

  private observeWebVitals() {
    try {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
            this.reportMetrics();
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
        this.reportMetrics();
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as PerformanceEventTiming;
          this.metrics.firstInputDelay = fidEntry.processingStart - fidEntry.startTime;
          this.reportMetrics();
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
            this.metrics.cumulativeLayoutShift = clsValue;
          }
        }
        this.reportMetrics();
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Error setting up performance observers:', e);
    }
  }

  private observeLongTasks() {
    if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name,
          });
          
          // Report long tasks to monitoring
          this.reportLongTask(entry);
        }
      });

      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch {
        // Long task monitoring not supported
      }
    }
  }

  private reportMetrics() {
    // Only report if we have meaningful metrics
    if (Object.keys(this.metrics).length === 0) return;

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', this.metrics);
    }

    // Send to monitoring endpoint
    this.sendToMonitoring();
  }

  private reportLongTask(entry: PerformanceEntry) {
    // Log long tasks in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Long task detected:', {
        duration: entry.duration,
        name: entry.name,
      });
    }
  }

  private async sendToMonitoring() {
    try {
      await fetch('/api/monitoring/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics: this.metrics,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public markCustomTiming(name: string, startMark?: string) {
    if (typeof window !== 'undefined' && 'performance' in window) {
      if (startMark) {
        performance.measure(name, startMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        
        if (measure && process.env.NODE_ENV === 'development') {
          console.log('Custom timing:', {
            name: name,
            duration: Math.round(measure.duration),
          });
        }
      } else {
        performance.mark(name);
      }
    }
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();