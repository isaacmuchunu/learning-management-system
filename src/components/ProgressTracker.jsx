import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target,
  Calendar,
  Flame,
  Award
} from "lucide-react";

function ProgressTracker({ 
  totalHours = 24,
  completedLessons = 47,
  currentStreak = 12,
  weeklyGoal = 10,
  weeklyProgress = 7,
  certificates = 3
}) {
  const weeklyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 0 },
    { day: "Fri", hours: 2.1 },
    { day: "Sat", hours: 4.5 },
    { day: "Sun", hours: 1.2 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  const weeklyPercentage = Math.round((weeklyProgress / weeklyGoal) * 100);

  return (
    <div id="progress-tracker" className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Total Hours", value: `${totalHours}h`, color: "text-cyber-500", bg: "bg-cyber-500/20" },
          { icon: BookOpen, label: "Lessons Completed", value: completedLessons, color: "text-electric-blue", bg: "bg-electric-blue/20" },
          { icon: Flame, label: "Current Streak", value: `${currentStreak} days`, color: "text-orange-500", bg: "bg-orange-500/20" },
          { icon: Award, label: "Certificates", value: certificates, color: "text-electric-purple", bg: "bg-electric-purple/20" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-900/50 rounded-xl p-4 border border-dark-700"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-dark-400 text-xs">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-900/50 rounded-xl p-5 border border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyber-500" />
              Weekly Activity
            </h3>
            <span className="text-dark-400 text-sm">{weeklyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h total</span>
          </div>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.hours / maxHours) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`w-full rounded-t ${data.hours > 0 ? "bg-cyber-500" : "bg-dark-700"}`}
                  style={{ minHeight: data.hours > 0 ? "8px" : "4px" }}
                />
                <span className="text-dark-500 text-xs">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 rounded-xl p-5 border border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Target className="h-5 w-5 text-electric-purple" />
              Weekly Goal
            </h3>
            <span className={`text-sm font-medium ${weeklyPercentage >= 100 ? "text-cyber-400" : "text-dark-400"}`}>
              {weeklyProgress}/{weeklyGoal} hours
            </span>
          </div>
          <div className="relative pt-4">
            <div className="h-4 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${weeklyPercentage >= 100 ? "bg-cyber-500" : "bg-electric-purple"}`}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-dark-500 text-xs">0h</span>
              <span className={`text-sm font-bold ${weeklyPercentage >= 100 ? "text-cyber-400" : "text-white"}`}>
                {weeklyPercentage}%
              </span>
              <span className="text-dark-500 text-xs">{weeklyGoal}h</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-700">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-dark-400" />
              <span className="text-dark-400 text-sm">
                {weeklyPercentage >= 100 
                  ? "Goal achieved! Great job!" 
                  : `${weeklyGoal - weeklyProgress} more hours to reach your goal`
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-900/50 rounded-xl p-5 border border-dark-700">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Learning Streak Calendar
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, i) => {
            const isActive = i < 12 || (i > 14 && i < 22);
            const isToday = i === 21;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`aspect-square rounded-lg ${
                  isToday 
                    ? "bg-cyber-500 ring-2 ring-cyber-400"
                    : isActive 
                      ? "bg-cyber-500/50" 
                      : "bg-dark-800"
                }`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-dark-400">
          <span>4 weeks ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
