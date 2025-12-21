"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiLoader, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const initialFormData = {
  q1_nom: '',
  q2_pays: '',
  q3_age: '',
  q4_statut: '',
  q4_autre: '',
  q5_experience: '',
  q6_contextes: [] as string[],
  q6_autre: '',
  q7_projet: '',
  q8_pourquoi_canada: '',
  q9_objectif: '',
  q9_autre: '',
  q10_horizon: '',
  q11_certifications: [] as string[],
  q11_autre: '',
  q12_choix_certif: '',
  q13_blocage: '',
  q14_investissement_passe: '',
  q15_engagement: '',
  q16_responsabilite: '',
  q17_bon_candidat: '',
  q18_acceptation_refus: '',
};

const DisqualificationMessage = ({ message }: { message: string }) => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-md my-6">
        <h4 className="font-bold">Information importante</h4>
        <p>{message}</p>
    </div>
);

export default function ApplyPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const disqualification = useMemo(() => {
    if (formData.q5_experience && ['Moins de 1 an', '1–2 ans'].includes(formData.q5_experience)) {
      return "Ce programme n’est pas adapté à votre niveau d'expérience actuel. Il est conçu pour des professionnels ayant entre 2 et 7 ans d'expérience.";
    }
    if (formData.q15_engagement === 'Non') {
      return "Un engagement plein et entier (temps, discipline, argent) est un prérequis non négociable pour rejoindre ce programme.";
    }
    if (formData.q18_acceptation_refus === 'Non') {
        return "L'acceptation de notre processus de sélection est une condition nécessaire pour postuler.";
    }
    return null;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      const field = name.split('.')[0];
      const category = name.split('.')[1];
      
      setFormData(prev => {
        const list = (prev as any)[field] as string[];
        if (checked) {
          return { ...prev, [field]: [...list, category] };
        } else {
          return { ...prev, [field]: list.filter(item => item !== category) };
        }
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disqualification) return;

    setStatus('loading');
    setError('');

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
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center text-center p-6">
        <div className="bg-white p-12 rounded-lg shadow-xl max-w-2xl">
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

  const Fieldset = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <fieldset className="border-t-2 border-primary pt-6 mt-10">
        <legend className="text-2xl font-bold text-dark-blue px-4 -ml-4">{title}</legend>
        <div className="space-y-6 mt-6">{children}</div>
    </fieldset>
  );

  const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div>
        <label className="block text-md font-bold text-gray-800 mb-2">{label}</label>
        {children}
    </div>
  )

  const RadioGroup = ({ name, options, value, onChange }: {name: string, options: string[], value: string, onChange: any}) => (
    <div className="space-y-2">
        {options.map(option => (
            <label key={option} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                <span className="ml-3 text-gray-700">{option}</span>
            </label>
        ))}
    </div>
  );

  return (
    <div className="bg-background min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-dark-blue">FORMULAIRE DE SÉLECTION</h1>
            <p className="mt-2 text-lg text-gray-600">Project Manager Canada Track – Revocareer</p>
            <p className="mt-4 font-semibold text-yellow-600 bg-yellow-50 p-3 rounded-md inline-block">⚠️ Ce programme est sélectif. Toutes les candidatures ne sont pas acceptées.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-10">
            <Fieldset title="Section 1 — Identité & Situation Actuelle">
                <FormField label="1. Nom et prénom"><input type="text" name="q1_nom" required value={formData.q1_nom} onChange={handleChange} className="w-full input-styled"/></FormField>
                <FormField label="2. Pays de résidence actuel"><input type="text" name="q2_pays" required value={formData.q2_pays} onChange={handleChange} className="w-full input-styled"/></FormField>
                <FormField label="3. Âge"><input type="number" name="q3_age" required value={formData.q3_age} onChange={handleChange} className="w-full input-styled"/></FormField>
                <FormField label="4. Statut actuel">
                    <RadioGroup name="q4_statut" options={['Salarié', 'Consultant / freelance', 'Entrepreneur', 'Sans emploi']} value={formData.q4_statut} onChange={handleChange} />
                    <input type="text" name="q4_autre" placeholder="Autre (préciser)" value={formData.q4_autre} onChange={handleChange} className={`w-full input-styled mt-2 ${formData.q4_statut === 'Autre' ? 'block' : 'hidden'}`}/>
                </FormField>
            </Fieldset>

            <Fieldset title="Section 2 — Expérience en Gestion de Projet">
                <FormField label="5. Combien d’années d’expérience réelle as-tu en gestion de projet ?">
                    <RadioGroup name="q5_experience" options={['Moins de 1 an', '1–2 ans', '2–4 ans', '5–7 ans', 'Plus de 7 ans']} value={formData.q5_experience} onChange={handleChange}/>
                </FormField>
                {formData.q5_experience && ['Moins de 1 an', '1–2 ans'].includes(formData.q5_experience) && <DisqualificationMessage message="Ce programme n’est pas adapté à votre niveau d'expérience actuel."/>}
                
                <FormField label="6. Dans quels contextes as-tu exercé la gestion de projet ?">
                    <div className="space-y-2">
                        {['ONG / projets de développement', 'Entreprise privée', 'IT / digital / tech', 'Projets communautaires'].map(ctx => 
                            <label key={ctx} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <input type="checkbox" name={`q6_contextes.${ctx}`} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/>
                                <span className="ml-3 text-gray-700">{ctx}</span>
                            </label>
                        )}
                        <input type="text" name="q6_autre" placeholder="Autre (préciser)" value={formData.q6_autre} onChange={handleChange} className="w-full input-styled mt-2"/>
                    </div>
                </FormField>

                <FormField label="7. Décris brièvement un projet que tu as réellement piloté (ou co-piloté). (minimum 5 lignes)"><textarea name="q7_projet" rows={6} required minLength={100} value={formData.q7_projet} onChange={handleChange} className="w-full input-styled"/></FormField>
            </Fieldset>

            <Fieldset title="Section 3 — Objectif Canada">
                <FormField label="8. Pourquoi le Canada ?"><textarea name="q8_pourquoi_canada" rows={4} required value={formData.q8_pourquoi_canada} onChange={handleChange} className="w-full input-styled"/></FormField>
                <FormField label="9. Quel est ton objectif principal à court/moyen terme ?">
                    <RadioGroup name="q9_objectif" options={['Être plus crédible professionnellement', 'Accéder à des opportunités d’emploi au Canada', 'Préparer une immigration réaliste', 'Clarifier ma trajectoire']} value={formData.q9_objectif} onChange={handleChange} />
                    <input type="text" name="q9_autre" placeholder="Autre (préciser)" value={formData.q9_autre} onChange={handleChange} className={`w-full input-styled mt-2 ${formData.q9_objectif === 'Autre' ? 'block' : 'hidden'}`}/>
                </FormField>
                <FormField label="10. Quel horizon de temps te sembles réaliste pour le Canada ?">
                    <RadioGroup name="q10_horizon" options={['Moins de 6 mois', '6–12 mois', '1–2 ans', 'Plus de 2 ans']} value={formData.q10_horizon} onChange={handleChange}/>
                </FormField>
            </Fieldset>

            <Fieldset title="Section 4 — Certifications & Compétences">
                <FormField label="11. As-tu déjà des certifications en gestion de projet ?">
                     <div className="space-y-2">
                        {['Aucune', 'CAPM', 'PMP', 'PRINCE2', 'Scrum / Agile', 'ITIL'].map(cert => 
                            <label key={cert} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <input type="checkbox" name={`q11_certifications.${cert}`} onChange={handleChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/>
                                <span className="ml-3 text-gray-700">{cert}</span>
                            </label>
                        )}
                        <input type="text" name="q11_autre" placeholder="Autre (préciser)" value={formData.q11_autre} onChange={handleChange} className="w-full input-styled mt-2"/>
                    </div>
                </FormField>
                 <FormField label="12. Si tu devais choisir UNE certification aujourd’hui, laquelle et pourquoi ?"><textarea name="q12_choix_certif" rows={4} required value={formData.q12_choix_certif} onChange={handleChange} className="w-full input-styled"/></FormField>
            </Fieldset>

            <Fieldset title="Section 5 — Engagement & Maturité">
                <FormField label="13. Qu’est-ce qui te bloque aujourd’hui dans ta progression professionnelle ?"><textarea name="q13_blocage" rows={4} required value={formData.q13_blocage} onChange={handleChange} className="w-full input-styled"/></FormField>
                <FormField label="14. As-tu déjà investi financièrement dans ta formation ou ton évolution professionnelle ?"><RadioGroup name="q14_investissement_passe" options={['Oui (formations, certifications, coaching)', 'Non']} value={formData.q14_investissement_passe} onChange={handleChange}/></FormField>
                <FormField label="15. Le programme représente un investissement financier sérieux. Es-tu prêt à t’engager pleinement (temps, discipline, argent) ?"><RadioGroup name="q15_engagement" options={['Oui', 'Non']} value={formData.q15_engagement} onChange={handleChange}/></FormField>
                {formData.q15_engagement === 'Non' && <DisqualificationMessage message="Un engagement plein et entier est un prérequis non négociable."/>}
            </Fieldset>

            <Fieldset title="Section 6 — Responsabilité Personnelle">
                <FormField label="16. Si dans 12 mois ta situation n’a pas évolué, quelle part de responsabilité prends-tu personnellement ?"><textarea name="q16_responsabilite" rows={4} required value={formData.q16_responsabilite} onChange={handleChange} className="w-full input-styled"/></FormField>
            </Fieldset>

            <Fieldset title="Section 7 — Validation Finale">
                 <FormField label="17. Pourquoi penses-tu être un bon candidat pour ce programme ?"><textarea name="q17_bon_candidat" rows={4} required value={formData.q17_bon_candidat} onChange={handleChange} className="w-full input-styled"/></FormField>
                 <FormField label="18. Acceptes-tu que ta candidature puisse être refusée si le programme n’est pas adapté à ton profil ?"><RadioGroup name="q18_acceptation_refus" options={['Oui', 'Non']} value={formData.q18_acceptation_refus} onChange={handleChange}/></FormField>
                 {formData.q18_acceptation_refus === 'Non' && <DisqualificationMessage message="L'acceptation de notre processus de sélection est une condition nécessaire pour postuler."/>}
            </Fieldset>
            
            <div className="pt-8 mt-10 border-t-2">
              <button type="submit" disabled={status === 'loading' || !!disqualification} className="w-full bg-primary text-white font-bold py-4 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {status === 'loading' ? <FiLoader className="animate-spin" /> : 'Soumettre ma candidature'}
              </button>
            </div>

            {status === 'error' && (
              <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
                <FiAlertTriangle className="mr-3"/>
                <div>
                    <p className="font-bold">Une erreur est survenue</p>
                    <p>{error}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// Add a helper style to globals.css for inputs if it's not already there
// .input-styled { @apply w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary; }
