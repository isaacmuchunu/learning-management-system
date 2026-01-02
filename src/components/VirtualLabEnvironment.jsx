import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Server,
  Monitor,
  Maximize2,
  Download,
  Copy,
  CheckCircle,
  AlertTriangle,
  Loader2,
  ExternalLink
} from "lucide-react";
import { useLabStore } from "../store/labStore";

function VirtualLabEnvironment({ lab, session }) {
  const { resetLab, stopLab } = useLabStore();
  const [terminalOutput, setTerminalOutput] = useState([
    { type: "system", text: "Lab environment initialized..." },
    { type: "system", text: `Connected to ${lab.title}` },
    { type: "system", text: "Tools available: " + lab.tools.join(", ") },
    { type: "prompt", text: "root@lab:~$ " }
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(7200);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCommand = (e) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const cmd = currentCommand.trim();
      setTerminalOutput(prev => [
        ...prev,
        { type: "command", text: `root@lab:~$ ${cmd}` },
        { type: "output", text: simulateCommand(cmd) },
        { type: "prompt", text: "root@lab:~$ " }
      ]);
      setCurrentCommand("");
    }
  };

  const simulateCommand = (cmd) => {
    const commands = {
      "whoami": "root",
      "pwd": "/root",
      "ls": "Desktop  Documents  Downloads  scripts  tools",
      "ls -la": "total 40\ndrwxr-xr-x 6 root root 4096 Mar 15 10:00 .\ndrwxr-xr-x 1 root root 4096 Mar 15 09:00 ..\n-rw-r--r-- 1 root root  220 Mar 15 09:00 .bash_logout",
      "nmap --version": "Nmap version 7.94 ( https://nmap.org )",
      "msfconsole": "Starting Metasploit Framework console...\n\n       =[ metasploit v6.3.55-dev ]\n+ -- --=[ 2397 exploits - 1235 auxiliary - 422 post ]\n+ -- --=[ 1391 payloads - 46 encoders - 11 nops ]\n\nmsf6 > ",
      "help": "Available commands:\n  whoami, pwd, ls, nmap, msfconsole, wireshark, burpsuite, sqlmap"
    };
    return commands[cmd] || `Command '${cmd}' executed successfully`;
  };

  const handleReset = async () => {
    if (session?.id) {
      await resetLab(session.id);
      setTerminalOutput([
        { type: "system", text: "Resetting lab environment..." },
        { type: "system", text: "Lab reset complete." },
        { type: "prompt", text: "root@lab:~$ " }
      ]);
    }
  };

  return (
    <div id="virtual-lab-environment" className={`bg-dark-900 rounded-xl border border-dark-700 overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      <div className="flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-dark-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyber-500" />
            <span className="text-white font-medium text-sm">{lab.title}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            session?.status === "running" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
          }`}>
            {session?.status || "Initializing"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            timeRemaining < 600 ? "bg-red-500/20 text-red-400" : "bg-dark-700 text-dark-300"
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">{formatTime(timeRemaining)}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleReset} className="p-1.5 hover:bg-dark-700 rounded transition-colors" title="Reset Lab">
              <RotateCcw className="h-4 w-4 text-dark-400 hover:text-white" />
            </button>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1.5 hover:bg-dark-700 rounded transition-colors" title="Fullscreen">
              <Maximize2 className="h-4 w-4 text-dark-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 h-[500px]">
        <div className="lg:col-span-3 bg-dark-950 p-4 font-mono text-sm overflow-auto">
          {terminalOutput.map((line, idx) => (
            <div key={idx} className={`${
              line.type === "system" ? "text-yellow-500" :
              line.type === "command" ? "text-cyan-400" :
              line.type === "output" ? "text-dark-300 whitespace-pre-wrap" :
              "text-green-400"
            }`}>
              {line.text}
            </div>
          ))}
          <div className="flex items-center text-green-400">
            <span>root@lab:~$ </span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none text-white ml-1"
              autoFocus
            />
          </div>
        </div>

        <div className="border-l border-dark-700 bg-dark-900 p-4 overflow-auto">
          <h3 className="text-white font-semibold text-sm mb-3">Lab Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-dark-400">Category:</span>
              <span className="text-white ml-2">{lab.category}</span>
            </div>
            <div>
              <span className="text-dark-400">Difficulty:</span>
              <span className={`ml-2 ${
                lab.difficulty === "Beginner" ? "text-green-400" :
                lab.difficulty === "Intermediate" ? "text-yellow-400" :
                "text-red-400"
              }`}>{lab.difficulty}</span>
            </div>
            <div>
              <span className="text-dark-400">Type:</span>
              <span className="text-white ml-2 capitalize">{lab.type}</span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-sm mt-6 mb-3">Available Tools</h3>
          <div className="flex flex-wrap gap-2">
            {lab.tools.map((tool, idx) => (
              <span key={idx} className="px-2 py-1 bg-dark-800 text-dark-300 rounded text-xs">
                {tool}
              </span>
            ))}
          </div>

          <h3 className="text-white font-semibold text-sm mt-6 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm text-dark-300 hover:text-white transition-colors">
              <Download className="h-4 w-4" />
              Download Writeup
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm text-dark-300 hover:text-white transition-colors">
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualLabEnvironment;
