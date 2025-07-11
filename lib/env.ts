// Validation et configuration des variables d'environnement

export const env = {
  // Resend API Key (obligatoire en production)
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  // URL du site (pour les liens dans les emails)
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Configuration email (optionnel)
  EMAIL_FROM: process.env.EMAIL_FROM || "contact@constructpro.fr",
  EMAIL_TO: process.env.EMAIL_TO || "contact@constructpro.fr",

  // Environnement
  NODE_ENV: process.env.NODE_ENV || "development",

  // Vérification de la configuration
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
}

// Validation des variables obligatoires en production
export function validateEnv() {
  if (env.isProduction && !env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY est obligatoire en production")
  }
}

// Fonction pour vérifier si l'email est configuré
export function isEmailConfigured(): boolean {
  return !!env.RESEND_API_KEY
}
