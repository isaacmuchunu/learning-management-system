import { create } from "zustand";

export const useAIStore = create((set, get) => ({
  chatHistory: [],
  recommendations: [],
  skillGapAnalysis: null,
  loading: false,

  sendMessage: async (message) => {
    set({ loading: true });
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString()
    };

    set(state => ({
      chatHistory: [...state.chatHistory, userMessage]
    }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      "help": "I can help you with:\n• Finding courses and learning paths\n• Explaining cybersecurity concepts\n• Recommending labs based on your skill level\n• Answering questions about certifications\n• Troubleshooting lab environments\n\nWhat would you like to know?",
      "course": "Based on your profile and progress, I recommend starting with 'Network Security Fundamentals' if you're a beginner, or 'Advanced Penetration Testing' if you have some experience. Would you like me to explain the learning path?",
      "sql injection": "SQL Injection is a code injection technique that exploits vulnerabilities in applications that construct SQL queries from user input.\n\n**Types:**\n1. **In-band SQLi** - Error-based, Union-based\n2. **Blind SQLi** - Boolean-based, Time-based\n3. **Out-of-band SQLi** - DNS, HTTP requests\n\n**Prevention:**\n• Use parameterized queries\n• Input validation\n• Least privilege principle\n\nWould you like me to recommend a lab to practice this?",
      "certification": "Popular cybersecurity certifications:\n\n**Entry Level:**\n• CompTIA Security+\n• CEH (Certified Ethical Hacker)\n\n**Intermediate:**\n• OSCP (Offensive Security)\n• CySA+ (Cybersecurity Analyst)\n\n**Advanced:**\n• CISSP\n• CISM\n\nWe have preparation courses for all of these. Which one interests you?"
    };

    let aiResponse = "I understand you're asking about cybersecurity. Could you be more specific? I can help with:\n• Course recommendations\n• Concept explanations\n• Lab guidance\n• Certification advice";

    Object.keys(responses).forEach(key => {
      if (message.toLowerCase().includes(key)) {
        aiResponse = responses[key];
      }
    });

    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: aiResponse,
      timestamp: new Date().toISOString()
    };

    set(state => ({
      chatHistory: [...state.chatHistory, assistantMessage],
      loading: false
    }));

    return assistantMessage;
  },

  getPersonalizedRecommendations: async (userId) => {
    set({
      recommendations: [
        {
          type: "course",
          title: "Advanced SQL Injection Techniques",
          reason: "You scored 95% on SQL Injection basics - ready for advanced content",
          confidence: 92
        },
        {
          type: "lab",
          title: "Buffer Overflow Exploitation Lab",
          reason: "Next skill in your Penetration Testing path",
          confidence: 88
        },
        {
          type: "path",
          title: "Red Team Operations",
          reason: "Matches your career goals and current skill level",
          confidence: 85
        }
      ]
    });
  },

  analyzeSkillGaps: async (userId) => {
    set({
      skillGapAnalysis: {
        currentLevel: "Intermediate",
        targetRole: "Senior Penetration Tester",
        gaps: [
          { skill: "Active Directory Attacks", currentLevel: 35, requiredLevel: 80, priority: "high" },
          { skill: "Cloud Security (AWS)", currentLevel: 45, requiredLevel: 75, priority: "medium" },
          { skill: "Malware Analysis", currentLevel: 40, requiredLevel: 70, priority: "medium" },
          { skill: "Report Writing", currentLevel: 60, requiredLevel: 85, priority: "low" }
        ],
        recommendedPath: [
          { step: 1, action: "Complete Active Directory Attacks course", duration: "2 weeks" },
          { step: 2, action: "Practice in AD Lab environment", duration: "1 week" },
          { step: 3, action: "Start AWS Security course", duration: "3 weeks" }
        ],
        estimatedTimeToTarget: "3 months"
      }
    });
  },

  clearChat: () => {
    set({ chatHistory: [] });
  }
}));
