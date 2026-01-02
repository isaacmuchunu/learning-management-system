import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, Eye, Upload, Image, Video, FileText, 
  Code, Link, List, Bold, Italic, Heading,
  AlignLeft, AlignCenter, Plus, Trash2, GripVertical,
  Clock, Calendar, Settings, ChevronDown
} from "lucide-react";

function ContentEditor({ initialContent = null, onSave }) {
  const [title, setTitle] = useState(initialContent?.title || "");
  const [description, setDescription] = useState(initialContent?.description || "");
  const [modules, setModules] = useState(initialContent?.modules || [
    { id: 1, title: "Module 1: Introduction", lessons: [], expanded: true }
  ]);
  const [settings, setSettings] = useState({
    visibility: "draft",
    prerequisites: [],
    dripRelease: false,
    dripInterval: "weekly"
  });
  const [activeTab, setActiveTab] = useState("content");

  const addModule = () => {
    setModules([
      ...modules,
      { id: Date.now(), title: `Module ${modules.length + 1}`, lessons: [], expanded: true }
    ]);
  };

  const addLesson = (moduleId) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [
            ...m.lessons,
            { id: Date.now(), title: "New Lesson", type: "video", duration: "10 min" }
          ]
        };
      }
      return m;
    }));
  };

  const deleteModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const deleteLesson = (moduleId, lessonId) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
      }
      return m;
    }));
  };

  const handleSave = () => {
    const content = { title, description, modules, settings };
    if (onSave) onSave(content);
  };

  return (
    <div id="content-editor" className="bg-dark-900 rounded-xl border border-dark-700">
      <div className="flex items-center justify-between p-4 border-b border-dark-700">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-white">Course Editor</h2>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            settings.visibility === "published" 
              ? "bg-green-500/20 text-green-400" 
              : "bg-yellow-500/20 text-yellow-400"
          }`}>
            {settings.visibility}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 text-sm">
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      <div className="flex border-b border-dark-700">
        {["content", "settings", "scheduling"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-cyber-400 border-b-2 border-cyber-500"
                : "text-dark-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "content" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                rows={4}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-dark-300">Course Modules</label>
                <button
                  onClick={addModule}
                  className="flex items-center gap-1 text-cyber-400 hover:text-cyber-300 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Module
                </button>
              </div>

              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="bg-dark-800 rounded-lg border border-dark-600">
                    <div className="flex items-center gap-3 p-4 border-b border-dark-600">
                      <GripVertical className="h-5 w-5 text-dark-500 cursor-grab" />
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => {
                          setModules(modules.map(m =>
                            m.id === module.id ? { ...m, title: e.target.value } : m
                          ));
                        }}
                        className="flex-1 bg-transparent text-white font-medium focus:outline-none"
                      />
                      <button
                        onClick={() => addLesson(module.id)}
                        className="text-cyber-400 hover:text-cyber-300"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteModule(module.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-2">
                      {module.lessons.length === 0 ? (
                        <p className="text-dark-500 text-sm text-center py-4">
                          No lessons yet. Click + to add a lesson.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg"
                            >
                              <GripVertical className="h-4 w-4 text-dark-500 cursor-grab" />
                              {lesson.type === "video" ? (
                                <Video className="h-4 w-4 text-cyber-500" />
                              ) : (
                                <FileText className="h-4 w-4 text-electric-purple" />
                              )}
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => {
                                  setModules(modules.map(m => {
                                    if (m.id === module.id) {
                                      return {
                                        ...m,
                                        lessons: m.lessons.map(l =>
                                          l.id === lesson.id ? { ...l, title: e.target.value } : l
                                        )
                                      };
                                    }
                                    return m;
                                  }));
                                }}
                                className="flex-1 bg-transparent text-dark-300 text-sm focus:outline-none"
                              />
                              <span className="text-dark-500 text-xs">{lesson.duration}</span>
                              <button
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="text-dark-500 hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Visibility</label>
              <select
                value={settings.visibility}
                onChange={(e) => setSettings({ ...settings, visibility: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Prerequisites</label>
              <p className="text-dark-500 text-sm mb-2">Select courses that must be completed first</p>
              <div className="space-y-2">
                {["Network Security Fundamentals", "Linux Basics", "Introduction to Cybersecurity"].map((course, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg cursor-pointer hover:bg-dark-700">
                    <input type="checkbox" className="rounded border-dark-600 bg-dark-700 text-cyber-500 focus:ring-cyber-500" />
                    <span className="text-dark-300">{course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
              <div>
                <h4 className="text-white font-medium">SCORM Compliance</h4>
                <p className="text-dark-400 text-sm">Enable SCORM/xAPI tracking</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-dark-700 relative">
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-dark-500"></span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "scheduling" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Drip Release</h4>
                <p className="text-dark-400 text-sm">Release content over time</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, dripRelease: !settings.dripRelease })}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings.dripRelease ? "bg-cyber-500" : "bg-dark-700"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  settings.dripRelease ? "left-7" : "left-1"
                }`}></span>
              </button>
            </div>

            {settings.dripRelease && (
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Release Interval</label>
                <select
                  value={settings.dripInterval}
                  onChange={(e) => setSettings({ ...settings, dripInterval: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Schedule Publication</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentEditor;
