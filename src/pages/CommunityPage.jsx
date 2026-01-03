import { motion } from "framer-motion";
import { 
  MessageSquare, Users, BookOpen, Code, 
  Award, UserPlus
} from "lucide-react";
import CommunityForums from "../components/CommunityForums";
import StudyGroups from "../components/StudyGroups";
import MentorDirectory from "../components/MentorDirectory";
import CodeReviewHub from "../components/CodeReviewHub";

function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forums");

  const tabs = [
    { id: "forums", label: "Forums", icon: MessageSquare },
    { id: "groups", label: "Study Groups", icon: Users },
    { id: "mentors", label: "Mentors", icon: UserPlus },
    { id: "code-review", label: "Code Review", icon: Code }
  ];

  return (
    <main id="community-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Community <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-dark-400">Connect, collaborate, and learn together</p>
        </motion.div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
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

        {activeTab === "forums" && <CommunityForums />}
        {activeTab === "groups" && <StudyGroups />}
        {activeTab === "mentors" && <MentorDirectory />}
        {activeTab === "code-review" && <CodeReviewHub />}
      </div>
    </main>
  );
}

export default CommunityPage;
