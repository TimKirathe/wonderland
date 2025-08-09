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
    if (typeof window !== 'undefined' && typeof window.datafast === 'function') {
      window.datafast('error', {
        message: error.message?.slice(0, 255) || '',
        stack: error.stack?.slice(0, 255) || '',
        url: window.location.href.slice(0, 255),
        user_agent: navigator.userAgent.slice(0, 255),
        tags: JSON.stringify(context?.tags || {}).slice(0, 255),
      });
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}]:`, message, context);
      return;
    }

    // Track message with DataFast in production
    if (typeof window !== 'undefined' && typeof window.datafast === 'function') {
      window.datafast(`log_${level}`, {
        message: message.slice(0, 255),
        url: window.location.href.slice(0, 255),
        tags: JSON.stringify(context?.tags || {}).slice(0, 255),
      });
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