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
  const [reviewsPerPage, setReviewsPerPage] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Reset to first page when reviews change
  useEffect(() => {
    setCurrentIndex(0);
  }, [reviews]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(0, prev - reviewsPerPage));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + reviewsPerPage;
      return nextIndex < reviews.length ? nextIndex : prev;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const goToPage = (pageIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(pageIndex * reviewsPerPage);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const currentPage = Math.floor(currentIndex / reviewsPerPage) + 1;
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex + reviewsPerPage >= reviews.length;

  // Calculate transform distance based on viewport
  const getTransformDistance = () => {
    if (typeof window !== 'undefined' && carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const gap = window.innerWidth >= 768 ? 32 : 16; // Responsive gap
      const cardWidth = window.innerWidth >= 768 
        ? (containerWidth - (gap * 2)) / 3 
        : containerWidth - 32; // Mobile padding
      return -(currentIndex * (cardWidth + gap));
    }
    return 0;
  };

  // Set initial reviews per page and handle resize
  useEffect(() => {
    const updateReviewsPerPage = () => {
      const perPage = window.innerWidth < 768 ? 1 : 3;
      setReviewsPerPage(perPage);
      // Adjust current index if needed
      if (currentIndex >= reviews.length) {
        setCurrentIndex(0);
      }
    };

    updateReviewsPerPage();
    window.addEventListener('resize', updateReviewsPerPage);
    return () => window.removeEventListener('resize', updateReviewsPerPage);
  }, [currentIndex, reviews.length]);

  return (
    <div className="relative overflow-hidden" ref={carouselRef}>
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
          <div className="relative">
            {/* Sliding Container */}
            <div 
              className="flex gap-4 md:gap-8 transition-all duration-700 will-change-transform"
              style={{
                transform: `translateX(${getTransformDistance()}px)`,
                transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="w-full md:w-[calc(33.333%-1.333rem)] flex-shrink-0 transition-all duration-500"
                  style={{
                    opacity: index >= currentIndex && index < currentIndex + reviewsPerPage ? 1 : 0.3,
                    transform: index >= currentIndex && index < currentIndex + reviewsPerPage 
                      ? 'scale(1)' 
                      : 'scale(0.95)',
                  }}
                >
                  <ReviewCard
                    text={review.text}
                    parentName={review.parent_name}
                    date={review.date}
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient Overlays for Visual Polish */}
            {currentIndex > 0 && (
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            )}
            {!isLastPage && (
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            )}
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