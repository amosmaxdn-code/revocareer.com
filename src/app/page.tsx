import { CTAButton } from "@/components/CTAButton";
import { FiCheckCircle, FiXCircle, FiArrowRight } from "react-icons/fi";

// Wrapper for section styling
const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-6 max-w-4xl">
      {children}
    </div>
  </section>
);

// Wrapper for section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-dark-blue text-center mb-12">{children}</h2>
);

export default function OnePager() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <Section className="bg-background text-center pt-32 md:pt-40">
        <h1 className="text-4xl md:text-6xl font-bold text-dark-blue leading-tight">
          Devenir gestionnaire de projet crédible pour le Canada n’est pas une question de motivation.
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-primary leading-tight mt-2">
            C’est une question de structure.
        </h2>
        <p className="mt-8 text-lg text-gray-700 max-w-3xl mx-auto">
          Revocareer accompagne des jeunes professionnels africains en gestion de projet (2 à 7 ans d’expérience) dans la construction d’un profil certifié, employable et crédible pour le marché canadien.
        </p>
        <div className="mt-8 text-gray-600 space-y-2">
            <p>👉 Pas de promesses irréalistes</p>
            <p>👉 Pas de raccourcis</p>
            <p>👉 Une trajectoire claire, alignée sur les standards réels</p>
        </div>
        <div className="mt-10">
          <CTAButton href="#postuler" variant="primary">Postuler au programme – Sélection obligatoire</CTAButton>
        </div>
      </Section>

      {/* 2. POUR QUI / POUR QUI PAS */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="flex items-center text-2xl font-bold text-green-600 mb-6"><FiCheckCircle className="mr-3" /> Ce programme est pour toi si :</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>✅ Tu as une expérience réelle en gestion de projet</li>
              <li>✅ Tu vises une carrière internationale, notamment au Canada</li>
              <li>✅ Tu es prêt à structurer ton profil, pas à improviser</li>
              <li>✅ Tu acceptes la remise en question et la discipline</li>
            </ul>
          </div>
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-gray-200 pt-10 md:pt-0 md:pl-10">
            <h3 className="flex items-center text-2xl font-bold text-red-600 mb-6"><FiXCircle className="mr-3" /> Ce programme n’est pas pour toi si :</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>❌ Tu débutes sans expérience terrain</li>
              <li>❌ Tu veux “tester pour voir”</li>
              <li>❌ Tu cherches une garantie d’emploi ou d’immigration</li>
              <li>❌ Tu refuses d’investir du temps, de l’énergie et de l’argent</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12">
            <p className="text-xl font-semibold text-dark-blue">👉 Revocareer filtre ses candidats.</p>
            <p className="text-xl font-semibold text-dark-blue">👉 Le Canada aussi.</p>
        </div>
      </Section>

      {/* 3. LE PROBLÈME RÉEL */}
      <Section className="bg-background text-center">
        <SectionTitle>Le Problème Réel</SectionTitle>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          La majorité des professionnels africains en gestion de projet accumulent des certifications mal positionnées, ont des CV illisibles à l’international, sous-estiment les standards canadiens et confondent expérience locale et employabilité globale.
        </p>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg inline-block">
            <p className="text-2xl font-bold text-dark-blue">Résultat : 👉 profils compétents 👉 efforts réels 👉 aucune traction internationale</p>
        </div>
        <p className="mt-8 text-2xl md:text-3xl font-bold text-primary">Le problème n’est pas ton intelligence. C’est l’absence de structure stratégique.</p>
      </Section>

      {/* 4. LA SOLUTION REVOCareer */}
      <Section className="text-center">
        <SectionTitle>La Solution Revocareer</SectionTitle>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">Revocareer ne t’ajoute pas des couches. Revocareer organise, filtre et aligne.</p>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-2">Notre approche repose sur 3 piliers :</p>
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-dark-blue">🧠 1. Clarté stratégique</h3>
            <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>Diagnostic brutal du profil</li>
              <li>Écart réel avec le marché canadien</li>
              <li>Décisions rationnelles, pas émotionnelles</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-dark-blue">🧱 2. Structuration du profil</h3>
            <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>Positionnement professionnel précis</li>
              <li>Certifications utiles (et seulement celles-là)</li>
              <li>Narratif cohérent et lisible</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-dark-blue">🚀 3. Activation vers le marché</h3>
            <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>CV et LinkedIn alignés Canada</li>
              <li>Logique de candidature intelligente</li>
              <li>Lecture réaliste de l’immigration</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 5. LE PROGRAMME */}
      <Section className="bg-background">
          <SectionTitle>Le Programme — Project Manager Canada Track</SectionTitle>
          <div className="text-center text-lg text-gray-700 space-x-6 mb-12">
              <span><strong>Durée :</strong> 10 semaines</span>
              <span className="hidden md:inline">|</span>
              <span><strong>Format :</strong> accompagnement structuré + livrables</span>
              <span className="hidden md:inline">|</span>
              <span><strong>Cohorte :</strong> limitée</span>
              <span className="hidden md:inline">|</span>
              <span><strong>Entrée :</strong> sur sélection</span>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary"><strong>📌 Module 1 — Diagnostic stratégique :</strong> Analyse complète du parcours, forces réelles vs illusions, décisions structurantes.</div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary"><strong>📌 Module 2 — Positionnement professionnel :</strong> Rôle exact visé, secteurs compatibles Canada, différenciation crédible.</div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary"><strong>📌 Module 3 — Stratégie de certifications :</strong> CAPM / PMP / PRINCE2 : quoi, quand, pourquoi. Planning réaliste. Ce qui est inutile est éliminé.</div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary"><strong>📌 Module 4 — Dossier professionnel Canada :</strong> CV canadien structuré, LinkedIn stratégique, cohérence globale du profil.</div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary"><strong>📌 Module 5 — Plan d’accès au marché :</strong> Stratégie de candidature, networking ciblé, vision claire des options Canada.</div>
          </div>
      </Section>

      {/* 6. LA TRANSFORMATION */}
      <Section className="text-center">
        <SectionTitle>La Transformation (Avant / Après)</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-red-700 mb-4">Avant Revocareer</h3>
            <ul className="space-y-2 text-gray-700 text-lg">
              <li>Profil flou</li>
              <li>Certifications dispersées</li>
              <li>CV non aligné</li>
              <li>Candidatures inefficaces</li>
            </ul>
          </div>
          <div className="bg-green-50 border-2 border-green-200 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Après Revocareer</h3>
            <ul className="space-y-2 text-gray-700 text-lg">
              <li>Positionnement clair</li>
              <li>Profil certifiable et crédible</li>
              <li>Dossier Canada solide</li>
              <li>Capacité à agir de façon autonome</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. TON RÔLE, NOTRE RÔLE */}
       <Section className="bg-background">
          <SectionTitle>Ton Rôle, Notre Rôle</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 text-lg">
              <div className="bg-white p-8 rounded-lg shadow">
                  <h3 className="text-2xl font-bold text-dark-blue mb-4">Ce que Revocareer fait :</h3>
                  <ul className="space-y-2 text-gray-700">
                      <li>✅ Structurer</li>
                      <li>✅ Orienter</li>
                      <li>✅ Filtrer</li>
                      <li>✅ Accélérer</li>
                  </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow">
                  <h3 className="text-2xl font-bold text-dark-blue mb-4">Ce que Revocareer ne fait PAS :</h3>
                  <ul className="space-y-2 text-gray-700">
                      <li>❌ Promettre un emploi</li>
                      <li>❌ Garantir une immigration</li>
                      <li>❌ Mentir pour vendre</li>
                  </ul>
              </div>
          </div>
           <div className="text-center mt-12">
            <p className="text-xl font-semibold text-primary">👉 La responsabilité est partagée. Le sérieux est obligatoire.</p>
        </div>
      </Section>

      {/* 8. INVESTISSEMENT */}
      <Section>
        <SectionTitle>Investissement</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-2 border-primary p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-dark-blue">Offre Principale</h3>
            <p className="text-5xl font-bold text-primary my-4">700 €</p>
            <p className="text-gray-600 mb-4">(paiement unique)</p>
            <p className="text-lg font-semibold text-dark-blue">ou 3 × 270 €</p>
            <p className="text-gray-600">(paiement échelonné)</p>
          </div>
          <div className="border-2 border-gray-300 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-dark-blue">Offre Premium</h3>
            <p className="text-xs font-bold text-accent bg-dark-blue inline-block px-2 py-1 rounded-full">2 PLACES MAX</p>
            <p className="text-5xl font-bold text-primary my-4">1 200 €</p>
            <p className="text-gray-600 mb-4">Suivi renforcé & Accès direct prioritaire</p>
          </div>
        </div>
      </Section>

      {/* 9. PROCESSUS D’ADMISSION */}
      <Section className="bg-background">
          <SectionTitle>Processus d’Admission</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-primary mb-2">1.</p>
                  <p className="font-semibold text-dark-blue">Candidature en ligne</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-primary mb-2">2.</p>
                  <p className="font-semibold text-dark-blue">Analyse du profil</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-primary mb-2">3.</p>
                  <p className="font-semibold text-dark-blue">Entretien de validation</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-primary mb-2">4.</p>
                  <p className="font-semibold text-dark-blue">Décision finale</p>
              </div>
          </div>
          <p className="text-center text-xl font-bold text-red-600 mt-8">👉 Refus possible.</p>
      </Section>

      {/* 10. MESSAGE FINAL */}
      <Section id="postuler" className="text-center">
          <p className="text-xl text-gray-700">Tu peux continuer à accumuler des certifications, à postuler sans stratégie, et à espérer que “ça finira par marcher”.</p>
          <p className="mt-8 text-2xl font-bold text-dark-blue">Ou tu peux :</p>
          <div className="mt-4 text-2xl font-bold text-primary space-y-2">
              <p>👉 Structurer ton profil</p>
              <p>👉 Prendre une décision adulte</p>
              <p>👉 Viser un autre niveau</p>
          </div>
          <p className="mt-10 text-xl font-semibold text-dark-blue">Revocareer n’est pas pour tout le monde.<br/>Mais pour les bons profils, c’est un accélérateur décisif.</p>
          <div className="mt-10">
            <CTAButton href="#" variant="primary">Postuler au programme</CTAButton>
          </div>
      </Section>
    </>
  );
}
