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
        amount: Math.round(amount),
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
      throw new Error(data.message || JSON.stringify(data));
    }

    // Extraction robuste de l'ID de transaction
    const transaction = data["v1/transaction"] || data.v1?.transaction || data.transaction || data;
    const transactionId = transaction?.id;

    if (!transactionId) {
      throw new Error(`ID transaction introuvable. Clés: ${Object.keys(data).join(', ')}`);
    }

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
      throw new Error(tokenData.message || 'Erreur génération lien paiement.');
    }

    // EXTRACTION ULTRA-ROBUSTE DE L'URL
    // On cherche 'url' partout où il pourrait être
    const tokenUrl = 
      tokenData.url || 
      tokenData["v1/token"]?.url || 
      tokenData.v1?.token?.url || 
      tokenData.token?.url ||
      (typeof tokenData.token === 'string' ? null : tokenData.token?.url);

    if (!tokenUrl) {
      throw new Error(`URL de paiement introuvable. Réponse: ${JSON.stringify(tokenData).substring(0, 100)}`);
    }

    return NextResponse.json({ 
      payment_url: tokenUrl,
      transaction_id: transactionId 
    });

  } catch (error: any) {
    console.error('FedaPay Error Detail:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
