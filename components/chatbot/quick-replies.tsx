"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Building2, Phone, FileText, HelpCircle, Star } from "lucide-react"

interface QuickReply {
  id: string
  label: string
  icon: React.ReactNode
  action: string
}

interface QuickRepliesProps {
  onReplyClick: (reply: QuickReply) => void
}

export function QuickReplies({ onReplyClick }: QuickRepliesProps) {
  const quickReplies: QuickReply[] = [
    {
      id: "devis",
      label: "Demander un devis",
      icon: <FileText className="h-4 w-4" />,
      action: "start_quote",
    },
    {
      id: "services",
      label: "Nos services",
      icon: <Building2 className="h-4 w-4" />,
      action: "show_services",
    },
    {
      id: "portfolio",
      label: "Nos réalisations",
      icon: <Star className="h-4 w-4" />,
      action: "show_portfolio",
    },
    {
      id: "contact",
      label: "Nous contacter",
      icon: <Phone className="h-4 w-4" />,
      action: "show_contact",
    },
    {
      id: "faq",
      label: "Questions fréquentes",
      icon: <HelpCircle className="h-4 w-4" />,
      action: "show_faq",
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
      <p className="w-full text-sm text-gray-600 mb-2">Réponses rapides :</p>
      {quickReplies.map((reply) => (
        <Button
          key={reply.id}
          variant="outline"
          size="sm"
          onClick={() => onReplyClick(reply)}
          className="flex items-center space-x-1 text-xs"
        >
          {reply.icon}
          <span>{reply.label}</span>
        </Button>
      ))}
    </div>
  )
}
