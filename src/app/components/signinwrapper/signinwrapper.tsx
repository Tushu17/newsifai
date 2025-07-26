"use client";

import { useEffect, useState, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import SignupRequestModal from "../ui/signuprequestmodal/signuprequestmodal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SigninWrapperProps {
  children: ReactNode;
}

export default function SigninWrapper({ children }: SigninWrapperProps) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading, true = logged in, false = not logged in
  const [authChecked, setAuthChecked] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
        setAuthChecked(true);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
        setAuthChecked(true);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setAuthChecked(true);

      // Hide modal if user logs in
      if (session && showSignupModal) {
        setShowSignupModal(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [showSignupModal]);

  // Separate effect for the timer to avoid infinite loops
  useEffect(() => {
    if (!authChecked || modalDismissed) return; // Wait for auth check to complete or if modal was dismissed

    if (isLoggedIn === false) {
      const timer = setTimeout(() => {
        setShowSignupModal(true);
      }, 300000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, authChecked, modalDismissed]);

  const handleModalClose = () => {
    setShowSignupModal(false);
    setModalDismissed(true); // Prevent modal from showing again in this session
  };

  return (
    <>
      {children}
      {showSignupModal && (
        <SignupRequestModal onClose={handleModalClose} isOpen={true} />
      )}
    </>
  );
}
