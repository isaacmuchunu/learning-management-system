import { create } from "zustand";

export const useSearchStore = create((set, get) => ({
  searchResults: [],
  recentSearches: [],
  recommendations: [],
  filters: {
    type: "all",
    difficulty: "all",
    duration: "all",
    topic: "all"
  },
  loading: false,

  search: async (query, filters = {}) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    const results = {
      courses: [
        { id: 1, type: "course", title: "Ethical Hacking Fundamentals", match: "title", relevance: 95 },
        { id: 2, type: "course", title: "Advanced Penetration Testing", match: "description", relevance: 85 }
      ],
      labs: [
        { id: 1, type: "lab", title: "Metasploit Framework Lab", match: "title", relevance: 90 },
        { id: 2, type: "lab", title: "Web Application Security Lab", match: "tools", relevance: 80 }
      ],
      docs: [
        { id: 1, type: "doc", title: "SQL Injection Deep Dive", match: "content", relevance: 88 },
        { id: 2, type: "doc", title: "XSS Prevention Guide", match: "title", relevance: 75 }
      ],
      ctf: [
        { id: 1, type: "ctf", title: "SQL Injection 101", match: "title", relevance: 92 }
      ],
      forums: [
        { id: 1, type: "forum", title: "Best resources for learning SQL injection", match: "content", relevance: 70 }
      ]
    };

    set({
      searchResults: results,
      recentSearches: [query, ...get().recentSearches.slice(0, 9)],
      loading: false
    });

    return results;
  },

  fetchRecommendations: async (userId) => {
    set({
      recommendations: [
        {
          id: 1,
          type: "course",
          title: "Advanced Web Security",
          reason: "Based on your progress in Web Security Fundamentals",
          thumbnail: "https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=300&search_term=web,security,code"
        },
        {
          id: 2,
          type: "lab",
          title: "Buffer Overflow Lab",
          reason: "Next step in your Penetration Testing path",
          thumbnail: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=300&search_term=hacking,terminal"
        },
        {
          id: 3,
          type: "course",
          title: "Cloud Security Essentials",
          reason: "Popular among students like you",
          thumbnail: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=300&search_term=cloud,technology"
        }
      ]
    });
  },

  setFilters: (newFilters) => {
    set(state => ({ filters: { ...state.filters, ...newFilters } }));
  },

  clearSearch: () => {
    set({ searchResults: [], filters: { type: "all", difficulty: "all", duration: "all", topic: "all" } });
  }
}));
