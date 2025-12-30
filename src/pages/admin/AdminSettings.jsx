import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, Globe, Mail } from "lucide-react";
import Swal from "sweetalert2";

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "CyberShield Academy",
    siteEmail: "contact@cybershield.academy",
    enrollmentNotifications: true,
    courseCompletionNotifications: true,
    marketingEmails: false,
    twoFactorAuth: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    Swal.fire({
      title: "Settings Saved!",
      icon: "success",
      confirmButtonColor: "#00ff9d",
      background: "#1e293b",
      color: "#f1f5f9"
    });
  };

  return (
    <div id="admin-settings" className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-dark-400 text-sm">Configure platform settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-900/50 rounded-xl border border-dark-700 p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-cyber-500" />
            <h2 className="text-base font-bold text-white">General</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-900/50 rounded-xl border border-dark-700 p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-cyber-500" />
            <h2 className="text-base font-bold text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: "enrollmentNotifications", label: "Enrollment notifications" },
              { key: "courseCompletionNotifications", label: "Course completion notifications" },
              { key: "marketingEmails", label: "Marketing emails" }
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between">
                <span className="text-dark-300 text-sm">{item.label}</span>
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                  className="rounded border-dark-600 bg-dark-800 text-cyber-500"
                />
              </label>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-900/50 rounded-xl border border-dark-700 p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-cyber-500" />
            <h2 className="text-base font-bold text-white">Security</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-dark-300 text-sm">Two-factor authentication</span>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                className="rounded border-dark-600 bg-dark-800 text-cyber-500"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-dark-300 text-sm">Maintenance mode</span>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="rounded border-dark-600 bg-dark-800 text-cyber-500"
              />
            </label>
          </div>
        </motion.div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm hover:bg-cyber-400 transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
