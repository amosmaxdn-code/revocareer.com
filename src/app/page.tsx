"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChartBar, FaExclamationTriangle, FaArrowRight, FaUserCog, FaRocket, FaClipboardCheck } from 'react-icons/fa';

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// --- Responsive ComparisonTable Component ---
const ComparisonTable = ({ headers, data }: { headers: string[], data: (string | number)[][] }) => {
  const targetColumnIndex = headers.findIndex(h => h.includes('Canada (Cible)'));
  const nonTargetColumnIndex = headers.findIndex(h => h.includes('Afrique'));

  return (
    <>
      {/* Mobile View: Cards */}
      <div className="space-y-6 md:hidden">
        {data.map((row, i) => (
          <div key={i} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
            <h3 className="font-bold text-lg text-white mb-3">{row[0]}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{headers[nonTargetColumnIndex]}</span>
                <span className="font-mono">{row[nonTargetColumnIndex]}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-900/20 p-2 rounded-md">
                <span className="text-blue-400 font-semibold">{headers[targetColumnIndex]}</span>
                <span className="font-mono font-bold text-blue-300">{row[targetColumnIndex]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-900/50 rounded-lg shadow-xl border border-gray-700/50">
          <thead>
            <tr className="border-b border-gray-700/50">
              {headers.map((header, i) => (
                <th key={i} className={`py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider ${i === targetColumnIndex ? 'text-blue-400' : 'text-gray-400'}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-700/50 last:border-none">
                {row.map((cell, j) => (
                  <td key={j} className={`py-5 px-6 font-mono ${j === targetColumnIndex ? 'bg-blue-900/20 text-blue-300 font-bold' : ''}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// --- Le Processus Rev'O Component ---
const ProcessusRevo = () => {
  const steps = [
    {
      icon: FaClipboardCheck,
      title: "Diagnostic Data-Driven",
      description: "Analyse de votre profil actuel pour identifier les gaps par rapport aux exigences du marché canadien."
    },
    {
      icon: FaUserCog,
      title: "Ingénierie de Profil",
      description: "Alignement de votre CV et de votre personal branding sur les standards ATS et salariaux canadiens."
    },
    {
      icon: FaRocket,
      title: "Stratégie de Transition",
      description: "Accès à notre réseau et aux stratégies de ciblage pour décrocher des opportunités à 130k$ et plus."
    }
  ];

  return (
    <section className="py-24 sm:py-32 px-4 bg-gray-900/50">
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Le Processus Rev'O
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="text-center p-6 bg-gray-800/60 rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500 hover:bg-gray-800">
                <div className="flex justify-center mb-4">
                  <step.icon className="text-5xl text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

// --- New Strategic CTA Component ---
const StrategicCTA = () => {
  return (
    <div className="mt-12 text-center">
      <Link href="/diagnostic" legacyBehavior>
        <a className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Évaluer mon éligibilité au marché canadien (2 min)
        </a>
      </Link>
    </div>
  );
};

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
                 <Link href="/diagnostic" legacyBehavior>
                  <a className="inline-flex items-center justify-center bg-white hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 animate-pulse">
                    LANCER MON ANALYSE DE RENDEMENT
                    <FaArrowRight className="ml-3" />
                  </a>
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
