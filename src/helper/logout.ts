"use client";
import { supabase } from "@/libs/utils/supabaseClient";

export async function LogoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, message: error.message || "Logout failed" };
    }
    // Clear local storage
    localStorage.removeItem("sb-auth-token");
    localStorage.removeItem("myuser");
    localStorage.removeItem("userData");
    return { success: true, message: "Logged out successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Logout failed:", error);
      return { success: false, message: error.message };
    } else {
      console.error("Logout failed:", error);
      return { success: false, message: "Unknown logout error" };
    }
  }
}
