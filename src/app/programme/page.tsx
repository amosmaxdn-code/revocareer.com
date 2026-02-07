import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Notre Programme - Rev'O Carrière",
  description: "Découvrez en détail notre programme pour transformer votre carrière et améliorer votre profil."
};

const ProgrammePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Notre Programme de Transformation de Carrière
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Découvrez comment Rev'O Carrière vous accompagne pour atteindre vos objectifs professionnels.
        </p>

        <section className="text-left mb-16">
          <h2 className="text-4xl font-bold mb-8 text-blue-400">
            Nos Apports Clés
          </h2>
          <div className="space-y-8 text-lg">
            <p>
              <strong>Analyse Approfondie du Profil:</strong> Nous commençons par un diagnostic détaillé de votre parcours, compétences et aspirations, aligné sur les exigences du marché canadien.
            </p>
            <p>
              <strong>Optimisation de la Présentation:</strong> Refonte complète de votre CV, lettre de motivation et profil LinkedIn pour maximiser leur impact auprès des recruteurs canadiens et des systèmes ATS.
            </p>
            <p>
              <strong>Développement des Compétences Cibles:</strong> Identification des lacunes et propositions de formations ciblées pour renforcer votre profil sur les compétences les plus demandées.
            </p>
            <p>
              <strong>Stratégies de Recherche d'Emploi Avancées:</strong> Accès à un réseau exclusif, techniques de réseautage efficaces et préparation aux entretiens spécifiques au contexte canadien.
            </p>
            <p>
              <strong>Accompagnement Personnalisé:</strong> Un mentor dédié vous guide à chaque étape, de la définition de votre projet à l'intégration de votre nouveau poste au Canada.
            </p>
          </div>
        </section>

        <section className="text-left mb-16">
          <h2 className="text-4xl font-bold mb-8 text-purple-400">
            Nos Actions pour Améliorer Votre Profil
          </h2>
          <div className="space-y-8 text-lg">
            <p>
              <strong>Ateliers Pratiques:</strong> Sessions interactives sur la communication professionnelle, la négociation salariale et l'adaptation culturelle au Canada.
            </p>
            <p>
              <strong>Simulations d'Entretiens:</strong> Préparation réaliste avec des feedbacks constructifs pour vous rendre confiant et performant.
            </p>
            <p>
              <strong>Accès à une Banque de Ressources:</strong> Modèles de documents, listes d'entreprises cibles, et guides pratiques exclusifs.
            </p>
            <p>
              <strong>Suivi Post-Placement:</strong> Un accompagnement sur les premières semaines de votre prise de poste pour assurer une intégration réussie.
            </p>
          </div>
        </section>

        <div className="mt-12">
          <Link
            href="https://forms.gle/votreformulaire" // Placeholder for actual application form
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Postuler au Programme
          </Link>
          <p className="mt-4 text-gray-400">
            Prêt à transformer votre carrière ? Postulez dès maintenant !
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgrammePage;
