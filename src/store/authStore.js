import { create } from "zustand";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,

  initialize: async () => {
    if (!isSupabaseConfigured()) {
      set({ loading: false });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      set({ 
        user: session.user, 
        profile,
        isAdmin: profile?.role === "admin",
        loading: false 
      });
    } else {
      set({ loading: false });
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        set({ 
          user: session.user, 
          profile,
          isAdmin: profile?.role === "admin"
        });
      } else {
        set({ user: null, profile: null, isAdmin: false });
      }
    });
  },

  signUp: async (email, password, fullName) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (!error && data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: "student"
      });
    }

    return { data, error };
  },

  signIn: async (email, password) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  },

  signOut: async () => {
    if (!isSupabaseConfigured()) return;
    await supabase.auth.signOut();
    set({ user: null, profile: null, isAdmin: false });
  }
}));
