import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Target, 
  Flame,
  Shield,
  Award,
  Zap,
  Lock,
  ChevronRight
} from "lucide-react";

const defaultAchievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "Star",
    points: 10,
    unlocked: true,
    category: "Beginner"
  },
  {
    id: 2,
    title: "Quiz Master",
    description: "Score 100% on any quiz",
    icon: "Target",
    points: 25,
    unlocked: true,
    category: "Assessment"
  },
  {
    id: 3,
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "Flame",
    points: 50,
    unlocked: true,
    category: "Consistency"
  },
  {
    id: 4,
    title: "Course Champion",
    description: "Complete an entire course",
    icon: "Trophy",
    points: 100,
    unlocked: false,
    progress: 75,
    category: "Completion"
  },
  {
    id: 5,
    title: "Security Specialist",
    description: "Complete 5 security courses",
    icon: "Shield",
    points: 250,
    unlocked: false,
    progress: 40,
    category: "Mastery"
  },
  {
    id: 6,
    title: "Speed Learner",
    description: "Complete 10 lessons in one day",
    icon: "Zap",
    points: 75,
    unlocked: false,
    progress: 30,
    category: "Performance"
  }
];

const iconMap = {
  Star: Star,
  Target: Target,
  Flame: Flame,
  Trophy: Trophy,
  Shield: Shield,
  Award: Award,
  Zap: Zap
};

function AchievementSystem({ achievements = defaultAchievements, totalPoints = 85 }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const categories = ["All", ...new Set(achievements.map(a => a.category))];
  const filteredAchievements = selectedCategory === "All" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPossiblePoints = achievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div id="achievement-system" className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyber-500/20">
              <Trophy className="h-5 w-5 text-cyber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{unlockedCount}</p>
              <p className="text-dark-400 text-xs">Unlocked</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-electric-purple/20">
              <Star className="h-5 w-5 text-electric-purple" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalPoints}</p>
              <p className="text-dark-400 text-xs">Total Points</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-electric-blue/20">
              <Target className="h-5 w-5 text-electric-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{achievements.length - unlockedCount}</p>
              <p className="text-dark-400 text-xs">Remaining</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Flame className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{Math.round((totalPoints / totalPossiblePoints) * 100)}%</p>
              <p className="text-dark-400 text-xs">Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-cyber-500 text-dark-950"
                : "bg-dark-800 text-dark-300 hover:bg-dark-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => {
          const IconComponent = iconMap[achievement.icon] || Award;
          return (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedAchievement(achievement)}
              className={`relative bg-dark-900/50 rounded-xl p-4 border cursor-pointer transition-all ${
                achievement.unlocked
                  ? "border-cyber-500/30 hover:border-cyber-500/50"
                  : "border-dark-700 hover:border-dark-600"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-cyber-500/20 to-cyber-500/5"
                    : "bg-dark-800"
                }`}>
                  {achievement.unlocked ? (
                    <IconComponent className="h-6 w-6 text-cyber-500" />
                  ) : (
                    <Lock className="h-6 w-6 text-dark-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${achievement.unlocked ? "text-white" : "text-dark-400"}`}>
                      {achievement.title}
                    </h3>
                    <span className={`text-sm font-medium ${achievement.unlocked ? "text-cyber-400" : "text-dark-500"}`}>
                      +{achievement.points}
                    </span>
                  </div>
                  <p className="text-dark-400 text-sm mt-1">{achievement.description}</p>
                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-dark-500">Progress</span>
                        <span className="text-dark-400">{achievement.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-dark-500 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-500 animate-pulse"></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-900 rounded-2xl p-6 max-w-md w-full border border-dark-700"
            >
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                  selectedAchievement.unlocked
                    ? "bg-gradient-to-br from-cyber-500/20 to-cyber-500/5"
                    : "bg-dark-800"
                }`}>
                  {selectedAchievement.unlocked ? (
                    React.createElement(iconMap[selectedAchievement.icon] || Award, {
                      className: "h-10 w-10 text-cyber-500"
                    })
                  ) : (
                    <Lock className="h-10 w-10 text-dark-500" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedAchievement.title}</h2>
                <p className="text-dark-400 mb-4">{selectedAchievement.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-500/20 text-cyber-400">
                  <Star className="h-4 w-4" />
                  <span className="font-bold">+{selectedAchievement.points} points</span>
                </div>
                <p className="text-dark-500 text-sm mt-4">
                  Category: {selectedAchievement.category}
                </p>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full mt-6 py-3 bg-dark-800 text-white font-medium rounded-lg hover:bg-dark-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AchievementSystem;
