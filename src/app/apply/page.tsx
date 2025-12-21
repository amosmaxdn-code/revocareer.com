"use client";

import { useState } from 'react';
import { CTAButton } from '@/components/CTAButton';
import Link from 'next/link';
import { FiCheckCircle, FiLoader, FiAlertTriangle } from 'react-icons/fi';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      <div className="bg-background min-h-screen flex items-center justify-center text-center">
        <div className="bg-white p-12 rounded-lg shadow-xl max-w-lg">
          <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-dark-blue">Candidature envoyée !</h1>
          <p className="mt-4 text-lg text-gray-700">Merci d'avoir postulé. Nous avons bien reçu votre candidature et nous reviendrons vers vous dans les plus brefs délais après étude de votre profil.</p>
          <div className="mt-8">
            <Link href="/" className="font-semibold text-primary hover:underline">
              Retour à la page d'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl">
          <h1 className="text-4xl font-bold text-dark-blue text-center">Postuler au Programme</h1>
          <p className="mt-4 text-lg text-gray-600 text-center mb-10">Remplissez ce formulaire pour soumettre votre profil à notre processus de sélection.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Adresse e-mail</label>
              <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Téléphone (Optionnel)</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-bold text-gray-700 mb-2">Années d'expérience en gestion de projet</label>
              <select name="experience" id="experience" required value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                <option value="" disabled>Sélectionnez une option</option>
                <option value="Moins de 2 ans">Moins de 2 ans</option>
                <option value="2-4 ans">2-4 ans</option>
                <option value="5-7 ans">5-7 ans</option>
                <option value="Plus de 7 ans">Plus de 7 ans</option>
              </select>
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-bold text-gray-700 mb-2">Vos motivations (quelques lignes)</label>
              <textarea name="motivation" id="motivation" rows={5} required value={formData.motivation} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>
            
            <div className="pt-4">
              <button type="submit" disabled={status === 'loading'} className="w-full bg-primary text-white font-bold py-4 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400">
                {status === 'loading' ? (
                  <FiLoader className="animate-spin mr-3" />
                ) : (
                  'Envoyer ma candidature'
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
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
