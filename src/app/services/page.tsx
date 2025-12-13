import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { CTAButton } from "@/components/CTAButton";
import { FiCheckCircle } from "react-icons/fi";

const services = [
  {
    title: "Révision CV & Optimisation LinkedIn",
    description: "Transformez votre CV et profil LinkedIn en de puissants outils de marketing personnel. Nous optimisons le contenu pour les ATS et l'impact humain.",
  },
  {
    title: "Coaching Carrière",
    description: "Des sessions individuelles pour clarifier vos objectifs, surmonter les blocages et élaborer une stratégie de carrière gagnante.",
  },
  {
    title: "Accompagnement Préparation Certification",
    description: "Un suivi personnalisé pour vous aider à préparer et réussir votre certification (PMP, Scrum, etc.) avec confiance.",
  },
  {
    title: "Coaching en Soft Skills & Leadership",
    description: "Développez votre communication, intelligence émotionnelle et posture de leader pour faire la différence à responsabilités égales.",
  },
  {
    title: "Orientation Professionnelle Stratégique",
    description: "Analysez vos compétences et les tendances du marché pour définir le parcours professionnel le plus prometteur pour vous.",
  },
];

const premiumPackages = [
    {
        title: "Forfait 'Booster'",
        price: "249€",
        priceFrequency: "/mois",
        features: ["2 sessions de coaching", "Révision CV + LinkedIn", "Support email prioritaire"],
        ctaText: "Choisir Booster",
    },
    {
        title: "Forfait 'Transformation'",
        price: "499€",
        priceFrequency: "/trimestre",
        features: ["6 sessions de coaching", "Accès à 1 mini-cours", "Stratégie de carrière complète", "Préparation aux entretiens"],
        ctaText: "Choisir Transformation",
        featured: true,
    },
    {
        title: "Forfait 'Excellence'",
        price: "899€",
        priceFrequency: "/semestre",
        features: ["12 sessions de coaching", "Accès à 2 mini-cours", "Suivi préparation certification", "Accès réseau professionnel"],
        ctaText: "Choisir Excellence",
    }
];

// Placeholder for contact
const handleContact = (serviceTitle: string) => {
  console.log(`Contact initiated for: ${serviceTitle}`);
  alert(`La prise de contact pour "${serviceTitle}" sera bientôt disponible.`);
};

export default function ServicesPage() {
  return (
    <>
      <SectionHeader
        title="Nos Services d'Accompagnement"
        subtitle="Un soutien sur-mesure pour vous aider à atteindre vos objectifs de carrière les plus ambitieux."
      />

      {/* Individual Services */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
                <div key={service.title} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-dark-blue">{service.title}</h3>
                    <p className="mt-4 text-gray-600">{service.description}</p>
                    <div className="mt-6">
                        <CTAButton onClick={() => handleContact(service.title)} variant="secondary">
                            En savoir plus
                        </CTAButton>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Premium Packages */}
      <div className="bg-background py-20">
        <SectionHeader
            title="Forfaits Premium"
            subtitle="Des programmes d'accompagnement complets pour une transformation en profondeur."
        />
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {premiumPackages.map(pkg => (
                    <PricingCard key={pkg.title} {...pkg} />
                ))}
            </div>
        </div>
      </div>
    </>
  );
}
