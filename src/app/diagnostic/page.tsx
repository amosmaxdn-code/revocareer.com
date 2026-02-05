"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserTie, FaCertificate, FaMoneyBillWave, FaEnvelope, FaPhone, FaBriefcase } from 'react-icons/fa';

const DiagnosticPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    experience: '',
    certificationStatus: '',
    salaireActuel: '',
    budget: '',
    email: '',
    phone: '',
  });

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.experience || !formData.certificationStatus) {
        setError('Veuillez répondre à toutes les questions avant de continuer.');
        return;
      }
    }
    setError('');
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => setStep(prev => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- Client-side validation ---
    if (!formData.experience || !formData.certificationStatus || !formData.salaireActuel || !formData.budget || !formData.email || !formData.phone) {
      setError('Tous les champs sont obligatoires. Veuillez vérifier vos réponses.');
      return; // Stop submission if validation fails
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue lors de la soumission.');
      }
      
      // Redirect to confirmation page on success
      router.push('/confirmation');

    } catch (err: any) {
      setError(err.message || 'Une erreur de connexion est survenue.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const progressPercentage = (step / 2) * 100;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Diagnostic de Compatibilité</h1>
        <p className="text-center text-gray-400 mb-4">Étape {step} sur 2</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>

        {error && <p className="text-red-500 text-center bg-red-900/20 border border-red-500 rounded-md p-3 mb-6">{error}</p>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <p className="text-sm text-blue-300 mb-2">Cette donnée nous permet de calculer votre éligibilité aux salaires de niveau Senior.</p>
                <label className="block text-gray-300 font-semibold mb-2"><FaUserTie className="inline mr-2" />Expérience en Gestion de Projet</label>
                <div className="space-y-2">
                  {['<3 ans', '3-7 ans', '7-12 ans', '12+ ans'].map(exp => (
                    <label key={exp} className="flex items-center text-gray-200 p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors">
                      <input type="radio" name="experience" value={exp} checked={formData.experience === exp} onChange={handleChange} required />
                      <span className="ml-3">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-blue-300 mb-2">Les certifications sont un facteur clé pour passer les filtres de recrutement (ATS).</p>
                <label className="block text-gray-300 font-semibold mb-2"><FaCertificate className="inline mr-2" />Quelle est votre situation actuelle concernant les certifications internationales ?</label>
                <div className="space-y-2">
                    {[
                      'Déjà certifié (PMP, PRINCE2, etc.)',
                      'Expérimenté mais non certifié (souhaite le devenir)',
                      'En cours de préparation'
                    ].map(status => (
                        <label key={status} className="flex items-center text-gray-200 p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors">
                            <input type="radio" name="certificationStatus" value={status} checked={formData.certificationStatus === status} onChange={handleChange} required />
                            <span className="ml-3">{status}</span>
                        </label>
                    ))}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button type="button" onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
                  Suivant
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
                <div>
                    <p className="text-sm text-blue-300 mb-2">Cette donnée est essentielle pour quantifier le gain que nous pouvons vous apporter.</p>
                    <label htmlFor="salaireActuel" className="block text-gray-300 font-semibold mb-2"><FaBriefcase className="inline mr-2" />Salaire Annuel Actuel (CAD)</label>
                    <select id="salaireActuel" name="salaireActuel" value={formData.salaireActuel} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Sélectionnez votre tranche de salaire</option>
                        <option value="<20k">Moins de 20,000 CAD</option>
                        <option value="20k-40k">20,000 - 40,000 CAD</option>
                        <option value="40k-60k">40,000 - 60,000 CAD</option>
                        <option value="60k+">Plus de 60,000 CAD</option>
                    </select>
                </div>
                <div>
                    <p className="text-sm text-blue-300 mb-2">Ceci nous permet d'évaluer votre capacité à investir dans les outils de votre transition.</p>
                    <label htmlFor="budget" className="block text-gray-300 font-semibold mb-2"><FaMoneyBillWave className="inline mr-2" />Budget d'investissement disponible</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Sélectionnez votre budget</option>
                        <option value="<1000$">{'<1000$'}</option>
                        <option value="1000-3000$">1000$ - 3000$</option>
                        <option value="3000$+">3000$+</option>
                    </select>
                </div>
                <div>
                    <p className="text-sm text-blue-300 mb-2">Vos informations serviront à vous transmettre l'analyse complète et confidentielle.</p>
                    <label htmlFor="email" className="block text-gray-300 font-semibold mb-2"><FaEnvelope className="inline mr-2" />Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <label htmlFor="phone" className="block text-gray-300 font-semibold mt-4 mb-2"><FaPhone className="inline mr-2" />Téléphone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+229 99 99 99 99" className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex justify-between items-center pt-4">
                    <button type="button" onClick={handlePrevStep} disabled={isLoading} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        Précédent
                    </button>
                    <button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? 'Soumission en cours...' : 'Soumettre mon dossier pour analyse'}
                    </button>
                </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DiagnosticPage;
