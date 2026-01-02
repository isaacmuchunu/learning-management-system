import { create } from "zustand";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export const useUserManagementStore = create((set, get) => ({
  users: [],
  groups: [],
  cohorts: [],
  activityLogs: [],
  loading: false,

  // User Groups & Cohorts
  fetchGroups: async () => {
    set({
      groups: [
        { id: 1, name: "SOC Analysts", members: 45, description: "Security Operations Center team" },
        { id: 2, name: "Penetration Testers", members: 28, description: "Red team specialists" },
        { id: 3, name: "Cloud Security", members: 32, description: "Cloud infrastructure security" },
        { id: 4, name: "Incident Response", members: 19, description: "IR team members" },
        { id: 5, name: "Compliance Team", members: 15, description: "GRC professionals" }
      ]
    });
  },

  fetchCohorts: async () => {
    set({
      cohorts: [
        { id: 1, name: "Q1 2024 Batch", startDate: "2024-01-15", endDate: "2024-04-15", members: 35, status: "active" },
        { id: 2, name: "Enterprise Security Bootcamp", startDate: "2024-02-01", endDate: "2024-05-01", members: 50, status: "active" },
        { id: 3, name: "OSCP Prep Group", startDate: "2024-03-01", endDate: "2024-06-01", members: 25, status: "upcoming" }
      ]
    });
  },

  // Batch User Import
  importUsers: async (csvData) => {
    console.log("Importing users:", csvData);
    return { success: true, imported: csvData.length };
  },

  // Activity Logs
  fetchActivityLogs: async (userId = null) => {
    set({
      activityLogs: [
        { id: 1, userId: 1, action: "course_started", details: "Started Ethical Hacking course", timestamp: new Date().toISOString(), ip: "192.168.1.100" },
        { id: 2, userId: 1, action: "quiz_completed", details: "Scored 95% on Network Security Quiz", timestamp: new Date(Date.now() - 3600000).toISOString(), ip: "192.168.1.100" },
        { id: 3, userId: 2, action: "lab_accessed", details: "Accessed Metasploit Lab", timestamp: new Date(Date.now() - 7200000).toISOString(), ip: "10.0.0.50" },
        { id: 4, userId: 1, action: "certificate_earned", details: "Earned SOC Analyst Certificate", timestamp: new Date(Date.now() - 86400000).toISOString(), ip: "192.168.1.100" }
      ]
    });
  },

  // Skill Tracking
  updateUserSkills: async (userId, skills) => {
    console.log("Updating skills for user:", userId, skills);
    return { success: true };
  },

  createGroup: async (groupData) => {
    const newGroup = { id: Date.now(), ...groupData, members: 0 };
    set(state => ({ groups: [...state.groups, newGroup] }));
    return { success: true, group: newGroup };
  },

  createCohort: async (cohortData) => {
    const newCohort = { id: Date.now(), ...cohortData, members: 0, status: "upcoming" };
    set(state => ({ cohorts: [...state.cohorts, newCohort] }));
    return { success: true, cohort: newCohort };
  }
}));
