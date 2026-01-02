import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EnhancedVideoPlayer from "../components/EnhancedVideoPlayer";

function VideoPlayerPage() {
  const { courseId, lessonId } = useParams();

  const lessonData = {
    title: "SQL Injection Attack Demonstration",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    posterUrl: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800&search_term=hacking,cybersecurity",
    chapters: [
      { time: 0, title: "Introduction to SQL Injection" },
      { time: 60, title: "Understanding Database Queries" },
      { time: 180, title: "Types of SQL Injection" },
      { time: 300, title: "Live Attack Demo" },
      { time: 480, title: "Prevention Techniques" },
      { time: 600, title: "Summary" }
    ],
    transcript: [
      { time: 0, text: "Welcome to this comprehensive guide on SQL injection attacks." },
      { time: 10, text: "SQL injection is one of the most common web security vulnerabilities." },
      { time: 20, text: "In this lesson, we will explore how these attacks work and how to prevent them." },
      { time: 30, text: "Let us start by understanding what happens behind the scenes." }
    ]
  };

  return (
    <main className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EnhancedVideoPlayer
            videoUrl={lessonData.videoUrl}
            posterUrl={lessonData.posterUrl}
            title={lessonData.title}
            chapters={lessonData.chapters}
            transcript={lessonData.transcript}
            onProgress={(progress) => console.log("Progress:", progress)}
            onComplete={() => console.log("Video completed")}
          />

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white mb-2">{lessonData.title}</h1>
            <p className="text-dark-400">Course: Ethical Hacking Fundamentals • Lesson 5 of 24</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default VideoPlayerPage;
