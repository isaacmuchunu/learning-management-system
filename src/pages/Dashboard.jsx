import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Award, TrendingUp, Play, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCourseStore } from "../store/courseStore";

function Dashboard() {
  const { user, profile } = useAuthStore();
  const { courses, enrollments, fetchEnrollments } = useCourseStore();

  useEffect(() => {
    if (user) {
      fetchEnrollments(user.id);
    }
  }, [user]);

  const enrolledCourses = enrollments.slice(0, 3);
  const recommendedCourses = courses.filter(c => c.featured).slice(0, 3);

  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: enrollments.length || 0, color: "text-cyber-500" },
    { icon: Clock, label: "Hours Learned", value: "24h", color: "text-electric-blue" },
    { icon: Award, label: "Certifications", value: 0, color: "text-electric-purple" },
    { icon: TrendingUp, label: "Avg. Progress", value: "0%", color: "text-green-500" }
  ];

  return (
    <main id="dashboard-page" className="min-h-screen bg-dark-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {profile?.full_name || "Student"}
          </h1>
          <p className="text-dark-400 text-sm">Continue your cybersecurity journey</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 rounded-xl p-4 border border-dark-700"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-dark-800 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-dark-400 text-xs">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">My Courses</h2>
              <Link to="/my-courses" className="text-cyber-400 text-sm hover:text-cyber-300">
                View All
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="space-y-3">
                {enrolledCourses.map((enrollment, index) => (
                  <motion.div
                    key={enrollment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-900/50 rounded-xl p-4 border border-dark-700 flex items-center gap-4"
                  >
                    <img
                      src={enrollment.courses?.image}
                      alt={enrollment.courses?.title}
                      className="w-20 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{enrollment.courses?.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-1 h-1.5 bg-dark-700 rounded-full">
                          <div className="h-full w-[25%] bg-cyber-500 rounded-full"></div>
                        </div>
                        <span className="text-dark-400 text-xs">25%</span>
                      </div>
                    </div>
                    <button className="p-2 bg-cyber-500/10 rounded-lg text-cyber-400 hover:bg-cyber-500 hover:text-dark-950 transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-dark-900/50 rounded-xl p-8 border border-dark-700 text-center">
                <BookOpen className="h-10 w-10 text-dark-500 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-1">No Courses Yet</h3>
                <p className="text-dark-400 text-sm mb-4">Start learning by enrolling in a course</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm"
                >
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-4">Recommended</h2>
            <div className="space-y-3">
              {recommendedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-900/50 rounded-xl p-3 border border-dark-700"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-24 rounded-lg object-cover mb-2"
                  />
                  <h3 className="text-white font-medium text-sm line-clamp-1">{course.title}</h3>
                  <p className="text-dark-400 text-xs mt-0.5">{course.duration}</p>
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-2 w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-dark-800 text-cyber-400 text-xs font-medium rounded-lg hover:bg-cyber-500 hover:text-dark-950 transition-colors"
                  >
                    View Course
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
