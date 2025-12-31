import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  Award,
  BookOpen,
  Play,
  CheckCircle,
  ShoppingCart,
  Share2,
  Heart
} from "lucide-react";
import { courses } from "../data/courses";
import { useAuthStore } from "../store/authStore";
import { useCourseStore } from "../store/courseStore";
import CoursePlayer from "../components/CoursePlayer";
import Swal from "sweetalert2";

const sampleModules = [
  {
    title: "Getting Started",
    duration: "45 min",
    lessons: [
      { title: "Introduction to the Course", duration: "5:30", videoUrl: "", description: "Welcome to this comprehensive course. We'll cover all the essential concepts.", resources: [{ name: "Course Syllabus", url: "#" }] },
      { title: "Setting Up Your Environment", duration: "12:45", videoUrl: "", description: "Learn how to set up your development and testing environment." },
      { title: "Understanding the Fundamentals", duration: "18:20", videoUrl: "", description: "Core concepts that form the foundation of this course." },
      { title: "Your First Lab Exercise", duration: "8:15", videoUrl: "", description: "Hands-on practice to reinforce what you learned.", resources: [{ name: "Lab Files", url: "#" }] },
    ]
  },
  {
    title: "Core Concepts",
    duration: "1h 30min",
    lessons: [
      { title: "Deep Dive into Theory", duration: "22:10", videoUrl: "", description: "Understanding the theoretical foundations." },
      { title: "Practical Applications", duration: "28:35", videoUrl: "", description: "How to apply theory in real-world scenarios." },
      { title: "Common Pitfalls and Solutions", duration: "15:40", videoUrl: "", description: "Avoid common mistakes and learn best practices." },
      { title: "Advanced Techniques", duration: "24:15", videoUrl: "", description: "Taking your skills to the next level.", locked: true },
    ]
  },
  {
    title: "Hands-On Projects",
    duration: "2h 15min",
    lessons: [
      { title: "Project Overview", duration: "8:00", videoUrl: "", description: "Introduction to the capstone project.", locked: true },
      { title: "Building the Foundation", duration: "35:20", videoUrl: "", description: "Starting your project from scratch.", locked: true },
      { title: "Implementing Core Features", duration: "45:30", videoUrl: "", description: "Adding functionality to your project.", locked: true },
      { title: "Testing and Deployment", duration: "28:45", videoUrl: "", description: "Making your project production-ready.", locked: true },
      { title: "Final Review and Certification", duration: "17:25", videoUrl: "", description: "Complete assessment and earn your certificate.", locked: true },
    ]
  }
];

function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { enrollInCourse, enrollments } = useCourseStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const course = courses.find(c => c.id === parseInt(id));

  useEffect(() => {
    if (user && enrollments.length > 0) {
      const enrolled = enrollments.some(e => e.course_id === course?.id);
      setIsEnrolled(enrolled);
    }
  }, [user, enrollments, course]);

  if (!course) {
    return (
      <main className="min-h-screen bg-dark-950 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-cyber-400 hover:text-cyber-300">
            Browse all courses
          </Link>
        </div>
      </main>
    );
  }

  const handleEnroll = async () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to enroll in this course",
        icon: "info",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    const { error } = await enrollInCourse(user.id, course.id);
    if (error) {
      Swal.fire({
        title: "Enrollment Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    } else {
      setIsEnrolled(true);
      Swal.fire({
        title: "Successfully Enrolled!",
        text: "Start learning now",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        background: "#1e293b",
        color: "#f1f5f9"
      });
    }
  };

  const levelColors = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <main id="course-detail-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      {isEnrolled ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/courses"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
          <CoursePlayer course={course} modules={sampleModules} />
        </div>
      ) : (
        <>
          <div className="relative bg-gradient-to-b from-dark-900 to-dark-950 border-b border-dark-700">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-electric-purple/5"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <Link 
                to="/courses"
                className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Link>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-dark-700 text-dark-300">
                      {course.category}
                    </span>
                    {course.certification && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyber-500/20 text-cyber-400 border border-cyber-500/30 flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Certified
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {course.title}
                  </h1>

                  <p className="text-dark-300 mb-6">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-dark-300">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-medium">{course.rating}</span>
                      <span>({course.students.toLocaleString()} students)</span>
                    </div>
                    <div className="flex items-center gap-2 text-dark-300">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-dark-300">
                      <BookOpen className="h-4 w-4" />
                      {sampleModules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&search_term=professional,instructor,person"
                      alt={course.instructor}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">{course.instructor}</p>
                      <p className="text-dark-400 text-sm">Lead Instructor</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-900/80 rounded-xl border border-dark-700 overflow-hidden sticky top-24"
                  >
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button className="w-16 h-16 rounded-full bg-cyber-500/90 flex items-center justify-center text-dark-950 hover:bg-cyber-400 transition-colors">
                          <Play className="h-8 w-8 ml-1" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-white">${course.price}</span>
                        <span className="text-dark-500 line-through">${Math.round(course.price * 1.5)}</span>
                        <span className="text-cyber-400 text-sm font-medium">33% off</span>
                      </div>

                      <button
                        onClick={handleEnroll}
                        className="w-full py-3 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2 mb-3"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Enroll Now
                      </button>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={`flex-1 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                            isWishlisted 
                              ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                              : "bg-dark-800 text-dark-300 border border-dark-700 hover:border-dark-600"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-400" : ""}`} />
                          Wishlist
                        </button>
                        <button className="flex-1 py-2.5 bg-dark-800 text-dark-300 border border-dark-700 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:border-dark-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>

                      <div className="mt-5 pt-5 border-t border-dark-700 space-y-3">
                        <div className="flex items-center gap-3 text-dark-300 text-sm">
                          <CheckCircle className="h-4 w-4 text-cyber-500" />
                          Lifetime access
                        </div>
                        <div className="flex items-center gap-3 text-dark-300 text-sm">
                          <CheckCircle className="h-4 w-4 text-cyber-500" />
                          Certificate of completion
                        </div>
                        <div className="flex items-center gap-3 text-dark-300 text-sm">
                          <CheckCircle className="h-4 w-4 text-cyber-500" />
                          Hands-on lab access
                        </div>
                        <div className="flex items-center gap-3 text-dark-300 text-sm">
                          <CheckCircle className="h-4 w-4 text-cyber-500" />
                          Downloadable resources
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex gap-4 border-b border-dark-700 mb-8">
              {["overview", "curriculum", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-medium capitalize transition-colors relative ${
                    activeTab === tab ? "text-cyber-400" : "text-dark-400 hover:text-white"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">What You Will Learn</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-cyber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-dark-300 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Course Description</h2>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <p className="text-dark-300 leading-relaxed">
                        This comprehensive course is designed to take you from beginner to expert in {course.category.toLowerCase()}. 
                        Through a combination of theoretical knowledge and hands-on practical exercises, you will gain the skills 
                        needed to excel in your cybersecurity career.
                      </p>
                      <p className="text-dark-300 leading-relaxed mt-4">
                        The course includes access to our state-of-the-art virtual labs where you can practice your skills 
                        in a safe, controlled environment. Upon completion, you will receive a certificate that is recognized 
                        by employers worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-4">
                {sampleModules.map((module, idx) => (
                  <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-700 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Module {idx + 1}: {module.title}</h3>
                        <p className="text-dark-400 text-sm mt-1">{module.lessons.length} lessons • {module.duration}</p>
                      </div>
                    </div>
                    <div className="border-t border-dark-700 divide-y divide-dark-700/50">
                      {module.lessons.map((lesson, lessonIdx) => (
                        <div key={lessonIdx} className="px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                            {lesson.locked ? (
                              <span className="text-dark-500 text-xs">{lessonIdx + 1}</span>
                            ) : (
                              <Play className="h-3 w-3 text-dark-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-dark-300 text-sm">{lesson.title}</p>
                          </div>
                          <span className="text-dark-500 text-xs">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {[
                  { name: "John D.", rating: 5, comment: "Excellent course! The hands-on labs are incredibly valuable.", date: "2 days ago" },
                  { name: "Sarah M.", rating: 5, comment: "Clear explanations and great practical examples. Highly recommend!", date: "1 week ago" },
                  { name: "Mike T.", rating: 4, comment: "Very comprehensive content. Would love more advanced topics.", date: "2 weeks ago" },
                ].map((review, idx) => (
                  <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-700 p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-cyber-500/20 flex items-center justify-center">
                        <span className="text-cyber-400 font-medium">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-dark-600"}`} />
                            ))}
                          </div>
                          <span className="text-dark-500 text-xs">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-dark-300 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default CourseDetail;
