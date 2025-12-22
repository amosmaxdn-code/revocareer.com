"use client";

import { CTAButton } from "@/components/CTAButton";
import { FiCheckCircle, FiXCircle, FiTarget, FiGrid, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardHover = {
  scale: 1.05,
  transition: { duration: 0.3 }
}

// Wrapper for section styling with more vertical space
const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section 
    id={id} 
    className={`py-20 md:py-28 ${className}`}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeInUp}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  >
    <div className="container mx-auto px-6 max-w-5xl">
      {children}
    </div>
  </motion.section>
);

// Wrapper for section titles with a more corporate look
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-dark-blue">{children}</h2>
        {subtitle && <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        <div className="mt-6 mx-auto w-24 h-1 bg-primary"></div>
    </div>
);

export default function OnePager() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-dark-blue text-center pt-40 pb-24 md:pt-48 md:pb-32 text-white">
        <motion.div 
            className="container mx-auto px-6 max-w-4xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
        >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Devenir gestionnaire de projet crédible pour le Canada n’est pas une question de motivation.
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-primary leading-tight mt-2">
                C’est une question de structure.
            </h2>
            <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
              Revocareer accompagne des jeunes professionnels africains en gestion de projet (2 à 7 ans d’expérience) dans la construction d’un profil certifié, employable et crédible pour le marché canadien.
            </p>
            <div className="mt-12">
              <CTAButton href="/apply" variant="primary" className="text-lg px-10 py-4">Postuler au programme – Sélection obligatoire</CTAButton>
            </div>
        </motion.div>
      </section>

      {/* 2. POUR QUI / POUR QUI PAS */}
      <Section className="bg-white">
        <motion.div className="grid md:grid-cols-2 gap-x-12 gap-y-16" variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="flex items-center text-2xl font-bold text-dark-blue mb-6"><FiCheckCircle className="mr-3 text-green-500" /> Ce programme est pour vous si :</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start"><FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" /> Vous avez une expérience réelle en gestion de projet</li>
              <li className="flex items-start"><FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" /> Vous visez une carrière internationale, notamment au Canada</li>
              <li className="flex items-start"><FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" /> Vous êtes prêt à structurer votre profil, pas à improviser</li>
              <li className="flex items-start"><FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" /> Vous acceptez la remise en question et la discipline</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="flex items-center text-2xl font-bold text-dark-blue mb-6"><FiXCircle className="mr-3 text-red-500" /> Ce programme n’est pas pour vous si :</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" /> Vous débutez sans expérience terrain</li>
              <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" /> Vous voulez “tester pour voir”</li>
              <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" /> Vous cherchez une garantie d’emploi ou d’immigration</li>
              <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" /> Vous refusez d’investir du temps, de l’énergie et de l’argent</li>
            </ul>
          </motion.div>
        </motion.div>
        <div className="text-center mt-16">
            <p className="text-xl font-semibold text-dark-blue">Revocareer filtre ses candidats. Le Canada aussi.</p>
        </div>
      </Section>

      {/* 3. LE PROBLÈME RÉEL */}
      <Section className="bg-background text-center">
        <SectionTitle subtitle="La majorité des professionnels africains en gestion de projet accumulent des certifications mal positionnées, ont des CV illisibles à l’international, sous-estiment les standards canadiens et confondent expérience locale et employabilité globale.">Le Problème Réel</SectionTitle>
        <motion.div whileHover={{y: -5}} className="mt-8 bg-white p-8 rounded-lg shadow-xl inline-block border border-gray-200">
            <p className="text-2xl font-bold text-dark-blue">Résultat : profils compétents, efforts réels, aucune traction internationale.</p>
        </motion.div>
        <p className="mt-12 text-2xl md:text-3xl font-bold text-primary">Le problème n’est pas votre intelligence. C’est l’absence de structure stratégique.</p>
      </Section>

      {/* 4. LA SOLUTION REVOCareer */}
      <Section className="text-center">
        <SectionTitle subtitle="Revocareer ne vous ajoute pas des couches de complexité. Nous organisons, nous filtrons, nous alignons.">La Solution Revocareer</SectionTitle>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-2">Notre approche repose sur 3 piliers fondamentaux :</p>
        <motion.div className="grid md:grid-cols-3 gap-8 mt-16 text-left" variants={staggerContainer}>
          <motion.div variants={fadeInUp} whileHover={cardHover} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <FiTarget className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-dark-blue">Clarté Stratégique</h3>
            <p className="mt-4 text-gray-600">Diagnostic brutal du profil, analyse de l’écart avec le marché et prise de décisions rationnelles.</p>
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={cardHover} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <FiGrid className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-dark-blue">Structuration du Profil</h3>
            <p className="mt-4 text-gray-600">Positionnement précis, sélection des certifications réellement utiles et création d'un narratif de carrière cohérent.</p>
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={cardHover} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <FiSend className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-dark-blue">Activation Marché</h3>
            <p className="mt-4 text-gray-600">CV et LinkedIn alignés, et développement d'une logique de candidature intelligente et réaliste.</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* 5. LE PROGRAMME */}
      <Section className="bg-background">
          <SectionTitle>Le Programme — Project Manager Canada Track</SectionTitle>
          <div className="max-w-3xl mx-auto border-t border-b border-gray-300 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-lg text-gray-700 mb-12">
              <div><span className="font-bold text-dark-blue block">Durée</span> 10 semaines</div>
              <div><span className="font-bold text-dark-blue block">Format</span> Structuré</div>
              <div><span className="font-bold text-dark-blue block">Cohorte</span> Limitée</div>
              <div><span className="font-bold text-dark-blue block">Entrée</span> Sur sélection</div>
          </div>
          <motion.div className="space-y-4 max-w-3xl mx-auto" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-md shadow-sm border flex items-center"><span className="text-2xl font-bold text-primary mr-4">1.</span> <div><strong className="text-dark-blue">Diagnostic stratégique :</strong> Analyse complète du parcours, forces réelles vs illusions.</div></motion.div>
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-md shadow-sm border flex items-center"><span className="text-2xl font-bold text-primary mr-4">2.</span> <div><strong className="text-dark-blue">Positionnement professionnel :</strong> Rôle exact visé, secteurs compatibles, différenciation crédible.</div></motion.div>
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-md shadow-sm border flex items-center"><span className="text-2xl font-bold text-primary mr-4">3.</span> <div><strong className="text-dark-blue">Stratégie de certifications :</strong> CAPM / PMP / PRINCE2 : quoi, quand, pourquoi. Élimination de l'inutile.</div></motion.div>
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-md shadow-sm border flex items-center"><span className="text-2xl font-bold text-primary mr-4">4.</span> <div><strong className="text-dark-blue">Dossier professionnel Canada :</strong> CV canadien structuré et LinkedIn stratégique.</div></motion.div>
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-md shadow-sm border flex items-center"><span className="text-2xl font-bold text-primary mr-4">5.</span> <div><strong className="text-dark-blue">Plan d’accès au marché :</strong> Stratégie de candidature et networking ciblé.</div></motion.div>
          </motion.div>
      </Section>

      {/* 6. LA TRANSFORMATION */}
      <Section className="text-center">
        <SectionTitle>La Transformation</SectionTitle>
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-4 items-center max-w-5xl mx-auto bg-white p-4 rounded-xl shadow-lg border">
          <motion.div variants={fadeInUp} className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-500 mb-4">Avant</h3>
            <ul className="space-y-2 text-gray-600 text-lg text-left">
              <li className="flex items-center"><FiXCircle className="text-red-400 mr-3"/>Profil flou</li>
              <li className="flex items-center"><FiXCircle className="text-red-400 mr-3"/>Certifications dispersées</li>
              <li className="flex items-center"><FiXCircle className="text-red-400 mr-3"/>CV non aligné</li>
              <li className="flex items-center"><FiXCircle className="text-red-400 mr-3"/>Candidatures inefficaces</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-dark-blue text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-accent mb-4">Après</h3>
            <ul className="space-y-2 text-gray-200 text-lg text-left">
              <li className="flex items-center"><FiCheckCircle className="text-green-400 mr-3"/>Positionnement clair</li>
              <li className="flex items-center"><FiCheckCircle className="text-green-400 mr-3"/>Profil certifiable et crédible</li>
              <li className="flex items-center"><FiCheckCircle className="text-green-400 mr-3"/>Dossier Canada solide</li>
              <li className="flex items-center"><FiCheckCircle className="text-green-400 mr-3"/>Capacité à agir de façon autonome</li>
            </ul>
          </motion.div>
        </motion.div>
      </Section>

      {/* 7. TON RÔLE, NOTRE RÔLE */}
       <Section className="bg-background">
          <SectionTitle>Votre Rôle, Notre Rôle</SectionTitle>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8 text-lg max-w-4xl mx-auto">
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-dark-blue mb-4">Ce que Revocareer fait</h3>
                  <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start"><FiCheckCircle className="text-primary mt-1 mr-3"/> Structurer votre profil</li>
                      <li className="flex items-start"><FiCheckCircle className="text-primary mt-1 mr-3"/> Orienter vos décisions</li>
                      <li className="flex items-start"><FiCheckCircle className="text-primary mt-1 mr-3"/> Filtrer le bruit du marché</li>
                      <li className="flex items-start"><FiCheckCircle className="text-primary mt-1 mr-3"/> Accélérer votre préparation</li>
                  </ul>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-dark-blue mb-4">Ce que Revocareer ne fait PAS</h3>
                  <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3"/> Promettre un emploi</li>
                      <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3"/> Garantir une immigration</li>
                      <li className="flex items-start"><FiXCircle className="text-red-500 mt-1 mr-3"/> Mentir pour vendre</li>
                  </ul>
              </motion.div>
          </motion.div>
           <div className="text-center mt-16">
            <p className="text-xl font-semibold text-primary border-2 border-primary/50 rounded-full p-4 inline-block">La responsabilité est partagée. Le sérieux est obligatoire.</p>
        </div>
      </Section>

      {/* 8. INVESTISSEMENT */}
      <Section>
        <SectionTitle>Investissement</SectionTitle>
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <motion.div variants={fadeInUp} whileHover={cardHover} className="border-2 border-gray-200 p-8 rounded-lg text-center flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-dark-blue">Offre Principale</h3>
                <p className="text-6xl font-bold text-primary my-4">700 €</p>
                <p className="text-gray-600 mb-6">(paiement unique)</p>
                <p className="text-xl font-semibold text-dark-blue">ou 3 × 270 €</p>
                <p className="text-gray-500">(paiement échelonné)</p>
            </div>
            <div className="mt-8">
                <CTAButton href="/apply" variant="secondary" className="w-full">Postuler à l'offre principale</CTAButton>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={cardHover} className="border-4 border-primary p-8 rounded-lg text-center flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 font-bold rounded-full text-sm">RECOMMANDÉ</div>
            <div>
                <h3 className="text-3xl font-bold text-dark-blue">Offre Premium</h3>
                <p className="text-xs font-bold text-accent mt-2">2 PLACES MAX. / COHORTE</p>
                <p className="text-6xl font-bold text-primary my-4">1 200 €</p>
                <p className="text-gray-600 mb-6">Suivi renforcé & Accès direct prioritaire</p>
            </div>
             <div className="mt-8">
                <CTAButton href="/apply" variant="primary" className="w-full">Postuler à l'offre Premium</CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* 9. PROCESSUS D’ADMISSION */}
      <Section className="bg-background">
          <SectionTitle>Processus d’Admission</SectionTitle>
          <motion.div variants={staggerContainer} className="relative grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
              <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-300 hidden md:block"></div>
              <motion.div variants={fadeInUp} className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold border-4 border-background mb-4">1</div>
                  <h4 className="font-bold text-dark-blue text-lg">Candidature</h4>
                  <p className="text-gray-600 text-sm">Remplir le formulaire en ligne.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold border-4 border-background mb-4">2</div>
                  <h4 className="font-bold text-dark-blue text-lg">Analyse</h4>
                   <p className="text-gray-600 text-sm">Nous étudions la pertinence de votre profil.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold border-4 border-background mb-4">3</div>
                  <h4 className="font-bold text-dark-blue text-lg">Entretien</h4>
                   <p className="text-gray-600 text-sm">Validation de l'alignement et de la motivation.</p>
              </motion.div>
               <motion.div variants={fadeInUp} className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-dark-blue text-white flex items-center justify-center text-2xl font-bold border-4 border-background mb-4">4</div>
                  <h4 className="font-bold text-dark-blue text-lg">Décision</h4>
                   <p className="text-gray-600 text-sm">Admission ou refus du candidat.</p>
              </motion.div>
          </motion.div>
          <p className="text-center text-xl font-semibold text-red-600 mt-12">Un refus est possible si le profil n'est pas aligné.</p>
      </Section>

      {/* 10. MESSAGE FINAL */}
      <Section id="postuler" className="text-center">
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">Vous pouvez continuer à accumuler des certifications, à postuler sans stratégie, et à espérer que “ça finira par marcher”.</p>
          <p className="mt-8 text-3xl font-bold text-dark-blue">Ou vous pouvez prendre une décision structurée.</p>
          <p className="mt-10 text-xl font-semibold text-dark-blue">Revocareer n’est pas pour tout le monde.<br/>Mais pour les bons profils, c’est un accélérateur décisif.</p>
          <div className="mt-12">
            <CTAButton href="/apply" variant="primary" className="text-lg px-10 py-4">Démarrer ma candidature</CTAButton>
          </div>
      </Section>
    </>
  );
}
