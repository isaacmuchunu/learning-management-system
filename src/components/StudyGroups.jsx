import { motion } from "framer-motion";
import { Users, Calendar, Lock, Globe, UserPlus, MessageSquare } from "lucide-react";
import { useSocialStore } from "../store/socialStore";

function StudyGroups() {
  const { studyGroups, fetchStudyGroups, joinStudyGroup } = useSocialStore();

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  return (
    <div id="study-groups" className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-dark-900/50 rounded-xl border border-dark-700 p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-cyber-500/20 rounded-lg">
                <Users className="h-5 w-5 text-cyber-500" />
              </div>
              {group.isPublic ? (
                <Globe className="h-4 w-4 text-dark-400" />
              ) : (
                <Lock className="h-4 w-4 text-dark-400" />
              )}
            </div>
            <h3 className="text-white font-semibold mb-1">{group.name}</h3>
            <p className="text-dark-400 text-sm mb-4">{group.description}</p>
            <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {group.members}/{group.maxMembers}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {group.meetingSchedule}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {group.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-dark-800 text-dark-400 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => joinStudyGroup(group.id)}
              disabled={group.joined || group.members >= group.maxMembers}
              className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                group.joined
                  ? "bg-cyber-500/20 text-cyber-400 cursor-default"
                  : group.members >= group.maxMembers
                  ? "bg-dark-800 text-dark-500 cursor-not-allowed"
                  : "bg-cyber-500 text-dark-950 hover:bg-cyber-400"
              }`}
            >
              {group.joined ? (
                <>
                  <MessageSquare className="h-4 w-4" />
                  Open Group
                </>
              ) : group.members >= group.maxMembers ? (
                "Group Full"
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Join Group
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default StudyGroups;
