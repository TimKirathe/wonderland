"use client";

import { useEffect } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  parentName: string;
}

export default function ReviewModal({ isOpen, onClose, text, parentName }: ReviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card-bg rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto card-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold">Parent Review</h3>
          <button
            onClick={onClose}
            className="text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Close modal"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-foreground/70 text-lg leading-relaxed">
            &quot;{text}&quot;
          </p>
          <p className="font-semibold text-lg">- {parentName}</p>
        </div>
      </div>
    </div>
  );
}