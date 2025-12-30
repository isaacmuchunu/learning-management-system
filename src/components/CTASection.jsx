import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Building, Users } from "lucide-react";

function CTASection() {
  return (
    <section id="cta-section" className="py-24 bg-dark-950 relative overflow-hidden">
    <section id="cta-section" className="py-16 bg-dark-950 relative overflow-hidden">
gradient-to-r from-cyber-500/10 via-transparent to-electric-purple/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}        <div className="grid lg:grid-cols-2 gap-6">
        viewport={{ once: true }}
            className="bg-gradient-to-br from-cyber-500/20 to-cyber-500/5 rounded-3xl p-10 border border-cyber-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0             className="bg-gradient-to-br from-cyber-500/20 to-cyber-500/5 rounded-2xl p-6 border border-cyber-500/30 relative overflow-hidden"
center gap-2 px-4 py-2 rounded-full bg-cyber-500/20 border border-cyber-500/40 mb-6">
                <Users className="h-4 w-4 text-cyber-400" />
                <span className="text-cyber-300 text-sm font-medium">For Individuals</s              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-500/20 border border-cyber-500/40 mb-4">
Career Today
              </h3>
              <p className="text-dark-300 mb-8 leading-relaxed">
                Access world-class training              <h3 className="text-2xl font-bold text-white mb-3">
in 50,000+ professionals who have transformed their careers.
              </p>

              <ul className="space-y-3 mb-8">
                {["Unlimited              <p className="text-dark-300 text-sm mb-5 leading-relaxed">
ns", "Career support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-dark-200">
                    <Sparkles className="h-5 w-5 text-cyber-400 flex-shrin              <ul className="space-y-2 mb-5">
n>
                  </li>
                ))}
              </ul>

                                <li key={item} className="flex items-center gap-2 text-dark-200 text-sm">
ms-center gap-2 px-6 py-3.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-all duration-300 text-sm"
 viewport={{ once: true }}
            className="bg-gradient-to-br from-electric-purple/20 to-electric-purple/5 rounded-3xl p-10 border border-electric-purple/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-electric-purple/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 border border-electric-purple/40 mb-6">
                <Buildi            className="bg-gradient-to-br from-electric-purple/20 to-electric-purple/5 rounded-2xl p-6 border border-electric-purple/30 relative overflow-hidden"
             <h3 className="text-3xl font-bold text-white mb-4">
                Train Your Security Team at Scale
              </h3>
              <p className="text-dark-300 mb-8 leading-relaxed">
                Custom training programs, dedicated acc              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-purple/20 border border-electric-purple/40 mb-4">
-3 mb-8">
                {["Custom learning paths", "Team progress tracking", "Dedicated support", "Volume discounts"].map((item) => (
               <h3 className="text-2xl font-bold text-white mb-3">
3 text-dark-200">
                    <Sparkles className="h-5 w-5 text-electric-purple flex-shrink-0" />
                    <span>{item}</span>
                   <p className="text-dark-300 text-sm mb-5 leading-relaxed">
          <Link
                to="/enterprise"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-electric-purple text-white font-semibold rounded-lg hover:bg-pur              <ul className="space-y-2 mb-5">
      >
                Contact Sales
                <ArrowRight className="h-5 w-5 gro                  <li key={item} className="flex items-center gap-2 text-dark-200 text-sm">
/div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;

                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-electric-purple text-white font-semibold rounded-lg hover:bg-purple-500 transition-all duration-300 text-sm"