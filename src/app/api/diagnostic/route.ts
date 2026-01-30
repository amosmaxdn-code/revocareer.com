import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experience, certificationStatus, budget, email, phone } = body;

    // Validation simple pour s'assurer que les champs sont présents
    if (!experience || !certificationStatus || !budget || !email || !phone) {
      return NextResponse.json({ message: 'Tous les champs sont obligatoires.' }, { status: 400 });
    }

    // Pour l'instant, on log les données dans la console pour vérification.
    console.log('Données de diagnostic reçues:', body);

    // Ici, vous pourriez enregistrer les données dans une base de données,
    // envoyer un email, etc.

    return NextResponse.json({ message: 'Données reçues avec succès' }, { status: 200 });

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ message: 'Erreur Interne du Serveur' }, { status: 500 });
  }
}
