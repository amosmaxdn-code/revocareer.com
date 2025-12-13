"use client";

import { CTAButton } from "./CTAButton";
import { FiCheck } from "react-icons/fi";

type PricingCardProps = {
  title: string;
  price: string;
  priceFrequency: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
};

// Placeholder for payment integration
const handleSubscribe = (planTitle: string) => {
  console.log(`Initiating subscription for: ${planTitle}`);
  alert(`La fonctionnalité d'abonnement pour "${planTitle}" n'est pas encore activée.`);
};

export function PricingCard({
  title,
  price,
  priceFrequency,
  features,
  ctaText,
  featured = false,
}: PricingCardProps) {
  const cardClasses = `rounded-lg p-8 border h-full flex flex-col ${
    featured ? "bg-dark-blue text-white border-primary shadow-2xl" : "bg-white border-gray-200"
  }`;
  
  const titleClasses = `text-2xl font-bold ${featured ? "text-white" : "text-dark-blue"}`;
  const priceClasses = `my-4 text-5xl font-bold ${featured ? "text-white" : "text-dark-blue"}`;
  const featureClasses = `flex items-center ${featured ? "text-gray-300" : "text-gray-600"}`;
  const checkIconClasses = `mr-3 ${featured ? "text-accent" : "text-primary"}`;

  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>{title}</h3>
      <div className="mt-4">
        <span className={priceClasses}>{price}</span>
        <span className={`text-lg ${featured ? "text-gray-400" : "text-gray-500"}`}>{priceFrequency}</span>
      </div>
      <ul className="mt-6 space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className={featureClasses}>
            <FiCheck className={checkIconClasses} size={20} />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <CTAButton 
          onClick={() => handleSubscribe(title)}
          variant={featured ? "accent" : "primary"}
          className="w-full"
        >
          {ctaText}
        </CTAButton>
      </div>
    </div>
  );
}
