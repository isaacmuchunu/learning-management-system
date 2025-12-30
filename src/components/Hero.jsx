import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Shield, 
  ArrowRight, 
  Play
} from "lucide-react";

function Hero() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const terminalContent = [
    { text: "$ initializing_security_scan...", type: "command", delay: 800 },
    { text: "[✓] Network reconnaissance complete", type: "success", delay: 600 },
    { text: "[✓] Vulnerability assessment running", type: "success", delay: 700 },
    { text: "[✓] 3 potential vectors identified", type: "success", delay: 500 },
    { text: "[!] Exploitable service found: SSH", type: "warning", delay: 800 },
    { text: "[✓] Initiating penetration test...", type: "success", delay: 600 },
    { text: "[✓] Brute force protection: ACTIVE", type: "success", delay: 500 },
    { text: "[✓] SQL injection scan: CLEAN", type: "success", delay: 600 },
    { text: "[!] XSS vulnerability detected on /api/users", type: "warning", delay: 700 },
    { text: "[✓] Generating security report...", type: "success", delay: 500 },
    { text: "[✓] Report saved: /reports/scan_2024.pdf", type: "success", delay: 600 },
    { text: "$ scan_complete --status=success", type: "command", delay: 800 },
  ];

  useEffect(() => {
    if (currentLine < terminalContent.length) {
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, terminalContent[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, terminalContent[currentLine].delay);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setTerminalLines([]);
        setCurrentLine(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLine]);

  const getLineColor = (type) => {
    switch (type) {
      case "command": return "text-cyber-400";
      case "success": return "text-dark-300";
      case "warning": return "text-yellow-400";
      default: return "text-dark-300";
    }
  };

  const getSymbolColor = (type) => {
    switch (type) {
      case "success": return "text-cyber-500";
      case "warning": return "text-yellow-500";
      default: return "text-electric-purple";
    }
  };

  return (
    <section id="home-hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <section id="home-hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
ent-to-br from-cyber-500/5 via-transparent to-electric-blue/5"></div>
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

      <div className="relative max-w-7xl mx-auto       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
acity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-c            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/30 mb-4">
-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-500"></span>
              </span>
              <span className="text-cyber-400 text-sm font-medium">New: Advanced Red Team Course Available</span>
            </div>

            <h1 className="text-4xl sm:text-5x            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
 className="text-gradient">Cybersecurity</span>
              <br />
              with Real-World Training
            </h1>

            <p className="text-lg text-dark-300 leading-relaxed mb-8 max-w-xl">
              Gain hands-on experience with o            <p className="text-base text-dark-300 leading-relaxed mb-6 max-w-xl">
ecognized certifications. 
              Launch your cybersecurity career today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/courses            <div className="flex flex-col sm:flex-row gap-3 mb-8">
-center gap-2 px-6 py-3.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-all duration-300 glow-border"
              >
                Explore Courses
                <ArrowRight className="h-5 w-5                 className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-all duration-300 glow-border text-sm"
emibold rounded-lg border border-dark-700 hover:border-cyber-500/50 hover:bg-dark-800 transition-all duration-300">
                <Play className="h-5 w-5 text-cyber-500" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold t              <button className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-800/50 text-white font-semibold rounded-lg border border-dark-700 hover:border-cyber-500/50 hover:bg-dark-800 transition-all duration-300 text-sm">
ame="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-dark-400">Pass Rate</div>
                    <div className="flex items-center gap-6">
bg-dark-700"></div>
              <div className="text-center">
                          <div className="text-xl font-bold text-white">50K+</div>
      <div className="text-sm text-dark-400">Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
                         <div className="text-xl font-bold text-white">98%</div>
8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-dark-900/90 rounded-2xl border border-dark-700 overflow-hidden backdrop-blur-sm shadow-2xl shado                <div className="text-xl font-bold text-white">4.9</div>
x-4 py-3 bg-dark-800/90 border-b border-dark-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-dark-400 text-sm font-mono">terminal@cybershield ~ security_scan</span>
                </div>
              </div>

              <div className="p-6 font-mono text-sm min-h-[400px] max-h-[400px] overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-dark-900/90 to-transparent z-10 pointer-events-none"></div>
                <div className="space-y-2">
                  {terminalLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={getLineColor(line.type)}
                    >
                      {line.type === "command" ? (
                        <span>
                          <span className="text-electric-purple">$</span> {line.text.substring(2)}
                        </span>
                      ) : (
                        <span>
                          [<span className={getSymbolColor(line.type)}>
                            {line.type === "success" ? "✓" : "!"}
                          </span>] {line.text.substring(4)}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="flex items-center text-cyber-400 mt-4"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="text-electric-purple">$</span>
                  <span className="ml-2 border-r-2 border-cyber-500">&nbsp;</span>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-dark-900/90 to-transparent pointer-events-none"></div>
              </div>

              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-500/50 to-transparent"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
