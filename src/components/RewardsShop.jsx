import { motion } from "framer-motion";
import { Gift, Coins, BookOpen, Clock, Palette, Users } from "lucide-react";
import { useGamificationStore } from "../store/gamificationStore";
import Swal from "sweetalert2";

function RewardsShop() {
  const { rewards, virtualCurrency, fetchRewards, redeemReward } = useGamificationStore();

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleRedeem = async (reward) => {
    if (virtualCurrency < reward.cost) {
      Swal.fire({
        title: "Insufficient Coins",
        text: `You need ${reward.cost - virtualCurrency} more coins to redeem this reward.`,
        icon: "warning",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
      return;
    }

    const result = await Swal.fire({
      title: "Redeem Reward?",
      text: `Spend ${reward.cost} coins on "${reward.name}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00ff9d",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Redeem",
      background: "#1e293b",
      color: "#f1f5f9"
    });

    if (result.isConfirmed) {
      await redeemReward(reward.id);
      Swal.fire({
        title: "Redeemed!",
        text: "Your reward has been added to your account.",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "course": return BookOpen;
      case "lab": return Clock;
      case "cosmetic": return Palette;
      case "mentoring": return Users;
      default: return Gift;
    }
  };

  return (
    <div id="rewards-shop" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Gift className="h-6 w-6 text-cyber-500" />
          Rewards Shop
        </h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-lg">
          <Coins className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold">{virtualCurrency}</span>
          <span className="text-yellow-300/70 text-sm">coins</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, idx) => {
          const TypeIcon = getTypeIcon(reward.type);
          const canAfford = virtualCurrency >= reward.cost;

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-dark-900/50 rounded-xl border p-5 ${
                canAfford ? "border-dark-700 hover:border-cyber-500/30" : "border-dark-800 opacity-60"
              } transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-cyber-500/20 rounded-lg">
                  <TypeIcon className="h-6 w-6 text-cyber-500" />
                </div>
                <span className="px-2 py-0.5 bg-dark-800 text-dark-400 rounded text-xs capitalize">
                  {reward.type}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-4">{reward.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{reward.cost}</span>
                </div>
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    canAfford
                      ? "bg-cyber-500 text-dark-950 hover:bg-cyber-400"
                      : "bg-dark-800 text-dark-500 cursor-not-allowed"
                  }`}
                >
                  Redeem
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default RewardsShop;
