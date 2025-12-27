import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedCourses from "../components/FeaturedCourses";
import LearningPaths from "../components/LearningPaths";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import { learningPaths } from "../data/learningPaths";

function Home() {
  return (
    <main id="home-page">
      <Hero />
      <Stats />
      <FeaturedCourses />
      <LearningPaths paths={learningPaths} />
      <Features />
      <Testimonials />
      <CTASection />
    </main>
  );
}

export default Home;
