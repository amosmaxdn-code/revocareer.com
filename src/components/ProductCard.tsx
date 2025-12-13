"use client";

import Image from "next/image";
import { CTAButton } from "./CTAButton";

type ProductCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  purchaseUrl?: string;
};

// Placeholder for payment integration
const handlePurchase = (productTitle: string) => {
  console.log(`Initiating purchase for: ${productTitle}`);
  alert(`La fonctionnalité de paiement pour "${productTitle}" n'est pas encore activée.`);
};

export function ProductCard({
  imageUrl,
  title,
  description,
  price,
  purchaseUrl = "#",
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-dark-blue">{title}</h3>
        <p className="mt-2 text-gray-600 flex-grow">{description}</p>
        <p className="mt-4 text-2xl font-semibold text-primary">{price}</p>
        <div className="mt-6">
          <CTAButton onClick={() => handlePurchase(title)} className="w-full">
            Acheter maintenant
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
