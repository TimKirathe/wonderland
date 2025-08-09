interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
  };
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

class ErrorTracker {
  private dsn: string | undefined;
  private enabled: boolean;

  constructor() {
    this.dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    this.enabled = !!this.dsn && process.env.NODE_ENV === 'production';
  }

  captureException(error: Error, context?: ErrorContext) {
    if (!this.enabled) {
      console.error('Error captured (Sentry disabled):', error);
      return;
    }

    // In production, this would send to Sentry
    // For now, we'll structure the error data properly
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      ...context,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorData);
    }

    // Send to monitoring endpoint
    this.sendToMonitoring(errorData);
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
    if (!this.enabled) {
      console.log(`Message captured (Sentry disabled) [${level}]:`, message);
      return;
    }

    const messageData = {
      message,
      level,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      ...context,
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('Message tracked:', messageData);
    }

    this.sendToMonitoring(messageData);
  }

  setUser(user: { id?: string; email?: string }) {
    // Store user context for future error reports
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('errorTrackerUser', JSON.stringify(user));
    }
  }

  clearUser() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('errorTrackerUser');
    }
  }

  private async sendToMonitoring(data: any) {
    // Only send in production when DSN is configured
    if (!this.enabled) return;

    try {
      // This would normally send to Sentry
      // For now, we'll send to a custom endpoint that can be configured later
      const response = await fetch('/api/monitoring/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Failed to send error to monitoring');
      }
    } catch (err) {
      console.error('Error sending to monitoring:', err);
    }
  }
}

export const errorTracker = new ErrorTracker();

// Global error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorTracker.captureException(new Error(event.message), {
      extra: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.captureException(new Error(`Unhandled Promise Rejection: ${event.reason}`));
  });
}