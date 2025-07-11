"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, Building2, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChatMessage {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
  options?: ChatOption[]
  isTyping?: boolean
}

export interface ChatOption {
  id: string
  label: string
  action: string
  data?: any
}

export interface UserInfo {
  name?: string
  email?: string
  phone?: string
  projectType?: string
  budget?: string
  message?: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [currentStep, setCurrentStep] = useState<string>("welcome")
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Messages de bienvenue et réponses prédéfinies
  const botResponses = {
    welcome: {
      content: "👋 Bonjour ! Je suis l'assistant virtuel de ConstructPro. Comment puis-je vous aider aujourd'hui ?",
      options: [
        { id: "devis", label: "Demander un devis", action: "start_quote" },
        { id: "services", label: "Nos services", action: "show_services" },
        { id: "portfolio", label: "Voir nos réalisations", action: "show_portfolio" },
        { id: "contact", label: "Nous contacter", action: "show_contact" },
        { id: "faq", label: "Questions fréquentes", action: "show_faq" },
      ],
    },
    services: {
      content: "🏗️ Nous proposons trois services principaux :",
      options: [
        { id: "construction", label: "Construction neuve", action: "service_construction" },
        { id: "renovation", label: "Rénovation", action: "service_renovation" },
        { id: "architecture", label: "Architecture", action: "service_architecture" },
        { id: "back", label: "← Retour au menu", action: "welcome" },
      ],
    },
    faq: {
      content: "❓ Voici les questions les plus fréquentes :",
      options: [
        { id: "delais", label: "Quels sont vos délais ?", action: "faq_delais" },
        { id: "garanties", label: "Quelles garanties proposez-vous ?", action: "faq_garanties" },
        { id: "devis_gratuit", label: "Le devis est-il gratuit ?", action: "faq_devis" },
        { id: "zone", label: "Dans quelle zone intervenez-vous ?", action: "faq_zone" },
        { id: "back", label: "← Retour au menu", action: "welcome" },
      ],
    },
  }

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialisation du chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(botResponses.welcome.content, botResponses.welcome.options)
    }
  }, [isOpen])

  // Gestion du compteur de messages non lus
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.type === "bot") {
        setUnreadCount((prev) => prev + 1)
      }
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  // Ajouter un message bot avec effet de frappe
  const addBotMessage = (content: string, options?: ChatOption[], delay = 1000) => {
    setIsTyping(true)

    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content,
        timestamp: new Date(),
        options,
      }

      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    }, delay)
  }

  // Ajouter un message utilisateur
  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
  }

  // Gérer les actions des boutons
  const handleOptionClick = (option: ChatOption) => {
    addUserMessage(option.label)

    setTimeout(() => {
      switch (option.action) {
        case "welcome":
          addBotMessage(botResponses.welcome.content, botResponses.welcome.options)
          setCurrentStep("welcome")
          break

        case "show_services":
          addBotMessage(botResponses.services.content, botResponses.services.options)
          break

        case "show_faq":
          addBotMessage(botResponses.faq.content, botResponses.faq.options)
          break

        case "service_construction":
          addBotMessage(
            "🏢 **Construction Neuve** : Nous réalisons tous types de constructions neuves, des maisons individuelles aux bâtiments commerciaux et industriels. Notre expertise de 25 ans garantit des projets de qualité respectant les délais et budgets.",
            [
              {
                id: "devis_construction",
                label: "Demander un devis",
                action: "start_quote",
                data: { projectType: "construction-neuve" },
              },
              {
                id: "portfolio_construction",
                label: "Voir nos constructions",
                action: "external_link",
                data: { url: "/portfolio?category=residential" },
              },
              { id: "back", label: "← Retour aux services", action: "show_services" },
            ],
          )
          break

        case "service_renovation":
          addBotMessage(
            "🔨 **Rénovation & Extension** : Transformation complète, rénovation énergétique, extensions... Nous redonnons vie à vos espaces existants avec créativité et expertise technique.",
            [
              {
                id: "devis_renovation",
                label: "Demander un devis",
                action: "start_quote",
                data: { projectType: "renovation" },
              },
              {
                id: "portfolio_renovation",
                label: "Voir nos rénovations",
                action: "external_link",
                data: { url: "/portfolio?category=renovation" },
              },
              { id: "back", label: "← Retour aux services", action: "show_services" },
            ],
          )
          break

        case "service_architecture":
          addBotMessage(
            "📐 **Architecture & Conception** : Nos architectes créent des projets sur mesure, de l'étude de faisabilité à la réception des travaux. Conception moderne, traditionnelle ou bioclimatique selon vos goûts.",
            [
              {
                id: "devis_architecture",
                label: "Demander un devis",
                action: "start_quote",
                data: { projectType: "architecture" },
              },
              {
                id: "portfolio_architecture",
                label: "Voir nos créations",
                action: "external_link",
                data: { url: "/services/architecture" },
              },
              { id: "back", label: "← Retour aux services", action: "show_services" },
            ],
          )
          break

        case "start_quote":
          setCurrentStep("quote_name")
          if (option.data?.projectType) {
            setUserInfo((prev) => ({ ...prev, projectType: option.data.projectType }))
          }
          addBotMessage(
            "Parfait ! Je vais vous aider à préparer votre demande de devis. Pour commencer, quel est votre nom ?",
            [],
          )
          break

        case "show_contact":
          addBotMessage(
            "📞 **Nos Coordonnées** :\n\n📍 123 Rue de la Construction, 69000 Lyon\n📞 04 78 XX XX XX\n📧 contact@constructpro.fr\n\n🕒 **Horaires** :\nLun-Ven : 8h-18h | Sam : 9h-12h",
            [
              {
                id: "call",
                label: "📞 Appeler maintenant",
                action: "external_link",
                data: { url: "tel:+33478000000" },
              },
              {
                id: "email",
                label: "📧 Envoyer un email",
                action: "external_link",
                data: { url: "mailto:contact@constructpro.fr" },
              },
              { id: "devis", label: "Demander un devis", action: "start_quote" },
              { id: "back", label: "← Retour au menu", action: "welcome" },
            ],
          )
          break

        case "show_portfolio":
          addBotMessage(
            "🏆 **Nos Réalisations** : Découvrez plus de 500 projets réalisés en 25 ans ! Maisons individuelles, centres commerciaux, rénovations de prestige...",
            [
              {
                id: "portfolio",
                label: "Voir le portfolio complet",
                action: "external_link",
                data: { url: "/portfolio" },
              },
              { id: "recent", label: "Projets récents", action: "show_recent_projects" },
              { id: "back", label: "← Retour au menu", action: "welcome" },
            ],
          )
          break

        case "faq_delais":
          addBotMessage(
            "⏱️ **Nos Délais** :\n\n• Maison individuelle : 6-10 mois\n• Rénovation complète : 3-6 mois\n• Extension : 2-4 mois\n• Bâtiment commercial : 8-14 mois\n\nNous respectons 98% de nos délais grâce à une planification rigoureuse !",
            [
              { id: "devis", label: "Demander un devis", action: "start_quote" },
              { id: "back", label: "← Retour aux FAQ", action: "show_faq" },
            ],
          )
          break

        case "faq_garanties":
          addBotMessage(
            "🛡️ **Nos Garanties** :\n\n✅ Garantie décennale obligatoire\n✅ Garantie de parfait achèvement (1 an)\n✅ Garantie biennale (2 ans)\n✅ Assurance responsabilité civile\n✅ Service après-vente réactif",
            [
              { id: "devis", label: "Demander un devis", action: "start_quote" },
              { id: "back", label: "← Retour aux FAQ", action: "show_faq" },
            ],
          )
          break

        case "faq_devis":
          addBotMessage(
            "💰 **Devis Gratuit** :\n\n✅ Étude de faisabilité GRATUITE\n✅ Devis détaillé GRATUIT\n✅ Conseils personnalisés GRATUITS\n✅ Visite sur site GRATUITE\n\nAucun engagement de votre part !",
            [
              { id: "devis", label: "Demander mon devis gratuit", action: "start_quote" },
              { id: "back", label: "← Retour aux FAQ", action: "show_faq" },
            ],
          )
          break

        case "faq_zone":
          addBotMessage(
            "🗺️ **Zone d'Intervention** :\n\n📍 Lyon et agglomération\n📍 Villefranche-sur-Saône\n📍 Bourg-en-Bresse\n📍 Saint-Étienne\n📍 Autres communes sur demande\n\nNous nous déplaçons dans un rayon de 100km autour de Lyon !",
            [
              { id: "devis", label: "Vérifier pour mon projet", action: "start_quote" },
              { id: "back", label: "← Retour aux FAQ", action: "show_faq" },
            ],
          )
          break

        case "external_link":
          if (option.data?.url) {
            window.open(option.data.url, "_blank")
          }
          break

        default:
          addBotMessage("Je n'ai pas compris cette action. Que puis-je faire pour vous ?", botResponses.welcome.options)
      }
    }, 500)
  }

  // Gérer l'envoi de message texte
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const message = inputValue.toLowerCase()
    setInputValue("")

    // Logique de conversation selon l'étape
    setTimeout(() => {
      switch (currentStep) {
        case "quote_name":
          setUserInfo((prev) => ({ ...prev, name: inputValue }))
          setCurrentStep("quote_email")
          addBotMessage(`Enchanté ${inputValue} ! Quel est votre email pour vous envoyer le devis ?`)
          break

        case "quote_email":
          if (isValidEmail(inputValue)) {
            setUserInfo((prev) => ({ ...prev, email: inputValue }))
            setCurrentStep("quote_phone")
            addBotMessage("Parfait ! Et votre numéro de téléphone pour vous contacter ?")
          } else {
            addBotMessage("L'email semble incorrect. Pouvez-vous le saisir à nouveau ?")
          }
          break

        case "quote_phone":
          setUserInfo((prev) => ({ ...prev, phone: inputValue }))
          setCurrentStep("quote_project")
          addBotMessage("Merci ! Maintenant, quel type de projet avez-vous ?", [
            {
              id: "construction",
              label: "Construction neuve",
              action: "set_project_type",
              data: { type: "construction-neuve" },
            },
            { id: "renovation", label: "Rénovation", action: "set_project_type", data: { type: "renovation" } },
            { id: "extension", label: "Extension", action: "set_project_type", data: { type: "extension" } },
            { id: "architecture", label: "Architecture", action: "set_project_type", data: { type: "architecture" } },
          ])
          break

        case "quote_budget":
          setUserInfo((prev) => ({ ...prev, budget: inputValue }))
          setCurrentStep("quote_message")
          addBotMessage("Parfait ! Pour finir, décrivez-moi votre projet en quelques mots :")
          break

        case "quote_message":
          setUserInfo((prev) => ({ ...prev, message: inputValue }))
          setCurrentStep("quote_submit")
          addBotMessage("Excellent ! J'ai toutes les informations. Voulez-vous que j'envoie votre demande de devis ?", [
            { id: "send", label: "✅ Envoyer ma demande", action: "submit_quote" },
            { id: "modify", label: "✏️ Modifier les infos", action: "start_quote" },
          ])
          break

        default:
          // Réponses automatiques basées sur les mots-clés
          handleKeywordResponse(message)
      }
    }, 500)
  }

  // Gérer les réponses par mots-clés
  const handleKeywordResponse = (message: string) => {
    if (message.includes("prix") || message.includes("coût") || message.includes("tarif")) {
      addBotMessage(
        "💰 Nos tarifs dépendent de nombreux facteurs (surface, matériaux, complexité...). Je peux vous préparer un devis gratuit et personnalisé !",
        [{ id: "devis", label: "Demander un devis gratuit", action: "start_quote" }],
      )
    } else if (message.includes("délai") || message.includes("temps") || message.includes("durée")) {
      addBotMessage(
        "⏱️ Les délais varient selon le projet :\n• Maison : 6-10 mois\n• Rénovation : 3-6 mois\n• Extension : 2-4 mois",
        [{ id: "devis", label: "Estimer mon projet", action: "start_quote" }],
      )
    } else if (message.includes("garantie") || message.includes("assurance")) {
      addBotMessage(
        "🛡️ Nous proposons toutes les garanties légales : décennale, parfait achèvement, biennale + assurance RC professionnelle.",
        [{ id: "devis", label: "En savoir plus", action: "start_quote" }],
      )
    } else {
      addBotMessage(
        "Je n'ai pas bien compris votre question. Voici ce que je peux faire pour vous :",
        botResponses.welcome.options,
      )
    }
  }

  // Validation email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Soumettre le devis
  const submitQuote = async () => {
    try {
      addBotMessage("⏳ Envoi de votre demande en cours...")

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userInfo.name?.split(" ")[0] || "",
          lastName: userInfo.name?.split(" ").slice(1).join(" ") || "",
          email: userInfo.email,
          phone: userInfo.phone,
          projectType: userInfo.projectType,
          budget: userInfo.budget,
          message: `Demande via chatbot: ${userInfo.message}`,
        }),
      })

      if (response.ok) {
        addBotMessage(
          "🎉 **Demande envoyée avec succès !**\n\nNous vous recontacterons dans les 24h. En attendant, vous pouvez :\n\n• Consulter notre portfolio\n• Nous appeler directement\n• Visiter nos bureaux",
          [
            { id: "portfolio", label: "Voir nos réalisations", action: "external_link", data: { url: "/portfolio" } },
            { id: "call", label: "Nous appeler", action: "external_link", data: { url: "tel:+33478000000" } },
            { id: "new", label: "Nouvelle conversation", action: "restart" },
          ],
        )
        setCurrentStep("completed")
      } else {
        addBotMessage("❌ Une erreur est survenue. Pouvez-vous réessayer ou nous contacter directement ?", [
          { id: "retry", label: "Réessayer", action: "submit_quote" },
          { id: "contact", label: "Nous contacter", action: "show_contact" },
        ])
      }
    } catch (error) {
      addBotMessage("❌ Problème de connexion. Veuillez réessayer ou nous contacter directement.", [
        { id: "retry", label: "Réessayer", action: "submit_quote" },
        { id: "contact", label: "Nous contacter", action: "show_contact" },
      ])
    }
  }

  // Gérer les actions spéciales
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.options) {
      const submitOption = lastMessage.options.find((opt) => opt.action === "submit_quote")
      const setProjectOption = lastMessage.options.find((opt) => opt.action === "set_project_type")

      if (submitOption) {
        // Auto-submit si demandé
      }

      if (setProjectOption) {
        // Gérer la sélection du type de projet
      }
    }
  }, [messages])

  // Redémarrer la conversation
  const restartChat = () => {
    setMessages([])
    setUserInfo({})
    setCurrentStep("welcome")
    addBotMessage(botResponses.welcome.content, botResponses.welcome.options)
  }

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      )}

      {/* Interface du chat */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 transition-all duration-300",
            isMinimized ? "h-16" : "h-[600px]",
          )}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="h-8 w-8" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">Assistant ConstructPro</h3>
                <p className="text-xs opacity-90">En ligne • Répond en quelques secondes</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900",
                      )}
                    >
                      {message.type === "bot" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">Assistant ConstructPro</span>
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{message.content}</div>

                      {message.options && message.options.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option) => (
                            <Button
                              key={option.id}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (option.action === "submit_quote") {
                                  submitQuote()
                                } else if (option.action === "set_project_type") {
                                  setUserInfo((prev) => ({ ...prev, projectType: option.data?.type }))
                                  setCurrentStep("quote_budget")
                                  addUserMessage(option.label)
                                  setTimeout(() => {
                                    addBotMessage("Parfait ! Quel est votre budget approximatif ?", [
                                      {
                                        id: "budget1",
                                        label: "Moins de 50k€",
                                        action: "set_budget",
                                        data: { budget: "moins-50k" },
                                      },
                                      {
                                        id: "budget2",
                                        label: "50k€ - 100k€",
                                        action: "set_budget",
                                        data: { budget: "50k-100k" },
                                      },
                                      {
                                        id: "budget3",
                                        label: "100k€ - 200k€",
                                        action: "set_budget",
                                        data: { budget: "100k-200k" },
                                      },
                                      {
                                        id: "budget4",
                                        label: "Plus de 200k€",
                                        action: "set_budget",
                                        data: { budget: "plus-200k" },
                                      },
                                    ])
                                  }, 500)
                                } else if (option.action === "set_budget") {
                                  setUserInfo((prev) => ({ ...prev, budget: option.data?.budget }))
                                  setCurrentStep("quote_message")
                                  addUserMessage(option.label)
                                  setTimeout(() => {
                                    addBotMessage("Parfait ! Pour finir, décrivez-moi votre projet en quelques mots :")
                                  }, 500)
                                } else if (option.action === "restart") {
                                  restartChat()
                                } else {
                                  handleOptionClick(option)
                                }
                              }}
                              className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal"
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                  <Building2 className="h-3 w-3 mr-1" />
                  Propulsé par ConstructPro
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  )
}
