import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";

function AdminDashboard() {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { 
      icon: Users, 
      label: "Total Users", 
      value: stats.totalUsers.toLocaleString(),
      change: "+12%",
      up: true,
      color: "bg-blue-500/10 text-blue-400"
    },
    { 
      icon: BookOpen, 
      label: "Total Courses", 
      value: stats.totalCourses,
      change: "+2",
      up: true,
      color: "bg-purple-500/10 text-purple-400"
    },
    { 
      icon: TrendingUp, 
      label: "Enrollments", 
      value: stats.totalEnrollments.toLocaleString(),
      change: "+8%",
      up: true,
      color: "bg-green-500/10 text-green-400"
    },
    { 
      icon: DollarSign, 
      label: "Revenue", 
      value: `$${stats.revenue.toLocaleString()}`,
      change: "+15%",
      up: true,
      color: "bg-cyber-500/10 text-cyber-400"
    }
  ];

  const recentActivity = [
    { action: "New enrollment", user: "John Doe", course: "Ethical Hacking", time: "2 min ago" },
    { action: "Course completed", user: "Jane Smith", course: "SOC Analyst", time: "15 min ago" },
    { action: "New signup", user: "Mike Johnson", course: null, time: "1 hour ago" },
    { action: "Certificate issued", user: "Sarah Wilson", course: "Cloud Security", time: "2 hours ago" }
  ];

  return (
    <div id="admin-dashboard" className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-dark-400 text-sm">Monitor your platform performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-900/50 rounded-xl p-4 border border-dark-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-green-400" : "text-red-400"}`}>
                {stat.change}
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-dark-400 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <h2 className="text-base font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-dark-800/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyber-500/20 flex items-center justify-center">
                  <span className="text-cyber-500 font-medium text-xs">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.user}</span>
                    {" "}<span className="text-dark-400">{activity.action}</span>
                    {activity.course && <span className="text-cyber-400"> {activity.course}</span>}
                  </p>
                  <p className="text-dark-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <h2 className="text-base font-bold text-white mb-4">Top Courses</h2>
          <div className="space-y-3">
            {[
              { name: "Ethical Hacking Fundamentals", students: 2847, progress: 85 },
              { name: "SOC Analyst Level 1", students: 3421, progress: 100 },
              { name: "Incident Response", students: 1893, progress: 60 },
              { name: "Cloud Security Essentials", students: 2156, progress: 75 }
            ].map((course, index) => (
              <div key={index} className="p-2 bg-dark-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white text-sm font-medium truncate">{course.name}</p>
                  <span className="text-dark-400 text-xs">{course.students.toLocaleString()} students</span>
                </div>
                <div className="h-1.5 bg-dark-700 rounded-full">
                  <div 
                    className="h-full bg-cyber-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
