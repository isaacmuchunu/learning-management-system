import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Menu, 
  X, 
  LogIn,
  LogOut,
  User,
  LayoutDashboard
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import SearchBar from "./SearchBar";
import NotificationSystem from "./NotificationSystem";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Learning Paths", path: "/learning-paths" },
    { name: "Enterprise", path: "/enterprise" },
    { name: "About", path: "/about" },
  ];

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-950/95 backdrop-blur-lg border-b border-cyber-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-cyber-500 group-hover:text-cyber-400 transition-colors" />
              <div className="absolute inset-0 bg-cyber-500/20 blur-xl group-hover:bg-cyber-400/30 transition-colors"></div>
            </div>
            <span className="text-xl font-bold text-white">
              Cyber<span className="text-cyber-500">Shield</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.path
                    ? "text-cyber-400"
                    : "text-dark-300 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-cyber-500 transition-all duration-300 ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <SearchBar />
            {user && <NotificationSystem />}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-dark-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-electric-purple hover:text-purple-400 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-dark-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-dark-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-all duration-300 text-sm glow-border"
                >
                  Start Learning
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-900/98 backdrop-blur-lg border-b border-cyber-500/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-lg font-medium ${
                    location.pathname === link.path
                      ? "text-cyber-400"
                      : "text-dark-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-dark-700 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-lg font-medium text-dark-300"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-lg font-medium text-electric-purple"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-lg font-medium text-red-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-lg font-medium text-dark-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 bg-cyber-500 text-dark-950 font-semibold rounded-lg"
                    >
                      Start Learning
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
