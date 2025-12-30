import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CourseCard from "./CourseCard";
import { courses } from "../data/courses";

function FeaturedCourses() {
  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <section id="featured-courses" className="py-16 bg-dark-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/30 mb-3">
            <Sparkles className="h-4 w-4 text-cyber-400" />
            <span className="text-cyber-400 text-sm font-medium">Top-Rated Courses</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Featured <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-dark-400 text-base max-w-2xl mx-auto">
            Start your cybersecurity journey with our most popular and highly-rated training programs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-dark-800/50 text-white font-semibold rounded-lg border border-dark-700 hover:border-cyber-500/50 hover:bg-dark-800 transition-all duration-300"
          >
            View All Courses
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedCourses;
