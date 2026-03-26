"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaChartLine, FaTrophy, FaArrowRight, FaShieldAlt, FaStar, FaBolt } from 'react-icons/fa';

export default function RepositionnementStrategiquePage() {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [timeLeft, setTimeLeft] = useState('47:22:05');

  useEffect(() => {
    const timer = setInterval(() => {
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
          amount: 75000,
          email: formData.email,
          firstname: formData.fullName.split(' ')[0],
          lastname: formData.fullName.split(' ').slice(1).join(' ') || 'Client',
          planName: 'Repositionnement Stratégique'
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
      <div className="fixed top-0 left-0 w-full bg-purple-600 text-white py-2 z-50 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-widest">
          <FaBolt className="animate-pulse" />
          <span>Accès privilège -70% : Offre de lancement strictement limitée</span>
          <span className="hidden md:inline">|</span>
          <span className="bg-black/20 px-2 py-0.5 rounded">Expire dans : {timeLeft}</span>
        </div>
      </div>

      {/* Hero / Sales Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold border border-purple-500/20 mb-6 uppercase tracking-widest"
          >
            📢 SEULEMENT 4 PLACES DISPONIBLES CE MOIS
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Repositionnement <span className="text-purple-500">Stratégique</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Passez de "candidat qui cherche" à "expert que l'on s'arrache". Un plan d'action concret pour doubler vos opportunités.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 mt-12">
          {/* Benefits Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
                <FaChartLine className="text-purple-500 text-3xl mb-4" />
                <h4 className="font-bold text-lg mb-2">Clarté Directionnelle</h4>
                <p className="text-sm text-gray-400">Identifiez votre niche de haute valeur sur le marché.</p>
              </div>
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
                <FaTrophy className="text-purple-500 text-3xl mb-4" />
                <h4 className="font-bold text-lg mb-2">Storytelling Impactant</h4>
                <p className="text-sm text-gray-400">Apprenez à raconter vos succès pour convaincre les décideurs.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-purple-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-purple-500/10 p-4 rotate-12 translate-x-4 -translate-y-4">
                  <FaStar className="text-purple-500/20 text-6xl" />
               </div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaCheckCircle className="text-purple-500 mr-3" /> Inclus dans votre accompagnement :
              </h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  "Audit approfondi de votre trajectoire",
                  "Plan d'action concret sur 30 jours",
                  "Rédaction de votre 'Pitch' de vente",
                  "Optimisation LinkedIn Avancée",
                  "Méthode de réseautage stratégique",
                  "Support prioritaire par email"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <FaStar className="text-purple-500/50 text-xs mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Checkout Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl sticky top-32 border-4 border-purple-500/10">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                <div>
                  <h3 className="text-2xl font-bold">Investissement</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Offre de lancement</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-purple-600">75 000</span>
                  <span className="text-xs font-bold text-gray-600 ml-1">FCFA</span>
                  <div className="text-xs text-gray-400 line-through">250 000 FCFA</div>
                </div>
              </div>
              
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Votre Identité</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Prénom et Nom"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Adresse Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="email@domaine.com"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'redirecting'}
                  className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl text-lg transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center mt-6"
                >
                  {status === 'redirecting' ? 'Validation...' : 'Saisir mon accès privilège'}
                  <FaArrowRight className="ml-3" />
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-2">
                <div className="flex items-center text-gray-400">
                    <FaShieldAlt className="mr-2" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Paiement 100% sécurisé via FedaPay</span>
                </div>
                <p className="text-[9px] text-gray-300 text-center italic">Cette réduction de 175 000 FCFA est appliquée uniquement pendant la phase de lancement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
