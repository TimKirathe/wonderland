"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";

interface ReviewCardProps {
  text: string;
  parentName: string;
  date?: string;
}

export default function ReviewCard({ text, parentName }: ReviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const CHARACTER_LIMIT = 200;
  const shouldTruncate = text.length > CHARACTER_LIMIT;
  
  const displayText = shouldTruncate 
    ? `${text.substring(0, CHARACTER_LIMIT)}...` 
    : text;

  return (
    <>
      <div className="bg-card-bg rounded-3xl p-8 card-shadow h-full flex flex-col">
        <div className="flex-grow">
          <p className="text-foreground/70 mb-4">
            &quot;{displayText}&quot;
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors mb-4"
            >
              See More
            </button>
          )}
        </div>
        <p className="font-semibold mt-auto">- {parentName}</p>
      </div>
      
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={text}
        parentName={parentName}
      />
    </>
  );
}