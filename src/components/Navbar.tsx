"use client";

import Link from "next/link";
import { CTAButton } from "./CTAButton";

export function Navbar() {
  return (
    <nav className="bg-background fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-dark-blue">
            Rev'O <span className="text-primary">Carrière</span>
          </Link>

          <div className="hidden md:block">
             <CTAButton href="#postuler" variant="primary">Postuler au programme</CTAButton>
          </div>
           <div className="md:hidden">
             <CTAButton href="#postuler" variant="primary" className="px-4 py-2 text-sm">Postuler</CTAButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
