import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, firstname, lastname, planName } = await request.json();

    const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;
    const FEDAPAY_API_URL = process.env.NODE_ENV === 'production' 
      ? 'https://api.fedapay.com/v1/transactions' 
      : 'https://sandbox-api.fedapay.com/v1/transactions';

    if (!FEDAPAY_SECRET_KEY) {
      return NextResponse.json({ message: 'Clé FedaPay non configurée' }, { status: 500 });
    }

    // 1. Créer la transaction
    const response = await fetch(FEDAPAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET_KEY}`,
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
      throw new Error(data.message || 'Erreur lors de la création de la transaction FedaPay');
    }

    // 2. Générer le jeton (token) pour le paiement sécurisé
    const tokenResponse = await fetch(`${FEDAPAY_API_URL}/${data.v1.transaction.id}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const tokenData = await tokenResponse.json();

    return NextResponse.json({ 
      payment_url: tokenData.v1.token.url,
      transaction_id: data.v1.transaction.id 
    });

  } catch (error: any) {
    console.error('FedaPay Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
