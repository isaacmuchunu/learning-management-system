import { motion } from "framer-motion";
import { Code, Clock, User, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { useSocialStore } from "../store/socialStore";

function CodeReviewHub() {
  const { codeReviews, fetchCodeReviews, submitCodeReview } = useSocialStore();
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    fetchCodeReviews();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-400 bg-yellow-500/20";
      case "in_review": return "text-blue-400 bg-blue-500/20";
      case "completed": return "text-green-400 bg-green-500/20";
      default: return "text-dark-400 bg-dark-700";
    }
  };

  return (
    <div id="code-review-hub" className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowSubmit(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm"
        >
          <Plus className="h-4 w-4" />
          Submit Code for Review
        </button>
      </div>

      <div className="space-y-4">
        {codeReviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-dark-900/50 rounded-xl border border-dark-700 p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-dark-800 rounded-lg">
                  <Code className="h-5 w-5 text-cyber-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{review.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-dark-400">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {review.submitter.name}
                    </span>
                    <span>{review.language}</span>
                    <span>{review.linesOfCode} lines</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(review.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {review.findings !== undefined && (
                  <span className="text-yellow-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {review.findings} findings
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(review.status)}`}>
                  {review.status.replace("_", " ")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CodeReviewHub;
