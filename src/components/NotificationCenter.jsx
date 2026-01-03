import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, X, Check, CheckCheck, Trash2, 
  Settings, ChevronRight, Filter
} from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";

function NotificationCenter({ isOpen, onClose }) {
  const { 
    notifications, 
    unreadCount, 
    fetchNotifications, 
    markAsRead, 
    markAllAsRead,
    deleteNotification 
  } = useNotificationStore();
  const [filter, setFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const notificationTypes = ["all", "unread", "achievement", "course", "deadline", "social", "live", "grade"];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        id="notification-center"
        className="fixed right-4 top-20 w-96 bg-dark-900 rounded-xl border border-dark-700 shadow-2xl z-50 max-h-[80vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-cyber-500" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-cyber-500 text-dark-950 rounded-full text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border-b border-dark-700 overflow-x-auto">
          {notificationTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === type
                  ? "bg-cyber-500 text-dark-950"
                  : "bg-dark-800 text-dark-400 hover:text-white"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <div className="px-4 py-2 border-b border-dark-700">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-cyber-400 text-sm hover:text-cyber-300"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-dark-600 mx-auto mb-3" />
              <p className="text-dark-400">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-dark-800">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 hover:bg-dark-800/50 transition-colors cursor-pointer ${
                    !notification.read ? "bg-cyber-500/5" : ""
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.action?.url) {
                      window.location.href = notification.action.url;
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{notification.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-medium ${notification.read ? "text-dark-300" : "text-white"}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-cyber-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-dark-400 text-sm mt-0.5">{notification.message}</p>
                      <span className="text-dark-500 text-xs mt-1 block">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-1 text-dark-500 hover:text-red-400 rounded opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-dark-700">
          <button className="w-full py-2 text-cyber-400 text-sm hover:text-cyber-300 flex items-center justify-center gap-1">
            View all notifications
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NotificationCenter;
