import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Play, Award, TrendingUp } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCourseStore } from "../store/courseStore";

function MyCourses() {
  const { user } = useAuthStore();
  const { enrollments, fetchEnrollments, courses } = useCourseStore();

  useEffect(() => {
    if (user) {
      fetchEnrollments(user.id);
    }
  }, [user, fetchEnrollments]);

  const enrolledCourses = enrollments.map(e => ({
    ...e,
    course: e.courses || courses.find(c => c.id === e.course_id)
  }));

  return (
    <main id="my-courses-page" className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-dark-400">Continue your learning journey</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Enrolled", value: enrolledCourses.length, color: "text-cyber-500" },
            { icon: Play, label: "In Progress", value: enrolledCourses.filter(e => !e.completed).length, color: "text-electric-blue" },
            { icon: Award, label: "Completed", value: enrolledCourses.filter(e => e.completed).length, color: "text-electric-purple" },
            { icon: TrendingUp, label: "Avg Progress", value: "25%", color: "text-green-500" },
          ].map((stat, index) => (
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
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-dark-400 text-xs">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment, index) => (
              <motion.div
                key={enrollment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={enrollment.course?.image}
                    alt={enrollment.course?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent"></div>
                  <Link
                    to={`/courses/${enrollment.course?.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-14 h-14 rounded-full bg-cyber-500/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-dark-950 ml-1" />
                    </div>
                  </Link>
                </div>

                <div className="p-4">
                  <span className="text-cyber-400 text-xs font-medium">{enrollment.course?.category}</span>
                  <h3 className="text-white font-medium mt-1 mb-3 line-clamp-2">
                    {enrollment.course?.title}
                  </h3>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-dark-400">Progress</span>
                      <span className="text-cyber-400 font-medium">{enrollment.progress || 25}%</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-500 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress || 25}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-dark-400 text-xs">
                      <Clock className="h-3.5 w-3.5" />
                      {enrollment.course?.duration}
                    </div>
                    <Link
                      to={`/courses/${enrollment.course?.id}`}
                      className="text-cyber-400 text-sm font-medium hover:text-cyber-300 transition-colors"
                    >
                      Continue →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-dark-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Courses Yet</h2>
            <p className="text-dark-400 mb-6">Start your learning journey by enrolling in a course</p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyCourses;
