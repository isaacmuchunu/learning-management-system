import React from "react";
import { motion } from "framer-motion";
import { stats } from "../data/stats";

function Stats() {
  return (
    <section id="stats" className="py-12 bg-gradient-to-r from-cyber-500/10 via-electric-blue/10 to-electric-purple/10 border-y border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-dark-400 font-medium text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
