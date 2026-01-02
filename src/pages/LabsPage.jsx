import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Server, Play, Clock, Users, Filter, 
  Search, Zap, Shield, Globe, Cloud,
  Terminal, Flag
} from "lucide-react";
import { useLabStore } from "../store/labStore";
import VirtualLabEnvironment from "../components/VirtualLabEnvironment";
import CTFChallenge from "../components/CTFChallenge";

function LabsPage() {
  const { labs, ctfChallenges, labSessions, fetchLabs, fetchCTFChallenges, startLab } = useLabStore();
  const [activeTab, setActiveTab] = useState("labs");
  const [selectedLab, setSelectedLab] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  useEffect(() => {
    fetchLabs();
    fetchCTFChallenges();
  }, []);

  const categories = ["All", "Penetration Testing", "Web Security", "Network Security", "Reverse Engineering", "Blue Team", "Team Exercise"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
  const ctfCategories = ["All", "Web", "Pwn", "Forensics", "Cryptography", "Reversing", "Network"];

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || lab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || lab.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const filteredChallenges = ctfChallenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartLab = async (lab) => {
    const result = await startLab(lab.id);
    if (result.success) {
      setSelectedLab(lab);
      setActiveSession(result.session);
    }
  };

  if (selectedLab && activeSession) {
    return (
      <main className="min-h-screen bg-dark-950 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              setSelectedLab(null);
              setActiveSession(null);
            }}
            className="mb-4 text-cyber-400 hover:text-cyber-300 flex items-center gap-1"
          >            ← Back to Labs
          </button>
          <VirtualLabEnvironment lab={selectedLab} session={activeSession} />
        </div>
      </main>
    );
  }

  return (
    <main id="labs-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Hands-on <span className="text-gradient">Labs & CTF</span>
          </h1>
          <p className="text-dark-400">Practice your skills in real-world environments</p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => {
                setActiveTab("labs");
                setSelectedCategory("All");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "labs" ? "bg-cyber-500 text-dark-950" : "text-dark-400 hover:text-white"
              }`}
            >
              <Terminal className="h-4 w-4" />
              Virtual Labs
            </button>
            <button
              onClick={() => {
                setActiveTab("ctf");
                setSelectedCategory("All");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "ctf" ? "bg-cyber-500 text-dark-950" : "text-dark-400 hover:text-white"
              }`}
            >
              <Flag className="h-4 w-4" />
              CTF Challenges
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
          >
            {(activeTab === "labs" ? categories : ctfCategories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {activeTab === "labs" && (
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          )}
        </div>

        {activeTab === "labs" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden hover:border-cyber-500/30 transition-colors group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={lab.image}
                    alt={lab.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lab.type === "docker" ? "bg-blue-500/20 text-blue-400" :
                      lab.type === "kubernetes" ? "bg-purple-500/20 text-purple-400" :
                      "bg-orange-500/20 text-orange-400"
                    }`}>
                      {lab.type}
                    </span>
                    {lab.provider && (
                      <span className="px-2 py-1 bg-dark-800/80 text-dark-300 rounded text-xs">
                        {lab.provider}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{lab.title}</h3>
                  <p className="text-dark-400 text-sm mb-3 line-clamp-2">{lab.description}</p>
                  <div className="flex items-center gap-3 text-sm text-dark-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lab.duration}
                    </span>
                    <span className={`${
                      lab.difficulty === "Beginner" ? "text-green-400" :
                      lab.difficulty === "Intermediate" ? "text-yellow-400" :
                      lab.difficulty === "Advanced" ? "text-orange-400" :
                      "text-red-400"
                    }`}>
                      {lab.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lab.tools.slice(0, 3).map((tool, idx) => (
                      <span key={idx} className="px-2 py-1 bg-dark-800 text-dark-300 rounded text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleStartLab(lab)}
                    className="w-full py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Lab
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-2xl font-bold text-white">{ctfChallenges.length}</div>
                <div className="text-dark-400 text-sm">Total Challenges</div>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-2xl font-bold text-cyber-400">3</div>
                <div className="text-dark-400 text-sm">Solved</div>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-2xl font-bold text-electric-purple">450</div>
                <div className="text-dark-400 text-sm">Your Points</div>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-2xl font-bold text-yellow-400">#42</div>
                <div className="text-dark-400 text-sm">Your Rank</div>
              </div>
            </div>
            {filteredChallenges.map((challenge) => (
              <CTFChallenge key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default LabsPage;
