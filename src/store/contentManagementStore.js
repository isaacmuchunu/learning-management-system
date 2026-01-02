import { create } from "zustand";

export const useContentManagementStore = create((set, get) => ({
  contentLibrary: [],
  versions: [],
  schedules: [],
  templates: [],
  loading: false,

  fetchContentLibrary: async () => {
    set({
      contentLibrary: [
        { id: 1, title: "SQL Injection Tutorial", type: "video", category: "Web Security", tags: ["sqli", "owasp", "injection"], duration: "45 min", scormCompliant: true },
        { id: 2, title: "Nmap Scanning Guide", type: "document", category: "Network Security", tags: ["scanning", "recon", "nmap"], pages: 25, scormCompliant: true },
        { id: 3, title: "Buffer Overflow Lab", type: "lab", category: "Binary Exploitation", tags: ["bof", "exploitation", "memory"], duration: "2 hours", scormCompliant: false },
        { id: 4, title: "Incident Response Playbook", type: "document", category: "IR", tags: ["incident", "playbook", "soc"], pages: 50, scormCompliant: true },
        { id: 5, title: "Malware Analysis Basics", type: "video", category: "Reverse Engineering", tags: ["malware", "analysis", "reversing"], duration: "1.5 hours", scormCompliant: true }
      ]
    });
  },

  // Content Versioning
  fetchVersions: async (contentId) => {
    set({
      versions: [
        { id: 1, contentId: 1, version: "3.0", createdAt: "2024-03-01", author: "John Doe", changes: "Updated for OWASP Top 10 2024" },
        { id: 2, contentId: 1, version: "2.0", createdAt: "2023-06-15", author: "Jane Smith", changes: "Added advanced techniques" },
        { id: 3, contentId: 1, version: "1.0", createdAt: "2023-01-01", author: "John Doe", changes: "Initial release" }
      ]
    });
  },

  rollbackVersion: async (contentId, versionId) => {
    console.log("Rolling back content", contentId, "to version", versionId);
    return { success: true };
  },

  // Content Scheduling
  fetchSchedules: async () => {
    set({
      schedules: [
        { id: 1, contentId: 1, releaseDate: "2024-04-01", type: "drip", interval: "weekly" },
        { id: 2, contentId: 2, releaseDate: "2024-04-15", type: "scheduled", interval: null }
      ]
    });
  },

  scheduleContent: async (scheduleData) => {
    const newSchedule = { id: Date.now(), ...scheduleData };
    set(state => ({ schedules: [...state.schedules, newSchedule] }));
    return { success: true };
  },

  // Course Templates
  fetchTemplates: async () => {
    set({
      templates: [
        { id: 1, name: "Certification Prep", modules: 8, description: "Standard certification preparation template" },
        { id: 2, name: "Quick Skills", modules: 4, description: "Short skill-based course template" },
        { id: 3, name: "Bootcamp", modules: 12, description: "Intensive bootcamp format" }
      ]
    });
  },

  cloneCourse: async (courseId) => {
    console.log("Cloning course:", courseId);
    return { success: true, newCourseId: Date.now() };
  },

  // Prerequisites
  setPrerequisites: async (courseId, prerequisites) => {
    console.log("Setting prerequisites for course", courseId, prerequisites);
    return { success: true };
  }
}));
