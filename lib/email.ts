import { Resend } from "resend"

// Initialisation de Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY)

// Configuration des emails
export const EMAIL_CONFIG = {
  from: "ConstructPro <contact@constructpro.fr>", // Remplacez par votre domaine vérifié
  to: ["contact@constructpro.fr"], // Email(s) de réception
  replyTo: "contact@constructpro.fr",
}

// Interface pour les données de contact
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  budget?: string
  message: string
}

// Interface pour les données de candidature
export interface CareerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  experience?: string
  message: string
  cvFileName?: string
}

// Template HTML pour l'email de contact
export function createContactEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle demande de devis - ConstructPro</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #1e3a8a, #1e40af);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f8fafc;
          padding: 30px 20px;
          border-radius: 0 0 8px 8px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }
        .info-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
        }
        .info-label {
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 5px;
        }
        .message-box {
          background: white;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 4px solid #10b981;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏗️ Nouvelle Demande de Devis</h1>
        <p>Une nouvelle demande a été reçue sur le site ConstructPro</p>
      </div>
      
      <div class="content">
        <h2>Informations du Client</h2>
        
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">👤 Nom Complet</div>
            <div>${data.firstName} ${data.lastName}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">📧 Email</div>
            <div><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="info-item">
            <div class="info-label">📞 Téléphone</div>
            <div><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          
          <div class="info-item">
            <div class="info-label">🏗️ Type de Projet</div>
            <div>${getProjectTypeLabel(data.projectType)}</div>
          </div>
        </div>
        
        ${
          data.budget
            ? `
          <div class="info-item" style="margin: 20px 0;">
            <div class="info-label">💰 Budget Estimé</div>
            <div>${getBudgetLabel(data.budget)}</div>
          </div>
        `
            : ""
        }
        
        <div class="message-box">
          <div class="info-label">💬 Message du Client</div>
          <div style="white-space: pre-wrap;">${data.message}</div>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <strong>⏰ Action Requise :</strong> Répondre au client dans les 24h pour maintenir notre engagement qualité.
        </div>
      </div>
      
      <div class="footer">
        <p>Email envoyé automatiquement depuis le site web ConstructPro</p>
        <p>Date : ${new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
      </div>
    </body>
    </html>
  `
}

// Template HTML pour l'email de candidature
export function createCareerEmailTemplate(data: CareerFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle candidature - ConstructPro</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f0fdf4;
          padding: 30px 20px;
          border-radius: 0 0 8px 8px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }
        .info-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #10b981;
        }
        .info-label {
          font-weight: bold;
          color: #059669;
          margin-bottom: 5px;
        }
        .message-box {
          background: white;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 4px solid #3b82f6;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>👔 Nouvelle Candidature</h1>
        <p>Une nouvelle candidature a été reçue sur le site ConstructPro</p>
      </div>
      
      <div class="content">
        <h2>Informations du Candidat</h2>
        
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">👤 Nom Complet</div>
            <div>${data.firstName} ${data.lastName}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">📧 Email</div>
            <div><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="info-item">
            <div class="info-label">📞 Téléphone</div>
            <div><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          
          <div class="info-item">
            <div class="info-label">💼 Poste Visé</div>
            <div>${data.position}</div>
          </div>
        </div>
        
        ${
          data.experience
            ? `
          <div class="info-item" style="margin: 20px 0;">
            <div class="info-label">⭐ Expérience</div>
            <div>${data.experience}</div>
          </div>
        `
            : ""
        }
        
        ${
          data.cvFileName
            ? `
          <div class="info-item" style="margin: 20px 0;">
            <div class="info-label">📄 CV Joint</div>
            <div>${data.cvFileName}</div>
          </div>
        `
            : ""
        }
        
        <div class="message-box">
          <div class="info-label">💬 Message du Candidat</div>
          <div style="white-space: pre-wrap;">${data.message}</div>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <strong>📋 Prochaines Étapes :</strong> Examiner la candidature et programmer un entretien si le profil correspond.
        </div>
      </div>
      
      <div class="footer">
        <p>Email envoyé automatiquement depuis le site web ConstructPro</p>
        <p>Date : ${new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
      </div>
    </body>
    </body>
    </html>
  `
}

// Template pour l'email de confirmation au client
export function createClientConfirmationTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de votre demande - ConstructPro</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #1e3a8a, #1e40af);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f8fafc;
          padding: 30px 20px;
          border-radius: 0 0 8px 8px;
        }
        .highlight-box {
          background: #dbeafe;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 4px solid #3b82f6;
        }
        .contact-info {
          background: white;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏗️ ConstructPro</h1>
        <p>Merci pour votre demande de devis !</p>
      </div>
      
      <div class="content">
        <h2>Bonjour ${data.firstName},</h2>
        
        <p>Nous avons bien reçu votre demande de devis pour votre projet de <strong>${getProjectTypeLabel(data.projectType)}</strong>.</p>
        
        <div class="highlight-box">
          <h3>✅ Votre demande a été transmise</h3>
          <p>Notre équipe d'experts va étudier votre projet et vous recontacter dans les <strong>24 heures</strong> pour :</p>
          <ul>
            <li>Discuter de vos besoins spécifiques</li>
            <li>Programmer une visite si nécessaire</li>
            <li>Vous proposer un devis personnalisé</li>
          </ul>
        </div>
        
        <div class="contact-info">
          <h3>📞 Besoin de nous joindre rapidement ?</h3>
          <p><strong>Téléphone :</strong> <a href="tel:+33478000000">04 78 XX XX XX</a></p>
          <p><strong>Email :</strong> <a href="mailto:contact@constructpro.fr">contact@constructpro.fr</a></p>
          <p><strong>Adresse :</strong> 123 Rue de la Construction, 69000 Lyon</p>
        </div>
        
        <p>En attendant, n'hésitez pas à consulter nos <a href="https://constructpro.fr/portfolio">réalisations récentes</a> pour découvrir notre savoir-faire.</p>
        
        <p>Cordialement,<br>
        <strong>L'équipe ConstructPro</strong></p>
      </div>
      
      <div class="footer">
        <p>ConstructPro - Votre partenaire construction depuis 25 ans</p>
        <p>🌐 <a href="https://constructpro.fr">www.constructpro.fr</a></p>
      </div>
    </body>
    </html>
  `
}

// Fonctions utilitaires pour les labels
function getProjectTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "construction-neuve": "Construction Neuve",
    renovation: "Rénovation",
    extension: "Extension",
    architecture: "Architecture",
    "travaux-publics": "Travaux Publics",
    autre: "Autre",
  }
  return labels[type] || type
}

function getBudgetLabel(budget: string): string {
  const labels: Record<string, string> = {
    "moins-50k": "Moins de 50 000€",
    "50k-100k": "50 000€ - 100 000€",
    "100k-200k": "100 000€ - 200 000€",
    "200k-500k": "200 000€ - 500 000€",
    "plus-500k": "Plus de 500 000€",
  }
  return labels[budget] || budget
}

// Fonction principale pour envoyer l'email de contact
export async function sendContactEmail(data: ContactFormData) {
  try {
    // Email pour l'équipe ConstructPro
    const teamEmailResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      replyTo: data.email,
      subject: `🏗️ Nouvelle demande de devis - ${data.firstName} ${data.lastName}`,
      html: createContactEmailTemplate(data),
    })

    // Email de confirmation pour le client
    const clientEmailResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [data.email],
      replyTo: EMAIL_CONFIG.replyTo,
      subject: "Confirmation de votre demande de devis - ConstructPro",
      html: createClientConfirmationTemplate(data),
    })

    return {
      success: true,
      teamEmailId: teamEmailResult.data?.id,
      clientEmailId: clientEmailResult.data?.id,
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails:", error)
    throw error
  }
}

// Fonction pour envoyer l'email de candidature
export async function sendCareerEmail(data: CareerFormData) {
  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      replyTo: data.email,
      subject: `👔 Nouvelle candidature - ${data.position} - ${data.firstName} ${data.lastName}`,
      html: createCareerEmailTemplate(data),
    })

    return {
      success: true,
      emailId: result.data?.id,
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de candidature:", error)
    throw error
  }
}

export { resend }
