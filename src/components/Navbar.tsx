"use client";

import Link from "next/link";
import Image from "next/image";
import { CTAButton } from "./CTAButton";

export function Navbar() {
  return (
    <nav className="bg-background fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src="/images/loo%20rc.png" alt="Rev'O Carrière Logo" width={150} height={50} />
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
