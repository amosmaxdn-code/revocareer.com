"use client";

import { useState } from 'react';

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

export const DiagnosticForm = () => {
  const [status, setStatus] = useState('');

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
    };

    try {
      const response = await fetch('/api/diagnostic-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); // Clear the form
      } else {
        const errorData = await response.json();
        setStatus(`error: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error: Network error or server unreachable.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-700/50">
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
            disabled={status === 'sending'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Envoi en cours...' : 'Soumettre ma candidature'}
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
          Erreur lors de l'envoi de la candidature: {status.substring(7)}
        </p>
      )}
    </form>
  );
};
