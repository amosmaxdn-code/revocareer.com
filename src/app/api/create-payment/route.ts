import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, firstname, lastname, planName } = await request.json();

    const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY?.trim();
    
    if (!FEDAPAY_SECRET_KEY) {
      return NextResponse.json({ message: 'Clé FedaPay non configurée.' }, { status: 500 });
    }

    const isLive = FEDAPAY_SECRET_KEY.startsWith('sk_live');
    const BASE_URL = isLive ? 'https://api.fedapay.com/v1' : 'https://sandbox-api.fedapay.com/v1';

    const authHeader = `Bearer ${FEDAPAY_SECRET_KEY}`;

    // 1. Créer la transaction
    const response = await fetch(`${BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: `Paiement Offre ${planName} - Revocareer`,
        amount: Math.round(amount), // S'assurer que c'est un entier
        currency: { iso: 'XOF' },
        customer: {
          firstname: firstname || 'Client',
          lastname: lastname || 'Revocareer',
          email: email,
        },
        callback_url: `${process.env.NEXT_PUBLIC_URL || 'https://revocareer.com'}/confirmation`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('FedaPay API Error Response:', data);
      throw new Error(data.message || 'Erreur lors de la création de la transaction.');
    }

    // RÉCUPÉRATION SÉCURISÉE DE L'ID DE TRANSACTION
    // On cherche l'ID dans data.v1.transaction ou directement dans data.transaction
    const transaction = data.v1?.transaction || data.transaction;
    
    if (!transaction || !transaction.id) {
      console.error('Structure de réponse FedaPay inconnue:', data);
      throw new Error('La réponse de FedaPay ne contient pas d\'identifiant de transaction.');
    }

    const transactionId = transaction.id;

    // 2. Générer le jeton (token) pour le paiement
    const tokenResponse = await fetch(`${BASE_URL}/transactions/${transactionId}/token`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.message || 'Erreur lors de la génération du lien de paiement.');
    }

    // Récupération sécurisée de l'URL du token
    const tokenUrl = tokenData.v1?.token?.url || tokenData.token?.url;

    if (!tokenUrl) {
      throw new Error('URL de paiement non trouvée dans la réponse de FedaPay.');
    }

    return NextResponse.json({ 
      payment_url: tokenUrl,
      transaction_id: transactionId 
    });

  } catch (error: any) {
    console.error('Detailed FedaPay Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
