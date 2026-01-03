import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, BookOpen, Terminal, FileText, 
  Flag, MessageSquare, Clock, TrendingUp, Sparkles
} from "lucide-react";
import { useSearchStore } from "../store/searchStore";

function GlobalSearch({ isOpen, onClose }) {
  const { searchResults, recentSearches, recommendations, search, fetchRecommendations, clearSearch } = useSearchStore();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      fetchRecommendations();
    } else {
      setQuery("");
      clearSearch();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        setIsSearching(true);
        search(query).finally(() => setIsSearching(false));
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const getIcon = (type) => {
    switch (type) {
      case "course": return <BookOpen className="h-4 w-4" />;
      case "lab": return <Terminal className="h-4 w-4" />;
      case "doc": return <FileText className="h-4 w-4" />;
      case "ctf": return <Flag className="h-4 w-4" />;
      case "forum": return <MessageSquare className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "course": return "text-blue-400 bg-blue-500/20";
      case "lab": return "text-green-400 bg-green-500/20";
      case "doc": return "text-purple-400 bg-purple-500/20";
      case "ctf": return "text-red-400 bg-red-500/20";
      case "forum": return "text-yellow-400 bg-yellow-500/20";
      default: return "text-dark-400 bg-dark-700";
    }
  };

  const hasResults = Object.values(searchResults).some(arr => arr?.length > 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-3xl mx-auto mt-20"
        >
          <div id="global-search" className="bg-dark-900 rounded-xl border border-dark-700 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-700">
              <Search className="h-5 w-5 text-dark-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, labs, documentation..."
                className="flex-1 bg-transparent text-white placeholder:text-dark-500 focus:outline-none text-lg"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-dark-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              )}
              <kbd className="px-2 py-1 bg-dark-800 rounded text-dark-400 text-xs">ESC</kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!query && (
                <div className="p-4 space-y-6">
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-dark-400 text-sm font-medium mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.slice(0, 5).map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 bg-dark-800 text-dark-300 rounded-lg text-sm hover:bg-dark-700"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-dark-400 text-sm font-medium mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Recommended for You
                    </h3>
                    <div className="space-y-2">
                      {recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg hover:bg-dark-800 cursor-pointer"
                        >
                          <img src={rec.thumbnail} alt={rec.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">{rec.title}</h4>
                            <p className="text-dark-400 text-xs truncate">{rec.reason}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs ${getTypeColor(rec.type)}`}>
                            {rec.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-dark-400 text-sm font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Trending Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["SQL Injection", "OSCP Prep", "Cloud Security", "Malware Analysis", "CTF Tips"].map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setQuery(topic)}
                          className="px-3 py-1.5 bg-dark-800 text-dark-300 rounded-lg text-sm hover:bg-dark-700"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {query && isSearching && (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-2 border-cyber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-dark-400">Searching...</p>
                </div>
              )}

              {query && !isSearching && hasResults && (
                <div className="p-4 space-y-4">
                  {Object.entries(searchResults).map(([type, items]) => {
                    if (!items?.length) return null;
                    return (
                      <div key={type}>
                        <h3 className="text-dark-400 text-sm font-medium mb-2 capitalize">{type}</h3>
                        <div className="space-y-1">
                          {items.map((item) => (
                            <div
                              key={`${type}-${item.id}`}
                              className="flex items-center gap-3 p-3 hover:bg-dark-800 rounded-lg cursor-pointer"
                            >
                              <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                                {getIcon(item.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white text-sm font-medium">{item.title}</h4>
                                <p className="text-dark-500 text-xs">
                                  Match in {item.match} • {item.relevance}% relevance
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {query && !isSearching && !hasResults && (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-dark-400">No results found for "{query}"</p>
                  <p className="text-dark-500 text-sm mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GlobalSearch;
