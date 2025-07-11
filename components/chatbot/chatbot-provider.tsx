"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface ChatbotContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  unreadCount: number
  setUnreadCount: (count: number) => void
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isEnabled, setIsEnabled] = useState(true)

  // Sauvegarder l'état dans localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatbot-state")
    if (saved) {
      try {
        const state = JSON.parse(saved)
        setIsEnabled(state.isEnabled ?? true)
      } catch (error) {
        console.error("Erreur lors du chargement de l'état du chatbot:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("chatbot-state", JSON.stringify({ isEnabled }))
  }, [isEnabled])

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        setIsOpen,
        unreadCount,
        setUnreadCount,
        isEnabled,
        setIsEnabled,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbotContext() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error("useChatbotContext must be used within a ChatbotProvider")
  }
  return context
}
