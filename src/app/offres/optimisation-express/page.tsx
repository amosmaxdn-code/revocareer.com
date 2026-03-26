"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaClock, FaArrowRight, FaShieldAlt, FaFire } from 'react-icons/fa';

export default function OptimisationExpressPage() {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [timeLeft, setTimeLeft] = useState('47:54:12');

  // Simple countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, this would be based on a fixed end date
      setTimeLeft('47:' + Math.floor(Math.random() * 59).toString().padStart(2, '0') + ':' + Math.floor(Math.random() * 59).toString().padStart(2, '0'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      {/* Top Urgency Bar */}
      <div className="fixed top-0 left-0 w-full bg-blue-600 text-white py-2 z-50 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-tighter">
          <FaFire className="animate-bounce" />
          <span>Offre de lancement : -70% de réduction immédiate</span>
          <span className="hidden md:inline">|</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">Ferme dans : {timeLeft}</span>
        </div>
      </div>

      {/* Hero / Sales Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20 mb-6 uppercase tracking-widest"
          >
            🔥 SEULEMENT 7 PLACES RESTANTES SUR 20
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
              <h3 className="text-xl font-bold mb-4 flex items-center text-blue-400">
                <FaCheckCircle className="mr-3" /> Ce que vous obtenez immédiatement :
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
            
            <div className="flex items-center p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
               <FaClock className="text-blue-500 text-3xl mr-4" />
               <p className="text-sm text-blue-300">
                 <strong>Offre limitée :</strong> Le prix passera de 15 000 FCFA à 50 000 FCFA dès que les 20 places seront réservées.
               </p>
            </div>
          </div>

          {/* Right: Instant Checkout */}
          <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl relative overflow-hidden border-4 border-blue-500/10">
            <div className="absolute top-0 right-0 bg-red-500 text-white px-6 py-2 rounded-bl-2xl font-black text-sm">
              -70% AUJOURD'HUI
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Accès Prioritaire</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-black text-blue-600">15 000 FCFA</span>
                <span className="text-lg text-gray-400 line-through">50 000 FCFA</span>
              </div>
            </div>
            
            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Votre Nom Complet</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Jean Dupont"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Adresse Email Professionnelle</label>
                <input 
                  type="email" 
                  required 
                  placeholder="jean@example.com"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === 'redirecting'}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-xl shadow-blue-600/30"
              >
                {status === 'redirecting' ? 'Traitement sécurisé...' : 'Sécuriser ma place à -70%'}
                <FaArrowRight className="ml-3" />
              </button>
            </form>
            
            <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-100 pt-6">
                <FaShieldAlt className="text-gray-400" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Paiement 100% sécurisé via FedaPay SSL</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
