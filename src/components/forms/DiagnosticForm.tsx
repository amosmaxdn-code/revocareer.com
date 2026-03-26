"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
};

const InputField = ({ id, label, type = 'text', placeholder, required = true }: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      required={required}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

type TextareaFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const TextareaField = ({ id, label, placeholder, required = true }: TextareaFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      name={id}
      rows={5}
      placeholder={placeholder}
      required={required}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const FormContent = () => {
  const [status, setStatus] = useState('');
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const getPlanDetails = () => {
    if (plan === 'express') return { name: 'Optimisation Express', price: 15000 };
    if (plan === 'strategic') return { name: 'Repositionnement Stratégique', price: 75000 };
    return null;
  };

  const planDetails = getPlanDetails();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = {
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      linkedin: (form.elements.namedItem('linkedin') as HTMLInputElement).value,
      experienceYears: parseInt((form.elements.namedItem('experienceYears') as HTMLInputElement).value),
      currentSalary: parseInt((form.elements.namedItem('currentSalary') as HTMLInputElement).value),
      currentSituation: (form.elements.namedItem('currentSituation') as HTMLTextAreaElement).value,
      careerGoals: (form.elements.namedItem('careerGoals') as HTMLTextAreaElement).value,
      plan: planDetails?.name || 'Diagnostic Gratuit'
    };

    try {
      // 1. Enregistrer la candidature/diagnostic
      const response = await fetch('/api/diagnostic-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement des données');
      }

      // 2. Si un plan payant est choisi, rediriger vers FedaPay
      if (planDetails) {
        setStatus('redirecting');
        const paymentResponse = await fetch('/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: planDetails.price,
            email: formData.email,
            firstname: formData.fullName.split(' ')[0],
            lastname: formData.fullName.split(' ').slice(1).join(' ') || 'Client',
            planName: planDetails.name
          }),
        });

        const paymentData = await paymentResponse.json();
        if (paymentData.payment_url) {
          window.location.href = paymentData.payment_url;
          return;
        } else {
          throw new Error(paymentData.message || 'Erreur lors de la création du lien de paiement');
        }
      }

      setStatus('success');
      form.reset();
    } catch (error: any) {
      console.error('Error:', error);
      setStatus(`error: ${error.message || 'Une erreur est survenue.'}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {planDetails && (
        <div className="mb-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl text-center">
          <p className="text-blue-300 font-semibold">Offre sélectionnée : {planDetails.name}</p>
          <p className="text-2xl font-bold text-white mt-1">{planDetails.price.toLocaleString()} FCFA</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-xl border border-gray-700/50">
        <div className="space-y-6">
          <InputField id="fullName" label="Nom Complet" placeholder="Votre nom complet" />
          <InputField id="email" label="Adresse Email" type="email" placeholder="votre.email@example.com" />
          <InputField id="linkedin" label="Profil LinkedIn" placeholder="https://linkedin.com/in/votreprofil" />
          <InputField id="experienceYears" label="Années d'Expérience en Gestion de Projet" type="number" placeholder="Ex: 8" />
          <InputField id="currentSalary" label="Salaire Annuel Actuel (CAD)" type="number" placeholder="Ex: 80000" />
          <TextareaField
            id="currentSituation"
            label="Décrivez votre situation professionnelle actuelle"
            placeholder="Ex: Chef de projet senior dans le secteur de la finance, recherche de nouvelles opportunités..."
          />
          <TextareaField
            id="careerGoals"
            label="Quels sont vos objectifs de carrière au Canada ?"
            placeholder="Ex: Décrocher un poste de Senior PM dans une entreprise tech à Toronto, avec un salaire cible de 150k$ CAD..."
          />

          <div>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'redirecting'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Envoi en cours...' : 
               status === 'redirecting' ? 'Redirection vers le paiement...' : 
               planDetails ? 'Procéder au paiement' : 'Soumettre ma candidature'}
            </button>
          </div>
        </div>

        {status === 'success' && (
          <p className="mt-6 text-center text-green-400">
            Merci ! Votre candidature a bien été reçue. Nous vous recontacterons sous 48h.
          </p>
        )}
        {status.startsWith('error') && (
          <p className="mt-6 text-center text-red-500">
            {status.substring(7)}
          </p>
        )}
      </form>
    </div>
  );
};

export const DiagnosticForm = () => (
  <Suspense fallback={<div className="text-center py-10">Chargement...</div>}>
    <FormContent />
  </Suspense>
);

