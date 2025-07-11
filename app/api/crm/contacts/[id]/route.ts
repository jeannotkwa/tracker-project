import { type NextRequest, NextResponse } from "next/server"
import type { CRMContact } from "@/lib/crm/types"

// Base de données simulée (même que dans route.ts)
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
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contact = contacts.find((c) => c.id === params.id)

    if (!contact) {
      return NextResponse.json({ error: "Contact non trouvé" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Erreur lors de la récupération du contact:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const contactIndex = contacts.findIndex((c) => c.id === params.id)

    if (contactIndex === -1) {
      return NextResponse.json({ error: "Contact non trouvé" }, { status: 404 })
    }

    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...updates,
      updatedAt: new Date(),
    }

    return NextResponse.json(contacts[contactIndex])
  } catch (error) {
    console.error("Erreur lors de la mise à jour du contact:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contactIndex = contacts.findIndex((c) => c.id === params.id)

    if (contactIndex === -1) {
      return NextResponse.json({ error: "Contact non trouvé" }, { status: 404 })
    }

    contacts.splice(contactIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression du contact:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
