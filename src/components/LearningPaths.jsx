import React from "react";
import { motion } from "framer-motion";
import { 
  Sword, 
  Shield, 
  Building, 
  FileCheck,
  ArrowRight,
  Clock,
  BookOpen,
  Target
} from "lucide-react";

const iconMap = {
  Sword: Sword,
  Shield: Shield,
  Building: Building,
  FileCheck: FileCheck,
};

function LearningPaths({ paths }) {
  return (
    <section id="learning-paths" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-electric-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-electric-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/10 border border-electric-purple/30 mb-4">
            <Target className="h-4 w-4 text-electric-purple" />
            <span className="text-electric-purple text-sm font-medium">Career Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Structured <span className="text-gradient">Learning Paths</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Follow curated learning paths designed by industry experts to accelerate your career growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path, index) => {
            const IconComponent = iconMap[path.icon] || Shield;
            return (
              <motion.div
                key={path.id}
                id={`learning-path-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-dark-950/50 rounded-2xl border border-dark-700 p-8 hover:border-cyber-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${path.color}`}></div>
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${path.color} shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyber-400 transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-dark-400 mb-6">{path.description}</p>
                    <div className="flex items-center gap-6 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-dark-300">
                        <Clock className="h-4 w-4 text-cyber-500" />
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-dark-300">
                        <BookOpen className="h-4 w-4 text-cyber-500" />
                        <span>{path.courses} Courses</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-medium text-dark-300 mb-2">Skills You Will Learn:</div>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs bg-dark-800 text-dark-300 rounded-full border border-dark-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-medium text-dark-300 mb-2">Career Outcomes:</div>
                      <div className="flex flex-wrap gap-2">
                        {path.careers.map((career) => (
                          <span
                            key={career}
                            className="px-3 py-1 text-xs bg-cyber-500/10 text-cyber-400 rounded-full border border-cyber-500/30"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="group/btn inline-flex items-center gap-2 text-cyber-400 font-semibold hover:text-cyber-300 transition-colors">
                      Start Path
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LearningPaths;
