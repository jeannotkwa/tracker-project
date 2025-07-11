import { type NextRequest, NextResponse } from "next/server"
import type { CRMLead } from "@/lib/crm/types"

// Base de données simulée pour les prospects
const leads: CRMLead[] = [
  {
    id: "1",
    contactId: "1",
    title: "Construction Maison Individuelle",
    description: "Projet de construction d'une maison de 150m² avec jardin",
    projectType: "construction",
    budget: "200k-500k",
    estimatedValue: 350000,
    status: "qualified",
    priority: "high",
    source: "website",
    assignedTo: "agent1",
    expectedCloseDate: new Date("2024-06-01"),
    tags: ["Maison", "Jardin"],
    notes: "Client très motivé, budget confirmé",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    activities: [],
  },
  {
    id: "2",
    contactId: "2",
    title: "Rénovation Bâtiment Commercial",
    description: "Rénovation complète d'un bâtiment de bureaux de 800m²",
    projectType: "renovation",
    budget: "plus-500k",
    estimatedValue: 750000,
    status: "proposal",
    priority: "medium",
    source: "chatbot",
    assignedTo: "agent2",
    expectedCloseDate: new Date("2024-08-15"),
    tags: ["Commercial", "Bureaux"],
    notes: "Devis en cours de préparation",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    activities: [],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status") || ""
    const assignedTo = searchParams.get("assignedTo") || ""
    const projectType = searchParams.get("projectType") || ""
    const contactId = searchParams.get("contactId") || ""

    let filteredLeads = leads

    // Filtrage par statut
    if (status) {
      filteredLeads = filteredLeads.filter((lead) => lead.status === status)
    }

    // Filtrage par assignation
    if (assignedTo) {
      filteredLeads = filteredLeads.filter((lead) => lead.assignedTo === assignedTo)
    }

    // Filtrage par type de projet
    if (projectType) {
      filteredLeads = filteredLeads.filter((lead) => lead.projectType === projectType)
    }

    // Filtrage par contact
    if (contactId) {
      filteredLeads = filteredLeads.filter((lead) => lead.contactId === contactId)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

    return NextResponse.json({
      leads: paginatedLeads,
      total: filteredLeads.length,
      page,
      limit,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des prospects:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    const newLead: CRMLead = {
      id: Date.now().toString(),
      ...leadData,
      activities: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    leads.push(newLead)

    return NextResponse.json(newLead, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du prospect:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
