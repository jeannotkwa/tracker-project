import { type NextRequest, NextResponse } from "next/server"
import type { CRMContact, CRMLead } from "@/lib/crm/types"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, projectType, budget, message, language, source } = data

    // Créer le contact
    const [firstName, ...lastNameParts] = name.split(" ")
    const lastName = lastNameParts.join(" ") || ""

    const newContact: CRMContact = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      source: source || "chatbot",
      language: language || "fr",
      tags: ["Chatbot", projectType],
      notes: `Contact créé via chatbot. Message: ${message}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      customFields: {},
    }

    // Créer le prospect associé
    const newLead: CRMLead = {
      id: (Date.now() + 1).toString(),
      contactId: newContact.id,
      title: `Projet ${projectType} - ${firstName} ${lastName}`,
      description: message,
      projectType: projectType as any,
      budget,
      estimatedValue: getBudgetValue(budget),
      status: "new",
      priority: "medium",
      source: source || "chatbot",
      tags: ["Chatbot", projectType],
      notes: `Prospect créé via chatbot`,
      createdAt: new Date(),
      updatedAt: new Date(),
      activities: [],
    }

    // En production, sauvegarder en base de données
    console.log("Nouveau contact CRM:", newContact)
    console.log("Nouveau prospect CRM:", newLead)

    return NextResponse.json(
      {
        contact: newContact,
        lead: newLead,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur lors de la création du lead chatbot:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

function getBudgetValue(budget?: string): number {
  const budgetMap: Record<string, number> = {
    "moins-50k": 35000,
    "50k-100k": 75000,
    "100k-200k": 150000,
    "200k-500k": 350000,
    "plus-500k": 750000,
  }
  return budgetMap[budget || ""] || 100000
}
