import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, CheckCircle, XCircle, AlertTriangle, 
  ChevronLeft, ChevronRight, Flag, Code, 
  HelpCircle, RotateCcw
} from "lucide-react";
import { useAssessmentStore } from "../store/assessmentStore";
import Swal from "sweetalert2";

function QuizPlayer({ quizId, onComplete }) {
  const { quizzes, submitQuiz } = useAssessmentStore();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  useEffect(() => {
    const q = quizzes.find(quiz => quiz.id === quizId);
    if (q) {
      setQuiz(q);
      setTimeRemaining(q.timeLimit * 60);
    }
  }, [quizId, quizzes]);

  useEffect(() => {
    if (timeRemaining <= 0 || showResults) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Submit Quiz?",
      text: "Are you sure you want to submit your answers?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00ff9d",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Submit",
      background: "#1e293b",
      color: "#f1f5f9"
    });

    if (result.isConfirmed) {
      const submitResult = await submitQuiz(quizId, answers);
      if (submitResult.success) {
        setResults(submitResult.result);
        setShowResults(true);
        if (onComplete) onComplete(submitResult.result);
      }
    }
  };

  if (!quiz) return <div className="text-white">Loading quiz...</div>;

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (showResults && results) {
    return (
      <div id="quiz-results" className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-900 rounded-xl border border-dark-700 p-8 text-center"
        >
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            results.passed ? "bg-cyber-500/20" : "bg-red-500/20"
          }`}>
            {results.passed ? (
              <CheckCircle className="h-12 w-12 text-cyber-500" />
            ) : (
              <XCircle className="h-12 w-12 text-red-500" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {results.passed ? "Congratulations!" : "Keep Practicing!"}
          </h2>
          <p className="text-dark-400 mb-6">
            {results.passed ? "You passed the quiz!" : "You did not meet the passing score."}
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-dark-800 rounded-lg p-4">
              <div className="text-3xl font-bold text-cyber-400">{results.percentage}%</div>
              <div className="text-dark-400 text-sm">Score</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{results.score}/{results.totalPoints}</div>
              <div className="text-dark-400 text-sm">Points</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">
                {results.questionResults.filter(q => q.isCorrect).length}/{quiz.questions.length}
              </div>
              <div className="text-dark-400 text-sm">Correct</div>
            </div>
          </div>
          <div className="space-y-4 text-left mb-8">
            <h3 className="text-lg font-semibold text-white">Question Review</h3>
            {results.questionResults.map((qr, idx) => (
              <div key={qr.questionId} className={`p-4 rounded-lg border ${
                qr.isCorrect ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
              }`}>
                <div className="flex items-start gap-3">
                  {qr.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Question {idx + 1}</p>
                    <p className="text-dark-400 text-sm mt-1">{qr.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 transition-colors"
          >
            Back to Course
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="quiz-player" className="max-w-4xl mx-auto">
      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-dark-800 border-b border-dark-700">
          <div>
            <h2 className="text-lg font-semibold text-white">{quiz.title}</h2>
            <p className="text-dark-400 text-sm">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            timeRemaining < 300 ? "bg-red-500/20 text-red-400" : "bg-dark-700 text-white"
          }`}>
            <Clock className="h-5 w-5" />
            <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="h-1 bg-dark-800">
          <div className="h-full bg-cyber-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                question.type === "multiple_choice" ? "bg-blue-500/20 text-blue-400" :
                question.type === "multiple_select" ? "bg-purple-500/20 text-purple-400" :
                question.type === "true_false" ? "bg-green-500/20 text-green-400" :
                question.type === "fill_blank" ? "bg-yellow-500/20 text-yellow-400" :
                question.type === "matching" ? "bg-orange-500/20 text-orange-400" :
                "bg-cyan-500/20 text-cyan-400"
              }`}>
                {question.type.replace("_", " ")}
              </span>
              <span className="text-dark-400 text-sm">{question.points} points</span>
            </div>
            <button
              onClick={() => toggleFlag(question.id)}
              className={`p-2 rounded-lg transition-colors ${
                flaggedQuestions.includes(question.id)
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-dark-800 text-dark-400 hover:text-white"
              }`}
            >
              <Flag className="h-5 w-5" />
            </button>
          </div>

          <h3 className="text-xl text-white mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.type === "multiple_choice" && question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(question.id, idx)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  answers[question.id] === idx
                    ? "border-cyber-500 bg-cyber-500/10 text-white"
                    : "border-dark-600 bg-dark-800 text-dark-300 hover:border-dark-500"
                }`}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dark-700 text-sm mr-3">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}

            {question.type === "multiple_select" && question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const current = answers[question.id] || [];
                  const newAnswer = current.includes(idx)
                    ? current.filter(i => i !== idx)
                    : [...current, idx];
                  handleAnswer(question.id, newAnswer);
                }}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  (answers[question.id] || []).includes(idx)
                    ? "border-cyber-500 bg-cyber-500/10 text-white"
                    : "border-dark-600 bg-dark-800 text-dark-300 hover:border-dark-500"
                }`}
              >
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded mr-3 ${
                  (answers[question.id] || []).includes(idx) ? "bg-cyber-500 text-dark-950" : "bg-dark-700"
                }`}>
                  {(answers[question.id] || []).includes(idx) ? "✓" : ""}
                </span>
                {option}
              </button>
            ))}

            {question.type === "true_false" && (
              <div className="flex gap-4">
                {[true, false].map(value => (
                  <button
                    key={String(value)}
                    onClick={() => handleAnswer(question.id, value)}
                    className={`flex-1 p-4 rounded-lg border text-center transition-all ${
                      answers[question.id] === value
                        ? "border-cyber-500 bg-cyber-500/10 text-white"
                        : "border-dark-600 bg-dark-800 text-dark-300 hover:border-dark-500"
                    }`}
                  >
                    {value ? "True" : "False"}
                  </button>
                ))}
              </div>
            )}

            {question.type === "fill_blank" && (
              <input
                type="text"
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                placeholder="Type your answer..."
                className="w-full p-4 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500"
              />
            )}

            {question.type === "code_submission" && (
              <div className="space-y-4">
                <textarea
                  value={answers[question.id] || question.starterCode}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  rows={10}
                  className="w-full p-4 bg-dark-950 border border-dark-600 rounded-lg text-green-400 font-mono text-sm focus:outline-none focus:border-cyber-500 resize-none"
                />
                <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 text-sm">
                  <Code className="h-4 w-4" />
                  Run Tests
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-dark-800 border-t border-dark-700">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-600"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  idx === currentQuestion
                    ? "bg-cyber-500 text-dark-950"
                    : answers[quiz.questions[idx].id] !== undefined
                    ? "bg-dark-600 text-white"
                    : flaggedQuestions.includes(quiz.questions[idx].id)
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-dark-700 text-dark-400"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(quiz.questions.length - 1, prev + 1))}
              className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPlayer;
