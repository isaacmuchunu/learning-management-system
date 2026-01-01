import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Copy, 
  Check, 
  Terminal,
  Code,
  RotateCcw
} from "lucide-react";

function CodeEditor({ 
  initialCode = "", 
  language = "javascript",
  title = "Code Challenge",
  expectedOutput = "",
  onRun
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setIsCorrect(null);
    try {
      let result = "";
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));
      try {
        const fn = new Function(code);
        const fnResult = fn();
        if (fnResult !== undefined) {
          logs.push(String(fnResult));
        }
      } catch (err) {
        logs.push(`Error: ${err.message}`);
      }
      console.log = originalLog;
      result = logs.join("\n");
      setOutput(result);
      if (expectedOutput && result.trim() === expectedOutput.trim()) {
        setIsCorrect(true);
      } else if (expectedOutput) {
        setIsCorrect(false);
      }
      if (onRun) {
        onRun(result);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setIsCorrect(null);
  };

  const lineNumbers = code.split("\n").length;

  return (
    <div id="code-editor" className="bg-dark-900/50 rounded-2xl border border-dark-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-dark-800/50 border-b border-dark-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-cyber-500" />
            <span className="text-white font-medium text-sm">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs bg-dark-700 text-dark-300 rounded">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-dark-700 rounded transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-cyber-500" />
            ) : (
              <Copy className="h-4 w-4 text-dark-400" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-dark-700 rounded transition-colors"
          >
            <RotateCcw className="h-4 w-4 text-dark-400" />
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="py-4 px-3 bg-dark-800/30 border-r border-dark-700 text-right select-none">
          {Array.from({ length: lineNumbers }, (_, i) => (
            <div key={i} className="text-dark-600 text-sm font-mono leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-transparent text-dark-200 font-mono text-sm p-4 outline-none resize-none min-h-[200px] leading-6"
          spellCheck={false}
          placeholder="// Write your code here..."
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-dark-800/30 border-t border-dark-700">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
        >
          {isRunning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Play className="h-4 w-4" />
            </motion.div>
          ) : (
            <Play className="h-4 w-4" />
          )}
          Run Code
        </button>
        {isCorrect !== null && (
          <span className={`text-sm font-medium ${isCorrect ? "text-cyber-400" : "text-red-400"}`}>
            {isCorrect ? "✓ Correct!" : "✗ Try again"}
          </span>
        )}
      </div>

      {output && (
        <div className="border-t border-dark-700">
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 border-b border-dark-700">
            <Terminal className="h-4 w-4 text-dark-400" />
            <span className="text-dark-400 text-sm font-medium">Output</span>
          </div>
          <pre className="p-4 text-sm font-mono text-dark-200 overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
