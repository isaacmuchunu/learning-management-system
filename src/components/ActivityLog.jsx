import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, Filter, Download, Search,
  BookOpen, Award, Terminal, CheckCircle,
  Clock, User, Globe
} from "lucide-react";
import { useUserManagementStore } from "../store/userManagementStore";

const activityIcons = {
  course_started: BookOpen,
  course_completed: CheckCircle,
  quiz_completed: Award,
  lab_accessed: Terminal,
  certificate_earned: Award,
  login: User,
  default: Activity
};

const activityColors = {
  course_started: "text-blue-400 bg-blue-500/20",
  course_completed: "text-green-400 bg-green-500/20",
  quiz_completed: "text-purple-400 bg-purple-500/20",
  lab_accessed: "text-cyan-400 bg-cyan-500/20",
  certificate_earned: "text-yellow-400 bg-yellow-500/20",
  login: "text-dark-400 bg-dark-700"
};

function ActivityLog({ userId = null }) {
  const { activityLogs, fetchActivityLogs } = useUserManagementStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    fetchActivityLogs(userId);
  }, [userId]);

  const activityTypes = ["all", "course_started", "course_completed", "quiz_completed", "lab_accessed", "certificate_earned"];

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || log.action === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div id="activity-log" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyber-500" />
          Activity Log
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 text-sm">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activities..."
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
        >
          {activityTypes.map(type => (
            <option key={type} value={type}>{type === "all" ? "All Activities" : type.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredLogs.map((log, index) => {
          const IconComponent = activityIcons[log.action] || activityIcons.default;
          const colorClass = activityColors[log.action] || activityColors.login;

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-dark-900/50 rounded-lg border border-dark-700"
            >
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-white">{log.details}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-dark-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {log.ip}
                  </span>
                </div>
              </div>
              <span className="px-2 py-1 bg-dark-800 text-dark-400 rounded text-xs capitalize">
                {log.action.replace("_", " ")}
              </span>
            </motion.div>
          );
        })}

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-dark-400">
            No activity logs found
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityLog;
