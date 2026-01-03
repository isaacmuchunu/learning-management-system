import { create } from "zustand";

export const useAdminStore = create((set, get) => ({
  systemConfig: {},
  contentApprovals: [],
  helpTickets: [],
  analytics: {},
  loading: false,

  fetchSystemConfig: async () => {
    set({
      systemConfig: {
        platformName: "CyberShield Academy",
        logo: "",
        primaryColor: "#00ff9d",
        emailProvider: "sendgrid",
        maxLabTime: 120,
        maxFileUpload: 100,
        maintenanceMode: false,
        features: {
          gamification: true,
          forums: true,
          liveStreaming: true,
          aiChatbot: true,
          peerReview: true
        },
        integrations: {
          slack: { enabled: true, webhook: "" },
          github: { enabled: true, clientId: "" },
          zoom: { enabled: false, apiKey: "" }
        }
      }
    });
  },

  fetchContentApprovals: async () => {
    set({
      contentApprovals: [
        {
          id: 1,
          type: "course",
          title: "Advanced Malware Analysis",
          submitter: { id: 101, name: "Dr. Emily Wang", role: "instructor" },
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          status: "pending",
          reviewNotes: "",
          contentPreview: "Course covering dynamic and static malware analysis techniques..."
        },
        {
          id: 2,
          type: "lab",
          title: "Zero-Day Exploitation Lab",
          submitter: { id: 102, name: "James Rodriguez", role: "instructor" },
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          status: "in_review",
          reviewer: { id: 1, name: "Admin" },
          reviewNotes: "Checking security of lab environment",
          contentPreview: "Hands-on lab for practicing zero-day vulnerability discovery..."
        },
        {
          id: 3,
          type: "article",
          title: "2024 Threat Landscape Overview",
          submitter: { id: 103, name: "Sarah Miller", role: "instructor" },
          submittedAt: new Date(Date.now() - 259200000).toISOString(),
          status: "approved",
          reviewer: { id: 1, name: "Admin" },
          approvedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    });
  },

  fetchHelpTickets: async () => {
    set({
      helpTickets: [
        {
          id: 1,
          subject: "Cannot access Metasploit lab",
          category: "technical",
          priority: "high",
          status: "open",
          user: { id: 104, name: "John Doe", email: "john@example.com" },
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          lastUpdated: new Date(Date.now() - 1800000).toISOString(),
          messages: [
            { id: 1, content: "When I try to start the lab, it shows 'provisioning failed' error.", sender: "user", timestamp: new Date(Date.now() - 3600000).toISOString() },
            { id: 2, content: "We're investigating the issue. Can you provide your session ID?", sender: "support", timestamp: new Date(Date.now() - 1800000).toISOString() }
          ]
        },
        {
          id: 2,
          subject: "Certificate not showing after completion",
          category: "billing",
          priority: "medium",
          status: "in_progress",
          user: { id: 105, name: "Jane Smith", email: "jane@example.com" },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastUpdated: new Date(Date.now() - 43200000).toISOString(),
          assignee: { id: 1, name: "Support Team" },
          messages: []
        },
        {
          id: 3,
          subject: "Request for group discount",
          category: "billing",
          priority: "low",
          status: "resolved",
          user: { id: 106, name: "Enterprise Corp", email: "training@enterprise.com" },
          createdAt: new Date(Date.now() - 604800000).toISOString(),
          lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          resolvedAt: new Date(Date.now() - 259200000).toISOString(),
          messages: []
        }
      ]
    });
  },

  fetchAdminAnalytics: async () => {
    set({
      analytics: {
        users: {
          total: 12450,
          active: 8920,
          newThisMonth: 567,
          growth: 12.5
        },
        courses: {
          total: 85,
          published: 72,
          avgCompletion: 68,
          topRated: [
            { id: 1, title: "Ethical Hacking Fundamentals", rating: 4.9, enrollments: 3456 },
            { id: 2, title: "Web Security Masterclass", rating: 4.8, enrollments: 2890 }
          ]
        },
        revenue: {
          thisMonth: 125000,
          lastMonth: 112000,
          growth: 11.6,
          byPlan: {
            individual: 45000,
            team: 35000,
            enterprise: 45000
          }
        },
        engagement: {
          dailyActiveUsers: 2340,
          avgSessionDuration: 45,
          labsStarted: 890,
          quizzesCompleted: 567
        }
      }
    });
  },

  updateSystemConfig: async (config) => {
    set(state => ({
      systemConfig: { ...state.systemConfig, ...config }
    }));
    return { success: true };
  },

  approveContent: async (contentId, approved, notes = "") => {
    set(state => ({
      contentApprovals: state.contentApprovals.map(c =>
        c.id === contentId
          ? { ...c, status: approved ? "approved" : "rejected", reviewNotes: notes, approvedAt: new Date().toISOString() }
          : c
      )
    }));
    return { success: true };
  },

  updateTicket: async (ticketId, updates) => {
    set(state => ({
      helpTickets: state.helpTickets.map(t =>
        t.id === ticketId
          ? { ...t, ...updates, lastUpdated: new Date().toISOString() }
          : t
      )
    }));
    return { success: true };
  },

  replyToTicket: async (ticketId, message) => {
    set(state => ({
      helpTickets: state.helpTickets.map(t =>
        t.id === ticketId
          ? {
              ...t,
              messages: [...t.messages, { id: Date.now(), content: message, sender: "support", timestamp: new Date().toISOString() }],
              lastUpdated: new Date().toISOString()
            }
          : t
      )
    }));
    return { success: true };
  }
}));
