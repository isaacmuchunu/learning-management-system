import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Gift, Clock, CheckCircle, Zap } from "lucide-react";
import { useGamificationStore } from "../store/gamificationStore";

function DailyChallenges() {
  const { dailyChallenges, fetchDailyChallenges, userStreak } = useGamificationStore();

  useEffect(() => {
    fetchDailyChallenges();
  }, []);

  const dailies = dailyChallenges.filter(c => c.type === "daily");
  const weeklies = dailyChallenges.filter(c => c.type === "weekly");

  return (
    <div id="daily-challenges" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyber-500/20 rounded-lg">
            <Target className="h-6 w-6 text-cyber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Daily Challenges</h2>
            <p className="text-dark-400 text-sm">Complete challenges to earn rewards</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
          <Zap className="h-5 w-5 text-orange-400" />
          <span className="text-orange-400 font-bold">{userStreak}</span>
          <span className="text-orange-300/70 text-sm">day streak</span>
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-dark-400" />
          Daily Challenges
        </h3>
        {dailies.map((challenge, idx) => {
          const progressPercent = (challenge.progress / challenge.target) * 100;
          const isComplete = challenge.progress >= challenge.target;

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border ${
                isComplete
                  ? "bg-cyber-500/10 border-cyber-500/30"
                  : "bg-dark-900/50 border-dark-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <div className="p-2 bg-cyber-500/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-cyber-500" />
                    </div>
                  ) : (
                    <div className="p-2 bg-dark-800 rounded-lg">
                      <Target className="h-5 w-5 text-dark-400" />
                    </div>
                  )}
                  <div>
                    <h4 className={`font-medium ${isComplete ? "text-cyber-400" : "text-white"}`}>
                      {challenge.title}
                    </h4>
                    <p className="text-dark-500 text-sm">Expires in {challenge.expiresIn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-lg">
                  <Gift className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">+{challenge.reward}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className={`h-full ${isComplete ? "bg-cyber-500" : "bg-dark-500"}`}
                  />
                </div>
                <span className="text-dark-400 text-sm">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 mt-6">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-dark-400" />
          Weekly Challenges
        </h3>
        {weeklies.map((challenge, idx) => {
          const progressPercent = (challenge.progress / challenge.target) * 100;
          const isComplete = challenge.progress >= challenge.target;

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`p-4 rounded-xl border ${
                isComplete
                  ? "bg-electric-purple/10 border-electric-purple/30"
                  : "bg-dark-900/50 border-dark-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {isComplete ? (
                    <div className="p-2 bg-electric-purple/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-electric-purple" />
                    </div>
                  ) : (
                    <div className="p-2 bg-dark-800 rounded-lg">
                      <Target className="h-5 w-5 text-dark-400" />
                    </div>
                  )}
                  <div>
                    <h4 className={`font-medium ${isComplete ? "text-electric-purple" : "text-white"}`}>
                      {challenge.title}
                    </h4>
                    <p className="text-dark-500 text-sm">Expires in {challenge.expiresIn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-electric-purple/20 rounded-lg">
                  <Gift className="h-4 w-4 text-electric-purple" />
                  <span className="text-electric-purple font-medium">+{challenge.reward}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className={`h-full ${isComplete ? "bg-electric-purple" : "bg-dark-500"}`}
                  />
                </div>
                <span className="text-dark-400 text-sm">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyChallenges;
