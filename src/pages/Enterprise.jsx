import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building, 
  Users, 
  BarChart3, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Phone,
  Mail
} from "lucide-react";
import Swal from "sweetalert2";

function Enterprise() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Request Submitted!",
      text: "Our enterprise team will contact you within 24 hours.",
      icon: "success",
      confirmButtonColor: "#00ff9d",
      background: "#1e293b",
      color: "#f1f5f9",
    });
    setFormData({ name: "", email: "", company: "", employees: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    {
      icon: Users,
      title: "Team Management",
      description: "Easily manage user seats, track progress, and monitor team performance.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards showing skill gaps and learning progress.",
    },
    {
      icon: Shield,
      title: "Custom Learning Paths",
      description: "Tailored training programs aligned with your organization's needs.",
    },
    {
      icon: Building,
      title: "SSO Integration",
      description: "Seamless integration with your existing identity providers.",
    },
  ];

  const features = [
    "Unlimited course access for all team members",
    "Dedicated customer success manager",
    "Custom learning paths and curriculum",
    "Real-time progress tracking and reporting",
    "Priority technical support",
    "Volume discounts available",
    "On-premise deployment options",
    "API access for LMS integration",
  ];

  return (
    <main id="enterprise-page" className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/10 border border-electric-purple/30 mb-4">
            <Building className="h-4 w-4 text-electric-purple" />
            <span className="text-electric-purple text-sm font-medium">Enterprise Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Train Your <span className="text-gradient">Security Team</span> at Scale
          </h1>
          <p className="text-dark-400 text-lg max-w-3xl mx-auto">
            Custom cybersecurity training solutions for organizations of all sizes. 
            Upskill your team with hands-on labs and expert-led courses.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Enterprise Benefits</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-cyber-500/10 border border-cyber-500/30">
                    <benefit.icon className="h-6 w-6 text-cyber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{benefit.title}</h3>
                    <p className="text-dark-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-4">What is Included</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-dark-300">
                    <CheckCircle className="h-5 w-5 text-cyber-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-dark-900/50 rounded-2xl p-8 border border-dark-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Contact Our Sales Team</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Work Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 transition-colors"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Team Size</label>
                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-cyber-500 transition-colors"
                >
                  <option value="">Select team size</option>
                  <option value="10-50">10-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-cyber-500 transition-colors resize-none"
                  placeholder="Tell us about your training needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-cyber-500 text-dark-950 font-semibold rounded-lg hover:bg-cyber-400 transition-colors flex items-center justify-center gap-2"
              >
                Request Demo
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dark-400">
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-cyber-400 transition-colors">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </a>
              <a href="mailto:enterprise@cybershield.com" className="flex items-center gap-2 hover:text-cyber-400 transition-colors">
                <Mail className="h-4 w-4" />
                enterprise@cybershield.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default Enterprise;
