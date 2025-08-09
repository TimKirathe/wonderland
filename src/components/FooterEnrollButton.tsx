"use client";

import { useEffect } from "react";

export default function FooterEnrollButton() {
  useEffect(() => {
    const handleEnrollClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-enroll-trigger]')) {
        e.preventDefault();
        // Dispatch a custom event that HomeClient can listen to
        window.dispatchEvent(new CustomEvent('openJourneyModal'));
      }
    };

    document.addEventListener('click', handleEnrollClick);
    return () => document.removeEventListener('click', handleEnrollClick);
  }, []);

  return null; // This component only adds event listeners
}