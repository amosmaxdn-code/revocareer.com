"use client";

import { FaUserCog, FaRocket, FaClipboardCheck } from 'react-icons/fa';
import { AnimatedSection } from './AnimatedSection';

export const ProcessusRevo = () => {
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
