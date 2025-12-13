import { SectionHeader } from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FiAward, FiCpu, FiBriefcase, FiMessageSquare } from "react-icons/fi";

// Data for the page
const featuredProducts = [
  {
    imageUrl: "https://picsum.photos/seed/cv/400/300",
    title: "CV Premium 'Impact'",
    description: "Un modèle de CV professionnel conçu pour capter l'attention des recruteurs et passer les filtres ATS.",
    price: "29€",
  },
  {
    imageUrl: "https://picsum.photos/seed/comms/400/300",
    title: "Mini-cours: Communication Efficace",
    description: "Apprenez à présenter vos idées avec clarté, confiance et persuasion en milieu professionnel.",
    price: "59€",
  },
  {
    imageUrl: "https://picsum.photos/seed/notion/400/300",
    title: "Template Notion 'Carrière'",
    description: "Organisez votre recherche d'emploi, suivi de carrière et développement de compétences.",
    price: "19€",
  },
    {
    imageUrl: "https://picsum.photos/seed/course/400/300",
    title: "Mini-cours: LinkedIn Pro",
    description: "Maîtrisez l'art du personal branding sur LinkedIn pour attirer les opportunités.",
    price: "49€",
  },
  {
    imageUrl: "https://picsum.photos/seed/toeic/400/300",
    title: "Préparation Express: TOEIC",
    description: "Ciblez un score élevé avec nos fiches de révision et tests blancs pour le TOEIC.",
    price: "45€",
  },
  {
    imageUrl: "https://picsum.photos/seed/pdf/400/300",
    title: "PDF de Formation PMP",
    description: "Un guide de révision condensé et efficace pour préparer votre certification PMP.",
    price: "39€",
  },
];

const testimonials = [
  {
    quote: "L'accompagnement pour la certification PMP a été décisif. J'ai réussi l'examen du premier coup grâce à une méthode structurée et un suivi rigoureux.",
    authorName: "Aïssatou Diallo",
    authorRole: "Chef de Projet Senior, Dakar",
    authorImageUrl: "https://picsum.photos/seed/woman1/100/100",
  },
  {
    quote: "Le coaching carrière m'a ouvert les yeux sur mon potentiel. J'ai pu décrocher un poste à l'international que je n'aurais jamais osé viser seul.",
    authorName: "David Okoro",
    authorRole: "Spécialiste en Transformation Digitale, Lagos",
    authorImageUrl: "https://picsum.photos/seed/man1/100/100",
  },
  {
    quote: "Les templates de CV sont d'une qualité exceptionnelle. Le design est moderne et l'impact sur mes candidatures a été immédiat.",
    authorName: "Fatima Zahra",
    authorRole: "Ingénieure Logiciel, Casablanca",
    authorImageUrl: "https://picsum.photos/seed/woman2/100/100",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold text-dark-blue leading-tight">
            Transformez votre carrière plus vite, plus intelligemment.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Compétences techniques, soft skills, certifications et accompagnement stratégique pour accélérer votre évolution.
          </p>
          <div className="mt-10 flex justify-center items-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <CTAButton href="/formations" variant="primary">Découvrir les formations</CTAButton>
            <CTAButton href="/produits" variant="secondary">Voir les ressources digitales</CTAButton>
          </div>
        </div>
      </section>

      {/* Key Domains Section */}
      <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  <div className="bg-white p-8 rounded-lg shadow-sm">
                      <FiAward className="mx-auto text-primary text-4xl mb-4" />
                      <h3 className="text-xl font-bold text-dark-blue">Certifications Internationales</h3>
                      <p className="mt-2 text-gray-600">Validez vos compétences techniques avec les certifications les plus reconnues (PMP®, Scrum, ITIL®).</p>
                  </div>
                   <div className="bg-white p-8 rounded-lg shadow-sm">
                      <FiMessageSquare className="mx-auto text-primary text-4xl mb-4" />
                      <h3 className="text-xl font-bold text-dark-blue">Soft Skills & Langues</h3>
                      <p className="mt-2 text-gray-600">Développez votre leadership, votre communication et votre maîtrise des langues (TOEIC, TCF).</p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-sm">
                      <FiCpu className="mx-auto text-primary text-4xl mb-4" />
                      <h3 className="text-xl font-bold text-dark-blue">Compétences Digitales & IA</h3>
                      <p className="mt-2 text-gray-600">Maîtrisez les outils et stratégies de la transformation digitale et de l'intelligence artificielle.</p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-sm">
                      <FiBriefcase className="mx-auto text-primary text-4xl mb-4" />
                      <h3 className="text-xl font-bold text-dark-blue">Ressources Carrière</h3>
                      <p className="mt-2 text-gray-600">Accédez à des produits premium pour optimiser votre CV, LinkedIn et vos entretiens.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <SectionHeader title="Produits Phares" subtitle="Des outils conçus pour des résultats immédiats et un impact maximal." />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Certification Offers Section */}
      <section className="py-16 bg-dark-blue text-white">
        <SectionHeader title="Offres de Certification" subtitle="Des parcours structurés pour valider vos compétences sur le marché mondial." className="!text-white" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold text-accent">Projet</h3>
              <p className="mt-2 opacity-80">PMP®, CAPM®, PRINCE2®, Scrum</p>
            </div>
             <div className="text-center p-6">
              <h3 className="text-2xl font-bold text-accent">Langues</h3>
              <p className="mt-2 opacity-80">TOEIC, TOEFL, TCF, TEF</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold text-accent">Management & Qualité</h3>
              <p className="mt-2 opacity-80">ISO 9001, ISO 27001</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold text-accent">Digital & IT</h3>
              <p className="mt-2 opacity-80">ITIL® V4, Google PM, Data Analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Results Section */}
      <section className="py-20 bg-background">
        <SectionHeader title="Impact & Résultats" subtitle="Votre succès est notre meilleure métrique. Voici ce qu'ils en disent." />
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-4xl font-bold text-primary">50+</p>
                    <p className="mt-2 text-gray-600">Clients accompagnés</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-4xl font-bold text-primary">98%</p>
                    <p className="mt-2 text-gray-600">Taux de satisfaction</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-4xl font-bold text-primary">100+</p>
                    <p className="mt-2 text-gray-600">Projets réussis</p>
                </div>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.authorName} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue">
            Commencez votre transformation aujourd’hui.
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            N'attendez plus pour prendre le contrôle de votre carrière. Explorez nos ressources et rejoignez une communauté d'ambitieux.
          </p>
          <div className="mt-8">
            <CTAButton href="/contact" variant="primary">Contactez-nous</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}