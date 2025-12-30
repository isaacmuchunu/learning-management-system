import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MoreVertical, Shield, User, Mail } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import Swal from "sweetalert2";

function AdminUsers() {
  const { users, fetchUsers, updateUserRole } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = async (user, newRole) => {
    const result = await Swal.fire({
      title: "Change Role?",
      text: `Change ${user.full_name}'s role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00ff9d",
      cancelButtonColor: "#475569",
      background: "#1e293b",
      color: "#f1f5f9"
    });

    if (result.isConfirmed) {
      await updateUserRole(user.id, newRole);
      Swal.fire({
        title: "Role Updated!",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    }
  };

  return (
    <div id="admin-users" className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">User Management</h1>
        <p className="text-dark-400 text-sm">Manage platform users and roles</p>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm pl-10 pr-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
        />
      </div>

      <div className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-800/50">
            <tr>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">User</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Email</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Role</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Joined</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-dark-700"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyber-500/20 flex items-center justify-center">
                      <span className="text-cyber-500 font-medium text-sm">
                        {user.full_name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium">{user.full_name || "Unknown"}</span>
                  </div>
                </td>
                <td className="p-3 text-dark-300 text-sm">{user.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    user.role === "admin" 
                      ? "bg-cyber-500/20 text-cyber-400" 
                      : "bg-dark-700 text-dark-300"
                  }`}>
                    {user.role || "student"}
                  </span>
                </td>
                <td className="p-3 text-dark-300 text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    value={user.role || "student"}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="px-2 py-1 bg-dark-800 border border-dark-600 rounded text-white text-xs focus:outline-none focus:border-cyber-500"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
