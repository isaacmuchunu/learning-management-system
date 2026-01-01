import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Play,
  ChevronRight,
  Zap,
  Target,
  Trophy,
  Flame
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCourseStore } from "../store/courseStore";
import ProgressTracker from "../components/ProgressTracker";
import AchievementSystem from "../components/AchievementSystem";
import QuizSystem from "../components/QuizSystem";

function Dashboard() {
  const { user } = useAuthStore();
  const { enrollments } = useCourseStore();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: enrollments.length || 3, color: "text-cyber-500", bg: "bg-cyber-500/20" },
    { icon: Clock, label: "Hours Learned", value: "24h", color: "text-electric-blue", bg: "bg-electric-blue/20" },
    { icon: Award, label: "Certificates", value: 2, color: "text-electric-purple", bg: "bg-electric-purple/20" },
    { icon: Flame, label: "Day Streak", value: 12, color: "text-orange-500", bg: "bg-orange-500/20" }
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Ethical Hacking Fundamentals",
      progress: 75,
      nextLesson: "SQL Injection Techniques",
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=hacking,cybersecurity,computer"
    },
    {
      id: 2,
      title: "Network Security Essentials",
      progress: 45,
      nextLesson: "Firewall Configuration",
      image: "https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=network,security,server"
    },
    {
      id: 3,
      title: "Penetration Testing",
      progress: 20,
      nextLesson: "Reconnaissance Methods",
      image: "https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=600&search_term=penetration,testing,security"
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "progress", label: "Progress", icon: Target },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "quiz", label: "Quick Quiz", icon: Zap }
  ];

  return (
    <main id="dashboard-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split("@")[0] || "Learner"}!
          </h1>
          <p className="text-dark-400">Continue your cybersecurity journey</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-dark-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-cyber-500 text-dark-950"
                  : "text-dark-400 hover:text-white hover:bg-dark-800"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
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

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Continue Learning</h2>
                <Link to="/my-courses" className="text-cyber-400 text-sm hover:text-cyber-300 flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden group"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent"></div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="w-12 h-12 rounded-full bg-cyber-500/90 flex items-center justify-center">
                          <Play className="h-5 w-5 text-dark-950 ml-0.5" />
                        </div>
                      </Link>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium text-sm mb-2 line-clamp-1">{course.title}</h3>
                      <p className="text-dark-500 text-xs mb-3">Next: {course.nextLesson}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-cyber-500 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-cyber-400 text-xs font-medium">{course.progress}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyber-500/20 to-electric-purple/20 rounded-xl p-6 border border-cyber-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Daily Challenge</h3>
                  <p className="text-dark-300 text-sm">Complete today&apos;s security challenge to earn bonus points!</p>
                </div>
                <button className="px-5 py-2.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors text-sm">
                  Start Challenge
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "progress" && <ProgressTracker />}
        {activeTab === "achievements" && <AchievementSystem />}
        {activeTab === "quiz" && (
          <div className="max-w-2xl mx-auto">
            <QuizSystem />
          </div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
