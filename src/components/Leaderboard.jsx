import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, Users, Calendar } from "lucide-react";
import { useGamificationStore } from "../store/gamificationStore";

function Leaderboard() {
  const { leaderboard, fetchLeaderboard } = useGamificationStore();
  const [timeframe, setTimeframe] = useState("weekly");

  useEffect(() => {
    fetchLeaderboard(timeframe);
  }, [timeframe]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-300" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-dark-400 font-mono">#{rank}</span>;
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30";
    return "bg-dark-900/50 border-dark-700";
  };

  return (
    <div id="leaderboard" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyber-500/20 rounded-lg">
            <Trophy className="h-6 w-6 text-cyber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Leaderboard</h2>
            <p className="text-dark-400 text-sm">Top performers in the community</p>
          </div>
        </div>
        <div className="flex bg-dark-800 rounded-lg p-1">
          {["daily", "weekly", "monthly", "all-time"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                timeframe === tf
                  ? "bg-cyber-500 text-dark-950"
                  : "text-dark-400 hover:text-white"
              }`}
            >
              {tf.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {leaderboard.slice(0, 3).map((user, idx) => (
          <motion.div
            key={user.userId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-xl border ${getRankStyle(user.rank)} text-center relative overflow-hidden`}
          >
            {user.rank === 1 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400" />
            )}
            <div className="relative">
              <div className="absolute -top-2 -right-2">
                {getRankIcon(user.rank)}
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-dark-600"
              />
              <h3 className="text-white font-semibold">{user.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-2xl font-bold text-cyber-400">{user.points.toLocaleString()}</span>
                <span className="text-dark-400 text-sm">pts</span>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 bg-dark-800/50 rounded text-dark-300 text-xs">
                Level {user.level}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-dark-800/50 border-b border-dark-700 text-dark-400 text-sm font-medium">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-center">Level</div>
          <div className="col-span-2 text-center">Points</div>
          <div className="col-span-2 text-right">Trend</div>
        </div>
        <div className="divide-y divide-dark-800">
          {leaderboard.slice(3).map((user, idx) => (
            <motion.div
              key={user.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className={`grid grid-cols-12 gap-4 px-4 py-3 items-center ${
                user.isCurrentUser ? "bg-cyber-500/10 border-l-2 border-cyber-500" : ""
              }`}
            >
              <div className="col-span-1">
                <span className={`font-mono ${user.isCurrentUser ? "text-cyber-400" : "text-dark-400"}`}>
                  #{user.rank}
                </span>
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=1e293b&color=fff`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className={`font-medium ${user.isCurrentUser ? "text-cyber-400" : "text-white"}`}>
                  {user.name}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="px-2 py-0.5 bg-dark-800 rounded text-dark-300 text-sm">
                  Lv. {user.level}
                </span>
              </div>
              <div className="col-span-2 text-center text-white font-medium">
                {user.points.toLocaleString()}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                +125
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
