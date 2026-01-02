import { create } from "zustand";

export const useLabStore = create((set, get) => ({
  labs: [],
  ctfChallenges: [],
  labSessions: [],
  loading: false,

  fetchLabs: async () => {
    set({
      labs: [
        {
          id: 1,
          title: "Metasploit Framework Lab",
          category: "Penetration Testing",
          difficulty: "Intermediate",
          duration: "2 hours",
          type: "docker",
          status: "available",
          description: "Learn to use Metasploit for vulnerability exploitation",
          tools: ["Metasploit", "Nmap", "Netcat"],
          image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=hacking,terminal,code,cybersecurity"
        },
        {
          id: 2,
          title: "Web Application Security Lab",
          category: "Web Security",
          difficulty: "Beginner",
          duration: "1.5 hours",
          type: "kubernetes",
          status: "available",
          description: "Practice OWASP Top 10 vulnerabilities",
          tools: ["Burp Suite", "OWASP ZAP", "SQLMap"],
          image: "https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=web,security,code,programming"
        },
        {
          id: 3,
          title: "Malware Analysis Sandbox",
          category: "Reverse Engineering",
          difficulty: "Advanced",
          duration: "3 hours",
          type: "cloud",
          provider: "AWS",
          status: "available",
          description: "Analyze malware in isolated environment",
          tools: ["IDA Pro", "x64dbg", "Process Monitor"],
          image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=malware,virus,analysis,security"
        },
        {
          id: 4,
          title: "Network Packet Analysis",
          category: "Network Security",
          difficulty: "Intermediate",
          duration: "2 hours",
          type: "docker",
          status: "available",
          description: "Capture and analyze network traffic",
          tools: ["Wireshark", "tcpdump", "NetworkMiner"],
          image: "https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=network,cables,server,data"
        },
        {
          id: 5,
          title: "Incident Response Simulation",
          category: "Blue Team",
          difficulty: "Advanced",
          duration: "4 hours",
          type: "kubernetes",
          status: "available",
          description: "Respond to simulated security incidents",
          tools: ["Splunk", "ELK Stack", "TheHive"],
          image: "https://images.pexels.com/photos/5380591/pexels-photo-5380591.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=incident,response,security,alert"
        },
        {
          id: 6,
          title: "Red Team vs Blue Team Arena",
          category: "Team Exercise",
          difficulty: "Expert",
          duration: "6 hours",
          type: "cloud",
          provider: "Azure",
          status: "available",
          description: "Live attack and defense simulation",
          tools: ["Multiple"],
          image: "https://images.pexels.com/photos/5380678/pexels-photo-5380678.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=team,battle,cyber,attack"
        }
      ]
    });
  },

  fetchCTFChallenges: async () => {
    set({
      ctfChallenges: [
        { id: 1, title: "SQL Injection 101", category: "Web", points: 100, solves: 245, difficulty: "Easy", flag: "CTF{sql_master_2024}" },
        { id: 2, title: "Buffer Overflow Basics", category: "Pwn", points: 200, solves: 89, difficulty: "Medium", flag: "CTF{stack_smash}" },
        { id: 3, title: "Hidden in Plain Sight", category: "Forensics", points: 150, solves: 156, difficulty: "Easy", flag: "CTF{stego_ninja}" },
        { id: 4, title: "Crypto Challenge", category: "Cryptography", points: 300, solves: 45, difficulty: "Hard", flag: "CTF{crypto_king}" },
        { id: 5, title: "Reverse Me", category: "Reversing", points: 250, solves: 67, difficulty: "Medium", flag: "CTF{asm_wizard}" },
        { id: 6, title: "Network Detective", category: "Network", points: 175, solves: 112, difficulty: "Medium", flag: "CTF{packet_hunter}" }
      ]
    });
  },

  startLab: async (labId) => {
    const session = {
      id: Date.now(),
      labId,
      status: "provisioning",
      startTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      accessUrl: `https://lab-${labId}-${Date.now()}.cybershield.dev`
    };
    set(state => ({ labSessions: [...state.labSessions, session] }));
    setTimeout(() => {
      set(state => ({
        labSessions: state.labSessions.map(s => 
          s.id === session.id ? { ...s, status: "running" } : s
        )
      }));
    }, 3000);
    return { success: true, session };
  },

  stopLab: async (sessionId) => {
    set(state => ({
      labSessions: state.labSessions.map(s => 
        s.id === sessionId ? { ...s, status: "stopped" } : s
      )
    }));
    return { success: true };
  },

  resetLab: async (sessionId) => {
    set(state => ({
      labSessions: state.labSessions.map(s => 
        s.id === sessionId ? { ...s, status: "resetting" } : s
      )
    }));
    setTimeout(() => {
      set(state => ({
        labSessions: state.labSessions.map(s => 
          s.id === sessionId ? { ...s, status: "running" } : s
        )
      }));
    }, 2000);
    return { success: true };
  },

  submitFlag: async (challengeId, flag) => {
    const challenge = get().ctfChallenges.find(c => c.id === challengeId);
    if (challenge && challenge.flag === flag) {
      return { success: true, correct: true, points: challenge.points };
    }
    return { success: true, correct: false, points: 0 };
  }
}));
