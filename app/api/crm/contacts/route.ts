import { type NextRequest, NextResponse } from "next/server"
import type { CRMContact } from "@/lib/crm/types"

// Base de données simulée (en production, utilisez une vraie base de données)
const contacts: CRMContact[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com",
    phone: "06 12 34 56 78",
    company: "Entreprise ABC",
    position: "Directrice",
    source: "website",
    language: "fr",
    tags: ["VIP", "Construction"],
    notes: "Intéressée par une construction de maison individuelle",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    lastContactedAt: new Date("2024-01-20"),
    customFields: {},
    assignedTo: "user1",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+33 6 98 76 54 32",
    company: "Smith Corp",
    position: "CEO",
    source: "chatbot",
    language: "en",
    tags: ["International", "Rénovation"],
    notes: "Projet de rénovation d'un bâtiment commercial",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    customFields: {},
    assignedTo: "user2",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const source = searchParams.get("source") || ""
    const assignedTo = searchParams.get("assignedTo") || ""

    let filteredContacts = contacts

    // Filtrage par recherche
    if (search) {
      filteredContacts = filteredContacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase()) ||
          (contact.company && contact.company.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Filtrage par source
    if (source) {
      filteredContacts = filteredContacts.filter((contact) => contact.source === source)
    }

    // Filtrage par assignation
    if (assignedTo) {
      filteredContacts = filteredContacts.filter((contact) => contact.assignedTo === assignedTo)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex)

    return NextResponse.json({
      contacts: paginatedContacts,
      total: filteredContacts.length,
      page,
      limit,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json()

    const newContact: CRMContact = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedTo: contactData.assignedTo || "defaultUser",
    }

    contacts.push(newContact)

    return NextResponse.json(newContact, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du contact:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
