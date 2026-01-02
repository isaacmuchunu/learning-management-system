import { create } from "zustand";

export const useCertificateStore = create((set, get) => ({
  certificates: [],
  badges: [],
  loading: false,

  fetchCertificates: async (userId) => {
    set({
      certificates: [
        {
          id: 1,
          title: "Certified Ethical Hacker",
          issuedAt: "2024-02-15",
          expiresAt: "2027-02-15",
          courseId: 1,
          credentialId: "CEH-2024-001234",
          verifyUrl: "https://verify.cybershield.dev/CEH-2024-001234",
          image: "https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=400&search_term=certificate,award,achievement"
        },
        {
          id: 2,
          title: "SOC Analyst Level 1",
          issuedAt: "2024-01-20",
          expiresAt: "2027-01-20",
          courseId: 2,
          credentialId: "SOC1-2024-005678",
          verifyUrl: "https://verify.cybershield.dev/SOC1-2024-005678",
          image: "https://images.pexels.com/photos/5380666/pexels-photo-5380666.jpeg?auto=compress&cs=tinysrgb&w=400&search_term=diploma,certificate,security"
        }
      ],
      badges: [
        { id: 1, title: "First Blood", description: "Completed first course", icon: "🏆", earnedAt: "2024-01-05", rarity: "common" },
        { id: 2, title: "Lab Rat", description: "Completed 10 labs", icon: "🔬", earnedAt: "2024-01-15", rarity: "uncommon" },
        { id: 3, title: "CTF Champion", description: "Solved 25 CTF challenges", icon: "🚩", earnedAt: "2024-02-01", rarity: "rare" },
        { id: 4, title: "Streak Master", description: "30-day learning streak", icon: "🔥", earnedAt: "2024-02-10", rarity: "epic" },
        { id: 5, title: "Elite Hacker", description: "Completed all advanced courses", icon: "💀", earnedAt: null, rarity: "legendary", progress: 75 }
      ]
    });
  },

  generateCertificate: async (courseId, userId) => {
    const newCert = {
      id: Date.now(),
      title: "New Certification",
      issuedAt: new Date().toISOString(),
      courseId,
      credentialId: `CERT-${Date.now()}`
    };
    set(state => ({ certificates: [...state.certificates, newCert] }));
    return { success: true, certificate: newCert };
  },

  verifyCertificate: async (credentialId) => {
    const cert = get().certificates.find(c => c.credentialId === credentialId);
    return { valid: !!cert, certificate: cert };
  }
}));
