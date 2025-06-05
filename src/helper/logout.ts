"use client";
import { supabase } from "@/libs/utils/supabaseClient";

export async function LogoutUser() {
  const user = localStorage.getItem("myuser");

  if (!user) {
    console.log("there is no user");
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear local storage if used
      localStorage.removeItem("sb-auth-token");
      localStorage.removeItem("myuser");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  handleLogout();
}
