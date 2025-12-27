import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Award, 
  Users, 
  Briefcase, 
  Globe, 
  Clock,
  Zap
} from "lucide-react";
import { features } from "../data/stats";

const iconMap = {
  Terminal: Terminal,
  Award: Award,
  Users: Users,
  Briefcase: Briefcase,
  Globe: Globe,
  Clock: Clock,
};

function Features() {
  return (
    <section id="features" className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 mb-4">
            <Zap className="h-4 w-4 text-electric-blue" />
            <span className="text-electric-blue text-sm font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Our platform provides the complete toolkit for your cybersecurity education journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Terminal;
            return (
              <motion.div
                key={index}
                id={`feature-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-dark-900/30 rounded-2xl p-8 border border-dark-700 hover:border-cyber-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-dark-800 border border-dark-600 group-hover:border-cyber-500/50 group-hover:bg-dark-700 transition-all mb-6">
                    <IconComponent className="h-7 w-7 text-cyber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-dark-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
