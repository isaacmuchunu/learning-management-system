import { create } from "zustand";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export const useAdminStore = create((set, get) => ({
  users: [],
  stats: {
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    revenue: 0
  },
  loading: false,

  fetchStats: async () => {
    if (!isSupabaseConfigured()) {
      set({
        stats: {
          totalUsers: 1250,
          totalCourses: 8,
          totalEnrollments: 3420,
          revenue: 125000
        }
      });
      return;
    }

    const [users, courses, enrollments] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("courses").select("id", { count: "exact" }),
      supabase.from("enrollments").select("id", { count: "exact" })
    ]);

    set({
      stats: {
        totalUsers: users.count || 0,
        totalCourses: courses.count || 0,
        totalEnrollments: enrollments.count || 0,
        revenue: (enrollments.count || 0) * 450
      }
    });
  },

  fetchUsers: async () => {
    if (!isSupabaseConfigured()) {
      set({
        users: [
          { id: 1, email: "admin@cybershield.com", full_name: "Admin User", role: "admin", created_at: new Date().toISOString() },
          { id: 2, email: "john@example.com", full_name: "John Doe", role: "student", created_at: new Date().toISOString() },
          { id: 3, email: "jane@example.com", full_name: "Jane Smith", role: "student", created_at: new Date().toISOString() }
        ]
      });
      return;
    }

    set({ loading: true });
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    set({ users: data || [], loading: false });
  },

  updateUserRole: async (userId, role) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", userId)
      .select()
      .single();

    if (!error) {
      get().fetchUsers();
    }

    return { data, error };
  }
}));
