"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Building2, DollarSign, MessageSquare } from "lucide-react"
import type { UserInfo } from "@/components/chatbot/chatbot"

interface UserInfoSummaryProps {
  userInfo: UserInfo
  currentStep: string
}

export function UserInfoSummary({ userInfo, currentStep }: UserInfoSummaryProps) {
  const getProjectTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      "construction-neuve": "Construction Neuve",
      renovation: "Rénovation",
      extension: "Extension",
      architecture: "Architecture",
    }
    return type ? labels[type] || type : "Non spécifié"
  }

  const getBudgetLabel = (budget?: string) => {
    const labels: Record<string, string> = {
      "moins-50k": "Moins de 50 000€",
      "50k-100k": "50 000€ - 100 000€",
      "100k-200k": "100 000€ - 200 000€",
      "plus-200k": "Plus de 200 000€",
    }
    return budget ? labels[budget] || budget : "Non spécifié"
  }

  if (currentStep === "welcome" || !userInfo.name) {
    return null
  }

  return (
    <Card className="mb-4 bg-blue-50 border-blue-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <User className="h-4 w-4 mr-2 text-blue-600" />
          Informations collectées
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {userInfo.name && (
          <div className="flex items-center">
            <User className="h-3 w-3 mr-2 text-gray-500" />
            <span className="font-medium">Nom :</span>
            <span className="ml-1">{userInfo.name}</span>
          </div>
        )}

        {userInfo.email && (
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-2 text-gray-500" />
            <span className="font-medium">Email :</span>
            <span className="ml-1">{userInfo.email}</span>
          </div>
        )}

        {userInfo.phone && (
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-2 text-gray-500" />
            <span className="font-medium">Téléphone :</span>
            <span className="ml-1">{userInfo.phone}</span>
          </div>
        )}

        {userInfo.projectType && (
          <div className="flex items-center">
            <Building2 className="h-3 w-3 mr-2 text-gray-500" />
            <span className="font-medium">Projet :</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {getProjectTypeLabel(userInfo.projectType)}
            </Badge>
          </div>
        )}

        {userInfo.budget && (
          <div className="flex items-center">
            <DollarSign className="h-3 w-3 mr-2 text-gray-500" />
            <span className="font-medium">Budget :</span>
            <span className="ml-1">{getBudgetLabel(userInfo.budget)}</span>
          </div>
        )}

        {userInfo.message && (
          <div className="flex items-start">
            <MessageSquare className="h-3 w-3 mr-2 mt-0.5 text-gray-500" />
            <div>
              <span className="font-medium">Message :</span>
              <p className="ml-1 text-xs text-gray-600 mt-1">{userInfo.message}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
