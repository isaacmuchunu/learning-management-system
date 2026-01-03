import { motion } from "framer-motion";
import { Trophy, Target, Gift, Users, Coins } from "lucide-react";
import Leaderboard from "../components/Leaderboard";
import DailyChallenges from "../components/DailyChallenges";
import RewardsShop from "../components/RewardsShop";
import TeamCompetitions from "../components/TeamCompetitions";
import { useGamificationStore } from "../store/gamificationStore";

function GamificationPage() {
  const { userPoints, userLevel, userStreak, virtualCurrency, fetchUserStats } = useGamificationStore();
  const [activeTab, setActiveTab] = useState("leaderboard");

  useEffect(() => {
    fetchUserStats();
  }, []);

  const tabs = [
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "challenges", label: "Challenges", icon: Target },
    { id: "competitions", label: "Competitions", icon: Users },
    { id: "rewards", label: "Rewards Shop", icon: Gift }
  ];

  return (
    <main id="gamification-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Gamification <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-dark-400">Compete, earn rewards, and track your progress</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-cyber-500" />
              <span className="text-dark-400 text-sm">Total Points</span>
            </div>
            <div className="text-2xl font-bold text-white">{userPoints.toLocaleString()}</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-electric-purple" />
              <span className="text-dark-400 text-sm">Current Level</span>
            </div>
            <div className="text-2xl font-bold text-white">{userLevel}</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔥</span>
              <span className="text-dark-400 text-sm">Day Streak</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{userStreak}</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-yellow-400" />
              <span className="text-dark-400 text-sm">Coins</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{virtualCurrency.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-cyber-500 text-dark-950"
                  : "bg-dark-800 text-dark-400 hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "challenges" && <DailyChallenges />}
        {activeTab === "competitions" && <TeamCompetitions />}
        {activeTab === "rewards" && <RewardsShop />}
      </div>
    </main>
  );
}

export default GamificationPage;
