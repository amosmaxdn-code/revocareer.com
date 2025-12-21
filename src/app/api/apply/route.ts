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

    // Basic validation with new human-readable field names
    if (!body.fullName || !body.country || !body.age || !body.experience) {
      return NextResponse.json({ error: 'Missing required identity or experience fields' }, { status: 400 });
    }
    
    // The email address where you want to receive the applications
    const toEmail = "contact@revocareer.com"; 

    const content = `
      <h1>Nouvelle candidature pour le programme "Project Manager Canada Track"</h1>
      <p><strong>Nom:</strong> ${body.fullName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      
      <h2>Section 1 — Identité & Situation Actuelle</h2>
      <ul>
        <li><strong>Nom et prénom:</strong> ${body.fullName}</li>
        <li><strong>Pays de résidence actuel:</strong> ${body.country}</li>
        <li><strong>Âge:</strong> ${body.age}</li>
        <li><strong>Statut actuel:</strong> ${body.status} ${body.statusOther ? `(${body.statusOther})` : ''}</li>
      </ul>
      
      <h2>Section 2 — Expérience en Gestion de Projet</h2>
      <ul>
        <li><strong>Années d’expérience:</strong> ${body.experience}</li>
        <li><strong>Contextes:</strong> ${(body.contexts || []).join(', ')} ${body.contextsOther ? `(${body.contextsOther})` : ''}</li>
        <li><strong>Description d'un projet:</strong><br/><pre>${body.projectDescription}</pre></li>
      </ul>

      <h2>Section 3 — Objectif Canada</h2>
      <ul>
        <li><strong>Pourquoi le Canada:</strong><br/><pre>${body.whyCanada}</pre></li>
        <li><strong>Objectif principal:</strong> ${body.objective} ${body.objectiveOther ? `(${body.objectiveOther})` : ''}</li>
        <li><strong>Horizon de temps:</strong> ${body.timeline}</li>
      </ul>
      
      <h2>Section 4 — Certifications & Compétences</h2>
      <ul>
        <li><strong>Certifications actuelles:</strong> ${(body.certifications || []).join(', ')} ${body.certificationsOther ? `(${body.certificationsOther})` : ''}</li>
        <li><strong>Choix de certification future et pourquoi:</strong><br/><pre>${body.certChoice}</pre></li>
      </ul>

      <h2>Section 5 — Engagement & Maturité</h2>
      <ul>
        <li><strong>Blocage actuel:</strong><br/><pre>${body.blocker}</pre></li>
        <li><strong>A déjà investi financièrement:</strong> ${body.pastInvestment}</li>
        <li><strong>Prêt à s’engager pleinement:</strong> ${body.commitment}</li>
      </ul>

      <h2>Section 6 — Responsabilité Personnelle</h2>
      <ul>
        <li><strong>Prise de responsabilité personnelle:</strong><br/><pre>${body.responsibility}</pre></li>
      </ul>

      <h2>Section 7 — Validation Finale</h2>
      <ul>
        <li><strong>Pourquoi êtes-vous un bon candidat:</strong><br/><pre>${body.goodCandidate}</pre></li>
        <li><strong>Accepte la possibilité de refus:</strong> ${body.acceptsRefusal}</li>
      </ul>
    `;

    const msg = {
      to: toEmail,
      from: 'application@revocareer.com', // This should be a verified sender in your SendGrid account
      subject: `Nouvelle Candidature (Revocareer) - ${body.fullName}`,
      text: content.replace(/<[^>]*>/g, ''), // Simple text version
      html: content,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 200 });

  } catch (error: any) {
    console.error('Error submitting application:', error.response?.body || error.message);
    return NextResponse.json({ error: 'An error occurred while submitting the application.' }, { status: 500 });
  }
}
