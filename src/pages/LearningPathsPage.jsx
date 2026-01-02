import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Target, Clock, BookOpen, Trophy, 
  ChevronRight, Lock, CheckCircle, Zap
} from "lucide-react";
import { useLearningPathStore } from "../store/learningPathStore";

function LearningPathsPage() {
  const { paths, adaptiveRecommendations, fetchPaths, getAdaptiveRecommendations } = useLearningPathStore();
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    fetchPaths();
    getAdaptiveRecommendations();
  }, []);

  const roleColors = {
    "SOC Analyst": "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    "Pentester": "from-red-500/20 to-orange-500/20 border-red-500/30",
    "Cloud Security": "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    "IR Specialist": "from-green-500/20 to-teal-500/20 border-green-500/30"
  };

  return (
    <main id="learning-paths-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Career <span className="text-gradient">Learning Paths</span>
          </h1>
          <p className="text-dark-400">Structured training paths to accelerate your cybersecurity career</p>
        </motion.div>

        {adaptiveRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-cyber-500/10 to-electric-purple/10 rounded-xl p-6 border border-cyber-500/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-cyber-500" />
              <h2 className="text-lg font-bold text-white">Personalized Recommendations</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {adaptiveRecommendations.map((rec, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-lg p-4 border border-dark-700">
                  <span className="text-xs text-cyber-400 uppercase">{rec.type}</span>
                  <h3 className="text-white font-medium mt-1">{rec.title}</h3>
                  <p className="text-dark-400 text-sm mt-1">{rec.reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${roleColors[path.role]} rounded-xl border overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-cyber-400 uppercase tracking-wider">{path.role}</span>
                    <h2 className="text-xl font-bold text-white mt-1">{path.title}</h2>
                  </div>
                  {path.adaptive && (
                    <span className="px-2 py-1 bg-cyber-500/20 text-cyber-400 rounded text-xs flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Adaptive
                    </span>
                  )}
                </div>
                <p className="text-dark-300 text-sm mb-4">{path.description}</p>
                <div className="flex items-center gap-4 text-sm text-dark-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {path.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {path.courses} courses
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {path.levels.map((level, idx) => {
                    const isCompleted = level.completed;
                    const isLocked = level.locked;
                    const progress = level.progress || (isCompleted ? 100 : 0);
                    return (
                      <div
                        key={level.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          isLocked ? "bg-dark-900/30" : "bg-dark-900/50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? "bg-cyber-500 text-dark-950" :
                          isLocked ? "bg-dark-700 text-dark-500" :
                          "bg-dark-700 text-dark-300"
                        }`}>
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> :
                           isLocked ? <Lock className="h-4 w-4" /> :
                           <span className="text-sm font-medium">{idx + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${isLocked ? "text-dark-500" : "text-white"}`}>
                              {level.title}
                            </span>
                            <span className="text-dark-500 text-xs">{level.courses} courses</span>
                          </div>
                          {!isLocked && !isCompleted && (
                            <div className="h-1 bg-dark-700 rounded-full mt-2 overflow-hidden">
                              <div
                                className="h-full bg-cyber-500 rounded-full"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {path.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-dark-800/50 text-dark-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {path.careers.map((career, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyber-500/10 text-cyber-400 rounded text-xs border border-cyber-500/30">
                      {career}
                    </span>
                  ))}
                </div>

                <button className="w-full py-3 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2">
                  {path.levels[0].completed ? "Continue Path" : "Start Path"}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default LearningPathsPage;
