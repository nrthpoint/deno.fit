import React, { useEffect } from "react";

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
  useEffect(() => {
    if (!trackingId) return;

    const script = document.createElement("script");

    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", trackingId);

    return () => {
      document.head.removeChild(script);
    };
  }, [trackingId]);

  return null;
};

export default GoogleAnalytics;
