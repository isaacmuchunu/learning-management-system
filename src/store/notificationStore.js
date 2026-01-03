import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  preferences: {},
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({
      notifications: [
        {
          id: 1,
          type: "achievement",
          title: "New Badge Earned!",
          message: "You earned the 'Lab Rat' badge for completing 10 labs",
          icon: "🏆",
          read: false,
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          action: { type: "navigate", url: "/certificates" }
        },
        {
          id: 2,
          type: "course",
          title: "Course Update Available",
          message: "Ethical Hacking Fundamentals has new content",
          icon: "📚",
          read: false,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          action: { type: "navigate", url: "/courses/1" }
        },
        {
          id: 3,
          type: "deadline",
          title: "Quiz Deadline Approaching",
          message: "Network Security Quiz due in 2 days",
          icon: "⏰",
          read: false,
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          action: { type: "navigate", url: "/dashboard" }
        },
        {
          id: 4,
          type: "social",
          title: "New Reply to Your Thread",
          message: "Alex Chen replied to your question about SQL injection",
          icon: "💬",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          action: { type: "navigate", url: "/community/threads/1" }
        },
        {
          id: 5,
          type: "live",
          title: "Live Session Starting Soon",
          message: "Penetration Testing Demo starts in 1 hour",
          icon: "🎥",
          read: true,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          action: { type: "navigate", url: "/live" }
        },
        {
          id: 6,
          type: "grade",
          title: "Quiz Results Available",
          message: "You scored 92% on Web Security Assessment",
          icon: "📝",
          read: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          action: { type: "navigate", url: "/dashboard" }
        }
      ],
      unreadCount: 3
    });
  },

  fetchPreferences: async () => {
    set({
      preferences: {
        email: {
          courseUpdates: true,
          deadlineReminders: true,
          achievements: true,
          socialActivity: false,
          marketing: false,
          digestFrequency: "daily"
        },
        push: {
          courseUpdates: true,
          deadlineReminders: true,
          achievements: true,
          socialActivity: true,
          liveSessionReminders: true
        },
        inApp: {
          all: true
        }
      }
    });
  },

  markAsRead: async (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    }));
  },

  markAllAsRead: async () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }));
  },

  updatePreferences: async (channel, settings) => {
    set(state => ({
      preferences: {
        ...state.preferences,
        [channel]: { ...state.preferences[channel], ...settings }
      }
    }));
    return { success: true };
  },

  deleteNotification: async (notificationId) => {
    const notification = get().notifications.find(n => n.id === notificationId);
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== notificationId),
      unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount
    }));
  }
}));
