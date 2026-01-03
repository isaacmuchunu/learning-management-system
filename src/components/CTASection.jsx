import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section id="cta-section" className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-500/10 via-transparent to-electric-purple/10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-500/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your <span className="text-gradient">Cybersecurity Journey</span> Today
          </h2>
          <p className="text-dark-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of security professionals who have advanced their careers with our comprehensive training platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/signup"
              className="px-8 py-4 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/courses"
              className="px-8 py-4 bg-dark-800 text-white font-semibold rounded-lg hover:bg-dark-700 transition-colors border border-dark-600"
            >
              Browse Courses
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-dark-400">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyber-500" />
              <span>Industry Recognized</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyber-500" />
              <span>12,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-cyber-500" />
              <span>Certification Prep</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
