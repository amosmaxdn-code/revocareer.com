import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { url, referrer } = await request.json();

    // Configure Nodemailer transporter
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
      subject: `🔔 Nouvelle Visite sur Revocareer - ${new Date().toLocaleString()}`,
      html: `
        <h1>Nouvelle Visite Détectée</h1>
        <p><strong>Heure:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Page Visitée:</strong> ${url || 'Inconnue'}</p>
        <p><strong>Source (Referrer):</strong> ${referrer || 'Directe'}</p>
      `,
    };

    // For safety, let's not let a failure in visit notification block the user experience
    // We send it asynchronously but don't strictly await it if we want maximum performance
    // However, in Next.js edge/serverless, we should await or it might be killed
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Visit notification sent' }, { status: 200 });

  } catch (error) {
    console.error('Erreur Visite Notification:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
