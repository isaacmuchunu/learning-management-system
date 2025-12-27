import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Users, Award, Globe, Zap } from "lucide-react";

function About() {
  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Executive Officer",
      bio: "Former NSA analyst with 20+ years in cybersecurity",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400&search_term=professional,woman,executive,business",
    },
    {
      name: "Alex Chen",
      role: "Chief Technology Officer",
      bio: "Ex-Google security engineer and ethical hacker",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&search_term=professional,man,tech,executive",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Training",
      bio: "OSCP, OSCE certified with enterprise training expertise",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&search_term=professional,man,instructor,corporate",
    },
    {
      name: "Emily Rodriguez",
      role: "Director of Curriculum",
      bio: "PhD in Computer Science, focused on security education",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400&search_term=professional,woman,educator,tech",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We practice what we teach. Security is at the core of everything we do.",
    },
    {
      icon: Target,
      title: "Practical Skills",
      description: "Hands-on training that prepares you for real-world challenges.",
    },
    {
      icon: Users,
      title: "Community",
      description: "A global network of professionals supporting each other's growth.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Industry-recognized certifications that validate your expertise.",
    },
  ];

  return (
    <main id="about-page" className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient">CyberShield Academy</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-3xl mx-auto">
            We are a leading cybersecurity training platform dedicated to empowering 
            professionals with the skills they need to protect organizations worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-dark-300 leading-relaxed mb-6">
                In an era of evolving cyber threats, we believe that quality education 
                should be accessible to everyone. Our mission is to bridge the cybersecurity 
                skills gap by providing world-class training that combines theoretical 
                knowledge with practical, hands-on experience.
              </p>
              <p className="text-dark-300 leading-relaxed">
                Founded by industry veterans, CyberShield Academy has trained over 50,000 
                professionals across 120+ countries, helping them launch and advance their 
                careers in cybersecurity.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800&search_term=cybersecurity,team,office,professional"
                alt="CyberShield Academy Team"
                className="rounded-2xl border border-dark-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-dark-900/50 rounded-2xl p-6 border border-dark-700 text-center"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-cyber-500/10 border border-cyber-500/30 mb-4">
                  <value.icon className="h-7 w-7 text-cyber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-dark-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-dark-900/50 rounded-2xl overflow-hidden border border-dark-700 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-cyber-400 text-sm mb-2">{member.role}</p>
                  <p className="text-dark-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default About;
