import { create } from "zustand";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { courses as localCourses } from "../data/courses";

export const useCourseStore = create((set, get) => ({
  courses: localCourses,
  enrollments: [],
  loading: false,

  fetchCourses: async () => {
    if (!isSupabaseConfigured()) {
      set({ courses: localCourses });
      return;
    }

    set({ loading: true });
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      set({ courses: data, loading: false });
    } else {
      set({ courses: localCourses, loading: false });
    }
  },

  fetchEnrollments: async (userId) => {
    if (!isSupabaseConfigured() || !userId) return;

    const { data } = await supabase
      .from("enrollments")
      .select("*, courses(*)")
      .eq("user_id", userId);

    if (data) {
      set({ enrollments: data });
    }
  },

  enrollInCourse: async (userId, courseId) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { data, error } = await supabase
      .from("enrollments")
      .insert({ user_id: userId, course_id: courseId })
      .select()
      .single();

    if (!error) {
      get().fetchEnrollments(userId);
    }

    return { data, error };
  },

  createCourse: async (courseData) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { data, error } = await supabase
      .from("courses")
      .insert(courseData)
      .select()
      .single();

    if (!error) {
      get().fetchCourses();
    }

    return { data, error };
  },

  updateCourse: async (id, courseData) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { data, error } = await supabase
      .from("courses")
      .update(courseData)
      .eq("id", id)
      .select()
      .single();

    if (!error) {
      get().fetchCourses();
    }

    return { data, error };
  },

  deleteCourse: async (id) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: "Supabase not configured" } };
    }

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (!error) {
      get().fetchCourses();
    }

    return { error };
  }
}));
