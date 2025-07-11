import { type NextRequest, NextResponse } from "next/server"
import type { CRMStats } from "@/lib/crm/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "month"

    // Statistiques simulées (en production, calculées depuis la vraie base de données)
    const stats: CRMStats = {
      totalContacts: 156,
      totalLeads: 43,
      totalOpportunities: 28,
      totalValue: 2450000,
      conversionRate: 24.5,
      averageDealSize: 87500,
      salesCycle: 45,
      monthlyGrowth: 12.3,
      topSources: [
        { source: "Website", count: 45, percentage: 35 },
        { source: "Chatbot", count: 38, percentage: 30 },
        { source: "Referral", count: 25, percentage: 20 },
        { source: "Social", count: 12, percentage: 10 },
        { source: "Advertising", count: 6, percentage: 5 },
      ],
      pipelineValue: 1850000,
      wonDeals: 18,
      lostDeals: 7,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
