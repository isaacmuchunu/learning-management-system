import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, X } from "lucide-react";
import { useCourseStore } from "../../store/courseStore";
import Swal from "sweetalert2";

function AdminCourses() {
  const { courses, fetchCourses, createCourse, updateCourse, deleteCourse } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Offensive Security",
    level: "Beginner",
    duration: "",
    price: "",
    description: "",
    image: "",
    instructor: "",
    certification: true,
    featured: false
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      price: parseFloat(formData.price),
      students: 0,
      rating: 4.5,
      skills: ["Skill 1", "Skill 2", "Skill 3"]
    };

    if (editingCourse) {
      await updateCourse(editingCourse.id, courseData);
      Swal.fire({
        title: "Course Updated!",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    } else {
      await createCourse(courseData);
      Swal.fire({
        title: "Course Created!",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price.toString(),
      description: course.description,
      image: course.image,
      instructor: course.instructor,
      certification: course.certification,
      featured: course.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (course) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: `Are you sure you want to delete "${course.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      background: "#1e293b",
      color: "#f1f5f9"
    });

    if (result.isConfirmed) {
      await deleteCourse(course.id);
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    }
  };

  const resetForm = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      category: "Offensive Security",
      level: "Beginner",
      duration: "",
      price: "",
      description: "",
      image: "",
      instructor: "",
      certification: true,
      featured: false
    });
  };

  return (
    <div id="admin-courses" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Course Management</h1>
          <p className="text-dark-400 text-sm">Manage your course catalog</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm hover:bg-cyber-400 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm pl-10 pr-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 text-sm"
        />
      </div>

      <div className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-800/50">
            <tr>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Course</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Category</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Level</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Price</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Students</th>
              <th className="text-left p-3 text-dark-300 text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <motion.tr
                key={course.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-dark-700"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={course.image} alt={course.title} className="w-12 h-8 rounded object-cover" />
                    <span className="text-white text-sm font-medium">{course.title}</span>
                  </div>
                </td>
                <td className="p-3 text-dark-300 text-sm">{course.category}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    course.level === "Beginner" ? "bg-green-500/20 text-green-400" :
                    course.level === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {course.level}
                  </span>
                </td>
                <td className="p-3 text-white text-sm">${course.price}</td>
                <td className="p-3 text-dark-300 text-sm">{course.students?.toLocaleString() || 0}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-dark-400 hover:text-cyber-400 rounded transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleEdit(course)} className="p-1.5 text-dark-400 hover:text-blue-400 rounded transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(course)} className="p-1.5 text-dark-400 hover:text-red-400 rounded transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 rounded-xl border border-dark-700 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <h2 className="text-lg font-bold text-white">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-dark-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                  >
                    <option>Offensive Security</option>
                    <option>Blue Team</option>
                    <option>Cloud Security</option>
                    <option>GRC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="40 hours"
                    required
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Instructor</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyber-500 resize-none"
                ></textarea>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-dark-300 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.certification}
                    onChange={(e) => setFormData({ ...formData, certification: e.target.checked })}
                    className="rounded border-dark-600 bg-dark-800 text-cyber-500"
                  />
                  Certification
                </label>
                <label className="flex items-center gap-2 text-dark-300 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-dark-600 bg-dark-800 text-cyber-500"
                  />
                  Featured
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-dark-800 text-dark-300 font-medium rounded-lg text-sm hover:bg-dark-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-cyber-500 text-dark-950 font-medium rounded-lg text-sm hover:bg-cyber-400 transition-colors"
                >
                  {editingCourse ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminCourses;
