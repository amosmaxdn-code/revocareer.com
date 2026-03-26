"use client";

import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { AnimatedSection } from './AnimatedSection';

export const PricingSection = () => {
  const offers = [
    {
      title: "Diagnostic & Optimisation Express",
      badge: "Entrée",
      price: "15 000 FCFA",
      duration: "En 48h",
      description: "Obtenez un profil clair et professionnel pour attirer des opportunités concrètes.",
      features: [
        "Audit flash de votre profil",
        "Optimisation de la visibilité",
        "Correction des erreurs majeures",
        "Prêt en 48 heures"
      ],
      cta: "Optimiser mon profil",
      href: "/diagnostic?plan=express",
      highlight: false,
      color: "gray"
    },
    {
      title: "Canada Track (Premium)",
      badge: "Élite",
      price: "Sur Devis",
      duration: "Accompagnement VIP",
      description: "Le programme complet pour les Project Managers visant l'expatriation ou le remote international.",
      features: [
        "Ingénierie de Profil International",
        "Personal Branding de Luxe",
        "Accès Réseau Canada",
        "Stratégie de Négociation Salariale",
        "Garantie de Positionnement"
      ],
      cta: "Lancer mon Diagnostic",
      href: "/apply?plan=premium",
      highlight: true,
      color: "blue"
    },
    {
      title: "Repositionnement Stratégique",
      badge: "Transformation",
      price: "75 000 FCFA",
      duration: "Accélération",
      description: "Une transformation réelle pour arrêter de candidater au hasard et viser le niveau supérieur.",
      features: [
        "Clarté totale sur votre direction",
        "Storytelling aligné au marché",
        "Plan d'action concret sur 30 jours",
        "Augmentation des opportunités",
        "Méthode d'évolution autonome"
      ],
      cta: "Accélérer ma carrière",
      href: "/diagnostic?plan=strategic",
      highlight: false,
      color: "purple"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gray-900">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Choisissez votre niveau de <span className="text-blue-500">réussite</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Du simple ajustement à la transformation internationale, nous avons la solution adaptée à votre ambition.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                  offer.highlight 
                    ? 'bg-gradient-to-b from-blue-900/40 to-gray-900 border-blue-500 shadow-2xl shadow-blue-500/20 order-first lg:order-none scale-105 z-10' 
                    : 'bg-gray-800/40 border-gray-700 hover:border-gray-500'
                }`}
              >
                {offer.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Plus Populaire / Élite
                  </div>
                )}
                
                <div className="mb-8">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    offer.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 
                    offer.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {offer.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-4">{offer.title}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-white">{offer.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{offer.duration}</p>
                </div>

                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                  {offer.description}
                </p>

                <ul className="space-y-4 mb-10 flex-grow">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <FaCheckCircle className={`mt-1 mr-3 flex-shrink-0 ${offer.highlight ? 'text-blue-500' : 'text-gray-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={offer.href}
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${
                    offer.highlight 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {offer.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};
