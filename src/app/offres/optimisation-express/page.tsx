"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaClock, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { AnimatedSection } from '@/components/home/AnimatedSection';

export default function OptimisationExpressPage() {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ fullName: '', email: '' });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('redirecting');

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 15000,
          email: formData.email,
          firstname: formData.fullName.split(' ')[0],
          lastname: formData.fullName.split(' ').slice(1).join(' ') || 'Client',
          planName: 'Optimisation Express'
        }),
      });

      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error(data.message || 'Erreur lors du paiement');
      }
    } catch (error: any) {
      setStatus(`error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero / Sales Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20 mb-6 uppercase tracking-widest"
          >
            🚀 Résultat Garanti en 48h
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Optimisation <span className="text-blue-500">Express</span> de votre Profil
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Arrêtez d'envoyer des CV qui sont ignorés. Obtenez un profil professionnel optimisé pour le marché international en moins de 48 heures.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mt-10">
          {/* Left: Benefits */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaCheckCircle className="text-blue-500 mr-3" /> Ce que vous obtenez :
              </h3>
              <ul className="space-y-4">
                {[
                  "Audit flash complet de votre profil actuel",
                  "Optimisation des mots-clés pour les logiciels de tri (ATS)",
                  "Correction des erreurs de positionnement majeures",
                  "Conseils rapides pour booster votre visibilité LinkedIn",
                  "Livraison sous 48h chrono"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="text-blue-500 mr-2">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
               <FaShieldAlt className="text-green-500 text-3xl mr-4" />
               <p className="text-sm text-green-300">
                 Paiement sécurisé via FedaPay. Accès immédiat après confirmation.
               </p>
            </div>
          </div>

          {/* Right: Instant Checkout */}
          <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-2xl font-bold">
              15 000 FCFA
            </div>
            <h3 className="text-2xl font-bold mb-6">Commander maintenant</h3>
            
            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nom Complet</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Jean Dupont"
                  className="w-full p-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Adresse Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="jean@example.com"
                  className="w-full p-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === 'redirecting'}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-xl shadow-blue-600/20"
              >
                {status === 'redirecting' ? 'Redirection...' : 'Payer et Commencer'}
                <FaArrowRight className="ml-3" />
              </button>
            </form>
            
            <p className="text-center text-xs text-gray-500 mt-6">
              En cliquant, vous acceptez nos conditions générales de vente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
