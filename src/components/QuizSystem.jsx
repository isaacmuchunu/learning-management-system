import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  ArrowRight,
  RotateCcw,
  Target
} from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a firewall?",
    options: [
      "To speed up network connections",
      "To filter incoming and outgoing network traffic",
      "To store backup data",
      "To encrypt files on the hard drive"
    ],
    correct: 1,
    explanation: "A firewall monitors and filters incoming and outgoing network traffic based on security rules."
  },
  {
    id: 2,
    question: "Which type of attack involves sending fraudulent emails to steal sensitive information?",
    options: [
      "DDoS Attack",
      "SQL Injection",
      "Phishing",
      "Man-in-the-Middle"
    ],
    correct: 2,
    explanation: "Phishing attacks use deceptive emails that appear legitimate to trick users into revealing sensitive information."
  },
  {
    id: 3,
    question: "What does CIA stand for in cybersecurity?",
    options: [
      "Computer Intelligence Agency",
      "Confidentiality, Integrity, Availability",
      "Cyber Investigation Authority",
      "Central Information Access"
    ],
    correct: 1,
    explanation: "The CIA triad represents the three pillars of information security: Confidentiality, Integrity, and Availability."
  },
  {
    id: 4,
    question: "What is the purpose of penetration testing?",
    options: [
      "To permanently break into systems",
      "To identify and exploit security vulnerabilities",
      "To install antivirus software",
      "To back up critical data"
    ],
    correct: 1,
    explanation: "Penetration testing simulates real-world attacks to identify security weaknesses before malicious actors can exploit them."
  },
  {
    id: 5,
    question: "Which encryption standard is currently considered most secure for Wi-Fi networks?",
    options: [
      "WEP",
      "WPA",
      "WPA2",
      "WPA3"
    ],
    correct: 3,
    explanation: "WPA3 is the latest Wi-Fi security standard, offering improved protection against password guessing and enhanced encryption."
  }
];

function QuizSystem({ questions = sampleQuestions, title = "Security Fundamentals Quiz" }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  React.useEffect(() => {
    if (timeLeft > 0 && !showExplanation && !completed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleSubmit();
    }
  }, [timeLeft, showExplanation, completed]);

  const handleAnswerSelect = (index) => {
    if (!showExplanation) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, { question: currentQuestion, selected: selectedAnswer, correct: isCorrect }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
    setTimeLeft(30);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const percentage = Math.round((score / questions.length) * 100);

  if (completed) {
    return (
      <div id="quiz-results" className="bg-dark-900/50 rounded-2xl border border-dark-700 p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
            percentage >= 80 ? "bg-cyber-500/20" : percentage >= 60 ? "bg-yellow-500/20" : "bg-red-500/20"
          }`}>
            <Trophy className={`h-10 w-10 ${
              percentage >= 80 ? "text-cyber-500" : percentage >= 60 ? "text-yellow-500" : "text-red-500"
            }`} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-dark-400">
            {percentage >= 80 ? "Excellent work! You have mastered this topic." : 
             percentage >= 60 ? "Good job! Keep practicing to improve." : 
             "Keep learning! Review the material and try again."}
          </p>
        </div>

        <div className="bg-dark-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-dark-300">Your Score</span>
            <span className={`text-2xl font-bold ${
              percentage >= 80 ? "text-cyber-400" : percentage >= 60 ? "text-yellow-400" : "text-red-400"
            }`}>{score}/{questions.length}</span>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                percentage >= 80 ? "bg-cyber-500" : percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
              }`}
            />
          </div>
          <p className="text-center text-dark-400 text-sm mt-2">{percentage}% Correct</p>
        </div>

        <div className="space-y-3 mb-6">
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg">
              {answer.correct ? (
                <CheckCircle className="h-5 w-5 text-cyber-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
              <span className="text-dark-300 text-sm">Question {index + 1}</span>
              <span className={`ml-auto text-sm ${answer.correct ? "text-cyber-400" : "text-red-400"}`}>
                {answer.correct ? "Correct" : "Incorrect"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-5 w-5" />
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div id="quiz-system" className="bg-dark-900/50 rounded-2xl border border-dark-700 p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-cyber-500" />
          <span className="text-white font-medium">{title}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          timeLeft <= 10 ? "bg-red-500/20 text-red-400" : "bg-dark-800 text-dark-300"
        }`}>
          <Clock className="h-4 w-4" />
          <span className="font-mono text-sm">{timeLeft}s</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-dark-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  showExplanation
                    ? index === question.correct
                      ? "border-cyber-500 bg-cyber-500/10"
                      : selectedAnswer === index
                        ? "border-red-500 bg-red-500/10"
                        : "border-dark-700 bg-dark-800/50"
                    : selectedAnswer === index
                      ? "border-cyber-500 bg-cyber-500/10"
                      : "border-dark-700 bg-dark-800/50 hover:border-dark-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    showExplanation
                      ? index === question.correct
                        ? "bg-cyber-500 text-dark-950"
                        : selectedAnswer === index
                          ? "bg-red-500 text-white"
                          : "bg-dark-700 text-dark-400"
                      : selectedAnswer === index
                        ? "bg-cyber-500 text-dark-950"
                        : "bg-dark-700 text-dark-400"
                  }`}>
                    {showExplanation ? (
                      index === question.correct ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={showExplanation && index === question.correct ? "text-cyber-400" : "text-dark-200"}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 rounded-xl p-4 mb-6"
            >
              <p className="text-dark-300 text-sm">{question.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {!showExplanation ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 py-3 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizSystem;
