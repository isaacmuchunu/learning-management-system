import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  X, 
  BookOpen, 
  User, 
  FileText,
  Clock,
  TrendingUp
} from "lucide-react";
import { courses } from "../data/courses";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const recentSearches = ["penetration testing", "network security", "ethical hacking"];
  const trendingTopics = ["OSCP Prep", "Web Security", "Cloud Security"];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-dark-800 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline text-sm">Search courses...</span>
        <kbd className="hidden lg:inline px-2 py-0.5 text-xs bg-dark-700 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-dark-900 rounded-2xl border border-dark-700 shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-dark-700">
                <Search className="h-5 w-5 text-dark-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, topics, instructors..."
                  className="flex-1 bg-transparent text-white placeholder-dark-400 outline-none"
                />
                <button
                  onClick={handleClose}
                  className="p-1 text-dark-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-dark-500 uppercase">Courses</div>
                    {results.map((course) => (
                      <Link
                        key={course.id}
                        to={`/courses/${course.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-800 transition-colors"
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{course.title}</h4>
                          <p className="text-dark-400 text-xs">{course.category} • {course.level}</p>
                        </div>
                        <BookOpen className="h-4 w-4 text-dark-500" />
                      </Link>
                    ))}
                  </div>
                ) : query.length === 0 ? (
                  <div className="p-4 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <Clock className="h-4 w-4 text-dark-500" />
                        <span className="text-xs font-medium text-dark-500 uppercase">Recent Searches</span>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setQuery(search)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-dark-800 transition-colors text-left"
                          >
                            <Search className="h-4 w-4 text-dark-500" />
                            <span className="text-dark-300 text-sm">{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-cyber-500" />
                        <span className="text-xs font-medium text-dark-500 uppercase">Trending Topics</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingTopics.map((topic, index) => (
                          <button
                            key={index}
                            onClick={() => setQuery(topic)}
                            className="px-3 py-1.5 bg-dark-800 text-dark-300 text-sm rounded-full hover:bg-dark-700 hover:text-white transition-colors"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="h-8 w-8 text-dark-600 mx-auto mb-2" />
                    <p className="text-dark-400">No results found for &quot;{query}&quot;</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3 border-t border-dark-700 bg-dark-800/50 text-xs text-dark-500">
                <div className="flex items-center gap-4">
                  <span><kbd className="px-1.5 py-0.5 bg-dark-700 rounded">↵</kbd> to select</span>
                  <span><kbd className="px-1.5 py-0.5 bg-dark-700 rounded">↑↓</kbd> to navigate</span>
                </div>
                <span><kbd className="px-1.5 py-0.5 bg-dark-700 rounded">esc</kbd> to close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default SearchBar;
