import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, firstname, lastname, planName } = await request.json();

    // On récupère et on nettoie la clé (suppression des espaces éventuels)
    const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY?.trim();
    
    const FEDAPAY_API_URL = process.env.NODE_ENV === 'production' 
      ? 'https://api.fedapay.com/v1/transactions' 
      : 'https://sandbox-api.fedapay.com/v1/transactions';

    if (!FEDAPAY_SECRET_KEY) {
      return NextResponse.json({ message: 'Clé FedaPay non configurée sur Vercel.' }, { status: 500 });
    }

    // Format correct pour FedaPay : Basic Auth avec "api" comme utilisateur
    // Authorization: Basic base64(api:sk_live_...)
    const authHeader = `Basic ${Buffer.from(`api:${FEDAPAY_SECRET_KEY}`).toString('base64')}`;

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
          firstname: firstname,
          lastname: lastname,
          email: email,
        },
        callback_url: `${process.env.NEXT_PUBLIC_URL || 'https://revocareer.com'}/confirmation`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Si FedaPay renvoie une erreur, on la capture précisément
      const errorMsg = data.message || (data.errors ? JSON.stringify(data.errors) : 'Erreur API FedaPay');
      throw new Error(errorMsg);
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
    // On renvoie un message clair pour l'interface
    let userMessage = error.message;
    if (userMessage.includes('Invalid API key')) userMessage = "La clé API FedaPay est invalide. Vérifiez vos réglages Vercel.";
    
    return NextResponse.json({ message: userMessage }, { status: 500 });
  }
}
