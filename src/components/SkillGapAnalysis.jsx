import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Target, TrendingUp, AlertCircle, CheckCircle, 
  ChevronRight, Clock, Award
} from "lucide-react";
import { useAIStore } from "../store/aiStore";

function SkillGapAnalysis() {
  const { skillGapAnalysis, analyzeSkillGaps } = useAIStore();

  useEffect(() => {
    analyzeSkillGaps();
  }, []);

  if (!skillGapAnalysis) {
    return (
      <div className="p-8 text-center">
        <div className="w-12 h-12 border-2 border-cyber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-dark-400">Analyzing your skills...</p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-400 bg-red-500/20 border-red-500/30";
      case "medium": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "low": return "text-green-400 bg-green-500/20 border-green-500/30";
      default: return "text-dark-400 bg-dark-700";
    }
  };

  return (
    <div id="skill-gap-analysis" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyber-500/20 rounded-lg">
          <Target className="h-6 w-6 text-cyber-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Skill Gap Analysis</h2>
          <p className="text-dark-400 text-sm">AI-powered assessment of your learning journey</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="text-dark-400 text-sm mb-1">Current Level</div>
          <div className="text-2xl font-bold text-white">{skillGapAnalysis.currentLevel}</div>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="text-dark-400 text-sm mb-1">Target Role</div>
          <div className="text-2xl font-bold text-cyber-400">{skillGapAnalysis.targetRole}</div>
        </div>
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="text-dark-400 text-sm mb-1">Est. Time to Target</div>
          <div className="text-2xl font-bold text-electric-purple">{skillGapAnalysis.estimatedTimeToTarget}</div>
        </div>
      </div>

      <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          Skills to Improve
        </h3>
        <div className="space-y-4">
          {skillGapAnalysis.gaps.map((gap, idx) => (
            <motion.div
              key={gap.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-dark-800/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{gap.skill}</span>
                  <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityColor(gap.priority)}`}>
                    {gap.priority} priority
                  </span>
                </div>
                <span className="text-dark-400 text-sm">
                  {gap.currentLevel}% → {gap.requiredLevel}%
                </span>
              </div>
              <div className="relative h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-dark-500 rounded-full"
                  style={{ width: `${gap.requiredLevel}%` }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${gap.currentLevel}%` }}
                  className="absolute h-full bg-cyber-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyber-500" />
          Recommended Learning Path
        </h3>
        <div className="space-y-3">
          {skillGapAnalysis.recommendedPath.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-cyber-500/20 flex items-center justify-center text-cyber-400 font-bold">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-white">{step.action}</p>
                <div className="flex items-center gap-1 text-dark-400 text-sm mt-1">
                  <Clock className="h-3 w-3" />
                  {step.duration}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-dark-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillGapAnalysis;
