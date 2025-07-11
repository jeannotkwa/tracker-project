"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"

export function EmailStatus() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    // Vérifier la configuration email côté client
    fetch("/api/health/email")
      .then((res) => res.json())
      .then((data) => setIsConfigured(data.configured))
      .catch(() => setIsConfigured(false))
  }, [])

  if (isConfigured === null) return null

  return (
    <Alert className={`mb-4 ${isConfigured ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}>
      {isConfigured ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <AlertCircle className="h-4 w-4 text-yellow-600" />
      )}
      <AlertDescription className={isConfigured ? "text-green-800" : "text-yellow-800"}>
        {isConfigured ? (
          <>
            <Mail className="inline h-4 w-4 mr-1" />
            Service d'email configuré et opérationnel
          </>
        ) : (
          "Service d'email en mode développement - Les emails ne seront pas envoyés"
        )}
      </AlertDescription>
    </Alert>
  )
}
