import { create } from "zustand";

export const useSocialStore = create((set, get) => ({
  forums: [],
  threads: [],
  messages: [],
  studyGroups: [],
  mentors: [],
  codeReviews: [],
  loading: false,

  fetchForums: async (courseId = null) => {
    set({
      forums: [
        {
          id: 1,
          name: "General Discussion",
          description: "General cybersecurity topics and news",
          threads: 156,
          posts: 1234,
          lastActivity: new Date(Date.now() - 3600000).toISOString(),
          icon: "💬"
        },
        {
          id: 2,
          name: "Web Security",
          description: "OWASP, web vulnerabilities, and secure coding",
          threads: 89,
          posts: 567,
          lastActivity: new Date(Date.now() - 7200000).toISOString(),
          icon: "🌐"
        },
        {
          id: 3,
          name: "CTF Writeups",
          description: "Share and discuss CTF challenge solutions",
          threads: 234,
          posts: 1890,
          lastActivity: new Date(Date.now() - 1800000).toISOString(),
          icon: "🚩"
        },
        {
          id: 4,
          name: "Career Advice",
          description: "Job hunting, interviews, and career development",
          threads: 67,
          posts: 445,
          lastActivity: new Date(Date.now() - 14400000).toISOString(),
          icon: "💼"
        },
        {
          id: 5,
          name: "Tool Recommendations",
          description: "Discuss and recommend security tools",
          threads: 45,
          posts: 289,
          lastActivity: new Date(Date.now() - 28800000).toISOString(),
          icon: "🛠️"
        }
      ]
    });
  },

  fetchThreads: async (forumId) => {
    set({
      threads: [
        {
          id: 1,
          forumId,
          title: "Best approach for learning reverse engineering?",
          author: { id: 101, name: "Alex Chen", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&search_term=professional,man" },
          replies: 23,
          views: 456,
          votes: 45,
          isPinned: true,
          isResolved: false,
          tags: ["reverse-engineering", "beginner", "learning-path"],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastReply: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 2,
          forumId,
          title: "How I passed OSCP on my first attempt",
          author: { id: 102, name: "Sarah Miller", avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=50&search_term=professional,woman" },
          replies: 67,
          views: 2345,
          votes: 189,
          isPinned: false,
          isResolved: true,
          tags: ["oscp", "certification", "success-story"],
          createdAt: new Date(Date.now() - 604800000).toISOString(),
          lastReply: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 3,
          forumId,
          title: "SQL Injection prevention in Node.js",
          author: { id: 103, name: "Marcus Johnson", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&search_term=professional,man" },
          replies: 12,
          views: 234,
          votes: 28,
          isPinned: false,
          isResolved: true,
          tags: ["sql-injection", "nodejs", "prevention"],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastReply: new Date(Date.now() - 14400000).toISOString()
        }
      ]
    });
  },

  fetchStudyGroups: async () => {
    set({
      studyGroups: [
        {
          id: 1,
          name: "OSCP Study Group 2024",
          description: "Preparing for OSCP certification together",
          members: 45,
          maxMembers: 50,
          category: "Certification Prep",
          meetingSchedule: "Saturdays 10 AM EST",
          isPublic: true,
          tags: ["oscp", "certification"],
          createdBy: { id: 101, name: "Alex Chen" }
        },
        {
          id: 2,
          name: "Malware Analysis Club",
          description: "Weekly malware sample analysis sessions",
          members: 28,
          maxMembers: 30,
          category: "Skill Development",
          meetingSchedule: "Wednesdays 7 PM EST",
          isPublic: true,
          tags: ["malware", "reverse-engineering"],
          createdBy: { id: 102, name: "Sarah Miller" }
        },
        {
          id: 3,
          name: "Bug Bounty Hunters",
          description: "Share tips and collaborate on bug bounty programs",
          members: 62,
          maxMembers: 100,
          category: "Bug Bounty",
          meetingSchedule: "Fridays 6 PM EST",
          isPublic: true,
          tags: ["bug-bounty", "web-security"],
          createdBy: { id: 103, name: "Marcus Johnson" }
        }
      ]
    });
  },

  fetchMentors: async () => {
    set({
      mentors: [
        {
          id: 1,
          name: "Dr. Emily Wang",
          title: "Senior Security Researcher",
          company: "CyberDefense Corp",
          expertise: ["Malware Analysis", "Threat Intelligence", "IR"],
          rating: 4.9,
          reviews: 45,
          hourlyRate: 150,
          availability: "Limited",
          avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,woman,executive",
          bio: "15+ years in cybersecurity with focus on APT analysis and threat hunting."
        },
        {
          id: 2,
          name: "James Rodriguez",
          title: "Penetration Testing Lead",
          company: "SecureTest Inc",
          expertise: ["Penetration Testing", "Red Teaming", "OSCP"],
          rating: 4.8,
          reviews: 67,
          hourlyRate: 120,
          availability: "Available",
          avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,business",
          bio: "Certified ethical hacker helping others break into the security field."
        },
        {
          id: 3,
          name: "Lisa Thompson",
          title: "Cloud Security Architect",
          company: "CloudSecure",
          expertise: ["AWS Security", "Azure Security", "DevSecOps"],
          rating: 4.7,
          reviews: 34,
          hourlyRate: 130,
          availability: "Available",
          avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,woman,tech",
          bio: "Specialized in securing cloud infrastructure and implementing DevSecOps practices."
        }
      ]
    });
  },

  fetchCodeReviews: async () => {
    set({
      codeReviews: [
        {
          id: 1,
          title: "Security review for authentication module",
          submitter: { id: 104, name: "John Doe" },
          language: "Python",
          status: "pending",
          submittedAt: new Date(Date.now() - 3600000).toISOString(),
          linesOfCode: 245,
          category: "Authentication"
        },
        {
          id: 2,
          title: "Input validation implementation",
          submitter: { id: 105, name: "Jane Smith" },
          language: "JavaScript",
          status: "in_review",
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          linesOfCode: 120,
          category: "Input Validation",
          reviewer: { id: 101, name: "Alex Chen" }
        },
        {
          id: 3,
          title: "Encryption helper functions",
          submitter: { id: 106, name: "Mike Brown" },
          language: "Go",
          status: "completed",
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          linesOfCode: 89,
          category: "Cryptography",
          reviewer: { id: 102, name: "Sarah Miller" },
          findings: 3
        }
      ]
    });
  },

  createThread: async (forumId, threadData) => {
    const newThread = {
      id: Date.now(),
      forumId,
      ...threadData,
      replies: 0,
      views: 0,
      votes: 0,
      createdAt: new Date().toISOString()
    };
    set(state => ({ threads: [newThread, ...state.threads] }));
    return { success: true, thread: newThread };
  },

  joinStudyGroup: async (groupId) => {
    set(state => ({
      studyGroups: state.studyGroups.map(g =>
        g.id === groupId ? { ...g, members: g.members + 1, joined: true } : g
      )
    }));
    return { success: true };
  },

  requestMentor: async (mentorId, message) => {
    return { success: true, requestId: Date.now() };
  },

  submitCodeReview: async (reviewData) => {
    const newReview = {
      id: Date.now(),
      ...reviewData,
      status: "pending",
      submittedAt: new Date().toISOString()
    };
    set(state => ({ codeReviews: [newReview, ...state.codeReviews] }));
    return { success: true, review: newReview };
  }
}));
