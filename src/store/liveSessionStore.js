import { create } from "zustand";

export const useLiveSessionStore = create((set, get) => ({
  liveSessions: [],
  upcomingSessions: [],
  recordings: [],
  loading: false,

  fetchLiveSessions: async () => {
    set({
      upcomingSessions: [
        {
          id: 1,
          title: "Live Penetration Testing Demo",
          instructor: "Alex Chen",
          instructorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,headshot",
          scheduledAt: new Date(Date.now() + 86400000).toISOString(),
          duration: "2 hours",
          attendees: 156,
          maxAttendees: 200,
          description: "Watch a live penetration test on a realistic target environment",
          features: ["Screen Sharing", "Q&A", "Live Coding", "Breakout Rooms"]
        },
        {
          id: 2,
          title: "Incident Response Workshop",
          instructor: "Sarah Miller",
          instructorImage: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,woman,headshot",
          scheduledAt: new Date(Date.now() + 172800000).toISOString(),
          duration: "3 hours",
          attendees: 89,
          maxAttendees: 150,
          description: "Hands-on workshop for handling security incidents",
          features: ["Screen Sharing", "Q&A", "Polls", "Live Demo"]
        },
        {
          id: 3,
          title: "Malware Analysis Masterclass",
          instructor: "Marcus Johnson",
          instructorImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,portrait",
          scheduledAt: new Date(Date.now() + 259200000).toISOString(),
          duration: "4 hours",
          attendees: 67,
          maxAttendees: 100,
          description: "Deep dive into malware reverse engineering techniques",
          features: ["Screen Sharing", "Q&A", "Live Coding", "Recording"]
        }
      ],
      recordings: [
        { id: 1, title: "AWS Security Best Practices", instructor: "David Lee", duration: "1:45:00", views: 1234, date: "2024-02-15" },
        { id: 2, title: "Zero Trust Architecture", instructor: "Emma Wilson", duration: "2:15:00", views: 987, date: "2024-02-10" },
        { id: 3, title: "SOC Operations Deep Dive", instructor: "James Brown", duration: "2:30:00", views: 756, date: "2024-02-05" }
      ]
    });
  },

  joinSession: async (sessionId) => {
    console.log("Joining session:", sessionId);
    return { success: true, streamUrl: `https://live.cybershield.dev/session/${sessionId}` };
  },

  registerForSession: async (sessionId) => {
    set(state => ({
      upcomingSessions: state.upcomingSessions.map(s =>
        s.id === sessionId ? { ...s, attendees: s.attendees + 1, registered: true } : s
      )
    }));
    return { success: true };
  },

  submitQuestion: async (sessionId, question) => {
    console.log("Question submitted for session", sessionId, ":", question);
    return { success: true };
  },

  submitPollResponse: async (sessionId, pollId, response) => {
    console.log("Poll response:", sessionId, pollId, response);
    return { success: true };
  }
}));
