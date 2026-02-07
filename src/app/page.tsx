"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChartBar, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import { AnimatedSection } from '../components/home/AnimatedSection';
import { ComparisonTable } from '../components/home/ComparisonTable';
import { ProcessusRevo } from '../components/home/ProcessusRevo';
import { StrategicCTA } from '../components/home/StrategicCTA';

const Home = () => {
  const tableHeaders = ["Niveau d'Expérience", "Afrique (Hubs Tech)", "Canada (Cible)"];
  const tableData = [
    ["Intermédiaire (4-7 ans)", "~18,000 CAD", "120,000 CAD"],
    ["Senior (8+ ans)", "~26,000 CAD", "160,000 CAD"]
  ];

  return (
    <div className="font-sans bg-gray-900 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Ne laissez plus 80% de votre potentiel de revenu sur la table.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Votre expertise en Gestion de Projet est une compétence de luxe au Canada. Arrêtez de la brader.
          </motion.p>
        </div>
      </section>

      {/* Floating Hook Card */}
      <div className="relative z-10 -mt-32 sm:-mt-40 px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-xl shadow-2xl">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Disponibilité : 12 places ce mois
              </span>
              <div className="mt-6">
                 <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center bg-white hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 animate-pulse"
                 >
                    LANCER MON ANALYSE DE RENDEMENT
                    <FaArrowRight className="ml-3" />
                  </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Section Preuve */}
      <section className="py-24 sm:py-32 px-4">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              <FaChartBar className="inline mr-3" />
              Ne subissez plus le marché, dominez-le.
            </h2>
            <ComparisonTable headers={tableHeaders} data={tableData} />
            <StrategicCTA />
          </div>
        </AnimatedSection>
      </section>

      <ProcessusRevo />

      {/* Cost of Inaction Section */}
      <section className="pb-24 sm:pb-32 px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
             <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <FaExclamationTriangle className="inline mr-3 text-red-500" />
                Le Coût Réel de l'Inaction
             </h2>
             <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-8">
                <p className="text-xl text-gray-300">Votre passivité vous coûte cher (en perte de salaire net) :</p>
                <p className="font-geist-mono text-7xl md:text-9xl font-bold text-blue-400 my-4 tracking-tighter">
                  ~390,000 CAD
                </p>
                <p className="text-lg text-gray-400">Basé sur les opportunités manquées avec votre profil.</p>
             </div>
             <StrategicCTA />
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Home;
