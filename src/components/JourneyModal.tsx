"use client";

import { useState } from "react";
import Modal from "./Modal";
import JourneyForm from "./JourneyForm";

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JourneyModal({ isOpen, onClose }: JourneyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", formData);
      setIsSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Start Your Journey with Wonderland"
    >
      {!isSuccess ? (
        <>
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-3xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-medium">Submitting your application...</p>
              </div>
            </div>
          )}
          <JourneyForm onSubmit={handleSubmit} onClose={onClose} />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6">
            <svg
              className="h-12 w-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Application Submitted!</h3>
          <p className="text-foreground/70 mb-2">
            Thank you for your interest in Wonderland Early Years & Prep School.
          </p>
          <p className="text-foreground/70">
            We'll review your application and contact you within 2-3 business days.
          </p>
        </div>
      )}
    </Modal>
  );
}