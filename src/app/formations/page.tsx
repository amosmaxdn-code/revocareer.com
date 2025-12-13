import { SectionHeader } from "@/components/SectionHeader";
import { FormationCard } from "@/components/FormationCard";

const projectManagementCerts = [
  {
    title: "PMP® (Project Management Professional)",
    level: "Avancé",
    description: "La certification de référence mondiale pour les chefs de projet. Validez votre expérience et votre maîtrise des meilleures pratiques.",
    learningOutcomes: ["Maîtriser les 3 domaines du PMP®", "Piloter des projets complexes", "Gérer les risques et les parties prenantes", "Préparer l'examen avec des simulations"],
  },
  {
    title: "CAPM® (Certified Associate in Project Management)",
    level: "Débutant",
    description: "La porte d'entrée idéale dans le monde de la gestion de projet. Parfait pour les profils juniors ou en reconversion.",
    learningOutcomes: ["Comprendre le lexique du PMBOK®", "Appliquer les processus fondamentaux", "Participer efficacement à une équipe projet", "Booster votre CV"],
  },
  {
    title: "PRINCE2® Foundation & Practitioner",
    level: "Intermédiaire",
    description: "Apprenez la méthodologie de gestion de projet structurée et reconnue internationalement, utilisée par le gouvernement britannique.",
    learningOutcomes: ["Maîtriser les 7 thèmes, 7 processus et 7 principes", "Adapter PRINCE2® à tout type de projet", "Obtenir une double certification (Foundation & Practitioner)"],
  },
   {
    title: "Scrum Master (CSM®/PSM™)",
    level: "Intermédiaire",
    description: "Devenez le garant de la méthodologie Agile Scrum. Facilitez les rituels, levez les obstacles et maximisez la valeur produite par l'équipe.",
    learningOutcomes: ["Maîtriser le framework Scrum", "Animer les sprints, daily, reviews", "Incarner le rôle de Scrum Master au quotidien", "Préparer la certification CSM ou PSM"],
  },
];

const qualityManagementCerts = [
    {
    title: "ISO 9001 Lead Auditor",
    level: "Expert",
    description: "Devenez capable de mener des audits de Systèmes de Management de la Qualité (SMQ) de manière professionnelle.",
    learningOutcomes: ["Planifier et conduire des audits internes/externes", "Maîtriser les techniques d'audit (ISO 19011)", "Gérer une équipe d'auditeurs", "Rédiger des rapports d'audit percutants"],
  },
  {
    title: "ISO 27001 Lead Implementer",
    level: "Expert",
    description: "Apprenez à mettre en œuvre un Système de Management de la Sécurité de l'Information (SMSI) conforme à la norme ISO 27001.",
    learningOutcomes: ["Analyser les risques de sécurité de l'information", "Définir et mettre en place les mesures de sécurité", "Piloter un projet de certification ISO 27001"],
  },
];

const itDigitalCerts = [
    {
    title: "ITIL® 4 Foundation",
    level: "Fondamental",
    description: "Comprenez le framework de référence pour la gestion des services IT et alignez l'IT sur la stratégie de l'entreprise.",
    learningOutcomes: ["Maîtriser les concepts clés d'ITIL 4", "Comprendre la chaîne de valeur des services", "Appliquer les 7 pratiques ITIL essentielles"],
  },
  {
    title: "Google Project Management",
    level: "Débutant",
    description: "Une certification très prisée qui couvre les fondamentaux de la gestion de projet de A à Z, avec une approche pratique.",
    learningOutcomes: ["Initier, planifier et exécuter des projets", "Utiliser les outils de gestion de projet Google", "Appliquer les principes agiles"],
  },
];

const languageCerts = [
  {
    title: "TOEIC / TOEFL",
    level: "Anglais Professionnel",
    description: "Obtenez le score requis pour les postes à responsabilité internationale. Préparation ciblée sur les sections Listening & Reading.",
    learningOutcomes: ["Maîtriser le vocabulaire des affaires", "Améliorer la compréhension orale et écrite", "Stratégies pour maximiser votre score", "Tests blancs en conditions réelles"],
  },
  {
    title: "TCF / TEF",
    level: "Français Professionnel",
    description: "Validez votre niveau de français pour les opportunités au Canada, en Europe ou dans les institutions francophones.",
    learningOutcomes: ["Renforcer la grammaire et la syntaxe", "Améliorer l'expression et la compréhension", "Préparation spécifique aux épreuves", "Obtenir une attestation officielle"],
  },
];

export default function FormationsPage() {
  return (
    <>
      <SectionHeader
        title="Préparez les certifications les plus demandées au monde."
        subtitle="Validez vos compétences, boostez votre crédibilité et accédez à des opportunités de carrière supérieures."
      />
      
      <div className="container mx-auto px-6 py-12">
        {/* Language Certs Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark-blue mb-8">Certifications en Langues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {languageCerts.map((cert) => (
              <FormationCard key={cert.title} {...cert} />
            ))}
          </div>
        </div>
        
        {/* Project Management Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark-blue mb-8">Project Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projectManagementCerts.map((cert) => (
              <FormationCard key={cert.title} {...cert} />
            ))}
          </div>
        </div>

        {/* Management & Quality Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark-blue mb-8">Management & Qualité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {qualityManagementCerts.map((cert) => (
              <FormationCard key={cert.title} {...cert} />
            ))}
          </div>
        </div>

        {/* IT & Digital Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark-blue mb-8">IT & Digital</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {itDigitalCerts.map((cert) => (
              <FormationCard key={cert.title} {...cert} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
