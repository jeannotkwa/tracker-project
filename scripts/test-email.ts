// Script pour tester la configuration email
// Usage: npx tsx scripts/test-email.ts

import { sendContactEmail } from "../lib/email"

async function testEmailConfiguration() {
  console.log("🧪 Test de la configuration email...\n")

  // Données de test
  const testData = {
    firstName: "Test",
    lastName: "ConstructPro",
    email: "test@example.com",
    phone: "0123456789",
    projectType: "construction-neuve",
    budget: "100k-200k",
    message: "Ceci est un email de test pour vérifier la configuration Resend.",
  }

  try {
    console.log("📧 Envoi de l'email de test...")
    const result = await sendContactEmail(testData)

    console.log("✅ Email envoyé avec succès !")
    console.log("📊 Résultat:", {
      teamEmailId: result.teamEmailId,
      clientEmailId: result.clientEmailId,
    })

    console.log("\n🎉 Configuration email opérationnelle !")
    console.log("💡 Vérifiez votre boîte email pour confirmer la réception.")
  } catch (error) {
    console.error("❌ Erreur lors du test email:")
    console.error(error)

    console.log("\n🔧 Vérifications à effectuer:")
    console.log("1. Variable RESEND_API_KEY configurée ?")
    console.log("2. Clé API valide ?")
    console.log("3. Domaine vérifié dans Resend ?")
    console.log("4. Limites de taux respectées ?")
  }
}

// Exécution du test
testEmailConfiguration()
