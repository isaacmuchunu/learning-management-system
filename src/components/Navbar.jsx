import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Menu, X, User, LogOut, Settings, 
  BookOpen, Terminal, Video, Award, Users,
  Search, Bell, Trophy, MessageSquare
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

function Navbar({ onSearchClick, onNotificationClick, unreadCount = 0 }) {
  const { user, isAdmin, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const navLinks = [
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/learning-paths", label: "Paths", icon: Award },
    { path: "/labs", label: "Labs", icon: Terminal, protected: true },
    { path: "/live", label: "Live", icon: Video, protected: true },
    { path: "/community", label: "Community", icon: MessageSquare, protected: true },
    { path: "/gamification", label: "Rewards", icon: Trophy, protected: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-dark-950/95 backdrop-blur-md border-b border-dark-800" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyber-500" />
            <span className="text-xl font-bold text-white">CyberShield</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-cyber-400"
                      : "text-dark-300 hover:text-white"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 rounded-lg text-dark-400 hover:text-white text-sm"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 bg-dark-700 rounded text-xs">⌘K</kbd>
            </button>

            {user && (
              <button
                onClick={onNotificationClick}
                className="relative p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-500 text-dark-950 text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-cyber-500/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-cyber-500" />
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-dark-900 rounded-xl border border-dark-700 shadow-xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-dark-700">
                        <p className="text-white font-medium text-sm">{user.email}</p>
                        <p className="text-dark-400 text-xs">{isAdmin ? "Administrator" : "Student"}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg text-sm"
                        >
                          <BookOpen className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/certificates"
                          className="flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg text-sm"
                        >
                          <Award className="h-4 w-4" />
                          Certificates
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg text-sm"
                          >
                            <Settings className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-dark-800 rounded-lg text-sm"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-dark-300 hover:text-white text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-cyber-500 text-dark-950 rounded-lg text-sm font-medium hover:bg-cyber-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900 border-t border-dark-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                if (link.protected && !user) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                      location.pathname === link.path
                        ? "bg-cyber-500/10 text-cyber-400"
                        : "text-dark-300 hover:text-white hover:bg-dark-800"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
              {!user && (
                <div className="pt-4 border-t border-dark-800 space-y-2">
                  <Link to="/login" className="block px-4 py-3 text-dark-300 hover:text-white">
                    Login
                  </Link>
                  <Link to="/signup" className="block px-4 py-3 bg-cyber-500 text-dark-950 rounded-lg text-center font-medium">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
