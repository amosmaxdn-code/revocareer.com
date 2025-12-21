import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Set the SendGrid API key from environment variables
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY is not set. Email sending will be disabled.');
}

export async function POST(request: Request) {
  if (!process.env.SENDGRID_API_KEY) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.experience || !body.motivation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // The email address where you want to receive the applications
    const toEmail = "contact@revocareer.com"; 

    const content = `
      Nouvelle candidature pour le programme "Project Manager Canada Track":
      ---------------------------------------------------
      Nom: ${body.name}
      Email: ${body.email}
      Téléphone: ${body.phone || 'Non fourni'}
      Années d'expérience en gestion de projet: ${body.experience}
      ---------------------------------------------------
      Motivation:
      ${body.motivation}
      ---------------------------------------------------
    `;

    const msg = {
      to: toEmail,
      from: 'application@revocareer.com', // This should be a verified sender in your SendGrid account
      subject: `Nouvelle Candidature - ${body.name}`,
      text: content,
      html: `<pre>${content}</pre>`,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'An error occurred while submitting the application.' }, { status: 500 });
  }
}
