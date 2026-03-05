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

    // Configuration SMTP forcée pour le port 465 (SSL)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail82.lwspanel.com',
      port: 465,
      secure: true, // Doit être true pour le port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false // Indispensable pour certains serveurs LWS
      }
    });

    // Vérification de la configuration sur le serveur (sans logger le mot de passe)
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('CRITICAL: SMTP_USER or SMTP_PASS is not defined in environment variables.');
      return NextResponse.json({ 
        message: 'Erreur de configuration serveur.', 
        details: 'Les variables SMTP ne sont pas configurées sur Vercel.' 
      }, { status: 500 });
    }

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

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError: any) {
      console.error('Mail Sending Error Details:', mailError);
      return NextResponse.json({ 
        message: 'Erreur lors de l\'envoi de l\'email.', 
        details: mailError.message 
      }, { status: 500 });
    }

    return NextResponse.json({ message: 'Données reçues et email envoyé avec succès' }, { status: 200 });

  } catch (error: any) {
    console.error('Erreur API Diagnostic:', error);
    return NextResponse.json({ message: 'Erreur Interne du Serveur', details: error.message }, { status: 500 });
  }
}
