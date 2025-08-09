interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
  };
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

class ErrorTracker {
  captureException(error: Error, context?: ErrorContext) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error captured:', error, context);
      return;
    }

    // Track error with DataFast in production
    if (typeof window !== 'undefined' && window.datafast) {
      window.datafast.push(['trackEvent', 'error', {
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...context?.extra,
        tags: JSON.stringify(context?.tags || {}),
      }]);
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}]:`, message, context);
      return;
    }

    // Track message with DataFast in production
    if (typeof window !== 'undefined' && window.datafast) {
      window.datafast.push(['trackEvent', `log_${level}`, {
        message,
        url: window.location.href,
        ...context?.extra,
        tags: JSON.stringify(context?.tags || {}),
      }]);
    }
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