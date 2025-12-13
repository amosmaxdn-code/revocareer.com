import { SectionHeader } from "@/components/SectionHeader";

export default function LegalPage() {
  return (
    <>
      <SectionHeader
        title="Mentions Légales & Conditions"
        subtitle="Informations importantes concernant l'utilisation de notre site et de nos services."
      />

      <div className="container mx-auto px-6 py-12">
        <div className="prose lg:prose-xl max-w-none mx-auto bg-white p-8 rounded-lg shadow-md">
          
          <h2 id="cgu">Conditions Générales d'Utilisation (CGU)</h2>
          <p>
            Bienvenue sur Rev'O Carrière. En accédant à notre site web, vous acceptez d'être lié par ces termes et conditions d'utilisation. Si vous n'êtes pas d'accord avec une partie de ces termes, vous ne devez pas utiliser notre site.
          </p>
          <p>
            L'utilisation de nos services est réservée aux personnes majeures et capables juridiquement. Les contenus, produits et services sont la propriété exclusive de Rev'O Carrière. Toute reproduction ou utilisation non autorisée est strictement interdite.
          </p>

          <h2 id="privacy">Politique de Confidentialité</h2>
          <p>
            Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
          </p>
          <h3>Collecte de l'information</h3>
          <p>
            Nous collectons des informations lorsque vous vous inscrivez, achetez un produit, ou remplissez un formulaire de contact. Les informations collectées incluent votre nom, votre adresse e-mail, et votre numéro de téléphone.
          </p>
          <h3>Utilisation des informations</h3>
          <p>
            Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
            <ul>
                <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                <li>Fournir un contenu publicitaire personnalisé</li>
                <li>Améliorer notre site</li>
                <li>Vous contacter par e-mail ou téléphone</li>
            </ul>
          </p>

          <h2 id="refunds">Politique de Remboursement</h2>
          <p>
            Concernant nos produits digitaux (templates, PDF, etc.), en raison de leur nature immatérielle et de leur accès instantané, toutes les ventes sont finales et non remboursables.
          </p>
          <p>
            Pour les services de coaching et d'accompagnement, les conditions de remboursement ou de report sont définies dans le contrat de service initial. Toute demande doit être faite par écrit au moins 48 heures avant une session planifiée.
          </p>

          <h2 id="data-protection">Protection des Données</h2>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.
          </p>
          <p>
            Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à ces mentions légales, vous pouvez nous contacter à l'adresse suivante : legal@revocarriere.com.
          </p>
        </div>
      </div>
    </>
  );
}
