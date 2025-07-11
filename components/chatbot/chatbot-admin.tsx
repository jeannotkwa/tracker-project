"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Settings, MessageSquare, Users, TrendingUp, Clock, Save, RefreshCw } from "lucide-react"

interface ChatbotStats {
  totalConversations: number
  activeConversations: number
  averageResponseTime: number
  satisfactionRate: number
  topQuestions: string[]
  dailyMessages: number
}

export function ChatbotAdmin() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Bonjour ! Je suis l'assistant virtuel de ConstructPro. Comment puis-je vous aider aujourd'hui ?",
  )
  const [stats, setStats] = useState<ChatbotStats>({
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
  })

  const [customResponses, setCustomResponses] = useState([
    {
      id: "1",
      trigger: "prix, coût, tarif",
      response: "Nos tarifs dépendent de nombreux facteurs. Je peux vous préparer un devis gratuit et personnalisé !",
    },
    {
      id: "2",
      trigger: "délai, temps, durée",
      response: "Les délais varient selon le projet : Maison (6-10 mois), Rénovation (3-6 mois), Extension (2-4 mois)",
    },
  ])

  const handleSaveSettings = () => {
    // Sauvegarder les paramètres
    localStorage.setItem(
      "chatbot-admin-settings",
      JSON.stringify({
        isEnabled,
        welcomeMessage,
        customResponses,
      }),
    )

    // Afficher une confirmation
    alert("Paramètres sauvegardés avec succès !")
  }

  const handleResetStats = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser les statistiques ?")) {
      setStats({
        totalConversations: 0,
        activeConversations: 0,
        averageResponseTime: 0,
        satisfactionRate: 0,
        topQuestions: [],
        dailyMessages: 0,
      })
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Administration Chatbot</h1>
          <p className="text-gray-600">Gérez votre assistant virtuel ConstructPro</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <Badge variant={isEnabled ? "default" : "secondary"}>{isEnabled ? "Actif" : "Inactif"}</Badge>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversations Totales</p>
                <p className="text-2xl font-bold">{stats.totalConversations}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversations Actives</p>
                <p className="text-2xl font-bold">{stats.activeConversations}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temps de Réponse Moyen</p>
                <p className="text-2xl font-bold">{stats.averageResponseTime}s</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="chatbot-enabled">Activer le Chatbot</Label>
                <p className="text-sm text-gray-600">Afficher le chatbot sur le site</p>
              </div>
              <Switch id="chatbot-enabled" checked={isEnabled} onCheckedChange={setIsEnabled} />
            </div>

            <div>
              <Label htmlFor="welcome-message">Message de Bienvenue</Label>
              <Textarea
                id="welcome-message"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>

            <Button onClick={handleSaveSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder les Paramètres
            </Button>
          </CardContent>
        </Card>

        {/* Questions Fréquentes */}
        <Card>
          <CardHeader>
            <CardTitle>Questions les Plus Fréquentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topQuestions.map((question, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{question}</span>
                  <Badge variant="outline">{Math.floor(Math.random() * 20) + 5}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Réponses Personnalisées */}
      <Card>
        <CardHeader>
          <CardTitle>Réponses Personnalisées</CardTitle>
          <p className="text-sm text-gray-600">Configurez des réponses automatiques basées sur des mots-clés</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customResponses.map((response, index) => (
              <div key={response.id} className="p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Mots-clés déclencheurs</Label>
                    <Input
                      value={response.trigger}
                      onChange={(e) => {
                        const updated = [...customResponses]
                        updated[index].trigger = e.target.value
                        setCustomResponses(updated)
                      }}
                      placeholder="prix, coût, tarif"
                    />
                  </div>
                  <div>
                    <Label>Réponse automatique</Label>
                    <Textarea
                      value={response.response}
                      onChange={(e) => {
                        const updated = [...customResponses]
                        updated[index].response = e.target.value
                        setCustomResponses(updated)
                      }}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleResetStats}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Réinitialiser les Statistiques
        </Button>

        <div className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleString("fr-FR")}</div>
      </div>
    </div>
  )
}
