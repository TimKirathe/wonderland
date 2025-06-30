"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          ref={modalRef}
          className="relative transform overflow-hidden rounded-3xl bg-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
        >
          {/* Header */}
          {title && (
            <div className="bg-primary/5 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold leading-6 text-foreground">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 hover:bg-primary/10 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="px-4 py-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}