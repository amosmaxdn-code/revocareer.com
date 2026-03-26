import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, firstname, lastname, planName } = await request.json();

    const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;
    const FEDAPAY_API_URL = process.env.NODE_ENV === 'production' 
      ? 'https://api.fedapay.com/v1/transactions' 
      : 'https://sandbox-api.fedapay.com/v1/transactions';

    if (!FEDAPAY_SECRET_KEY) {
      console.error("ERREUR: FEDAPAY_SECRET_KEY est manquante dans les variables d'environnement.");
      return NextResponse.json({ message: 'Clé FedaPay non configurée sur le serveur.' }, { status: 500 });
    }

    // FedaPay utilise l'authentification Basic: base64(api:clé_secrète)
    const authHeader = `Basic ${Buffer.from(`${FEDAPAY_SECRET_KEY}:`).toString('base64')}`;

    console.log(`Tentative de création de transaction pour ${email} (${amount} XOF)`);

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
      console.error('Erreur API FedaPay (Transaction):', data);
      throw new Error(data.message || 'Erreur lors de la création de la transaction chez FedaPay.');
    }

    const transactionId = data.v1.transaction.id;

    // 2. Générer le jeton (token) pour le paiement sécurisé
    const tokenResponse = await fetch(`${FEDAPAY_API_URL}/${transactionId}/token`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Erreur API FedaPay (Token):', tokenData);
      throw new Error(tokenData.message || 'Erreur lors de la génération du lien de paiement.');
    }

    return NextResponse.json({ 
      payment_url: tokenData.v1.token.url,
      transaction_id: transactionId 
    });

  } catch (error: any) {
    console.error('FedaPay Route Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
