"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiX, FiUser, FiArrowRight } from "react-icons/fi";

// TypeScript interfaces
interface Benefit {
  id: string;
  text: string;
  icon?: string;
}

interface SignupRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  showBenefits?: boolean;
  variant?: "default" | "compact";
}

// Default benefits data
const defaultBenefits: Benefit[] = [
  { id: "1", text: "Personalized news feed" },
  { id: "2", text: "Save and bookmark articles" },
  { id: "3", text: "AI-powered content recommendations" },
];

const SignupRequestModal: React.FC<SignupRequestModalProps> = ({
  isOpen,
  onClose,
  title = "Sign Up — Help Us Help You 🧠",
  message = "When you sign up, we can tailor the news just for you — sharper topics, better niche coverage, and AI that learns what you care about. Plus, it helps us make Newsifai even better for everyone. (No spam, just smart stuff.)",
  showBenefits = false,
  variant = "default",
}) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Store the previously focused element when modal opens
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Trigger animation after a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      // Focus the modal after animation starts
      const focusTimer = setTimeout(() => {
        const modal = modalRef.current;
        if (modal) {
          const firstFocusable = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        clearTimeout(focusTimer);
      };
    } else {
      setIsAnimating(false);
      // Restore body scroll
      document.body.style.overflow = "unset";
      // Return focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        onClose();
      }

      // Focus trap
      if (event.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Check if there are focusable elements
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignupRedirect = async () => {
    if (isNavigating) return;

    try {
      setIsNavigating(true);
      onClose();
      await router.push("/auth/signup");
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback navigation
      window.location.href = "/auth/signup";
    } finally {
      setIsNavigating(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalSizeClass = variant === "compact" ? "max-w-sm" : "max-w-md";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-200 ${
        isAnimating ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0"
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className={`relative w-full ${modalSizeClass} mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300 ease-out ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        role="document"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        {/* Modal content */}
        <div className={variant === "compact" ? "p-6" : "p-8"}>
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <FiUser className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h2
            id="modal-title"
            className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4"
          >
            {title}
          </h2>

          {/* Message */}
          <p
            id="modal-description"
            className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed"
          >
            {message}
          </p>

          {/* Benefits list */}
          {showBenefits && (
            <div className="mb-8 space-y-3">
              {defaultBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignupRedirect}
              disabled={isNavigating}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>
                {isNavigating ? "Redirecting..." : "Create Free Account"}
              </span>
              {!isNavigating && (
                <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
            >
              Maybe Later
            </button>
          </div>

          {/* Footer text */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
            Free forever • No spam • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupRequestModal;
