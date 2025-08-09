"use client";

import { useEffect, useState } from "react";

/**
 * Component for managing screen reader announcements
 * Uses ARIA live regions for dynamic content updates
 */
export default function ScreenReaderAnnouncements() {
  const [announcement, setAnnouncement] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Custom event listener for screen reader announcements
    const handleAnnouncement = (event: CustomEvent) => {
      setAnnouncement(event.detail.message);
      // Clear after announcement is read
      setTimeout(() => setAnnouncement(""), 100);
    };

    const handleStatus = (event: CustomEvent) => {
      setStatusMessage(event.detail.message);
      // Clear after status is read
      setTimeout(() => setStatusMessage(""), 2000);
    };

    window.addEventListener("announce", handleAnnouncement as EventListener);
    window.addEventListener("announceStatus", handleStatus as EventListener);

    return () => {
      window.removeEventListener("announce", handleAnnouncement as EventListener);
      window.removeEventListener("announceStatus", handleStatus as EventListener);
    };
  }, []);

  return (
    <>
      {/* Assertive announcements for important updates */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Polite announcements for status updates */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>
    </>
  );
}

// Utility functions for triggering announcements
export const announceToScreenReader = (message: string, assertive = false) => {
  const eventName = assertive ? "announce" : "announceStatus";
  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail: { message },
    })
  );
};