import Link from "next/link";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-dark-blue text-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold">
              Rev'O <span className="text-primary">Carrière</span>
            </h3>
            <p className="mt-4 text-sm opacity-80 max-w-md">
              Une trajectoire claire, alignée sur les standards réels, pour les professionnels africains visant le marché canadien.
            </p>
             <p className="mt-4 text-xs opacity-60">
              Revocareer n'est pas un cabinet d'immigration et ne garantit pas l'obtention d'un emploi. Nous structurons les profils pour maximiser leur employabilité.
            </p>
          </div>

          {/* Contact & Social */}
          <div className="col-span-1 md:text-right">
            <h4 className="font-semibold tracking-wide">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li className="opacity-80">contact@revocareer.com</li>
              <li className="opacity-80">Cotonou, Bénin</li>
            </ul>
            <div className="flex mt-6 space-x-4 md:justify-end">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} Revocareer.com. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
