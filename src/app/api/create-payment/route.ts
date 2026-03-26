import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, firstname, lastname, planName } = await request.json();

    const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY?.trim();
    
    if (!FEDAPAY_SECRET_KEY) {
      return NextResponse.json({ message: 'Clé FedaPay non configurée sur Vercel.' }, { status: 500 });
    }

    // DÉTECTION AUTOMATIQUE DU MODE (Live ou Sandbox)
    // Si la clé commence par sk_live, on utilise l'API de production
    const isLive = FEDAPAY_SECRET_KEY.startsWith('sk_live');
    const FEDAPAY_API_URL = isLive 
      ? 'https://api.fedapay.com/v1/transactions' 
      : 'https://sandbox-api.fedapay.com/v1/transactions';

    console.log(`Mode de paiement : ${isLive ? 'LIVE' : 'SANDBOX'}`);

    // Tentative avec Bearer Token (plus simple et standard)
    const authHeader = `Bearer ${FEDAPAY_SECRET_KEY}`;

    // 1. Créer la transaction
    const response = await fetch(FEDAPAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: `Paiement Offre ${planName} - Revocareer`,
        amount: amount,
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
      console.error('Erreur FedaPay:', data);
      throw new Error(data.message || 'Erreur d\'authentification ou de paramétrage FedaPay.');
    }

    const transactionId = data.v1.transaction.id;

    // 2. Générer le jeton (token) pour le paiement
    const tokenResponse = await fetch(`${FEDAPAY_API_URL}/${transactionId}/token`, {
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

    return NextResponse.json({ 
      payment_url: tokenData.v1.token.url,
      transaction_id: transactionId 
    });

  } catch (error: any) {
    console.error('FedaPay Final Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
