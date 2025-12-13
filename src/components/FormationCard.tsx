"use client";

import { CTAButton } from "./CTAButton";
import { FiCheckCircle } from "react-icons/fi";

type FormationCardProps = {
  title: string;
  description: string;
  level: string;
  learningOutcomes: string[];
};

// Placeholder for payment integration
const handleJoin = (formationTitle: string) => {
  console.log(`Initiating join for: ${formationTitle}`);
  alert(`La fonctionnalité d'inscription pour "${formationTitle}" n'est pas encore activée.`);
};

export function FormationCard({
  title,
  description,
  level,
  learningOutcomes,
}: FormationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col p-6 h-full">
      <div className="flex-grow">
        <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
          {level}
        </span>
        <h3 className="mt-4 text-xl font-bold text-dark-blue">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <ul className="mt-6 space-y-3">
          {learningOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-start">
              <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <CTAButton onClick={() => handleJoin(title)} className="w-full">
          Rejoindre la formation
        </CTAButton>
      </div>
    </div>
  );
}
