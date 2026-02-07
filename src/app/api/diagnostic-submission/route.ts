import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { fullName, email, linkedin, experienceYears, currentSalary, currentSituation, careerGoals } = formData;

    // Validate incoming data (basic validation)
    if (!fullName || !email || !experienceYears || !currentSalary || !currentSituation || !careerGoals) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Configure Nodemailer transporter
    // IMPORTANT: Replace with your actual SMTP credentials (e.g., from Gmail, SendGrid, etc.)
    // For production, use environment variables for security.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER, // Your sender email
      to: 'application@revocareer.com', // Recipient email as requested
      subject: `Nouvelle Candidature Project Manager Canada Track de ${fullName}`,
      html: `
        <h1>Nouvelle Candidature</h1>
        <p><strong>Nom Complet:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Profil LinkedIn:</strong> ${linkedin || 'Non fourni'}</p>
        <p><strong>Années d'Expérience en Gestion de Projet:</strong> ${experienceYears}</p>
        <p><strong>Salaire Annuel Actuel (CAD):</strong> ${currentSalary}</p>
        <p><strong>Situation Professionnelle Actuelle:</strong></p>
        <p>${currentSituation}</p>
        <p><strong>Objectifs de Carrière au Canada:</strong></p>
        <p>${careerGoals}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Candidature envoyée avec succès!' }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l'envoi de la candidature:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur lors de l'envoi de la candidature.' }, { status: 500 });
  }
}
