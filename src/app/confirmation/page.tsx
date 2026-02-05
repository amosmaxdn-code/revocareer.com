"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarCheck } from 'react-icons/fa';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <FaClock className="text-blue-500 text-6xl mx-auto mb-6" />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Analyse en cours...
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
          Votre profil présente des indicateurs clés pour le marché canadien.
        </p>

        <div className="mt-10">
          <a
            href="https://calendly.com/application-revocareer/session-strategique-eligibilite-canada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_5px_30px_rgba(59,130,246,0.3)]"
          >
            <FaCalendarCheck className="mr-3" />
            Réservez votre session de diagnostic de 15 min
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Cliquez sur le bouton ci-dessus pour obtenir vos résultats complets lors d'une session stratégique.
        </p>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;