import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  CheckCircle, 
  Lock, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Download,
  Clock,
  Award
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";

function CoursePlayer({ course, modules }) {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [expandedModules, setExpandedModules] = useState([0]);
  const [completedLessons, setCompletedLessons] = useState([]);

  const toggleModule = (index) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const selectLesson = (moduleIndex, lessonIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
  };

  const markComplete = () => {
    const lessonId = `${currentModule}-${currentLesson}`;
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    if (currentLesson < modules[currentModule].lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
      if (!expandedModules.includes(currentModule + 1)) {
        setExpandedModules([...expandedModules, currentModule + 1]);
      }
    }
  };

  const currentLessonData = modules[currentModule]?.lessons[currentLesson];
  const progress = (completedLessons.length / modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100;

  return (
    <div id="course-player" className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer
          videoUrl={currentLessonData?.videoUrl || "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"}
          posterUrl={course?.image}
          title={currentLessonData?.title}
          onComplete={markComplete}
        />

        <div className="bg-dark-900/50 rounded-xl p-5 border border-dark-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-cyber-400 text-sm font-medium">
                Module {currentModule + 1} • Lesson {currentLesson + 1}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {currentLessonData?.title}
              </h2>
            </div>
            <button 
              onClick={markComplete}
              className="px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm hover:bg-cyber-400 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Mark Complete
            </button>
          </div>
          <p className="text-dark-300 text-sm leading-relaxed">
            {currentLessonData?.description}
          </p>

          {currentLessonData?.resources && (
            <div className="mt-4 pt-4 border-t border-dark-700">
              <h3 className="text-white font-medium text-sm mb-3">Resources</h3>
              <div className="flex flex-wrap gap-2">
                {currentLessonData.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark-800 rounded-lg text-dark-300 text-xs hover:bg-dark-700 hover:text-white transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {resource.name}
                    <Download className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium text-sm">Course Progress</span>
            <span className="text-cyber-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-dark-400">
            <span>{completedLessons.length} completed</span>
            <span>{modules.reduce((acc, m) => acc + m.lessons.length, 0) - completedLessons.length} remaining</span>
          </div>
        </div>

        <div className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden max-h-[600px] overflow-y-auto">
          <div className="p-4 border-b border-dark-700 sticky top-0 bg-dark-900/95 backdrop-blur-sm">
            <h3 className="text-white font-bold">Course Content</h3>
            <p className="text-dark-400 text-xs mt-1">
              {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
            </p>
          </div>

          <div className="divide-y divide-dark-700">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="w-full flex items-center justify-between p-4 hover:bg-dark-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      module.lessons.every((_, i) => completedLessons.includes(`${moduleIndex}-${i}`))
                        ? "bg-cyber-500/20 text-cyber-400"
                        : "bg-dark-700 text-dark-400"
                    }`}>
                      {moduleIndex + 1}
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-medium text-sm">{module.title}</h4>
                      <p className="text-dark-400 text-xs">
                        {module.lessons.length} lessons • {module.duration}
                      </p>
                    </div>
                  </div>
                  {expandedModules.includes(moduleIndex) ? (
                    <ChevronUp className="h-4 w-4 text-dark-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-dark-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedModules.includes(moduleIndex) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = completedLessons.includes(`${moduleIndex}-${lessonIndex}`);
                        const isCurrent = currentModule === moduleIndex && currentLesson === lessonIndex;
                        const isLocked = lesson.locked;

                        return (
                          <button
                            key={lessonIndex}
                            onClick={() => !isLocked && selectLesson(moduleIndex, lessonIndex)}
                            disabled={isLocked}
                            className={`w-full flex items-center gap-3 px-4 py-3 pl-8 transition-colors ${
                              isCurrent 
                                ? "bg-cyber-500/10 border-l-2 border-cyber-500" 
                                : isLocked 
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-dark-800/50"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? "bg-cyber-500 text-dark-950" 
                                : isLocked 
                                  ? "bg-dark-700 text-dark-500"
                                  : "bg-dark-700 text-dark-400"
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-3.5 w-3.5" />
                              ) : isLocked ? (
                                <Lock className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <p className={`text-sm ${isCurrent ? "text-cyber-400 font-medium" : "text-dark-300"}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-dark-500 mt-0.5">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePlayer;
