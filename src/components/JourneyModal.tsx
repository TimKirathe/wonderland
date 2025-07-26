"use client";

import { useState } from "react";
import Modal from "./Modal";
import JourneyForm from "./JourneyForm";

interface ChildInfo {
  childName: string;
  dateOfBirth: string;
  program: string;
  specialNeeds: string;
  previousSchool: string;
}

interface FormData {
  parentName: string;
  email: string;
  phone: string;
  relationship: string;
  children: ChildInfo[];
  preferredStartDate: string;
  howHeard: string;
  message: string;
}

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JourneyModal({ isOpen, onClose }: JourneyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    // Reset state when closing
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }
      
      console.log("Form submitted successfully:", result);
      setIsSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    } finally {
      if (!error) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Start Your Journey with Wonderland"
    >
      {!isSuccess ? (
        <>
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-3xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-medium font-secondary">Submitting your application...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-red-800 font-medium font-secondary">Error submitting application</p>
                  <p className="text-sm text-red-700 mt-1 font-secondary">{error}</p>
                </div>
              </div>
            </div>
          )}
          <JourneyForm onSubmit={handleSubmit} onClose={handleClose} />
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
          <h3 className="text-2xl font-semibold mb-4 font-primary">Application Submitted!</h3>
          <p className="text-foreground/70 mb-2 font-secondary">
            Thank you for your interest in Wonderland Early Years & Prep School.
          </p>
          <p className="text-foreground/70 font-secondary">
            We&apos;ll review your application and contact you within 2-3 business days.
          </p>
        </div>
      )}
    </Modal>
  );
}