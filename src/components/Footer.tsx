import Link from "next/link";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { href: "/produits", label: "Produits" },
  { href: "/formations", label: "Formations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
    { href: "/legal", label: "Mentions Légales" },
    { href: "/legal#privacy", label: "Politique de confidentialité" },
    { href: "/legal#terms", label: "Conditions Générales d'Utilisation" },
];

export function Footer() {
  return (
    <footer className="bg-dark-blue text-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold">
              Rev'O <span className="text-primary">Carrière</span>
            </h3>
            <p className="mt-4 text-sm opacity-80">
              Accélérer la montée en compétence et les opportunités professionnelles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold tracking-wide">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold tracking-wide">Légal</h4>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold tracking-wide">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li className="opacity-80">Cotonou, Bénin</li>
              <li className="opacity-80">contact@revocarriere.com</li>
            </ul>
            <div className="flex mt-6 space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} Rev'O Carrière. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
