import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Users, MessageSquare, Hand, Send, 
  Mic, MicOff, Camera, CameraOff, Monitor,
  ThumbsUp, BarChart, Clock, Calendar
} from "lucide-react";
import { useLiveSessionStore } from "../store/liveSessionStore";

function LiveSessionViewer({ session }) {
  const { submitQuestion, submitPollResponse } = useLiveSessionStore();
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Alex Chen", message: "Great explanation of the concept!", time: "2 min ago", isInstructor: true },
    { id: 2, user: "John Doe", message: "Could you repeat that last part?", time: "1 min ago" },
    { id: 3, user: "Sarah Miller", message: "This is really helpful, thank you!", time: "Just now" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [handRaised, setHandRaised] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const activePoll = {
    question: "Which attack vector is most commonly exploited?",
    options: [
      { id: 1, text: "Phishing", votes: 45, percentage: 45 },
      { id: 2, text: "SQL Injection", votes: 25, percentage: 25 },
      { id: 3, text: "Brute Force", votes: 15, percentage: 15 },
      { id: 4, text: "Zero-Day", votes: 15, percentage: 15 }
    ],
    totalVotes: 100
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      { id: Date.now(), user: "You", message: newMessage, time: "Just now" }
    ]);
    setNewMessage("");
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    submitQuestion(session?.id, question);
    setQuestion("");
  };

  return (
    <div id="live-session-viewer" className="bg-dark-950 min-h-screen">
      <div className="grid lg:grid-cols-4 h-screen">
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex-1 bg-dark-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-purple/20 mx-auto mb-4 flex items-center justify-center">
                  <Video className="h-16 w-16 text-cyber-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{session?.title || "Live Session"}</h2>
                <p className="text-dark-400">Stream starting soon...</p>
              </div>
            </div>

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </span>
              <span className="px-3 py-1 bg-dark-800/80 text-white rounded-full text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                {session?.attendees || 156} viewers
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <img
                src={session?.instructorImage || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,man,headshot"}
                alt="Instructor"
                className="w-12 h-12 rounded-full border-2 border-cyber-500"
              />
            </div>
          </div>

          <div className="bg-dark-800 border-t border-dark-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`p-3 rounded-full ${micEnabled ? "bg-cyber-500 text-dark-950" : "bg-dark-700 text-dark-400"}`}
                >
                  {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className={`p-3 rounded-full ${cameraEnabled ? "bg-cyber-500 text-dark-950" : "bg-dark-700 text-dark-400"}`}
                >
                  {cameraEnabled ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
                </button>
                <button className="p-3 rounded-full bg-dark-700 text-dark-400 hover:bg-dark-600">
                  <Monitor className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setHandRaised(!handRaised)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    handRaised ? "bg-yellow-500/20 text-yellow-400" : "bg-dark-700 text-dark-300"
                  }`}
                >
                  <Hand className="h-5 w-5" />
                  {handRaised ? "Hand Raised" : "Raise Hand"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Leave Session
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l border-dark-700 flex flex-col bg-dark-900">
          <div className="flex border-b border-dark-700">
            {[
              { id: "chat", label: "Chat", icon: MessageSquare },
              { id: "qa", label: "Q&A", icon: Hand },
              { id: "poll", label: "Poll", icon: BarChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-cyber-400 border-b-2 border-cyber-500 bg-cyber-500/5"
                    : "text-dark-400 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === "chat" && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`${msg.isInstructor ? "bg-cyber-500/10 rounded-lg p-2" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium text-sm ${msg.isInstructor ? "text-cyber-400" : "text-white"}`}>
                          {msg.user}
                          {msg.isInstructor && <span className="ml-1 text-xs bg-cyber-500/20 px-1.5 py-0.5 rounded">Host</span>}
                        </span>
                        <span className="text-dark-500 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-dark-300 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-dark-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-cyber-500 text-dark-950 rounded-lg hover:bg-cyber-400"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "qa" && (
              <div className="flex-1 p-4">
                <div className="mb-4">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm resize-none"
                  />
                  <button
                    onClick={handleAskQuestion}
                    className="mt-2 w-full py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm"
                  >
                    Submit Question
                  </button>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">Questions from attendees</h4>
                  <div className="bg-dark-800 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-dark-300 text-sm">How do you handle encrypted traffic in packet analysis?</p>
                        <span className="text-dark-500 text-xs">John D. • 5 min ago</span>
                      </div>
                      <button className="flex items-center gap-1 text-dark-400 hover:text-cyber-400">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-xs">12</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "poll" && (
              <div className="flex-1 p-4">
                <div className="bg-dark-800 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-4">{activePoll.question}</h4>
                  <div className="space-y-3">
                    {activePoll.options.map((option) => (
                      <button
                        key={option.id}
                        className="w-full text-left p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors relative overflow-hidden"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-cyber-500/20"
                          style={{ width: `${option.percentage}%` }}
                        />
                        <div className="relative flex items-center justify-between">
                          <span className="text-white text-sm">{option.text}</span>
                          <span className="text-cyber-400 font-medium">{option.percentage}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-dark-500 text-xs mt-4 text-center">
                    {activePoll.totalVotes} votes • Poll closes in 2:00
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveSessionViewer;
