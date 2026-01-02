import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Video, Calendar, Clock, Users, Play, 
  Bell, CheckCircle, ChevronRight
} from "lucide-react";
import { useLiveSessionStore } from "../store/liveSessionStore";
import LiveSessionViewer from "../components/LiveSessionViewer";

function LiveSessionsPage() {
  const { upcomingSessions, recordings, fetchLiveSessions, registerForSession } = useLiveSessionStore();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetchLiveSessions();
  }, []);

  const handleRegister = async (sessionId) => {
    await registerForSession(sessionId);
  };

  if (selectedSession) {
    return <LiveSessionViewer session={selectedSession} />;
  }

  return (
    <main id="live-sessions-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Live <span className="text-gradient">Sessions</span>
          </h1>
          <p className="text-dark-400">Join live webinars and interactive workshops</p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-cyber-500 text-dark-950"
                : "bg-dark-800 text-dark-400 hover:text-white"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Upcoming ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab("recordings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "recordings"
                ? "bg-cyber-500 text-dark-950"
                : "bg-dark-800 text-dark-400 hover:text-white"
            }`}
          >
            <Play className="h-4 w-4" />
            Recordings ({recordings.length})
          </button>
        </div>

        {activeTab === "upcoming" ? (
          <div className="space-y-6">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden"
              >
                <div className="grid md:grid-cols-4">
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={session.instructorImage}
                        alt={session.instructor}
                        className="w-14 h-14 rounded-full border-2 border-cyber-500"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">{session.title}</h2>
                        <p className="text-cyber-400">with {session.instructor}</p>
                      </div>
                    </div>
                    <p className="text-dark-400 mb-4">{session.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(session.scheduledAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {session.attendees}/{session.maxAttendees}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {session.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-dark-800 text-dark-300 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:border-l border-dark-700 p-6 flex flex-col justify-center gap-3 bg-dark-800/30">
                    {session.registered ? (
                      <>
                        <div className="flex items-center gap-2 text-cyber-400 justify-center">
                          <CheckCircle className="h-5 w-5" />
                          Registered
                        </div>
                        <button
                          onClick={() => setSelectedSession(session)}
                          className="w-full py-3 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2"
                        >
                          <Play className="h-5 w-5" />
                          Join Session
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRegister(session.id)}
                          className="w-full py-3 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 transition-colors"
                        >
                          Register Now
                        </button>
                        <button className="w-full py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors flex items-center justify-center gap-2">
                          <Bell className="h-4 w-4" />
                          Set Reminder
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordings.map((recording, index) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden hover:border-cyber-500/30 transition-colors group cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-cyber-500/20 flex items-center justify-center group-hover:bg-cyber-500/30 transition-colors">
                    <Play className="h-8 w-8 text-cyber-500" />
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-1 bg-dark-950/80 rounded text-white text-xs">
                    {recording.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{recording.title}</h3>
                  <div className="flex items-center justify-between text-sm text-dark-400">
                    <span>{recording.instructor}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {recording.views} views
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default LiveSessionsPage;
