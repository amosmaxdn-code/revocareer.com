"use client";

import Link from "next/link";
import Image from "next/image";
import { CTAButton } from "./CTAButton";

export function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-gray-800 shadow-sm">
      <div className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="relative w-[90px] h-[30px]">
              <Image 
                src="/images/loo%20rc.png" 
                alt="Rev'O Carrière Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
             <Link href="/programme" className="text-sm font-medium hover:text-blue-400 transition-colors">Le Programme</Link>
             <Link href="/diagnostic" className="text-sm font-medium hover:text-blue-400 transition-colors">Diagnostic</Link>
             <CTAButton href="/apply" variant="primary" className="px-6 py-2 text-sm">Postuler</CTAButton>
          </div>
           <div className="md:hidden">
             <CTAButton href="/apply" variant="primary" className="px-4 py-2 text-sm font-bold">Postuler</CTAButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
