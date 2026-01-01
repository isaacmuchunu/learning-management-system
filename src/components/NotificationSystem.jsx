import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Award,
  BookOpen,
  MessageSquare
} from "lucide-react";

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  achievement: Award,
  course: BookOpen,
  message: MessageSquare
};

const colorMap = {
  success: "text-cyber-500 bg-cyber-500/20",
  warning: "text-yellow-500 bg-yellow-500/20",
  info: "text-electric-blue bg-electric-blue/20",
  achievement: "text-electric-purple bg-electric-purple/20",
  course: "text-cyber-400 bg-cyber-500/20",
  message: "text-pink-500 bg-pink-500/20"
};

function NotificationSystem({ notifications = [], onDismiss, onClear }) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const defaultNotifications = [
    {
      id: 1,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You earned the 'First Steps' badge",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "course",
      title: "New Course Available",
      message: "Advanced Penetration Testing is now live",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      type: "success",
      title: "Course Completed",
      message: "Congratulations on completing Network Security",
      time: "2 hours ago",
      read: true
    },
    {
      id: 4,
      type: "info",
      title: "Weekly Report",
      message: "Your learning summary is ready to view",
      time: "1 day ago",
      read: true
    }
  ];

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-dark-400 hover:text-white transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-500 text-dark-950 text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-dark-900 rounded-xl border border-dark-700 shadow-xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-dark-700">
                <h3 className="text-white font-bold">Notifications</h3>
                {onClear && (
                  <button
                    onClick={onClear}
                    className="text-dark-400 text-sm hover:text-cyber-400 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {displayNotifications.length > 0 ? (
                  displayNotifications.map((notification) => {
                    const IconComponent = iconMap[notification.type] || Info;
                    const colorClass = colorMap[notification.type] || colorMap.info;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-dark-700/50 hover:bg-dark-800/50 transition-colors ${
                          !notification.read ? "bg-dark-800/30" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-white text-sm font-medium">{notification.title}</h4>
                              {onDismiss && (
                                <button
                                  onClick={() => onDismiss(notification.id)}
                                  className="text-dark-500 hover:text-dark-300 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <p className="text-dark-400 text-xs mt-1">{notification.message}</p>
                            <span className="text-dark-500 text-xs mt-2 block">{notification.time}</span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-cyber-500 rounded-full absolute top-4 right-4"></div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-8 w-8 text-dark-600 mx-auto mb-2" />
                    <p className="text-dark-400 text-sm">No notifications</p>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-dark-700 bg-dark-800/50">
                <button className="w-full text-center text-cyber-400 text-sm hover:text-cyber-300 transition-colors">
                  View all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationSystem;
