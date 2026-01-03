import { create } from "zustand";

export const useAssessmentStore = create((set, get) => ({
  quizzes: [],
  assessments: [],
  userAnswers: {},
  results: [],
  loading: false,

  fetchQuizzes: async (courseId = null) => {
    set({
      quizzes: [
        {
          id: 1,
          title: "Network Security Fundamentals",
          courseId: 1,
          type: "quiz",
          timeLimit: 30,
          totalQuestions: 15,
          passingScore: 70,
          randomize: true,
          questions: [
            {
              id: 1,
              type: "multiple_choice",
              question: "Which protocol operates at the Transport layer of the OSI model?",
              options: ["HTTP", "TCP", "IP", "Ethernet"],
              correctAnswer: 1,
              points: 10,
              explanation: "TCP (Transmission Control Protocol) operates at Layer 4 (Transport) of the OSI model."
            },
            {
              id: 2,
              type: "multiple_select",
              question: "Select all valid port numbers for HTTPS:",
              options: ["80", "443", "8443", "8080"],
              correctAnswers: [1, 2],
              points: 15,
              explanation: "HTTPS typically uses ports 443 and 8443."
            },
            {
              id: 3,
              type: "true_false",
              question: "A firewall can prevent all types of malware infections.",
              correctAnswer: false,
              points: 5,
              explanation: "Firewalls primarily filter network traffic but cannot prevent all malware, especially those delivered through encrypted channels or social engineering."
            },
            {
              id: 4,
              type: "fill_blank",
              question: "The default port for SSH is ____.",
              correctAnswer: "22",
              acceptableAnswers: ["22", "port 22"],
              points: 10,
              explanation: "SSH (Secure Shell) uses port 22 by default."
            },
            {
              id: 5,
              type: "matching",
              question: "Match the attack type with its description:",
              pairs: [
                { left: "SQL Injection", right: "Manipulating database queries through user input" },
                { left: "XSS", right: "Injecting malicious scripts into web pages" },
                { left: "CSRF", right: "Forcing users to execute unwanted actions" },
                { left: "DDoS", right: "Overwhelming servers with traffic" }
              ],
              points: 20,
              explanation: "Understanding attack types is crucial for defense."
            },
            {
              id: 6,
              type: "code_submission",
              question: "Write a Python function to validate an IP address:",
              starterCode: "def validate_ip(ip_address):\n    # Your code here\n    pass",
              testCases: [
                { input: "192.168.1.1", expected: true },
                { input: "256.1.1.1", expected: false },
                { input: "10.0.0.1", expected: true }
              ],
              points: 25,
              explanation: "IP validation is essential for network security tools."
            }
          ]
        },
        {
          id: 2,
          title: "Web Application Security Assessment",
          courseId: 2,
          type: "exam",
          timeLimit: 60,
          totalQuestions: 25,
          passingScore: 75,
          proctored: true,
          randomize: true,
          questions: []
        }
      ]
    });
  },

  submitQuiz: async (quizId, answers) => {
    const quiz = get().quizzes.find(q => q.id === quizId);
    if (!quiz) return { success: false, error: "Quiz not found" };

    let score = 0;
    let totalPoints = 0;
    const questionResults = [];

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      let isCorrect = false;

      switch (question.type) {
        case "multiple_choice":
          isCorrect = userAnswer === question.correctAnswer;
          break;
        case "multiple_select":
          isCorrect = JSON.stringify(userAnswer?.sort()) === JSON.stringify(question.correctAnswers.sort());
          break;
        case "true_false":
          isCorrect = userAnswer === question.correctAnswer;
          break;
        case "fill_blank":
          isCorrect = question.acceptableAnswers.some(
            ans => ans.toLowerCase() === userAnswer?.toLowerCase()
          );
          break;
        case "matching":
          isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.pairs.map((_, i) => i));
          break;
        case "code_submission":
          isCorrect = true;
          break;
        default:
          break;
      }

      if (isCorrect) score += question.points;
      questionResults.push({
        questionId: question.id,
        isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer || question.correctAnswers,
        explanation: question.explanation
      });
    });

    const percentage = Math.round((score / totalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    const result = {
      id: Date.now(),
      quizId,
      score,
      totalPoints,
      percentage,
      passed,
      questionResults,
      completedAt: new Date().toISOString()
    };

    set(state => ({ results: [...state.results, result] }));
    return { success: true, result };
  },

  executeCode: async (code, testCases) => {
    const results = testCases.map(testCase => ({
      input: testCase.input,
      expected: testCase.expected,
      actual: testCase.expected,
      passed: true
    }));
    return { success: true, results, allPassed: true };
  },

  getPerformanceAnalytics: async (userId) => {
    return {
      overallScore: 78,
      skillLevels: {
        "Network Security": 85,
        "Web Security": 72,
        "Cryptography": 68,
        "Forensics": 75,
        "Malware Analysis": 62
      },
      competencyHeatmap: [
        { skill: "SQL Injection", level: "Advanced", score: 92 },
        { skill: "XSS Prevention", level: "Intermediate", score: 75 },
        { skill: "Buffer Overflow", level: "Beginner", score: 45 },
        { skill: "Packet Analysis", level: "Advanced", score: 88 }
      ],
      timeOnTask: {
        total: 4520,
        byCategory: {
          "Videos": 1800,
          "Labs": 1500,
          "Quizzes": 720,
          "Reading": 500
        }
      },
      attemptHistory: [
        { date: "2024-03-01", quizId: 1, score: 65 },
        { date: "2024-03-08", quizId: 1, score: 78 },
        { date: "2024-03-15", quizId: 2, score: 82 }
      ],
      skillGaps: [
        { skill: "Buffer Overflow", recommendation: "Complete Binary Exploitation module" },
        { skill: "Malware Analysis", recommendation: "Start Reverse Engineering course" }
      ]
    };
  }
}));
