"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { crmService } from "@/lib/crm/crm-service"
import { Chatbot } from "./chatbot"

export function CRMIntegratedChatbot() {
  const { currentLanguage } = useLanguage()
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  // Fonction pour créer un lead dans le CRM après soumission du formulaire
  const handleQuoteSubmission = async (userInfo: any) => {
    try {
      const result = await crmService.createLeadFromChatbot({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        projectType: userInfo.projectType,
        budget: userInfo.budget,
        message: userInfo.message,
        language: currentLanguage,
        source: "chatbot",
      })

      console.log("Lead créé dans le CRM:", result)

      // Tracker l'interaction
      await crmService.trackChatbotInteraction({
        sessionId,
        action: "lead_created",
        data: {
          contactId: result.contact.id,
          leadId: result.lead.id,
          projectType: userInfo.projectType,
          estimatedValue: result.lead.estimatedValue,
        },
        language: currentLanguage,
      })

      return result
    } catch (error) {
      console.error("Erreur lors de la création du lead CRM:", error)
      throw error
    }
  }

  // Fonction pour tracker les interactions
  const trackInteraction = async (action: string, data: any = {}) => {
    try {
      await crmService.trackChatbotInteraction({
        sessionId,
        action,
        data: { ...data, language: currentLanguage },
        language: currentLanguage,
      })
    } catch (error) {
      console.error("Erreur tracking CRM:", error)
    }
  }

  return <Chatbot onQuoteSubmission={handleQuoteSubmission} onInteraction={trackInteraction} sessionId={sessionId} />
}
