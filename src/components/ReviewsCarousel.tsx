"use client";

import { useState, useEffect, useRef } from "react";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

interface Review {
  id: string;
  text: string;
  parent_name: string;
  date: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
  loading: boolean;
  error: boolean;
}

export default function ReviewsCarousel({ reviews, loading, error }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const reviewsPerPage = 1; // Always focus on single card
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalPages = reviews.length; // Each review is now a page

  // Reset to first page when reviews change
  useEffect(() => {
    setCurrentIndex(0);
  }, [reviews]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    
    // Pause auto-scroll on manual navigation
    setIsPaused(true);
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    // Pause auto-scroll on manual navigation
    setIsPaused(true);
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      // Loop back to first review when reaching the end
      return nextIndex < reviews.length ? nextIndex : 0;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const goToPage = (pageIndex: number) => {
    if (isTransitioning) return;
    
    // Pause auto-scroll on manual navigation
    setIsPaused(true);
    
    setIsTransitioning(true);
    setCurrentIndex(pageIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const currentPage = currentIndex + 1;
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex >= reviews.length - 1;

  // Calculate transform distance to center the active card
  const getTransformDistance = () => {
    if (typeof window !== 'undefined' && carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const gap = 48; // Increased gap for better spacing
      const cardWidth = window.innerWidth >= 768 
        ? Math.min(400, containerWidth * 0.5) // Desktop: 50% of container or 400px max
        : containerWidth - 64; // Mobile: full width minus padding
      
      // Center the active card
      const centerOffset = (containerWidth - cardWidth) / 2;
      const cardOffset = currentIndex * (cardWidth + gap);
      
      return centerOffset - cardOffset;
    }
    return 0;
  };

  // Force re-render on window resize to update transform calculations
  useEffect(() => {
    const handleResize = () => {
      // Force re-render by updating state
      setCurrentIndex((prev) => prev);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    // Only auto-scroll if not paused, not loading/error, and have multiple reviews
    if (!isPaused && !loading && !error && reviews.length > 1) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Loop back to first review when reaching the end
          return nextIndex < reviews.length ? nextIndex : 0;
        });
      }, 10000); // 10 seconds

      // Cleanup interval on unmount or when dependencies change
      return () => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      };
    }
  }, [isPaused, loading, error, reviews.length]);

  return (
    <div 
      className="relative overflow-hidden" 
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Reviews Container with Sliding Animation */}
      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">Unable to load reviews at the moment.</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="relative" style={{ perspective: '1200px' }}>
            {/* Sliding Container with 3D perspective */}
            <div 
              className="flex gap-12 transition-all duration-700 will-change-transform"
              style={{
                transform: `translateX(${getTransformDistance()}px)`,
                transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {reviews.map((review, index) => {
                const distance = Math.abs(index - currentIndex);
                const isActive = index === currentIndex;
                const isAdjacent = distance === 1;
                const isVisible = distance <= 2;
                
                // Calculate dynamic styling based on position
                const getCardStyle = () => {
                  if (isActive) {
                    return {
                      opacity: 1,
                      transform: 'scale(1.1) translateZ(0)',
                      zIndex: 30,
                    };
                  } else if (isAdjacent) {
                    return {
                      opacity: 0.7,
                      transform: 'scale(0.85) translateZ(-50px)',
                      zIndex: 20,
                    };
                  } else if (isVisible) {
                    return {
                      opacity: 0.3,
                      transform: 'scale(0.7) translateZ(-100px)',
                      zIndex: 10,
                    };
                  } else {
                    return {
                      opacity: 0,
                      transform: 'scale(0.6) translateZ(-150px)',
                      zIndex: 0,
                    };
                  }
                };
                
                return (
                  <div
                    key={review.id}
                    className="flex-shrink-0 transition-all duration-700 ease-out"
                    style={{
                      width: window.innerWidth >= 768 ? '400px' : 'calc(100vw - 64px)',
                      ...getCardStyle(),
                    }}
                  >
                    <ReviewCard
                      text={review.text}
                      parentName={review.parent_name}
                      date={review.date}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </div>
            
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/70">No reviews available yet.</p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {!loading && !error && reviews.length > reviewsPerPage && (
        <div className="flex items-center justify-center mt-8 space-x-4">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={isFirstPage || isTransitioning}
            className={`p-3 rounded-full transition-all card-shadow transform ${
              isFirstPage || isTransitioning
                ? "bg-foreground/10 text-foreground/30 cursor-not-allowed scale-90" 
                : "bg-primary/10 hover:bg-primary/20 text-primary hover:scale-110 active:scale-95"
            }`}
            aria-label="Previous reviews"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page Indicator */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                disabled={isTransitioning}
                className={`rounded-full transition-all duration-300 transform ${
                  currentPage === i + 1
                    ? "bg-primary w-8 h-3 scale-100"
                    : "bg-foreground/20 hover:bg-foreground/30 w-3 h-3 hover:scale-110"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isLastPage || isTransitioning}
            className={`p-3 rounded-full transition-all card-shadow transform ${
              isLastPage || isTransitioning
                ? "bg-foreground/10 text-foreground/30 cursor-not-allowed scale-90" 
                : "bg-primary/10 hover:bg-primary/20 text-primary hover:scale-110 active:scale-95"
            }`}
            aria-label="Next reviews"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}