import { motion } from "framer-motion";
import { FileText, Clock, Award, BarChart, Play } from "lucide-react";
import { useAssessmentStore } from "../store/assessmentStore";
import QuizPlayer from "../components/QuizPlayer";
import SkillGapAnalysis from "../components/SkillGapAnalysis";

function AssessmentsPage() {
  const { quizzes, fetchQuizzes, getPerformanceAnalytics } = useAssessmentStore();
  const [activeTab, setActiveTab] = useState("quizzes");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchQuizzes();
    getPerformanceAnalytics().then(setAnalytics);
  }, []);

  if (selectedQuiz) {
    return (
      <main className="min-h-screen bg-dark-950 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="mb-6 text-cyber-400 hover:text-cyber-300 flex items-center gap-1"
          >
            ← Back to Assessments
          </button>
          <QuizPlayer quizId={selectedQuiz.id} onComplete={() => setSelectedQuiz(null)} />
        </div>
      </main>
    );
  }

  return (
    <main id="assessments-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Assessments & <span className="text-gradient">Analytics</span>
          </h1>
          <p className="text-dark-400">Test your knowledge and track your progress</p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          {[
            { id: "quizzes", label: "Quizzes & Exams", icon: FileText },
            { id: "analytics", label: "Performance Analytics", icon: BarChart },
            { id: "skills", label: "Skill Gap Analysis", icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-cyber-500 text-dark-950"
                  : "bg-dark-800 text-dark-400 hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "quizzes" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, idx) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-dark-900/50 rounded-xl border border-dark-700 p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    quiz.type === "exam" ? "bg-red-500/20" : "bg-cyber-500/20"
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      quiz.type === "exam" ? "text-red-400" : "text-cyber-500"
                    }`} />
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs capitalize ${
                    quiz.type === "exam" 
                      ? "bg-red-500/20 text-red-400" 
                      : "bg-cyber-500/20 text-cyber-400"
                  }`}>
                    {quiz.type}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{quiz.title}</h3>
                <div className="flex items-center gap-4 text-sm text-dark-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {quiz.timeLimit} min
                  </span>
                  <span>{quiz.totalQuestions} questions</span>
                  <span>Pass: {quiz.passingScore}%</span>
                </div>
                {quiz.proctored && (
                  <div className="mb-4 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <span className="text-yellow-400 text-xs">🔒 Proctored Assessment</span>
                  </div>
                )}
                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="w-full py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Start {quiz.type === "exam" ? "Exam" : "Quiz"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "analytics" && analytics && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-dark-400 text-sm mb-1">Overall Score</div>
                <div className="text-3xl font-bold text-cyber-400">{analytics.overallScore}%</div>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-dark-400 text-sm mb-1">Total Time</div>
                <div className="text-3xl font-bold text-white">{Math.round(analytics.timeOnTask.total / 60)}h</div>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-dark-400 text-sm mb-1">Quizzes Taken</div>
                <div className="text-3xl font-bold text-white">{analytics.attemptHistory.length}</div>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                <div className="text-dark-400 text-sm mb-1">Avg Improvement</div>
                <div className="text-3xl font-bold text-green-400">+12%</div>
              </div>
            </div>

            <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Proficiency</h3>
              <div className="space-y-4">
                {Object.entries(analytics.skillLevels).map(([skill, level]) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-dark-300">{skill}</span>
                      <span className="text-cyber-400 font-medium">{level}%</span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        className="h-full bg-cyber-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-900/50 rounded-xl border border-dark-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Competency Heatmap</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analytics.competencyHeatmap.map((item) => (
                  <div key={item.skill} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{item.skill}</div>
                      <div className="text-dark-500 text-sm">{item.level}</div>
                    </div>
                    <div className={`text-lg font-bold ${
                      item.score >= 80 ? "text-green-400" :
                      item.score >= 60 ? "text-yellow-400" :
                      "text-red-400"
                    }`}>
                      {item.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && <SkillGapAnalysis />}
      </div>
    </main>
  );
}

export default AssessmentsPage;
