import { motion } from "framer-motion";
import { Users, Trophy, Calendar, Clock, Gift } from "lucide-react";
import { useGamificationStore } from "../store/gamificationStore";

function TeamCompetitions() {
  const { teamCompetitions, fetchTeamCompetitions, joinTeamCompetition } = useGamificationStore();

  useEffect(() => {
    fetchTeamCompetitions();
  }, []);

  return (
    <div id="team-competitions" className="space-y-6">
      {teamCompetitions.map((competition, idx) => (
        <motion.div
          key={competition.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`bg-dark-900/50 rounded-xl border p-6 ${
            competition.status === "active" ? "border-cyber-500/30" : "border-dark-700"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {competition.status === "active" && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Live
                  </span>
                )}
                {competition.status === "upcoming" && (
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                    Upcoming
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{competition.name}</h3>
              <p className="text-dark-400 text-sm mt-1">{competition.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-dark-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {competition.teams.reduce((acc, t) => acc + t.members, 0)} participants
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {competition.teams.sort((a, b) => b.score - a.score).map((team, teamIdx) => (
              <div
                key={team.id}
                className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-lg"
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  teamIdx === 0 ? "bg-yellow-500/20 text-yellow-400" :
                  teamIdx === 1 ? "bg-gray-400/20 text-gray-300" :
                  teamIdx === 2 ? "bg-amber-600/20 text-amber-500" :
                  "bg-dark-700 text-dark-400"
                }`}>
                  {teamIdx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{team.name}</h4>
                  <span className="text-dark-500 text-xs">{team.members} members</span>
                </div>
                <span className="text-cyber-400 font-bold">{team.score} pts</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-dark-700">
            <div>
              <span className="text-dark-400 text-sm">Prizes:</span>
              <div className="flex items-center gap-2 mt-1">
                {competition.prizes.map((prize, idx) => (
                  <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs">
                    <Gift className="h-3 w-3" />
                    {prize}
                  </span>
                ))}
              </div>
            </div>
            {competition.status === "upcoming" && (
              <button className="px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm">
                Join Competition
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default TeamCompetitions;
