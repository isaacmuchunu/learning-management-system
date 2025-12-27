import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Clock, 
  Users, 
  Star, 
  Award, 
  ArrowRight,
  BookOpen
} from "lucide-react";

function CourseCard({ course, index }) {
  const levelColors = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <motion.div
      id={`course-card-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-dark-900/50 rounded-2xl border border-dark-700 overflow-hidden hover:border-cyber-500/50 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${levelColors[course.level]}`}>
            {course.level}
          </span>
          {course.certification && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyber-500/20 text-cyber-400 border border-cyber-500/30 flex items-center gap-1">
              <Award className="h-3 w-3" />
              Certified
            </span>
          )}
        </div>

        {course.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full bg-electric-purple text-white">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <span className="text-cyber-400 text-sm font-medium">{course.category}</span>
        <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-cyber-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs bg-dark-800 text-dark-300 rounded-md"
            >
              {skill}
            </span>
          ))}
          {course.skills.length > 3 && (
            <span className="px-2 py-1 text-xs bg-dark-800 text-cyber-400 rounded-md">
              +{course.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-dark-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-dark-700">
          <div>
            <span className="text-2xl font-bold text-white">${course.price}</span>
            <span className="text-dark-500 text-sm ml-1">USD</span>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-cyber-500/10 text-cyber-400 font-medium rounded-lg border border-cyber-500/30 hover:bg-cyber-500 hover:text-dark-950 transition-all duration-300"
          >
            <BookOpen className="h-4 w-4" />
            View Course
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default CourseCard;
