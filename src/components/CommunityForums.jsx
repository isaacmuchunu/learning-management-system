import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, Users, Clock, ThumbsUp, Eye, 
  Pin, CheckCircle, ChevronRight, Plus, Search,
  Tag, Filter
} from "lucide-react";
import { useSocialStore } from "../store/socialStore";

function CommunityForums() {
  const { forums, threads, fetchForums, fetchThreads, createThread } = useSocialStore();
  const [selectedForum, setSelectedForum] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "", tags: [] });

  useEffect(() => {
    fetchForums();
  }, []);

  useEffect(() => {
    if (selectedForum) {
      fetchThreads(selectedForum.id);
    }
  }, [selectedForum]);

  const handleCreateThread = async () => {
    if (!newThread.title.trim()) return;
    await createThread(selectedForum.id, {
      title: newThread.title,
      content: newThread.content,
      tags: newThread.tags,
      author: { id: 1, name: "Current User" }
    });
    setShowNewThread(false);
    setNewThread({ title: "", content: "", tags: [] });
  };

  if (!selectedForum) {
    return (
      <div id="community-forums" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-500/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-cyber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Community Forums</h2>
              <p className="text-dark-400 text-sm">Discuss, learn, and share knowledge</p>
            </div>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search forums..."
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forums.map((forum, idx) => (
            <motion.button
              key={forum.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedForum(forum)}
              className="p-5 bg-dark-900/50 rounded-xl border border-dark-700 hover:border-cyber-500/30 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{forum.icon}</span>
                <ChevronRight className="h-5 w-5 text-dark-500 group-hover:text-cyber-500 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-white font-semibold mb-1">{forum.name}</h3>
              <p className="text-dark-400 text-sm mb-4">{forum.description}</p>
              <div className="flex items-center gap-4 text-sm text-dark-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {forum.threads}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {forum.posts}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="forum-threads" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedForum(null)}
            className="p-2 bg-dark-800 rounded-lg text-dark-400 hover:text-white"
          >
            ←
          </button>
          <span className="text-3xl">{selectedForum.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-white">{selectedForum.name}</h2>
            <p className="text-dark-400 text-sm">{selectedForum.description}</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewThread(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm"
        >
          <Plus className="h-4 w-4" />
          New Thread
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search threads..."
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 text-sm">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="space-y-3">
        {threads.map((thread, idx) => (
          <motion.div
            key={thread.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 bg-dark-900/50 rounded-xl border ${
              thread.isPinned ? "border-cyber-500/30 bg-cyber-500/5" : "border-dark-700"
            } hover:border-cyber-500/30 transition-colors cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              <img
                src={thread.author.avatar}
                alt={thread.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {thread.isPinned && (
                    <span className="flex items-center gap-1 text-cyber-400 text-xs">
                      <Pin className="h-3 w-3" />
                      Pinned
                    </span>
                  )}
                  {thread.isResolved && (
                    <span className="flex items-center gap-1 text-green-400 text-xs">
                      <CheckCircle className="h-3 w-3" />
                      Resolved
                    </span>
                  )}
                </div>
                <h3 className="text-white font-medium hover:text-cyber-400 transition-colors">
                  {thread.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-dark-500">
                  <span>{thread.author.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {thread.replies} replies
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {thread.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {thread.votes}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {thread.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-dark-800 text-dark-400 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm text-dark-500">
                <div>Last reply</div>
                <div className="text-dark-400">
                  {new Date(thread.lastReply).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showNewThread && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 rounded-xl p-6 w-full max-w-2xl border border-dark-700"
          >
            <h2 className="text-xl font-bold text-white mb-4">Create New Thread</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newThread.title}
                  onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
                  placeholder="Enter thread title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Content</label>
                <textarea
                  value={newThread.content}
                  onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500 resize-none"
                  placeholder="Write your message..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by comma"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewThread(false)}
                className="flex-1 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateThread}
                className="flex-1 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400"
              >
                Create Thread
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default CommunityForums;
