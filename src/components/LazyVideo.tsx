"use client";

import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
}

export default function LazyVideo({
  src,
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
  controls = true,
}: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {isLoading && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-3xl">
          <LoadingSpinner size="lg" color="primary" />
        </div>
      )}
      {isInView ? (
        <video
          ref={videoRef}
          className={className}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          poster={poster}
          preload="metadata"
          onLoadedData={handleLoadedData}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className={`${className} bg-gray-200 rounded-3xl`} />
      )}
    </div>
  );
}