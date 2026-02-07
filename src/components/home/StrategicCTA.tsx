"use client";

import Link from 'next/link';

export const StrategicCTA = () => {
  return (
    <div className="mt-12 text-center">
      <Link
        href="/diagnostic"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        Évaluer mon éligibilité au marché canadien (2 min)
      </Link>
    </div>
  );
};
