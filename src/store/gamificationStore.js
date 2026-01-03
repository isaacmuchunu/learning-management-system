import { create } from "zustand";

export const useGamificationStore = create((set, get) => ({
  userPoints: 0,
  userLevel: 1,
  userStreak: 0,
  virtualCurrency: 0,
  leaderboard: [],
  achievements: [],
  dailyChallenges: [],
  teamCompetitions: [],
  rewards: [],
  loading: false,

  fetchUserStats: async (userId) => {
    set({
      userPoints: 4750,
      userLevel: 12,
      userStreak: 15,
      virtualCurrency: 1250
    });
  },

  fetchLeaderboard: async (timeframe = "weekly") => {
    set({
      leaderboard: [
        { rank: 1, userId: 101, name: "Alex Chen", points: 12500, level: 25, avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,headshot" },
        { rank: 2, userId: 102, name: "Sarah Miller", points: 11800, level: 24, avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,woman,headshot" },
        { rank: 3, userId: 103, name: "Marcus Johnson", points: 10950, level: 23, avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,portrait" },
        { rank: 4, userId: 104, name: "Emily Wang", points: 9800, level: 21, avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,woman,portrait" },
        { rank: 5, userId: 105, name: "James Brown", points: 9200, level: 20, avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,business" },
        { rank: 42, userId: 1, name: "You", points: 4750, level: 12, isCurrentUser: true }
      ]
    });
  },

  fetchDailyChallenges: async () => {
    set({
      dailyChallenges: [
        { id: 1, title: "Complete 2 Lessons", reward: 50, progress: 1, target: 2, expiresIn: "18h", type: "daily" },
        { id: 2, title: "Score 80%+ on a Quiz", reward: 100, progress: 0, target: 1, expiresIn: "18h", type: "daily" },
        { id: 3, title: "Spend 30 min in Labs", reward: 75, progress: 22, target: 30, expiresIn: "18h", type: "daily" },
        { id: 4, title: "Complete 10 Lessons This Week", reward: 250, progress: 6, target: 10, expiresIn: "4d", type: "weekly" },
        { id: 5, title: "Solve 5 CTF Challenges", reward: 300, progress: 2, target: 5, expiresIn: "4d", type: "weekly" }
      ]
    });
  },

  fetchTeamCompetitions: async () => {
    set({
      teamCompetitions: [
        {
          id: 1,
          name: "Red vs Blue Showdown",
          description: "Team-based CTF competition",
          startDate: new Date(Date.now() + 86400000).toISOString(),
          endDate: new Date(Date.now() + 604800000).toISOString(),
          teams: [
            { id: 1, name: "Red Team Alpha", members: 12, score: 0 },
            { id: 2, name: "Blue Team Delta", members: 11, score: 0 }
          ],
          prizes: ["500 Coins", "Exclusive Badge", "1 Month Premium"],
          status: "upcoming"
        },
        {
          id: 2,
          name: "Weekly Sprint",
          description: "Complete the most challenges in a week",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 259200000).toISOString(),
          teams: [
            { id: 3, name: "Hackers United", members: 8, score: 2450 },
            { id: 4, name: "Cyber Warriors", members: 10, score: 2380 },
            { id: 5, name: "Binary Breakers", members: 7, score: 2100 }
          ],
          prizes: ["300 Coins", "Team Badge"],
          status: "active"
        }
      ]
    });
  },

  fetchRewards: async () => {
    set({
      rewards: [
        { id: 1, name: "Premium Course Access", cost: 500, type: "course", available: true },
        { id: 2, name: "Lab Time Extension (+2h)", cost: 100, type: "lab", available: true },
        { id: 3, name: "Certificate Frame", cost: 200, type: "cosmetic", available: true },
        { id: 4, name: "Exclusive Avatar", cost: 150, type: "cosmetic", available: true },
        { id: 5, name: "1v1 Mentoring Session", cost: 1000, type: "mentoring", available: true }
      ]
    });
  },

  addPoints: async (points, reason) => {
    set(state => ({
      userPoints: state.userPoints + points,
      userLevel: Math.floor((state.userPoints + points) / 500) + 1
    }));
    return { success: true };
  },

  updateStreak: async () => {
    set(state => ({ userStreak: state.userStreak + 1 }));
    return { success: true };
  },

  redeemReward: async (rewardId) => {
    const reward = get().rewards.find(r => r.id === rewardId);
    if (!reward) return { success: false, error: "Reward not found" };
    if (get().virtualCurrency < reward.cost) return { success: false, error: "Insufficient coins" };

    set(state => ({ virtualCurrency: state.virtualCurrency - reward.cost }));
    return { success: true, reward };
  },

  joinTeamCompetition: async (competitionId, teamId) => {
    return { success: true };
  }
}));
