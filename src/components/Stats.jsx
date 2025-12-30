import React from "react";
import { motion } from "framer-motion";
import { stats } from "../data/stats";

function Stats() {
  return (
    <section id="stats" className="py-20 bg-gradient-to-r from-cyber-500/10 via-electric-blue/10 to-electric-purple/10 border-y border-dark-700">
    <section id="stats" className="py-12 bg-gradient-to-r from-cyber-500/10 via-electric-blue/10 to-electric-purple/10 border-y border-dark-700">
  {stats.map((stat, index) => (
            <motion.div
              key=        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
InView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-dark-400 font-medium">{stat.la              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-1">
  );
}

export default Stats;

              <div className="text-dark-400 font-medium text-sm">{stat.label}</div>