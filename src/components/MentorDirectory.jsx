import { motion } from "framer-motion";
import { Star, Clock, MessageSquare, Award, Filter } from "lucide-react";
import { useSocialStore } from "../store/socialStore";

function MentorDirectory() {
  const { mentors, fetchMentors, requestMentor } = useSocialStore();
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div id="mentor-directory" className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-dark-900/50 rounded-xl border border-dark-700 p-5"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold">{mentor.name}</h3>
                <p className="text-cyber-400 text-sm">{mentor.title}</p>
                <p className="text-dark-500 text-xs">{mentor.company}</p>
              </div>
            </div>
            <p className="text-dark-400 text-sm mb-4 line-clamp-2">{mentor.bio}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.expertise.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-dark-800 text-dark-400 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span>{mentor.rating}</span>
                <span className="text-dark-500">({mentor.reviews})</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs ${
                mentor.availability === "Available"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}>
                {mentor.availability}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">${mentor.hourlyRate}/hr</span>
              <button
                onClick={() => requestMentor(mentor.id, "")}
                className="px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm hover:bg-cyber-400"
              >
                Request Session
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MentorDirectory;
