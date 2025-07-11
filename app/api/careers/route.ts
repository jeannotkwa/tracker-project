import { type NextRequest, NextResponse } from "next/server"
import { sendCareerEmail, type CareerFormData } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const experience = formData.get("experience") as string
    const message = formData.get("message") as string
    const cv = formData.get("cv") as File | null

    // Validation des données
    if (!firstName || !lastName || !email || !phone || !position || !message) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format d'email invalide" }, { status: 400 })
    }

    // Validation du téléphone
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Format de téléphone invalide" }, { status: 400 })
    }

    // Validation du CV (optionnel mais recommandé)
    if (cv) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(cv.type)) {
        return NextResponse.json({ error: "Format de CV non supporté. Utilisez PDF ou Word." }, { status: 400 })
      }

      // Limite de taille : 5MB
      if (cv.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Le CV ne doit pas dépasser 5MB" }, { status: 400 })
      }
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

    // Préparation des données pour l'email
    const emailData: CareerFormData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      experience: experience?.trim() || undefined,
      message: message.trim(),
      cvFileName: cv?.name || undefined,
    }

    // Envoi de l'email via Resend
    const emailResult = await sendCareerEmail(emailData)

    // Log pour le suivi
    console.log("Candidature envoyée:", {
      candidat: `${firstName} ${lastName}`,
      email,
      position,
      cvIncluded: !!cv,
      emailId: emailResult.emailId,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message:
        "Votre candidature a été envoyée avec succès ! Nous vous recontacterons si votre profil correspond à nos besoins.",
      emailId: emailResult.emailId,
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de la candidature:", error)

    // Gestion des erreurs spécifiques
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
            error: "Trop de candidatures. Veuillez réessayer dans quelques minutes.",
          },
          { status: 429 },
        )
      }
    }

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer ou nous contacter directement.",
      },
      { status: 500 },
    )
  }
}
