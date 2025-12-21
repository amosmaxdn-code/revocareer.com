"use client";

import { useState, useMemo, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiLoader, FiAlertTriangle } from 'react-icons/fi';

// State shape with human-readable names
const initialFormData = {
  fullName: '',
  email: '',
  country: '',
  age: '',
  status: '',
  statusOther: '',
  experience: '',
  contexts: [] as string[],
  contextsOther: '',
  projectDescription: '',
  whyCanada: '',
  objective: '',
  objectiveOther: '',
  timeline: '',
  certifications: [] as string[],
  certificationsOther: '',
  certChoice: '',
  blocker: '',
  pastInvestment: '',
  commitment: '',
  responsibility: '',
  goodCandidate: '',
  acceptsRefusal: '',
};

const DisqualificationMessage = ({ message }: { message: string }) => (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md my-6" role="alert">
        <h4 className="font-bold">Information importante</h4>
        <p>{message}</p>
    </div>
);

// HELPER COMPONENTS MOVED OUTSIDE a
const Fieldset = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <fieldset className="border-t-2 border-gray-200 pt-8 mt-12 first:mt-0 first:border-t-0 first:pt-0">
        <legend className="text-2xl font-bold text-dark-blue py-2">{title}</legend>
        <div className="space-y-8 mt-6">{children}</div>
    </fieldset>
);

const FormQuestion = ({ number, label, children }: { number: number, label: string, children: React.ReactNode }) => (
    <div>
        <label className="block text-md font-bold text-gray-800 mb-3">{number}. {label}</label>
        {children}
    </div>
);


export default function ApplyPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const disqualification = useMemo(() => {
    if (formData.experience && ['Moins de 1 an', '1–2 ans'].includes(formData.experience)) {
      return "Ce programme n’est pas adapté à votre niveau d'expérience actuel. Il est conçu pour des professionnels ayant 2 à 7 ans d'expérience minimum.";
    }
    if (formData.commitment === 'Non') {
      return "Un engagement plein et entier (temps, discipline, argent) est un prérequis non négociable pour rejoindre ce programme.";
    }
    if (formData.acceptsRefusal === 'Non') {
        return "L'acceptation de notre processus de sélection est une condition nécessaire pour postuler.";
    }
    return null;
  }, [formData.experience, formData.commitment, formData.acceptsRefusal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      const fieldName = name;
      const currentValues = formData[fieldName as keyof typeof formData] as string[];
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: checked 
          ? [...currentValues, value]
          : currentValues.filter(item => item !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disqualification) return;

    setFormStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue.');
      }
      setFormStatus('success');
    } catch (err: any) {
      setFormStatus('error');
      setErrorMessage(err.message);
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center text-center p-6">
        <div className="bg-white p-12 rounded-lg shadow-xl max-w-2xl">
           <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-dark-blue">Merci pour votre candidature.</h1>
          <p className="mt-6 text-lg text-gray-700">Chaque dossier est analysé avec attention. Si votre profil correspond au niveau et aux exigences du Project Manager Canada Track, vous serez contacté pour un entretien de validation.</p>
          <p className="mt-4 text-lg text-gray-700">Dans le cas contraire, nous vous ferons un retour honnête.</p>
          <p className="mt-8 font-semibold text-primary">Revocareer privilégie la cohérence à la quantité.</p>
          <div className="mt-8">
            <Link href="/" className="font-semibold text-gray-600 hover:underline">
              Retour à la page d'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-32 md:pt-40 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl border-t-4 border-primary">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-dark-blue">FORMULAIRE DE SÉLECTION</h1>
            <p className="mt-2 text-lg text-gray-600">Project Manager Canada Track – Revocareer</p>
            <p className="mt-6 font-semibold text-yellow-700 bg-yellow-100 p-3 rounded-md inline-block border border-yellow-200">⚠️ Ce programme est sélectif. Toutes les candidatures ne sont pas acceptées.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-12">
            <Fieldset title="Section 1: Identité & Situation Actuelle">
                <FormQuestion number={1} label="Nom et prénom"><input type="text" name="fullName" id="fullName" required value={formData.fullName} onChange={handleChange} className="input-styled"/></FormQuestion>
                <FormQuestion number={2} label="Pays de résidence actuel"><input type="text" name="country" id="country" required value={formData.country} onChange={handleChange} className="input-styled"/></FormQuestion>
                <FormQuestion number={3} label="Âge"><input type="number" name="age" id="age" required value={formData.age} onChange={handleChange} className="input-styled"/></FormQuestion>
                <FormQuestion number={4} label="Statut actuel">
                    {['Salarié', 'Consultant / freelance', 'Entrepreneur', 'Sans emploi'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="status" value={opt} checked={formData.status === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                    <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer"><input type="radio" name="status" value="Autre" checked={formData.status === 'Autre'} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">Autre</span></label>
                    <input type="text" name="statusOther" placeholder="Préciser" value={formData.statusOther} onChange={handleChange} className={`input-styled mt-2 ${formData.status === 'Autre' ? 'block' : 'hidden'}`}/>
                </FormQuestion>
            </Fieldset>

            <Fieldset title="Section 2: Expérience en Gestion de Projet">
                <FormQuestion number={5} label="Combien d’années d’expérience réelle avez-vous en gestion de projet ?">
                    {['Moins de 1 an', '1–2 ans', '2–4 ans', '5–7 ans', 'Plus de 7 ans'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="experience" value={opt} required checked={formData.experience === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                </FormQuestion>
                {formData.experience && ['Moins de 1 an', '1–2 ans'].includes(formData.experience) && <DisqualificationMessage message="Ce programme n’est pas adapté à votre niveau d'expérience actuel."/>}
                
                <FormQuestion number={6} label="Dans quels contextes avez-vous exercé la gestion de projet ?">
                    {['ONG / projets de développement', 'Entreprise privée', 'IT / digital / tech', 'Projets communautaires'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="checkbox" name="contexts" value={opt} checked={formData.contexts.includes(opt)} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                    <input type="text" name="contextsOther" placeholder="Autre contexte (préciser)" value={formData.contextsOther} onChange={handleChange} className="w-full input-styled mt-2"/>
                </FormQuestion>

                <FormQuestion number={7} label="Décrivez brièvement un projet que vous avez réellement piloté (ou co-piloté). (minimum 5 lignes)"><textarea name="projectDescription" rows={6} required minLength={100} value={formData.projectDescription} onChange={handleChange} className="input-styled"/></FormQuestion>
            </Fieldset>

            <Fieldset title="Section 3: Objectif Canada">
                <FormQuestion number={8} label="Pourquoi le Canada ?"><textarea name="whyCanada" rows={4} required value={formData.whyCanada} onChange={handleChange} className="input-styled"/></FormQuestion>
                <FormQuestion number={9} label="Quel est votre objectif principal à court/moyen terme ?">
                    {['Être plus crédible professionnellement', 'Accéder à des opportunités d’emploi au Canada', 'Préparer une immigration réaliste', 'Clarifier ma trajectoire'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="objective" value={opt} checked={formData.objective === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                    <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer"><input type="radio" name="objective" value="Autre" checked={formData.objective === 'Autre'} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">Autre</span></label>
                    <input type="text" name="objectiveOther" placeholder="Préciser" value={formData.objectiveOther} onChange={handleChange} className={`w-full input-styled mt-2 ${formData.objective === 'Autre' ? 'block' : 'hidden'}`}/>
                </FormQuestion>
                <FormQuestion number={10} label="Quel horizon de temps vous semble réaliste pour le Canada ?">
                    {['Moins de 6 mois', '6–12 mois', '1–2 ans', 'Plus de 2 ans'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="timeline" value={opt} required checked={formData.timeline === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                </FormQuestion>
            </Fieldset>

            <Fieldset title="Section 4: Certifications & Compétences">
                <FormQuestion number={11} label="Avez-vous déjà des certifications en gestion de projet ?">
                    {['Aucune', 'CAPM', 'PMP', 'PRINCE2', 'Scrum / Agile', 'ITIL'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="checkbox" name="certifications" value={opt} checked={formData.certifications.includes(opt)} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                    <input type="text" name="certificationsOther" placeholder="Autre certification (préciser)" value={formData.certificationsOther} onChange={handleChange} className="w-full input-styled mt-2"/>
                </FormQuestion>
                 <FormQuestion number={12} label="Si vous deviez choisir UNE certification aujourd’hui, laquelle et pourquoi ?"><textarea name="certChoice" rows={4} required value={formData.certChoice} onChange={handleChange} className="input-styled"/></FormQuestion>
            </Fieldset>

            <Fieldset title="Section 5: Engagement & Maturité">
                <FormQuestion number={13} label="Qu’est-ce qui vous bloque aujourd’hui dans votre progression professionnelle ?"><textarea name="blocker" rows={4} required value={formData.blocker} onChange={handleChange} className="input-styled"/></FormQuestion>
                <FormQuestion number={14} label="Avez-vous déjà investi financièrement dans votre formation ou votre évolution professionnelle ?">
                     {['Oui (formations, certifications, coaching)', 'Non'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="pastInvestment" value={opt} required checked={formData.pastInvestment === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                </FormQuestion>
                <FormQuestion number={15} label="Le programme représente un investissement financier sérieux. Êtes-vous prêt à vous engager pleinement (temps, discipline, argent) ?">
                    {['Oui', 'Non'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="commitment" value={opt} required checked={formData.commitment === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                </FormQuestion>
                {formData.commitment === 'Non' && <DisqualificationMessage message="Un engagement plein et entier est un prérequis non négociable."/>}
            </Fieldset>

            <Fieldset title="Section 6: Responsabilité Personnelle">
                <FormQuestion number={16} label="Si dans 12 mois votre situation n’a pas évolué, quelle part de responsabilité prenez-vous personnellement ?"><textarea name="responsibility" rows={4} required value={formData.responsibility} onChange={handleChange} className="input-styled"/></FormQuestion>
            </Fieldset>

            <Fieldset title="Section 7: Validation Finale">
                 <FormQuestion number={17} label="Pourquoi pensez-vous être un bon candidat pour ce programme ?"><textarea name="goodCandidate" rows={4} required value={formData.goodCandidate} onChange={handleChange} className="input-styled"/></FormQuestion>
                 <FormQuestion number={18} label="Acceptez-vous que votre candidature puisse être refusée si le programme n’est pas adapté à votre profil ?">
                    {['Oui', 'Non'].map(opt => 
                        <label key={opt} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary mb-2 cursor-pointer"><input type="radio" name="acceptsRefusal" value={opt} required checked={formData.acceptsRefusal === opt} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/><span className="ml-3 text-gray-700">{opt}</span></label>
                    )}
                 </FormQuestion>
                 {formData.acceptsRefusal === 'Non' && <DisqualificationMessage message="L'acceptation de notre processus de sélection est une condition nécessaire pour postuler."/>}
            </Fieldset>
            
            <div className="pt-8 mt-12 border-t-2">
              <button type="submit" disabled={formStatus === 'loading' || !!disqualification} className="w-full bg-primary text-white font-bold py-4 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {formStatus === 'loading' ? <FiLoader className="animate-spin" /> : 'Soumettre ma candidature'}
              </button>
            </div>

            {formStatus === 'error' && (
              <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
                <FiAlertTriangle className="mr-3"/>
                <div>
                    <p className="font-bold">Une erreur est survenue</p>
                    <p>{errorMessage}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}