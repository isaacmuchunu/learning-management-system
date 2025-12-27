import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Shield, 
  ArrowRight, 
  Play,
  Lock,
  Fingerprint,
  Wifi
} from "lucide-react";

function Hero() {
  return (
    <section id="home-hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 via-transparent to-electric-blue/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,255,157,0.1) 50px, rgba(0,255,157,0.1) 51px),
                               repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,255,157,0.1) 50px, rgba(0,255,157,0.1) 51px)`
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-500/10 border border-cyber-500/30 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-500"></span>
              </span>
              <span className="text-cyber-400 text-sm font-medium">New: Advanced Red Team Course Available</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Master{" "}
              <span className="text-gradient">Cybersecurity</span>
              <br />
              with Real-World Training
            </h1>

            <p className="text-lg text-dark-300 leading-relaxed mb-8 max-w-xl">
              Gain hands-on experience with our cutting-edge virtual labs, 
              expert-led courses, and industry-recognized certifications. 
              Launch your cybersecurity career today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-all duration-300 glow-border"
              >
                Explore Courses
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark-800/50 text-white font-semibold rounded-lg border border-dark-700 hover:border-cyber-500/50 hover:bg-dark-800 transition-all duration-300">
                <Play className="h-5 w-5 text-cyber-500" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-dark-400">Students</div>
              </div>
              <div className="w-px h-12 bg-dark-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-dark-400">Pass Rate</div>
              </div>
              <div className="w-px h-12 bg-dark-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-sm text-dark-400">Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-dark-900/80 rounded-2xl border border-dark-700 overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-800/80 border-b border-dark-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-dark-400 text-sm font-mono">terminal@cybershield</span>
                </div>
              </div>

              <div className="p-6 font-mono text-sm">
                <div className="text-cyber-400 mb-2">
                  <span className="text-electric-purple">$</span> initializing_security_scan...
                </div>
                <div className="text-dark-300 mb-2">
                  [<span className="text-cyber-500">✓</span>] Network reconnaissance complete
                </div>
                <div className="text-dark-300 mb-2">
                  [<span className="text-cyber-500">✓</span>] Vulnerability assessment running
                </div>
                <div className="text-dark-300 mb-2">
                  [<span className="text-cyber-500">✓</span>] 3 potential vectors identified
                </div>
                <div className="text-dark-300 mb-2">
                  [<span className="text-yellow-500">!</span>] Exploitable service found: SSH
                </div>
                <div className="text-dark-300 mb-4">
                  [<span className="text-cyber-500">✓</span>] Report generated successfully
                </div>
                <div className="flex items-center text-cyber-400">
                  <span className="text-electric-purple">$</span>
                  <span className="ml-2 border-r-2 border-cyber-500 animate-blink">&nbsp;</span>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-4 bg-dark-800/90 rounded-xl border border-cyber-500/30 backdrop-blur-sm"
            >
              <Lock className="h-8 w-8 text-cyber-500" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 p-4 bg-dark-800/90 rounded-xl border border-electric-blue/30 backdrop-blur-sm"
            >
              <Fingerprint className="h-8 w-8 text-electric-blue" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute top-1/2 -right-10 p-4 bg-dark-800/90 rounded-xl border border-electric-purple/30 backdrop-blur-sm"
            >
              <Wifi className="h-8 w-8 text-electric-purple" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
