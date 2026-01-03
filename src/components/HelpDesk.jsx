import { motion } from "framer-motion";
import { 
  HelpCircle, Plus, Search, Filter, 
  Clock, MessageSquare, CheckCircle, AlertCircle,
  User, Send
} from "lucide-react";
import { useAdminStore } from "../store/adminStore";

function HelpDesk({ isAdmin = false }) {
  const { helpTickets, fetchHelpTickets, updateTicket, replyToTicket } = useAdminStore();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", category: "technical", message: "" });
  const [replyMessage, setReplyMessage] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchHelpTickets();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "text-yellow-400 bg-yellow-500/20";
      case "in_progress": return "text-blue-400 bg-blue-500/20";
      case "resolved": return "text-green-400 bg-green-500/20";
      default: return "text-dark-400 bg-dark-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-dark-400";
    }
  };

  const filteredTickets = helpTickets.filter(t => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const handleReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;
    await replyToTicket(selectedTicket.id, replyMessage);
    setReplyMessage("");
  };

  return (
    <div id="help-desk" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyber-500/20 rounded-lg">
            <HelpCircle className="h-6 w-6 text-cyber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Help & Support</h2>
            <p className="text-dark-400 text-sm">Get help with your account or courses</p>
          </div>
        </div>
        {!isAdmin && (
          <button
            onClick={() => setShowNewTicket(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm"
          >
            <Plus className="h-4 w-4" />
            New Ticket
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
          />
        </div>
        <div className="flex bg-dark-800 rounded-lg p-1">
          {["all", "open", "in_progress", "resolved"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-cyber-500 text-dark-950"
                  : "text-dark-400 hover:text-white"
              }`}
            >
              {status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          {filteredTickets.map((ticket) => (
            <motion.button
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedTicket(ticket)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedTicket?.id === ticket.id
                  ? "bg-cyber-500/10 border-cyber-500/30"
                  : "bg-dark-900/50 border-dark-700 hover:border-dark-600"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace("_", " ")}
                </span>
                <span className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">{ticket.subject}</h4>
              <div className="flex items-center gap-2 text-dark-500 text-xs">
                <Clock className="h-3 w-3" />
                {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-dark-900/50 rounded-xl border border-dark-700 h-full flex flex-col">
              <div className="p-4 border-b border-dark-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{selectedTicket.subject}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-dark-400">
                      <span>#{selectedTicket.id}</span>
                      <span>•</span>
                      <span>{selectedTicket.category}</span>
                      <span>•</span>
                      <span className={`${getStatusColor(selectedTicket.status)} px-2 py-0.5 rounded text-xs`}>
                        {selectedTicket.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  {isAdmin && selectedTicket.status !== "resolved" && (
                    <button
                      onClick={() => updateTicket(selectedTicket.id, { status: "resolved" })}
                      className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === "support" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`p-2 rounded-lg ${
                      msg.sender === "support" ? "bg-cyber-500/20" : "bg-dark-800"
                    }`}>
                      <User className={`h-4 w-4 ${
                        msg.sender === "support" ? "text-cyber-500" : "text-dark-400"
                      }`} />
                    </div>
                    <div className={`max-w-[70%] p-3 rounded-xl ${
                      msg.sender === "support"
                        ? "bg-cyber-500/10 text-white"
                        : "bg-dark-800 text-dark-200"
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-dark-500 text-xs mt-1 block">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-dark-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReply()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
                  />
                  <button
                    onClick={handleReply}
                    className="px-4 py-2 bg-cyber-500 text-dark-950 rounded-lg hover:bg-cyber-400"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-dark-900/50 rounded-xl border border-dark-700 h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-dark-600 mx-auto mb-3" />
                <p className="text-dark-400">Select a ticket to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showNewTicket && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 rounded-xl p-6 w-full max-w-lg border border-dark-700"
          >
            <h2 className="text-xl font-bold text-white mb-4">Create Support Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
                >
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing</option>
                  <option value="account">Account</option>
                  <option value="content">Content</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Message</label>
                <textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500 resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewTicket(false)}
                className="flex-1 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewTicket(false)}
                className="flex-1 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400"
              >
                Submit Ticket
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HelpDesk;
