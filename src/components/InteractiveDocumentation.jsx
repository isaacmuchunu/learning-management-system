import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, BookOpen, Code, FileText, ChevronRight, 
  Copy, Check, ExternalLink, Bookmark, Share2
} from "lucide-react";

const documentationData = {
  categories: [
    {
      id: 1,
      title: "Getting Started",
      icon: "🚀",
      articles: [
        { id: 1, title: "Introduction to CyberShield", readTime: "5 min" },
        { id: 2, title: "Setting Up Your Environment", readTime: "10 min" },
        { id: 3, title: "Your First Lab", readTime: "15 min" }
      ]
    },
    {
      id: 2,
      title: "Network Security",
      icon: "🌐",
      articles: [
        { id: 4, title: "Network Scanning with Nmap", readTime: "20 min" },
        { id: 5, title: "Packet Analysis with Wireshark", readTime: "25 min" },
        { id: 6, title: "Firewall Configuration", readTime: "15 min" }
      ]
    },
    {
      id: 3,
      title: "Web Security",
      icon: "🔐",
      articles: [
        { id: 7, title: "OWASP Top 10 Overview", readTime: "30 min" },
        { id: 8, title: "SQL Injection Deep Dive", readTime: "25 min" },
        { id: 9, title: "XSS Attack Prevention", readTime: "20 min" }
      ]
    },
    {
      id: 4,
      title: "Penetration Testing",
      icon: "⚔️",
      articles: [
        { id: 10, title: "Reconnaissance Techniques", readTime: "20 min" },
        { id: 11, title: "Exploitation Fundamentals", readTime: "30 min" },
        { id: 12, title: "Post-Exploitation", readTime: "25 min" }
      ]
    }
  ],
  glossary: [
    { term: "APT", definition: "Advanced Persistent Threat - A prolonged and targeted cyberattack" },
    { term: "CVE", definition: "Common Vulnerabilities and Exposures - A list of publicly disclosed security flaws" },
    { term: "SIEM", definition: "Security Information and Event Management - Technology for real-time analysis" },
    { term: "Zero-Day", definition: "A vulnerability unknown to the software vendor" }
  ]
};

function InteractiveDocumentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const sampleCodeSnippets = [
    {
      id: 1,
      language: "bash",
      title: "Basic Nmap Scan",
      code: `# Scan a single host
nmap 192.168.1.1

# Scan with version detection
nmap -sV 192.168.1.1

# Full port scan
nmap -p- 192.168.1.1`
    },
    {
      id: 2,
      language: "python",
      title: "Simple Port Scanner",
      code: `import socket

def scan_port(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0

# Scan common ports
for port in [21, 22, 80, 443, 8080]:
    if scan_port("192.168.1.1", port):
        print(f"Port {port} is open")`
    },
    {
      id: 3,
      language: "sql",
      title: "SQL Injection Example",
      code: `-- Vulnerable query
SELECT * FROM users WHERE username = 'admin' AND password = 'password'

-- Injection payload
' OR '1'='1' --

-- Result: Bypasses authentication`
    }
  ];

  const copyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleBookmark = (articleId) => {
    setBookmarkedArticles(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredCategories = documentationData.categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.articles.some(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div id="interactive-documentation" className="min-h-screen bg-dark-950">
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 py-12 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Documentation & <span className="text-gradient">Knowledge Base</span>
            </h1>
            <p className="text-dark-400 mb-8">
              Everything you need to master cybersecurity
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <nav className="space-y-2 sticky top-24">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyber-500" />
                Categories
              </h3>
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedArticle(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    selectedCategory?.id === category.id
                      ? "bg-cyber-500/10 text-cyber-400 border border-cyber-500/30"
                      : "text-dark-300 hover:bg-dark-800"
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="flex-1">{category.title}</span>
                  <span className="text-dark-500 text-sm">{category.articles.length}</span>
                </button>
              ))}

              <div className="pt-6 mt-6 border-t border-dark-700">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-electric-purple" />
                  Quick Reference
                </h3>
                <div className="space-y-2">
                  <a href="#glossary" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg">
                    Glossary
                  </a>
                  <a href="#cheatsheets" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg">
                    Cheat Sheets
                  </a>
                  <a href="#mindmaps" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg">
                    Mind Maps
                  </a>
                </div>
              </div>
            </nav>
          </div>

          <div className="lg:col-span-3">
            {!selectedCategory ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-900/50 rounded-xl border border-dark-700 p-6 hover:border-cyber-500/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{category.icon}</span>
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.articles.slice(0, 3).map((article) => (
                        <li key={article.id} className="flex items-center gap-2 text-dark-400 text-sm">
                          <ChevronRight className="h-3 w-3 text-cyber-500" />
                          {article.title}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedArticle(null);
                  }}
                  className="text-cyber-400 hover:text-cyber-300 text-sm mb-6 flex items-center gap-1"
                >
                  ← Back to all categories
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{selectedCategory.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
                </div>

                <div className="space-y-4 mb-12">
                  {selectedCategory.articles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-dark-900/50 rounded-xl border border-dark-700 p-4 hover:border-cyber-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-cyber-500" />
                          <div>
                            <h4 className="text-white font-medium">{article.title}</h4>
                            <span className="text-dark-500 text-sm">{article.readTime} read</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleBookmark(article.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              bookmarkedArticles.includes(article.id)
                                ? "text-yellow-400 bg-yellow-500/10"
                                : "text-dark-400 hover:text-white hover:bg-dark-800"
                            }`}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button className="px-4 py-2 bg-cyber-500/10 text-cyber-400 rounded-lg hover:bg-cyber-500/20 transition-colors text-sm">
                            Read Article
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-electric-purple" />
                  Code Examples
                </h3>
                <div className="space-y-4">
                  {sampleCodeSnippets.map((snippet) => (
                    <div key={snippet.id} className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-dark-800/50 border-b border-dark-700">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-dark-700 text-dark-300 rounded text-xs">{snippet.language}</span>
                          <span className="text-white text-sm font-medium">{snippet.title}</span>
                        </div>
                        <button
                          onClick={() => copyCode(snippet.id, snippet.code)}
                          className="flex items-center gap-1 px-2 py-1 text-dark-400 hover:text-white transition-colors"
                        >
                          {copiedCode === snippet.id ? (
                            <>
                              <Check className="h-4 w-4 text-cyber-500" />
                              <span className="text-xs text-cyber-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span className="text-xs">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-dark-300 text-sm font-mono overflow-x-auto">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div id="glossary" className="mt-12 pt-12 border-t border-dark-700">
              <h3 className="text-xl font-bold text-white mb-6">Glossary of Terms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {documentationData.glossary.map((item, idx) => (
                  <div key={idx} className="bg-dark-900/50 rounded-lg p-4 border border-dark-700">
                    <h4 className="text-cyber-400 font-semibold">{item.term}</h4>
                    <p className="text-dark-400 text-sm mt-1">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveDocumentation;
