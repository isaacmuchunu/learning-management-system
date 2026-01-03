import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, X, Send, Bot, User, 
  Sparkles, RotateCcw, Minimize2, Maximize2
} from "lucide-react";
import { useAIStore } from "../store/aiStore";

function AIChatbot() {
  const { chatHistory, loading, sendMessage, clearChat, getPersonalizedRecommendations } = useAIStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      getPersonalizedRecommendations();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const quickActions = [
    "Help me find a course",
    "Explain SQL injection",
    "Recommend a lab",
    "Career advice"
  ];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-cyber-500 rounded-full shadow-lg flex items-center justify-center text-dark-950 hover:bg-cyber-400 transition-colors z-50"
          >
            <Bot className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            id="ai-chatbot"
            className={`fixed bottom-6 right-6 bg-dark-900 rounded-xl border border-dark-700 shadow-2xl z-50 flex flex-col ${
              isMinimized ? "w-72 h-14" : "w-96 h-[500px]"
            }`}
          >
            <div className="flex items-center justify-between p-3 border-b border-dark-700 bg-gradient-to-r from-cyber-500/10 to-electric-purple/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyber-500/20 rounded-lg">
                  <Bot className="h-5 w-5 text-cyber-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">CyberShield AI</h3>
                  {!isMinimized && (
                    <span className="text-cyber-400 text-xs">Your learning assistant</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded"
                  title="Clear chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-cyber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-cyber-500" />
                      </div>
                      <h4 className="text-white font-medium mb-2">How can I help you today?</h4>
                      <p className="text-dark-400 text-sm mb-4">
                        Ask me anything about cybersecurity, courses, or your learning path.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {quickActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => setInput(action)}
                            className="px-3 py-1.5 bg-dark-800 text-dark-300 rounded-lg text-xs hover:bg-dark-700"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        message.role === "user" ? "bg-cyber-500/20" : "bg-dark-800"
                      }`}>
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-cyber-500" />
                        ) : (
                          <Bot className="h-4 w-4 text-dark-400" />
                        )}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-xl ${
                        message.role === "user"
                          ? "bg-cyber-500/10 text-white"
                          : "bg-dark-800 text-dark-200"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span className="text-dark-500 text-xs mt-1 block">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-dark-800 rounded-lg">
                        <Bot className="h-4 w-4 text-dark-400" />
                      </div>
                      <div className="bg-dark-800 p-3 rounded-xl">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-dark-500 rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-dark-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <span className="w-2 h-2 bg-dark-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-dark-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || loading}
                      className="px-3 py-2 bg-cyber-500 text-dark-950 rounded-lg hover:bg-cyber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatbot;
