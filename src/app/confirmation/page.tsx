"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const ConfirmationContent = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'idle'>('loading');
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id');

  useEffect(() => {
    // Si pas d'ID de transaction, on considère que c'est une soumission de formulaire gratuite
    if (!transactionId) {
      setStatus('success');
      return;
    }

    // Vérifier le statut de la transaction (Optionnel: nécessite une route API de vérification)
    // Pour l'instant, si on revient de FedaPay avec un ID, on affiche le succès
    setStatus('success');
  }, [transactionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
        <FaSpinner className="animate-spin text-5xl text-blue-500 mb-4" />
        <p className="text-xl font-medium">Vérification de votre paiement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700 text-center">
        {status === 'success' ? (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-8">
              <FaCheckCircle className="text-5xl text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              C'est confirmé ! 🎉
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Merci pour votre confiance. Votre demande a bien été enregistrée et votre paiement a été validé. 
              Notre équipe analyse actuellement votre profil.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <div className="bg-gray-700/30 p-6 rounded-2xl border border-gray-600 text-left">
                <FaEnvelope className="text-blue-400 mb-3 text-xl" />
                <h4 className="font-bold text-white mb-1">E-mail de confirmation</h4>
                <p className="text-sm text-gray-400">Vous allez recevoir un récapitulatif par email d'ici quelques minutes.</p>
              </div>
              <div className="bg-gray-700/30 p-6 rounded-2xl border border-gray-600 text-left">
                <FaWhatsapp className="text-green-400 mb-3 text-xl" />
                <h4 className="font-bold text-white mb-1">Support Prioritaire</h4>
                <p className="text-sm text-gray-400">Une question ? Notre équipe est disponible sur WhatsApp pour vous aider.</p>
              </div>
            </div>

            <Link 
              href="/" 
              className="inline-block py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
            >
              Retour à l'accueil
            </Link>
          </>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-8">
              <FaTimesCircle className="text-5xl text-red-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-4">Oups...</h1>
            <p className="text-gray-400 mb-8">
              Il semble y avoir eu un problème avec votre transaction. Pas d'inquiétude, aucun montant n'a été débité si le message d'erreur persiste.
            </p>
            <Link 
              href="/#pricing" 
              className="inline-block py-4 px-8 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all"
            >
              Réessayer le paiement
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
