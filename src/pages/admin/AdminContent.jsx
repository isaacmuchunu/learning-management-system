import React from "react";
import { motion } from "framer-motion";
import { FileText, Image, Video, Upload } from "lucide-react";

function AdminContent() {
  const contentTypes = [
    { icon: FileText, label: "Documents", count: 24, color: "bg-blue-500/10 text-blue-400" },
    { icon: Image, label: "Images", count: 156, color: "bg-purple-500/10 text-purple-400" },
    { icon: Video, label: "Videos", count: 48, color: "bg-red-500/10 text-red-400" }
  ];

  return (
    <div id="admin-content" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Content Management</h1>
          <p className="text-dark-400 text-sm">Manage course content and media</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm hover:bg-cyber-400 transition-colors">
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {contentTypes.map((type, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-900/50 rounded-xl border border-dark-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${type.color}`}>
                <type.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{type.count}</p>
                <p className="text-dark-400 text-xs">{type.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-4">
        <h2 className="text-base font-bold text-white mb-4">Recent Uploads</h2>
        <div className="space-y-2">
          {[
            { name: "intro-video.mp4", type: "Video", size: "245 MB", date: "2 hours ago" },
            { name: "lab-guide.pdf", type: "Document", size: "2.4 MB", date: "5 hours ago" },
            { name: "course-thumbnail.jpg", type: "Image", size: "456 KB", date: "1 day ago" },
            { name: "exercise-files.zip", type: "Archive", size: "18 MB", date: "2 days ago" }
          ].map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-dark-800/50 rounded-lg">
              <FileText className="h-4 w-4 text-dark-400" />
              <div className="flex-1">
                <p className="text-white text-sm">{file.name}</p>
                <p className="text-dark-500 text-xs">{file.type} • {file.size}</p>
              </div>
              <span className="text-dark-400 text-xs">{file.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminContent;
