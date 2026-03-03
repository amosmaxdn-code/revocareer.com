"use client";

import { useEffect } from 'react';

export const VisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('/api/visit-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: window.location.href,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        console.error('Visit tracking failed:', error);
      }
    };

    trackVisit();
  }, []);

  return null; // This component doesn't render anything
};
