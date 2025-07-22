"use client";

import { useState, useEffect } from "react";
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
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Reset to first page when reviews change
  useEffect(() => {
    setCurrentIndex(0);
  }, [reviews]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - reviewsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(reviews.length - reviewsPerPage, prev + reviewsPerPage));
  };

  const currentReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);
  const currentPage = Math.floor(currentIndex / reviewsPerPage) + 1;
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex + reviewsPerPage >= reviews.length;

  return (
    <div className="relative">
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <>
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </>
        ) : error ? (
          <div className="col-span-3 text-center">
            <p className="text-foreground/70">Unable to load reviews at the moment.</p>
          </div>
        ) : reviews.length > 0 ? (
          currentReviews.map((review) => (
            <ReviewCard
              key={review.id}
              text={review.text}
              parentName={review.parent_name}
              date={review.date}
            />
          ))
        ) : (
          <div className="col-span-3 text-center">
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
            disabled={isFirstPage}
            className={`p-3 rounded-full transition-all card-shadow ${
              isFirstPage 
                ? "bg-foreground/10 text-foreground/30 cursor-not-allowed" 
                : "bg-primary/10 hover:bg-primary/20 text-primary transform hover:scale-110"
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
                onClick={() => setCurrentIndex(i * reviewsPerPage)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i + 1
                    ? "bg-primary w-8"
                    : "bg-foreground/20 hover:bg-foreground/30"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isLastPage}
            className={`p-3 rounded-full transition-all card-shadow ${
              isLastPage 
                ? "bg-foreground/10 text-foreground/30 cursor-not-allowed" 
                : "bg-primary/10 hover:bg-primary/20 text-primary transform hover:scale-110"
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