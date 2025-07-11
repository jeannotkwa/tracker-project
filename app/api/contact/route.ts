import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail, type ContactFormData } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, projectType, budget, message } = body

    // Validation des données
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format d'email invalide" }, { status: 400 })
    }

    // Validation du téléphone (format français basique)
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Format de téléphone invalide" }, { status: 400 })
    }

    // Préparation des données pour l'email
    const emailData: ContactFormData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      projectType: projectType || "autre",
      budget: budget || undefined,
      message: message.trim(),
    }

    // Vérification de la clé API Resend
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY non configurée")
      return NextResponse.json(
        {
          error: "Service d'email temporairement indisponible",
        },
        { status: 500 },
      )
    }

    // Envoi des emails via Resend
    const emailResult = await sendContactEmail(emailData)

    // Log pour le suivi (en production, utilisez un service de logging)
    console.log("Demande de devis envoyée:", {
      client: `${firstName} ${lastName}`,
      email,
      projectType,
      teamEmailId: emailResult.teamEmailId,
      clientEmailId: emailResult.clientEmailId,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès ! Nous vous recontacterons dans les 24h.",
      emailIds: {
        team: emailResult.teamEmailId,
        client: emailResult.clientEmailId,
      },
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de la demande:", error)

    // Gestion des erreurs spécifiques de Resend
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          {
            error: "Configuration email incorrecte",
          },
          { status: 500 },
        )
      }

      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          {
            error: "Trop de demandes. Veuillez réessayer dans quelques minutes.",
          },
          { status: 429 },
        )
      }
    }

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ou nous contacter directement.",
      },
      { status: 500 },
    )
  }
}
