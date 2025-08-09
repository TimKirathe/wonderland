'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    datafast?: (goalName: string, properties?: Record<string, string>) => void;
  }
}

export function useDataFast() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.datafast === 'function') {
      // Convert properties to strings as required by DataFast
      const stringProperties: Record<string, string> = {};
      if (properties) {
        Object.entries(properties).forEach(([key, value]) => {
          // Ensure key follows DataFast rules: lowercase, max 32 chars
          const cleanKey = key.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0, 32);
          // Convert value to string, max 255 chars
          stringProperties[cleanKey] = String(value).slice(0, 255);
        });
      }
      // Call DataFast with the correct API
      window.datafast(eventName.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0, 32), stringProperties);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('DataFast Event:', eventName, properties);
    }
  }, []);

  const trackFormSubmission = useCallback((formName: string, success: boolean) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success,
    });
  }, [trackEvent]);

  const trackEnrollmentInquiry = useCallback((programType?: string) => {
    trackEvent('enrollment_inquiry', {
      program: programType,
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  const trackContactRequest = useCallback(() => {
    trackEvent('contact_request', {
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  const trackSocialClick = useCallback((platform: string) => {
    trackEvent('social_click', {
      platform: platform,
    });
  }, [trackEvent]);

  const trackDownload = useCallback((fileName: string) => {
    trackEvent('download', {
      file: fileName,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackFormSubmission,
    trackEnrollmentInquiry,
    trackContactRequest,
    trackSocialClick,
    trackDownload,
  };
}