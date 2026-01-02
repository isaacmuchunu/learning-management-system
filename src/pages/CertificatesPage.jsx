import React from "react";
import { motion } from "framer-motion";
import CertificateViewer from "../components/CertificateViewer";

function CertificatesPage() {
  return (
    <main id="certificates-page" className="min-h-screen bg-dark-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Certificates & <span className="text-gradient">Badges</span>
          </h1>
          <p className="text-dark-400">Your achievements and credentials</p>
        </motion.div>

        <CertificateViewer />
      </div>
    </main>
  );
}

export default CertificatesPage;
