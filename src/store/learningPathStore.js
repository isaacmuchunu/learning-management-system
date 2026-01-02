import { create } from "zustand";

export const useLearningPathStore = create((set, get) => ({
  paths: [],
  userProgress: {},
  adaptiveRecommendations: [],
  loading: false,

  fetchPaths: async () => {
    set({
      paths: [
        {
          id: 1,
          title: "SOC Analyst Career Path",
          role: "SOC Analyst",
          description: "Complete training path for Security Operations Center analysts",
          duration: "6 months",
          courses: 12,
          skills: ["SIEM", "Log Analysis", "Incident Response", "Threat Intelligence"],
          careers: ["SOC Analyst L1", "SOC Analyst L2", "Security Engineer"],
          levels: [
            { id: 1, title: "Foundation", courses: 3, completed: true },
            { id: 2, title: "Core Skills", courses: 4, completed: true },
            { id: 3, title: "Advanced", courses: 3, completed: false, progress: 67 },
            { id: 4, title: "Expert", courses: 2, completed: false, locked: true }
          ],
          adaptive: true
        },
        {
          id: 2,
          title: "Penetration Tester Path",
          role: "Pentester",
          description: "Become a professional penetration tester",
          duration: "8 months",
          courses: 15,
          skills: ["Network Hacking", "Web Security", "Exploitation", "Report Writing"],
          careers: ["Junior Pentester", "Senior Pentester", "Red Team Lead"],
          levels: [
            { id: 1, title: "Reconnaissance", courses: 3, completed: true },
            { id: 2, title: "Scanning & Enumeration", courses: 4, completed: false, progress: 50 },
            { id: 3, title: "Exploitation", courses: 4, completed: false, locked: true },
            { id: 4, title: "Post-Exploitation", courses: 4, completed: false, locked: true }
          ],
          adaptive: true
        },
        {
          id: 3,
          title: "Cloud Security Specialist",
          role: "Cloud Security",
          description: "Master cloud security across AWS, Azure, and GCP",
          duration: "5 months",
          courses: 10,
          skills: ["AWS Security", "Azure Security", "GCP Security", "Container Security"],
          careers: ["Cloud Security Engineer", "DevSecOps Engineer"],
          levels: [
            { id: 1, title: "Cloud Fundamentals", courses: 2, completed: false, progress: 25 },
            { id: 2, title: "AWS Security", courses: 3, completed: false, locked: true },
            { id: 3, title: "Azure Security", courses: 3, completed: false, locked: true },
            { id: 4, title: "Multi-Cloud", courses: 2, completed: false, locked: true }
          ],
          adaptive: true
        },
        {
          id: 4,
          title: "Incident Response Professional",
          role: "IR Specialist",
          description: "Expert-level incident response and forensics training",
          duration: "4 months",
          courses: 8,
          skills: ["Digital Forensics", "Malware Analysis", "Threat Hunting", "IR Playbooks"],
          careers: ["IR Analyst", "Forensics Investigator", "Threat Hunter"],
          levels: [
            { id: 1, title: "IR Fundamentals", courses: 2, completed: false },
            { id: 2, title: "Digital Forensics", courses: 2, completed: false, locked: true },
            { id: 3, title: "Malware Analysis", courses: 2, completed: false, locked: true },
            { id: 4, title: "Advanced IR", courses: 2, completed: false, locked: true }
          ],
          adaptive: false
        }
      ]
    });
  },

  getAdaptiveRecommendations: async (userId) => {
    set({
      adaptiveRecommendations: [
        { type: "course", id: 5, title: "Advanced SQL Injection", reason: "Based on your strong performance in web security" },
        { type: "lab", id: 3, title: "Malware Analysis Sandbox", reason: "Next step in your learning path" },
        { type: "challenge", id: 2, title: "Buffer Overflow CTF", reason: "Challenge yourself with binary exploitation" }
      ]
    });
  },

  updatePathProgress: async (pathId, levelId, progress) => {
    set(state => ({
      paths: state.paths.map(p => {
        if (p.id === pathId) {
          return {
            ...p,
            levels: p.levels.map(l => 
              l.id === levelId ? { ...l, progress } : l
            )
          };
        }
        return p;
      })
    }));
  }
}));
