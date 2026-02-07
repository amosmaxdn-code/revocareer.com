import { Metadata } from 'next';
import { DiagnosticForm } from '../../components/forms/DiagnosticForm';

export const metadata: Metadata = {
  title: "Candidature Project Manager Canada Track - Rev'O Carrière",
  description: "Postulez au programme exclusif de Rev'O Carrière pour les Project Managers visant le marché canadien."
};

const ProgrammeCandidaturePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20 px-4">
      <div className="max-w-4xl w-full mx-auto text-center">

        {/* 1. Titre d'autorité */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8">
          Candidature Project Manager Canada Track
        </h1>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
          Remplissez ce formulaire pour que nos experts évaluent votre profil et déterminent votre éligibilité à notre programme d'accélération de carrière.
        </p>

        {/* 2. Formulaire de diagnostic complet */}
        <DiagnosticForm />

        {/* 3. Mention de confidentialité */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            <span className="font-bold">Confidentialité de vos données :</span> Les informations que vous soumettez, y compris les détails financiers implicites de vos objectifs de carrière, sont traitées avec la plus stricte confidentialité. Elles ne sont utilisées que dans le but d'évaluer votre candidature et ne sont jamais partagées avec des tiers sans votre consentement explicite.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProgrammeCandidaturePage;
