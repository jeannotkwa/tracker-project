"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { crmService } from "@/lib/crm/crm-service"
import type { ChatMessage, ChatOption, UserInfo } from "./chatbot"
import { isValidEmail } from "@/utils/validation"
import { handleKeywordResponse } from "@/utils/keyword-response"

export function MultilingualChatbot() {
  const { currentLanguage, translations: t, detectMessageLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [currentStep, setCurrentStep] = useState<string>("welcome")
  const [unreadCount, setUnreadCount] = useState(0)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Réponses du bot basées sur les traductions
  const getBotResponses = () => ({
    welcome: {
      content: t.chatbot.welcome,
      options: [
        { id: "devis", label: t.chatbot.actions.requestQuote, action: "start_quote" },
        { id: "services", label: t.chatbot.actions.ourServices, action: "show_services" },
        { id: "portfolio", label: t.chatbot.actions.viewPortfolio, action: "show_portfolio" },
        { id: "contact", label: t.chatbot.actions.contactUs, action: "show_contact" },
        { id: "faq", label: t.chatbot.actions.faq, action: "show_faq" },
      ],
    },
    services: {
      content: t.chatbot.services.title,
      options: [
        { id: "construction", label: t.chatbot.services.construction.title, action: "service_construction" },
        { id: "renovation", label: t.chatbot.services.renovation.title, action: "service_renovation" },
        { id: "architecture", label: t.chatbot.services.architecture.title, action: "service_architecture" },
        { id: "back", label: t.chatbot.actions.backToMenu, action: "welcome" },
      ],
    },
    faq: {
      content: t.chatbot.faq.title,
      options: [
        { id: "delais", label: t.chatbot.faq.delays.question, action: "faq_delais" },
        { id: "garanties", label: t.chatbot.faq.guarantees.question, action: "faq_garanties" },
        { id: "devis_gratuit", label: t.chatbot.faq.freeQuote.question, action: "faq_devis" },
        { id: "zone", label: t.chatbot.faq.serviceArea.question, action: "faq_zone" },
        { id: "back", label: t.chatbot.actions.backToMenu, action: "welcome" },
      ],
    },
  })

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
      const responses = getBotResponses()
      addBotMessage(responses.welcome.content, responses.welcome.options)
    }
  }, [isOpen, currentLanguage])

  // Tracking des interactions CRM
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

    // Détecter automatiquement la langue du message
    const detectedLanguage = detectMessageLanguage(content)
    if (detectedLanguage !== currentLanguage) {
      // Optionnel : proposer de changer de langue
      console.log(`Langue détectée: ${detectedLanguage}, langue actuelle: ${currentLanguage}`)
    }
  }

  // Gérer les actions des boutons
  const handleOptionClick = async (option: ChatOption) => {
    addUserMessage(option.label)
    await trackInteraction("option_clicked", { option: option.action, label: option.label })

    const responses = getBotResponses()

    setTimeout(() => {
      switch (option.action) {
        case "welcome":
          addBotMessage(responses.welcome.content, responses.welcome.options)
          setCurrentStep("welcome")
          break

        case "show_services":
          addBotMessage(responses.services.content, responses.services.options)
          break

        case "show_faq":
          addBotMessage(responses.faq.content, responses.faq.options)
          break

        case "service_construction":
          addBotMessage(
            `🏢 **${t.chatbot.services.construction.title}** : ${t.chatbot.services.construction.description}`,
            [
              {
                id: "devis_construction",
                label: t.chatbot.actions.requestQuote,
                action: "start_quote",
                data: { projectType: "construction" },
              },
              {
                id: "portfolio_construction",
                label: t.chatbot.actions.viewPortfolio,
                action: "external_link",
                data: { url: "/portfolio?category=residential" },
              },
              { id: "back", label: t.chatbot.actions.backToMenu, action: "show_services" },
            ],
          )
          break

        case "service_renovation":
          addBotMessage(
            `🔨 **${t.chatbot.services.renovation.title}** : ${t.chatbot.services.renovation.description}`,
            [
              {
                id: "devis_renovation",
                label: t.chatbot.actions.requestQuote,
                action: "start_quote",
                data: { projectType: "renovation" },
              },
              {
                id: "portfolio_renovation",
                label: t.chatbot.actions.viewPortfolio,
                action: "external_link",
                data: { url: "/portfolio?category=renovation" },
              },
              { id: "back", label: t.chatbot.actions.backToMenu, action: "show_services" },
            ],
          )
          break

        case "service_architecture":
          addBotMessage(
            `📐 **${t.chatbot.services.architecture.title}** : ${t.chatbot.services.architecture.description}`,
            [
              {
                id: "devis_architecture",
                label: t.chatbot.actions.requestQuote,
                action: "start_quote",
                data: { projectType: "architecture" },
              },
              {
                id: "portfolio_architecture",
                label: t.chatbot.actions.viewPortfolio,
                action: "external_link",
                data: { url: "/services/architecture" },
              },
              { id: "back", label: t.chatbot.actions.backToMenu, action: "show_services" },
            ],
          )
          break

        case "start_quote":
          setCurrentStep("quote_name")
          if (option.data?.projectType) {
            setUserInfo((prev) => ({ ...prev, projectType: option.data.projectType }))
          }
          trackInteraction("quote_started", { projectType: option.data?.projectType })
          addBotMessage(t.chatbot.messages.askName, [])
          break

        case "show_contact":
          addBotMessage(
            `${t.chatbot.contact.title}\n\n${t.chatbot.contact.address}\n${t.chatbot.contact.phone}\n${t.chatbot.contact.email}\n\n${t.chatbot.contact.hours}`,
            [
              {
                id: "call",
                label: t.chatbot.actions.callNow,
                action: "external_link",
                data: { url: "tel:+33478000000" },
              },
              {
                id: "email",
                label: t.chatbot.actions.sendEmail,
                action: "external_link",
                data: { url: "mailto:contact@constructpro.fr" },
              },
              { id: "devis", label: t.chatbot.actions.requestQuote, action: "start_quote" },
              { id: "back", label: t.chatbot.actions.backToMenu, action: "welcome" },
            ],
          )
          break

        case "show_portfolio":
          addBotMessage("🏆 **Nos Réalisations** : Découvrez plus de 500 projets réalisés en 25 ans !", [
            {
              id: "portfolio",
              label: t.chatbot.actions.viewPortfolio,
              action: "external_link",
              data: { url: "/portfolio" },
            },
            { id: "back", label: t.chatbot.actions.backToMenu, action: "welcome" },
          ])
          break

        case "faq_delais":
          addBotMessage(t.chatbot.faq.delays.answer, [
            { id: "devis", label: t.chatbot.actions.requestQuote, action: "start_quote" },
            { id: "back", label: t.chatbot.actions.backToMenu, action: "show_faq" },
          ])
          break

        case "faq_garanties":
          addBotMessage(t.chatbot.faq.guarantees.answer, [
            { id: "devis", label: t.chatbot.actions.requestQuote, action: "start_quote" },
            { id: "back", label: t.chatbot.actions.backToMenu, action: "show_faq" },
          ])
          break

        case "faq_devis":
          addBotMessage(t.chatbot.faq.freeQuote.answer, [
            { id: "devis", label: t.chatbot.actions.requestQuote, action: "start_quote" },
            { id: "back", label: t.chatbot.actions.backToMenu, action: "show_faq" },
          ])
          break

        case "faq_zone":
          addBotMessage(t.chatbot.faq.serviceArea.answer, [
            { id: "devis", label: t.chatbot.actions.requestQuote, action: "start_quote" },
            { id: "back", label: t.chatbot.actions.backToMenu, action: "show_faq" },
          ])
          break

        case "external_link":
          if (option.data?.url) {
            window.open(option.data.url, "_blank")
          }
          break

        default:
          addBotMessage("Je n'ai pas compris cette action. Que puis-je faire pour vous ?", responses.welcome.options)
      }
    }, 500)
  }

  // Gérer l'envoi de message texte
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const message = inputValue.toLowerCase()
    await trackInteraction("message_sent", { message: inputValue, step: currentStep })
    setInputValue("")

    // Logique de conversation selon l'étape
    setTimeout(() => {
      switch (currentStep) {
        case "quote_name":
          setUserInfo((prev) => ({ ...prev, name: inputValue }))
          setCurrentStep("quote_email")
          addBotMessage(t.chatbot.messages.askEmail.replace("{name}", inputValue))
          break

        case "quote_email":
          if (isValidEmail(inputValue)) {
            setUserInfo((prev) => ({ ...prev, email: inputValue }))
            setCurrentStep("quote_phone")
            addBotMessage(t.chatbot.messages.askPhone)
          } else {
            addBotMessage(t.chatbot.messages.invalidEmail)
          }
          break

        case "quote_phone":
          setUserInfo((prev) => ({ ...prev, phone: inputValue }))
          setCurrentStep("quote_project")
          addBotMessage(t.chatbot.messages.askProjectType, [
            {
              id: "construction",
              label: t.chatbot.projectTypes.construction,
              action: "set_project_type",
              data: { type: "construction" },
            },
            {
              id: "renovation",
              label: t.chatbot.projectTypes.renovation,
              action: "set_project_type",
              data: { type: "renovation" },
            },
            {
              id: "extension",
              label: t.chatbot.projectTypes.extension,
              action: "set_project_type",
              data: { type: "extension" },
            },
            {
              id: "architecture",
              label: t.chatbot.projectTypes.architecture,
              action: "set_project_type",
              data: { type: "architecture" },
            },
          ])
          break

        case "quote_budget":
          setUserInfo((prev) => ({ ...prev, budget: inputValue }))
          setCurrentStep("quote_message")
          addBotMessage(t.chatbot.messages.askProjectDescription)
          break

        case "quote_message":
          setUserInfo((prev) => ({ ...prev, message: inputValue }))
          setCurrentStep("quote_submit")
          addBotMessage(t.chatbot.messages.confirmSubmission, [
            { id: "send", label: t.chatbot.actions.sendRequest, action: "submit_quote" },
            { id: "modify", label: "✏️ Modifier les infos", action: "start_quote" },
          ])
          break

        default:
          // Réponses automatiques basées sur les mots-clés
          handleKeywordResponse(message)
      }
    }, 500)
  }
}
