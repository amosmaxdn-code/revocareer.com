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

    // Basic validation for the new form
    if (!body.q1_nom || !body.q2_pays || !body.q3_age || !body.q5_experience) {
      return NextResponse.json({ error: 'Missing required identity or experience fields' }, { status: 400 });
    }
    
    // The email address where you want to receive the applications
    const toEmail = "contact@revocareer.com"; 

    const content = `
      <h1>Nouvelle candidature pour le programme "Project Manager Canada Track"</h1>
      <p><strong>Nom:</strong> ${body.q1_nom}</p>
      <p><strong>Email:</strong> ${body.q9_objectif.includes('@') ? 'Potential Email in wrong field' : body.email}</p>
      
      <h2>Section 1 — Identité & Situation Actuelle</h2>
      <ul>
        <li><strong>Nom et prénom:</strong> ${body.q1_nom}</li>
        <li><strong>Pays de résidence actuel:</strong> ${body.q2_pays}</li>
        <li><strong>Âge:</strong> ${body.q3_age}</li>
        <li><strong>Statut actuel:</strong> ${body.q4_statut} ${body.q4_autre ? `(${body.q4_autre})` : ''}</li>
      </ul>
      
      <h2>Section 2 — Expérience en Gestion de Projet</h2>
      <ul>
        <li><strong>Années d’expérience:</strong> ${body.q5_experience}</li>
        <li><strong>Contextes:</strong> ${body.q6_contextes.join(', ')} ${body.q6_autre ? `(${body.q6_autre})` : ''}</li>
        <li><strong>Description d'un projet:</strong><br/><pre>${body.q7_projet}</pre></li>
      </ul>

      <h2>Section 3 — Objectif Canada</h2>
      <ul>
        <li><strong>Pourquoi le Canada:</strong><br/><pre>${body.q8_pourquoi_canada}</pre></li>
        <li><strong>Objectif principal:</strong> ${body.q9_objectif} ${body.q9_autre ? `(${body.q9_autre})` : ''}</li>
        <li><strong>Horizon de temps:</strong> ${body.q10_horizon}</li>
      </ul>
      
      <h2>Section 4 — Certifications & Compétences</h2>
      <ul>
        <li><strong>Certifications actuelles:</strong> ${body.q11_certifications.join(', ')} ${body.q11_autre ? `(${body.q11_autre})` : ''}</li>
        <li><strong>Choix de certification future et pourquoi:</strong><br/><pre>${body.q12_choix_certif}</pre></li>
      </ul>

      <h2>Section 5 — Engagement & Maturité</h2>
      <ul>
        <li><strong>Blocage actuel:</strong><br/><pre>${body.q13_blocage}</pre></li>
        <li><strong>A déjà investi financièrement:</strong> ${body.q14_investissement_passe}</li>
        <li><strong>Prêt à s’engager pleinement:</strong> ${body.q15_engagement}</li>
      </ul>

      <h2>Section 6 — Responsabilité Personnelle</h2>
      <ul>
        <li><strong>Prise de responsabilité personnelle:</strong><br/><pre>${body.q16_responsabilite}</pre></li>
      </ul>

      <h2>Section 7 — Validation Finale</h2>
      <ul>
        <li><strong>Pourquoi êtes-vous un bon candidat:</strong><br/><pre>${body.q17_bon_candidat}</pre></li>
        <li><strong>Accepte la possibilité de refus:</strong> ${body.q18_acceptation_refus}</li>
      </ul>
    `;

    const msg = {
      to: toEmail,
      from: 'application@revocareer.com', // This should be a verified sender in your SendGrid account
      subject: `Nouvelle Candidature (Revocareer) - ${body.q1_nom}`,
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
