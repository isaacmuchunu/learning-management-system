import React from "react";
import { motion } from "framer-motion";
import LearningPaths from "../components/LearningPaths";
import { learningPaths } from "../data/learningPaths";

function LearningPathsPage() {
  return (
    <main id="learning-paths-page" className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Career <span className="text-gradient">Learning Paths</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Follow structured tracks designed by industry experts to accelerate your cybersecurity career.
          </p>
        </motion.div>
      </div>
      <LearningPaths paths={learningPaths} />
    </main>
  );
}

export default LearningPathsPage;
