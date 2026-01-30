"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Analyse Terminée : Profil Éligible détecté
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
          Félicitations, votre profil a passé avec succès notre filtre préliminaire d'éligibilité.
          Pour valider votre accès au programme et sécuriser votre tarif, un entretien de validation est requis.
        </p>

        <div className="mt-10">
          <a
            href="https://calendly.com/application-revocareer/session-strategique-eligibilite-canada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_5px_30px_rgba(234,179,8,0.3)]"
          >
            RÉSERVER MA SESSION STRATÉGIQUE (Gratuit)
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-yellow-400/80">
          <FaExclamationTriangle />
          <p>Attention : En raison du volume de demandes, ce lien d'accès prioritaire expire dans 30 minutes.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;