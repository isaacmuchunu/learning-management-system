import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, BookOpen, DollarSign } from "lucide-react";

function AdminAnalytics() {
  const monthlyData = [
    { month: "Jan", users: 120, enrollments: 85, revenue: 42500 },
    { month: "Feb", users: 145, enrollments: 110, revenue: 55000 },
    { month: "Mar", users: 180, enrollments: 142, revenue: 71000 },
    { month: "Apr", users: 210, enrollments: 175, revenue: 87500 },
    { month: "May", users: 265, enrollments: 220, revenue: 110000 },
    { month: "Jun", users: 330, enrollments: 285, revenue: 125000 }
  ];

  const maxEnrollments = Math.max(...monthlyData.map(d => d.enrollments));

  return (
    <div id="admin-analytics" className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Analytics</h1>
        <p className="text-dark-400 text-sm">Platform performance insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <h2 className="text-base font-bold text-white mb-4">Monthly Enrollments</h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.enrollments / maxEnrollments) * 100}%` }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full bg-cyber-500 rounded-t-lg min-h-[8px]"
                ></motion.div>
                <span className="text-dark-400 text-xs mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <h2 className="text-base font-bold text-white mb-4">Revenue Growth</h2>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-dark-400 text-xs w-8">{data.month}</span>
                <div className="flex-1 h-3 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.revenue / 125000) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-cyber-500 to-electric-blue rounded-full"
                  ></motion.div>
                </div>
                <span className="text-white text-xs w-16 text-right">${(data.revenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-dark-300 text-sm">User Growth</span>
          </div>
          <p className="text-2xl font-bold text-white">+175%</p>
          <p className="text-green-400 text-xs">Compared to last quarter</p>
        </div>
        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <BookOpen className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-dark-300 text-sm">Completion Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">78%</p>
          <p className="text-green-400 text-xs">+12% from last month</p>
        </div>
        <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-cyber-500/10">
              <DollarSign className="h-4 w-4 text-cyber-400" />
            </div>
            <span className="text-dark-300 text-sm">Avg. Order Value</span>
          </div>
          <p className="text-2xl font-bold text-white">$485</p>
          <p className="text-green-400 text-xs">+8% increase</p>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
