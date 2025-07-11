import { NextResponse } from "next/server"

// En production, ces données viendraient d'une vraie base de données
const mockStats = {
  totalConversations: 156,
  activeConversations: 3,
  averageResponseTime: 2.3,
  satisfactionRate: 94,
  topQuestions: [
    "Demander un devis",
    "Voir les services",
    "Questions sur les délais",
    "Informations de contact",
    "Portfolio de réalisations",
  ],
  dailyMessages: 47,
  weeklyTrend: [
    { day: "Lun", messages: 23 },
    { day: "Mar", messages: 31 },
    { day: "Mer", messages: 28 },
    { day: "Jeu", messages: 35 },
    { day: "Ven", messages: 42 },
    { day: "Sam", messages: 18 },
    { day: "Dim", messages: 12 },
  ],
}

export async function GET() {
  try {
    // Ici vous pourriez récupérer les vraies statistiques depuis votre base de données
    return NextResponse.json({
      success: true,
      data: mockStats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des statistiques" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    // Ici vous pourriez enregistrer les interactions du chatbot
    console.log("Action chatbot:", action, data)

    switch (action) {
      case "conversation_started":
        // Incrémenter le compteur de conversations
        break
      case "message_sent":
        // Enregistrer le message
        break
      case "quote_requested":
        // Enregistrer la demande de devis
        break
      case "satisfaction_rating":
        // Enregistrer la note de satisfaction
        break
    }

    return NextResponse.json({
      success: true,
      message: "Statistique enregistrée",
    })
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error)
    return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 })
  }
}
