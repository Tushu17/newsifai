"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/getinfoData";
import { toast } from "react-toastify";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        router.push("/auth/login");
        return;
      }

      if (data.session && data.session.user) {
        // Store user data in localStorage
        localStorage.setItem(
          "myuser",
          JSON.stringify({
            user_id: data.session.user.id,
            token: data.session.access_token,
            email: data.session.user.email,
          })
        );

        toast.success("Successfully signed in with Google!");
        window.location.replace("/");
      } else {
        router.push("/auth/login");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Completing sign in...
        </p>
      </div>
    </div>
  );
}
