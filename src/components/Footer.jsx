import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

function Footer() {
  const footerLinks = {
    courses: [
      { name: "Ethical Hacking", path: "/courses" },
      { name: "SOC Analyst", path: "/courses" },
      { name: "Cloud Security", path: "/courses" },
      { name: "Incident Response", path: "/courses" },
      { name: "GRC Training", path: "/courses" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Enterprise", path: "/enterprise" },
      { name: "Partners", path: "/partners" },
      { name: "Blog", path: "/blog" },
    ],
    resources: [
      { name: "Documentation", path: "/docs" },
      { name: "Community", path: "/community" },
      { name: "Labs", path: "/labs" },
      { name: "Certifications", path: "/certifications" },
      { name: "Support", path: "/support" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer id="main-footer" className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-cyber-500" />
              <span className="text-xl font-bold text-white">
                Cyber<span className="text-cyber-500">Shield</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              Empowering cybersecurity professionals with world-class training, 
              hands-on labs, and industry-recognized certifications.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-dark-400 text-sm">
                <Mail className="h-4 w-4 text-cyber-500" />
                <span>contact@cybershield.academy</span>
              </div>
              <div className="flex items-center gap-3 text-dark-400 text-sm">
                <Phone className="h-4 w-4 text-cyber-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-dark-400 text-sm">
                <MapPin className="h-4 w-4 text-cyber-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-cyber-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-cyber-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-cyber-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-cyber-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-lg bg-dark-800 text-dark-400 hover:bg-dark-700 hover:text-cyber-400 transition-all"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} CyberShield Academy. All rights reserved.
          </p>
        </div>
      </div>

      <div className="bg-dark-900/50 py-3 border-t border-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-dark-500 text-xs">
            AI vibe coded development by{" "}
            <a
              href="https://biela.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-cyber-400 transition-colors"
            >
              Biela.dev
            </a>
            , powered by{" "}
            <a
              href="https://teachmecode.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-cyber-400 transition-colors"
            >
              TeachMeCode® Institute
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
