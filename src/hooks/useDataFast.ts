'use client';

import { useCallback } from 'react';

type DataFastEvent = ['trackEvent', string, Record<string, unknown>?];

declare global {
  interface Window {
    datafast?: {
      push: (event: DataFastEvent) => void;
    };
  }
}

export function useDataFast() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.datafast) {
      window.datafast.push(['trackEvent', eventName, properties]);
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