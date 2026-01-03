import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import AdminDashboard from "./pages/AdminDashboard";
import LabsPage from "./pages/LabsPage";
import LiveSessionsPage from "./pages/LiveSessionsPage";
import LearningPathsPage from "./pages/LearningPathsPage";
import DocumentationPage from "./pages/DocumentationPage";
import CertificatesPage from "./pages/CertificatesPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import CommunityPage from "./pages/CommunityPage";
import GamificationPage from "./pages/GamificationPage";
import GlobalSearch from "./components/GlobalSearch";
import NotificationCenter from "./components/NotificationCenter";
import AIChatbot from "./components/AIChatbot";
import { useNotificationStore } from "./store/notificationStore";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  const { checkAuth } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      <Navbar 
        onSearchClick={() => setShowSearch(true)} 
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        unreadCount={unreadCount}
      />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/learning-paths" element={<LearningPathsPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/labs"
            element={
              <ProtectedRoute>
                <LabsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live"
            element={
              <ProtectedRoute>
                <LiveSessionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <CertificatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gamification"
            element={
              <ProtectedRoute>
                <GamificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video/:courseId/:lessonId"
            element={
              <ProtectedRoute>
                <VideoPlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <AIChatbot />
    </div>
  );
}

export default App;
