import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flag, 
  Trophy, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Lock,
  Award
} from "lucide-react";
import { useLabStore } from "../store/labStore";
import Swal from "sweetalert2";

const categoryColors = {
  "Web": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Pwn": "bg-red-500/20 text-red-400 border-red-500/30",
  "Forensics": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Cryptography": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Reversing": "bg-green-500/20 text-green-400 border-green-500/30",
  "Network": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
};

function CTFChallenge({ challenge, userSolved = false }) {
  const { submitFlag } = useLabStore();
  const [expanded, setExpanded] = useState(false);
  const [flagInput, setFlagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [solved, setSolved] = useState(userSolved);

  const handleSubmit = async () => {
    if (!flagInput.trim()) return;
    setSubmitting(true);
    const result = await submitFlag(challenge.id, flagInput.trim());
    if (result.correct) {
      setSolved(true);
      Swal.fire({
        title: "Correct! 🎉",
        text: `You earned ${result.points} points!`,
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    } else {
      Swal.fire({
        title: "Incorrect Flag",
        text: "Try again!",
        icon: "error",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    }
    setFlagInput("");
    setSubmitting(false);
  };

  return (
    <motion.div
      id={`ctf-challenge-${challenge.id}`}
      layout
      className={`bg-dark-900/50 rounded-xl border ${
        solved ? "border-cyber-500/50" : "border-dark-700"
      } overflow-hidden`}
    >
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-dark-800/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${solved ? "bg-cyber-500/20" : "bg-dark-800"}`}>
            {solved ? (
              <CheckCircle className="h-5 w-5 text-cyber-500" />
            ) : (
              <Flag className="h-5 w-5 text-dark-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold ${solved ? "text-cyber-400" : "text-white"}`}>
                {challenge.title}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs border ${categoryColors[challenge.category]}`}>
                {challenge.category}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-dark-400">
              <span className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                {challenge.points} pts
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {challenge.solves} solves
              </span>
              <span className={`${
                challenge.difficulty === "Easy" ? "text-green-400" :
                challenge.difficulty === "Medium" ? "text-yellow-400" :
                "text-red-400"
              }`}>
                {challenge.difficulty}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-bold text-cyber-400">{challenge.points}</span>
            <span className="text-dark-400 text-sm ml-1">pts</span>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5 text-dark-400" /> : <ChevronDown className="h-5 w-5 text-dark-400" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-dark-700"
          >
            <div className="p-4 space-y-4">
              <p className="text-dark-300 text-sm">
                Solve this challenge to prove your skills in {challenge.category.toLowerCase()}. 
                Submit the flag in the format: CTF{"{flag}"}
              </p>

              {!solved && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="CTF{your_flag_here}"
                    className="flex-1 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 font-mono text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !flagInput.trim()}
                    className="px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {submitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Zap className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Flag className="h-4 w-4" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              )}

              {solved && (
                <div className="flex items-center gap-2 px-4 py-3 bg-cyber-500/10 border border-cyber-500/30 rounded-lg">
                  <Award className="h-5 w-5 text-cyber-500" />
                  <span className="text-cyber-400 font-medium">Challenge Completed!</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button className="text-sm text-dark-400 hover:text-cyber-400 transition-colors">
                  View Hints (costs points)
                </button>
                <span className="text-dark-600">•</span>
                <button className="text-sm text-dark-400 hover:text-cyber-400 transition-colors">
                  Download Files
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CTFChallenge;
