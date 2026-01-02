import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, Download, Share2, ExternalLink, 
  CheckCircle, Calendar, Shield, Star, Lock
} from "lucide-react";
import { useCertificateStore } from "../store/certificateStore";

function CertificateViewer() {
  const { certificates, badges, fetchCertificates } = useCertificateStore();
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTab, setActiveTab] = useState("certificates");

  React.useEffect(() => {
    fetchCertificates();
  }, []);

  const rarityColors = {
    common: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    uncommon: "bg-green-500/20 text-green-400 border-green-500/30",
    rare: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    epic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    legendary: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };

  return (
    <div id="certificate-viewer" className="space-y-6">
      <div className="flex items-center gap-4 border-b border-dark-700 pb-4">
        <button
          onClick={() => setActiveTab("certificates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "certificates"
              ? "bg-cyber-500 text-dark-950"
              : "text-dark-400 hover:text-white"
          }`}
        >
          <Award className="h-5 w-5" />
          Certificates ({certificates.length})
        </button>
        <button
          onClick={() => setActiveTab("badges")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "badges"
              ? "bg-cyber-500 text-dark-950"
              : "text-dark-400 hover:text-white"
          }`}
        >
          <Star className="h-5 w-5" />
          Badges ({badges.filter(b => b.earnedAt).length}/{badges.length})
        </button>
      </div>

      {activeTab === "certificates" && (
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-dark-900 to-dark-950 rounded-xl border border-cyber-500/30 overflow-hidden hover:border-cyber-500/50 transition-colors cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="h-32 bg-gradient-to-r from-cyber-500/20 via-electric-blue/20 to-electric-purple/20 flex items-center justify-center">
                <Shield className="h-16 w-16 text-cyber-500/50" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                  <CheckCircle className="h-5 w-5 text-cyber-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-dark-400">
                    <Calendar className="h-4 w-4" />
                    Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-dark-400">
                    <span className="text-cyber-400 font-mono text-xs">{cert.credentialId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyber-500/10 text-cyber-400 rounded-lg hover:bg-cyber-500/20 transition-colors text-sm">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-dark-800 text-dark-300 rounded-lg hover:bg-dark-700 transition-colors text-sm">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "badges" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-xl border p-4 text-center ${
                badge.earnedAt
                  ? rarityColors[badge.rarity]
                  : "bg-dark-900/50 border-dark-700 opacity-50"
              }`}
            >
              {!badge.earnedAt && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/50 rounded-xl">
                  <Lock className="h-8 w-8 text-dark-500" />
                </div>
              )}
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className={`font-semibold mb-1 ${badge.earnedAt ? "text-white" : "text-dark-500"}`}>
                {badge.title}
              </h4>
              <p className="text-xs text-dark-400 mb-2">{badge.description}</p>
              {badge.earnedAt ? (
                <span className="text-xs text-dark-500">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </span>
              ) : badge.progress ? (
                <div className="mt-2">
                  <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-dark-500 rounded-full"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-dark-500 mt-1">{badge.progress}% complete</span>
                </div>
              ) : null}
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs capitalize ${rarityColors[badge.rarity]}`}>
                {badge.rarity}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-900 rounded-xl max-w-2xl w-full overflow-hidden border border-dark-700"
            >
              <div className="h-48 bg-gradient-to-r from-cyber-500/30 via-electric-blue/30 to-electric-purple/30 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2300ff9d\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
                <Shield className="h-24 w-24 text-cyber-500" />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h2>
                <p className="text-dark-400 mb-4">This certificate verifies completion of the course</p>
                <div className="bg-dark-800 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-dark-400 block">Credential ID</span>
                      <span className="text-cyber-400 font-mono">{selectedCert.credentialId}</span>
                    </div>
                    <div>
                      <span className="text-dark-400 block">Issue Date</span>
                      <span className="text-white">{new Date(selectedCert.issuedAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-dark-400 block">Expiry Date</span>
                      <span className="text-white">{new Date(selectedCert.expiresAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-dark-400 block">Verification</span>
                      <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-cyber-400 flex items-center gap-1">
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-cyber-500 text-dark-950 font-medium rounded-lg hover:bg-cyber-400 flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download PDF
                  </button>
                  <button className="flex-1 py-3 bg-dark-800 text-white rounded-lg hover:bg-dark-700 flex items-center justify-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share on LinkedIn
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CertificateViewer;
