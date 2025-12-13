import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";

const allProducts = [
    {
        imageUrl: "https://picsum.photos/seed/cv/400/300",
        title: "CV Premium 'Impact'",
        description: "Un modèle de CV professionnel conçu pour capter l'attention des recruteurs et passer les filtres ATS.",
        price: "29€",
        category: "Carrière",
    },
    {
        imageUrl: "https://picsum.photos/seed/rh/400/300",
        title: "Pack RH Complet",
        description: "Tous les templates essentiels pour une gestion RH efficace: contrats, évaluations, et plus.",
        price: "79€",
        category: "RH",
    },
    {
        imageUrl: "https://picsum.photos/seed/notion/400/300",
        title: "Template Notion 'Carrière'",
        description: "Organisez votre recherche d'emploi, suivi de carrière et développement de compétences.",
        price: "19€",
        category: "Carrière",
    },
    {
        imageUrl: "https://picsum.photos/seed/course/400/300",
        title: "Mini-cours: LinkedIn Pro",
        description: "Maîtrisez l'art du personal branding sur LinkedIn pour attirer les opportunités.",
        price: "49€",
        category: "Digital & IA",
    },
    {
        imageUrl: "https://picsum.photos/seed/comms/400/300",
        title: "Mini-cours: Communication Efficace",
        description: "Apprenez à présenter vos idées avec clarté, confiance et persuasion en milieu professionnel.",
        price: "59€",
        category: "Soft Skills",
    },
    {
        imageUrl: "https://picsum.photos/seed/pdf/400/300",
        title: "PDF de Formation PMP",
        description: "Un guide de révision condensé et efficace pour préparer votre certification PMP.",
        price: "39€",
        category: "Projet",
    },
    {
        imageUrl: "https://picsum.photos/seed/ia/400/300",
        title: "Prompt Engineering Guide",
        description: "Guide pratique pour créer des prompts efficaces avec les IA génératives (ChatGPT, Gemini).",
        price: "35€",
        category: "Digital & IA",
    },
    {
        imageUrl: "https://picsum.photos/seed/emotion/400/300",
        title: "Guide: L'Intelligence Émotionnelle",
        description: "Développez votre QE pour mieux naviguer les relations professionnelles et le leadership.",
        price: "29€",
        category: "Soft Skills",
    },
     {
        imageUrl: "https://picsum.photos/seed/toeic/400/300",
        title: "Préparation Express: TOEIC",
        description: "Ciblez un score élevé avec nos fiches de révision et tests blancs pour le TOEIC Listening & Reading.",
        price: "45€",
        category: "Langues",
    },
];

const filters = ["Tout", "Carrière", "Soft Skills", "Langues", "Digital & IA", "Projet", "RH"];

export default function ProduitsPage() {
  // Note: Filter logic is not implemented yet. This is a visual placeholder.
  return (
    <>
      <SectionHeader 
        title="Nos Ressources Digitales"
        subtitle="Des outils et des connaissances de haute qualité pour vous faire gagner en temps et en efficacité."
      />
      
      <div className="container mx-auto px-6">
        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filters.map(filter => (
            <button key={filter} className="px-6 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {allProducts.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}
