import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experience, certificationStatus, budget, email, phone } = body;

    // Validation simple pour s'assurer que les champs sont présents
    if (!experience || !certificationStatus || !budget || !email || !phone) {
      return NextResponse.json({ message: 'Tous les champs sont obligatoires.' }, { status: 400 });
    }

    // Configure Nodemailer transporter (consistent with diagnostic-submission)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.RECIPIENT_EMAIL || 'application@revocareer.com';

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipient,
      subject: `Nouveau Diagnostic Reçu - ${email}`,
      html: `
        <h1>Nouveau Diagnostic de Compatibilité</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Années d'Expérience:</strong> ${experience}</p>
        <p><strong>Certification actuelle:</strong> ${certificationStatus}</p>
        <p><strong>Budget prévu:</strong> ${budget}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Données reçues et email envoyé avec succès' }, { status: 200 });

  } catch (error) {
    console.error('Erreur API Diagnostic:', error);
    return NextResponse.json({ message: 'Erreur Interne du Serveur' }, { status: 500 });
  }
}
