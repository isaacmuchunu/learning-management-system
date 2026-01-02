import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, Plus, Search, MoreVertical, 
  UserPlus, Settings, Trash2, Edit2, 
  Upload, Download, Calendar, Filter
} from "lucide-react";
import { useUserManagementStore } from "../store/userManagementStore";
import Swal from "sweetalert2";

function UserGroupManager() {
  const { groups, cohorts, fetchGroups, fetchCohorts, createGroup, createCohort } = useUserManagementStore();
  const [activeTab, setActiveTab] = useState("groups");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchGroups();
    fetchCohorts();
  }, []);

  const handleCreate = async () => {
    if (!newItem.name.trim()) return;
    if (activeTab === "groups") {
      await createGroup(newItem);
    } else {
      await createCohort({ ...newItem, startDate: new Date().toISOString() });
    }
    setShowCreateModal(false);
    setNewItem({ name: "", description: "" });
    Swal.fire({
      title: "Created!",
      text: `${activeTab === "groups" ? "Group" : "Cohort"} created successfully`,
      icon: "success",
      confirmButtonColor: "#00ff9d",
      background: "#1e293b",
      color: "#f1f5f9"
    });
  };

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCohorts = cohorts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="user-group-manager" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">User Groups & Cohorts</h1>
          <p className="text-dark-400 text-sm">Organize users into groups and learning cohorts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 text-sm">
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 text-sm"
          >
            <Plus className="h-4 w-4" />
            Create {activeTab === "groups" ? "Group" : "Cohort"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-dark-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "groups"
                ? "bg-cyber-500 text-dark-950"
                : "text-dark-400 hover:text-white"
            }`}
          >
            Groups ({groups.length})
          </button>
          <button
            onClick={() => setActiveTab("cohorts")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "cohorts"
                ? "bg-cyber-500 text-dark-950"
                : "text-dark-400 hover:text-white"
            }`}
          >
            Cohorts ({cohorts.length})
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
          />
        </div>
      </div>

      {activeTab === "groups" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 rounded-xl border border-dark-700 p-4 hover:border-cyber-500/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-cyber-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-cyber-500" />
                </div>
                <button className="text-dark-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <h3 className="text-white font-semibold mb-1">{group.name}</h3>
              <p className="text-dark-400 text-sm mb-3">{group.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-cyber-400 text-sm font-medium">{group.members} members</span>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded">
                    <UserPlus className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCohorts.map((cohort, index) => (
            <motion.div
              key={cohort.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 rounded-xl border border-dark-700 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-electric-purple/20 rounded-lg">
                    <Calendar className="h-6 w-6 text-electric-purple" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{cohort.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-dark-400">
                      <span>{new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}</span>
                      <span>{cohort.members} members</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cohort.status === "active" 
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {cohort.status}
                  </span>
                  <button className="px-4 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 text-sm">
                    Manage
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 rounded-xl p-6 w-full max-w-md border border-dark-700"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Create {activeTab === "groups" ? "Group" : "Cohort"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500"
                  placeholder={`Enter ${activeTab === "groups" ? "group" : "cohort"} name`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500 resize-none"
                  placeholder="Enter description"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400"
              >
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default UserGroupManager;
