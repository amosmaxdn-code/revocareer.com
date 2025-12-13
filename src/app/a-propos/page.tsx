import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";

const values = [
    { name: "Rigueur", description: "Une approche méthodique et précise dans tout ce que nous entreprenons." },
    { name: "Compétence", description: "L'excellence technique et la connaissance approfondie comme fondations." },
    { name: "Efficacité", description: "Nous visons des résultats concrets, mesurables et rapides." },
    { name: "Ambition", description: "Nous poussons nos clients à viser l'excellence et le leadership." },
]

export default function AboutPage() {
  return (
    <>
      <SectionHeader
        title="Notre Mission"
        subtitle="Rendre les carrières africaines plus compétitives sur la scène mondiale."
      />

      <div className="container mx-auto px-6 py-12">
        {/* Vision & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-dark-blue mb-4">Notre Vision</h3>
            <p className="text-gray-600 mb-6">
              Nous croyons en un avenir où les talents africains sont des leaders incontestés dans les domaines du digital, de la technologie et du management de projet. Notre vision est d'être le catalyseur qui accélère cette transformation en fournissant les compétences, les certifications et l'accompagnement stratégique nécessaires pour briller à l'international.
            </p>
            <h3 className="text-3xl font-bold text-dark-blue mb-4">Nos Valeurs</h3>
            <div className="space-y-4">
                {values.map(value => (
                    <div key={value.name}>
                        <h4 className="font-bold text-lg text-primary">{value.name}</h4>
                        <p className="text-gray-600">{value.description}</p>
                    </div>
                ))}
            </div>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
             <Image src="https://picsum.photos/seed/about/800/600" alt="Équipe professionnelle" fill className="object-cover" />
          </div>
        </div>

        {/* Founder Bio */}
        <div className="py-20">
            <SectionHeader title="Le Fondateur" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                 <div className="relative h-80 w-full lg:h-96 rounded-lg overflow-hidden shadow-xl">
                    <Image src="https://picsum.photos/seed/founder/600/800" alt="Fondateur de Rev'O Carrière" fill className="object-cover object-top" />
                </div>
                <div className="lg:col-span-2">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Expert en transformation digitale et en management de projet, notre fondateur possède une expérience internationale riche, acquise au carrefour de la technologie, de la communication et des ressources humaines.
                    </p>
                    <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                        Passionné par l'impact des nouvelles technologies comme l'IA et le Big Data, il a piloté des projets d'envergure pour des multinationales avant de dédier son expertise à l'accélération des carrières sur le continent africain.
                    </p>
                    <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                        Certifié PMP®, Scrum Master et coach en communication stratégique et leadership, il a fondé Rev'O Carrière avec une conviction forte : offrir aux professionnels africains les outils et la reconnaissance qu'ils méritent pour devenir des leaders mondiaux.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
