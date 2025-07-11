"use client"

import { useState, useCallback } from "react"
import type { ChatMessage, ChatOption, UserInfo } from "@/components/chatbot/chatbot"

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [currentStep, setCurrentStep] = useState<string>("welcome")
  const [isTyping, setIsTyping] = useState(false)

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const addBotMessage = useCallback((content: string, options?: ChatOption[], delay = 1000) => {
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
  }, [])

  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
  }, [])

  const updateUserInfo = useCallback((info: Partial<UserInfo>) => {
    setUserInfo((prev) => ({ ...prev, ...info }))
  }, [])

  const resetChat = useCallback(() => {
    setMessages([])
    setUserInfo({})
    setCurrentStep("welcome")
    setIsTyping(false)
  }, [])

  return {
    messages,
    userInfo,
    currentStep,
    isTyping,
    setCurrentStep,
    addMessage,
    addBotMessage,
    addUserMessage,
    updateUserInfo,
    resetChat,
  }
}
