export type Language = "fr" | "en" | "es"

export interface Translations {
  // Navigation et interface générale
  nav: {
    home: string
    about: string
    services: string
    portfolio: string
    blog: string
    careers: string
    contact: string
    getQuote: string
  }

  // Chatbot
  chatbot: {
    welcome: string
    typing: string
    poweredBy: string
    offline: string
    online: string
    respondsIn: string

    // Boutons d'actions
    actions: {
      requestQuote: string
      ourServices: string
      viewPortfolio: string
      contactUs: string
      faq: string
      backToMenu: string
      sendRequest: string
      callNow: string
      sendEmail: string
      retry: string
      newConversation: string
    }

    // Messages du bot
    messages: {
      askName: string
      askEmail: string
      askPhone: string
      askProjectType: string
      askBudget: string
      askProjectDescription: string
      confirmSubmission: string
      submissionSuccess: string
      submissionError: string
      connectionError: string
      invalidEmail: string
      thankYou: string
    }

    // Services
    services: {
      title: string
      construction: {
        title: string
        description: string
      }
      renovation: {
        title: string
        description: string
      }
      architecture: {
        title: string
        description: string
      }
    }

    // FAQ
    faq: {
      title: string
      delays: {
        question: string
        answer: string
      }
      guarantees: {
        question: string
        answer: string
      }
      freeQuote: {
        question: string
        answer: string
      }
      serviceArea: {
        question: string
        answer: string
      }
    }

    // Contact
    contact: {
      title: string
      address: string
      phone: string
      email: string
      hours: string
      emergency: string
    }

    // Types de projets
    projectTypes: {
      construction: string
      renovation: string
      extension: string
      architecture: string
      publicWorks: string
      other: string
    }

    // Budgets
    budgets: {
      under50k: string
      "50k-100k": string
      "100k-200k": string
      "200k-500k": string
      over500k: string
    }
  }

  // Formulaires
  forms: {
    firstName: string
    lastName: string
    email: string
    phone: string
    projectType: string
    budget: string
    message: string
    required: string
    send: string
    sending: string
    success: string
    error: string
  }

  // CRM
  crm: {
    dashboard: string
    contacts: string
    leads: string
    opportunities: string
    pipeline: string
    activities: string
    reports: string
    settings: string
    newContact: string
    newLead: string
    newOpportunity: string
    status: {
      new: string
      contacted: string
      qualified: string
      proposal: string
      negotiation: string
      won: string
      lost: string
    }
    priority: {
      low: string
      medium: string
      high: string
      urgent: string
    }
  }
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      portfolio: "Réalisations",
      blog: "Actualités",
      careers: "Carrières",
      contact: "Contact",
      getQuote: "Demander un Devis",
    },

    chatbot: {
      welcome: "👋 Bonjour ! Je suis l'assistant virtuel de ConstructPro. Comment puis-je vous aider aujourd'hui ?",
      typing: "En train d'écrire...",
      poweredBy: "Propulsé par ConstructPro",
      offline: "Hors ligne",
      online: "En ligne",
      respondsIn: "Répond en quelques secondes",

      actions: {
        requestQuote: "Demander un devis",
        ourServices: "Nos services",
        viewPortfolio: "Voir nos réalisations",
        contactUs: "Nous contacter",
        faq: "Questions fréquentes",
        backToMenu: "← Retour au menu",
        sendRequest: "✅ Envoyer ma demande",
        callNow: "📞 Appeler maintenant",
        sendEmail: "📧 Envoyer un email",
        retry: "Réessayer",
        newConversation: "Nouvelle conversation",
      },

      messages: {
        askName: "Parfait ! Je vais vous aider à préparer votre demande de devis. Pour commencer, quel est votre nom ?",
        askEmail: "Enchanté {name} ! Quel est votre email pour vous envoyer le devis ?",
        askPhone: "Parfait ! Et votre numéro de téléphone pour vous contacter ?",
        askProjectType: "Merci ! Maintenant, quel type de projet avez-vous ?",
        askBudget: "Parfait ! Quel est votre budget approximatif ?",
        askProjectDescription: "Parfait ! Pour finir, décrivez-moi votre projet en quelques mots :",
        confirmSubmission:
          "Excellent ! J'ai toutes les informations. Voulez-vous que j'envoie votre demande de devis ?",
        submissionSuccess: "🎉 **Demande envoyée avec succès !**\n\nNous vous recontacterons dans les 24h.",
        submissionError: "❌ Une erreur est survenue. Pouvez-vous réessayer ou nous contacter directement ?",
        connectionError: "❌ Problème de connexion. Veuillez réessayer ou nous contacter directement.",
        invalidEmail: "L'email semble incorrect. Pouvez-vous le saisir à nouveau ?",
        thankYou: "Merci pour votre confiance !",
      },

      services: {
        title: "🏗️ Nous proposons trois services principaux :",
        construction: {
          title: "Construction Neuve",
          description:
            "Nous réalisons tous types de constructions neuves, des maisons individuelles aux bâtiments commerciaux et industriels.",
        },
        renovation: {
          title: "Rénovation & Extension",
          description:
            "Transformation complète, rénovation énergétique, extensions... Nous redonnons vie à vos espaces existants.",
        },
        architecture: {
          title: "Architecture & Conception",
          description:
            "Nos architectes créent des projets sur mesure, de l'étude de faisabilité à la réception des travaux.",
        },
      },

      faq: {
        title: "❓ Voici les questions les plus fréquentes :",
        delays: {
          question: "Quels sont vos délais ?",
          answer:
            "⏱️ **Nos Délais** :\n\n• Maison individuelle : 6-10 mois\n• Rénovation complète : 3-6 mois\n• Extension : 2-4 mois\n• Bâtiment commercial : 8-14 mois\n\nNous respectons 98% de nos délais grâce à une planification rigoureuse !",
        },
        guarantees: {
          question: "Quelles garanties proposez-vous ?",
          answer:
            "🛡️ **Nos Garanties** :\n\n✅ Garantie décennale obligatoire\n✅ Garantie de parfait achèvement (1 an)\n✅ Garantie biennale (2 ans)\n✅ Assurance responsabilité civile\n✅ Service après-vente réactif",
        },
        freeQuote: {
          question: "Le devis est-il gratuit ?",
          answer:
            "💰 **Devis Gratuit** :\n\n✅ Étude de faisabilité GRATUITE\n✅ Devis détaillé GRATUIT\n✅ Conseils personnalisés GRATUITS\n✅ Visite sur site GRATUITE\n\nAucun engagement de votre part !",
        },
        serviceArea: {
          question: "Dans quelle zone intervenez-vous ?",
          answer:
            "🗺️ **Zone d'Intervention** :\n\n📍 Lyon et agglomération\n📍 Villefranche-sur-Saône\n📍 Bourg-en-Bresse\n📍 Saint-Étienne\n📍 Autres communes sur demande\n\nNous nous déplaçons dans un rayon de 100km autour de Lyon !",
        },
      },

      contact: {
        title: "📞 **Nos Coordonnées** :",
        address: "📍 123 Rue de la Construction, 69000 Lyon",
        phone: "📞 04 78 XX XX XX",
        email: "📧 contact@constructpro.fr",
        hours: "🕒 **Horaires** :\nLun-Ven : 8h-18h | Sam : 9h-12h",
        emergency: "🚨 Pour les urgences : 06 XX XX XX XX (24h/24)",
      },

      projectTypes: {
        construction: "Construction Neuve",
        renovation: "Rénovation",
        extension: "Extension",
        architecture: "Architecture",
        publicWorks: "Travaux Publics",
        other: "Autre",
      },

      budgets: {
        under50k: "Moins de 50 000€",
        "50k-100k": "50 000€ - 100 000€",
        "100k-200k": "100 000€ - 200 000€",
        "200k-500k": "200 000€ - 500 000€",
        over500k: "Plus de 500 000€",
      },
    },

    forms: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      projectType: "Type de Projet",
      budget: "Budget",
      message: "Message",
      required: "obligatoire",
      send: "Envoyer",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Erreur lors de l'envoi",
    },

    crm: {
      dashboard: "Tableau de Bord",
      contacts: "Contacts",
      leads: "Prospects",
      opportunities: "Opportunités",
      pipeline: "Pipeline",
      activities: "Activités",
      reports: "Rapports",
      settings: "Paramètres",
      newContact: "Nouveau Contact",
      newLead: "Nouveau Prospect",
      newOpportunity: "Nouvelle Opportunité",
      status: {
        new: "Nouveau",
        contacted: "Contacté",
        qualified: "Qualifié",
        proposal: "Proposition",
        negotiation: "Négociation",
        won: "Gagné",
        lost: "Perdu",
      },
      priority: {
        low: "Faible",
        medium: "Moyenne",
        high: "Élevée",
        urgent: "Urgente",
      },
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      blog: "News",
      careers: "Careers",
      contact: "Contact",
      getQuote: "Get Quote",
    },

    chatbot: {
      welcome: "👋 Hello! I'm ConstructPro's virtual assistant. How can I help you today?",
      typing: "Typing...",
      poweredBy: "Powered by ConstructPro",
      offline: "Offline",
      online: "Online",
      respondsIn: "Responds in seconds",

      actions: {
        requestQuote: "Request a quote",
        ourServices: "Our services",
        viewPortfolio: "View our work",
        contactUs: "Contact us",
        faq: "Frequently asked questions",
        backToMenu: "← Back to menu",
        sendRequest: "✅ Send my request",
        callNow: "📞 Call now",
        sendEmail: "📧 Send email",
        retry: "Retry",
        newConversation: "New conversation",
      },

      messages: {
        askName: "Perfect! I'll help you prepare your quote request. To start, what's your name?",
        askEmail: "Nice to meet you {name}! What's your email to send you the quote?",
        askPhone: "Perfect! And your phone number to contact you?",
        askProjectType: "Thank you! Now, what type of project do you have?",
        askBudget: "Perfect! What's your approximate budget?",
        askProjectDescription: "Perfect! Finally, describe your project in a few words:",
        confirmSubmission: "Excellent! I have all the information. Would you like me to send your quote request?",
        submissionSuccess: "🎉 **Request sent successfully!**\n\nWe'll contact you within 24 hours.",
        submissionError: "❌ An error occurred. Can you try again or contact us directly?",
        connectionError: "❌ Connection problem. Please try again or contact us directly.",
        invalidEmail: "The email seems incorrect. Can you enter it again?",
        thankYou: "Thank you for your trust!",
      },

      services: {
        title: "🏗️ We offer three main services:",
        construction: {
          title: "New Construction",
          description:
            "We build all types of new constructions, from individual homes to commercial and industrial buildings.",
        },
        renovation: {
          title: "Renovation & Extension",
          description:
            "Complete transformation, energy renovation, extensions... We bring your existing spaces back to life.",
        },
        architecture: {
          title: "Architecture & Design",
          description: "Our architects create custom projects, from feasibility studies to project completion.",
        },
      },

      faq: {
        title: "❓ Here are the most frequently asked questions:",
        delays: {
          question: "What are your timelines?",
          answer:
            "⏱️ **Our Timelines** :\n\n• Individual house: 6-10 months\n• Complete renovation: 3-6 months\n• Extension: 2-4 months\n• Commercial building: 8-14 months\n\nWe meet 98% of our deadlines thanks to rigorous planning!",
        },
        guarantees: {
          question: "What guarantees do you offer?",
          answer:
            "🛡️ **Our Guarantees** :\n\n✅ Mandatory 10-year guarantee\n✅ Perfect completion guarantee (1 year)\n✅ Two-year guarantee\n✅ Professional liability insurance\n✅ Responsive after-sales service",
        },
        freeQuote: {
          question: "Is the quote free?",
          answer:
            "💰 **Free Quote** :\n\n✅ FREE feasibility study\n✅ FREE detailed quote\n✅ FREE personalized advice\n✅ FREE site visit\n\nNo commitment on your part!",
        },
        serviceArea: {
          question: "What area do you serve?",
          answer:
            "🗺️ **Service Area** :\n\n📍 Lyon and metropolitan area\n📍 Villefranche-sur-Saône\n📍 Bourg-en-Bresse\n📍 Saint-Étienne\n📍 Other municipalities on request\n\nWe travel within a 100km radius around Lyon!",
        },
      },

      contact: {
        title: "📞 **Our Contact Information** :",
        address: "📍 123 Construction Street, 69000 Lyon",
        phone: "📞 04 78 XX XX XX",
        email: "📧 contact@constructpro.fr",
        hours: "🕒 **Hours** :\nMon-Fri: 8am-6pm | Sat: 9am-12pm",
        emergency: "🚨 For emergencies: 06 XX XX XX XX (24/7)",
      },

      projectTypes: {
        construction: "New Construction",
        renovation: "Renovation",
        extension: "Extension",
        architecture: "Architecture",
        publicWorks: "Public Works",
        other: "Other",
      },

      budgets: {
        under50k: "Under €50,000",
        "50k-100k": "€50,000 - €100,000",
        "100k-200k": "€100,000 - €200,000",
        "200k-500k": "€200,000 - €500,000",
        over500k: "Over €500,000",
      },
    },

    forms: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      projectType: "Project Type",
      budget: "Budget",
      message: "Message",
      required: "required",
      send: "Send",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Error sending message",
    },

    crm: {
      dashboard: "Dashboard",
      contacts: "Contacts",
      leads: "Leads",
      opportunities: "Opportunities",
      pipeline: "Pipeline",
      activities: "Activities",
      reports: "Reports",
      settings: "Settings",
      newContact: "New Contact",
      newLead: "New Lead",
      newOpportunity: "New Opportunity",
      status: {
        new: "New",
        contacted: "Contacted",
        qualified: "Qualified",
        proposal: "Proposal",
        negotiation: "Negotiation",
        won: "Won",
        lost: "Lost",
      },
      priority: {
        low: "Low",
        medium: "Medium",
        high: "High",
        urgent: "Urgent",
      },
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Acerca de",
      services: "Servicios",
      portfolio: "Portafolio",
      blog: "Noticias",
      careers: "Carreras",
      contact: "Contacto",
      getQuote: "Solicitar Presupuesto",
    },

    chatbot: {
      welcome: "👋 ¡Hola! Soy el asistente virtual de ConstructPro. ¿Cómo puedo ayudarte hoy?",
      typing: "Escribiendo...",
      poweredBy: "Desarrollado por ConstructPro",
      offline: "Desconectado",
      online: "En línea",
      respondsIn: "Responde en segundos",

      actions: {
        requestQuote: "Solicitar presupuesto",
        ourServices: "Nuestros servicios",
        viewPortfolio: "Ver nuestros trabajos",
        contactUs: "Contáctanos",
        faq: "Preguntas frecuentes",
        backToMenu: "← Volver al menú",
        sendRequest: "✅ Enviar mi solicitud",
        callNow: "📞 Llamar ahora",
        sendEmail: "📧 Enviar email",
        retry: "Reintentar",
        newConversation: "Nueva conversación",
      },

      messages: {
        askName: "¡Perfecto! Te ayudaré a preparar tu solicitud de presupuesto. Para empezar, ¿cuál es tu nombre?",
        askEmail: "¡Encantado de conocerte {name}! ¿Cuál es tu email para enviarte el presupuesto?",
        askPhone: "¡Perfecto! ¿Y tu número de teléfono para contactarte?",
        askProjectType: "¡Gracias! Ahora, ¿qué tipo de proyecto tienes?",
        askBudget: "¡Perfecto! ¿Cuál es tu presupuesto aproximado?",
        askProjectDescription: "¡Perfecto! Para terminar, describe tu proyecto en pocas palabras:",
        confirmSubmission: "¡Excelente! Tengo toda la información. ¿Quieres que envíe tu solicitud de presupuesto?",
        submissionSuccess: "🎉 **¡Solicitud enviada con éxito!**\n\nTe contactaremos en 24 horas.",
        submissionError: "❌ Ocurrió un error. ¿Puedes intentar de nuevo o contactarnos directamente?",
        connectionError: "❌ Problema de conexión. Por favor intenta de nuevo o contáctanos directamente.",
        invalidEmail: "El email parece incorrecto. ¿Puedes ingresarlo de nuevo?",
        thankYou: "¡Gracias por tu confianza!",
      },

      services: {
        title: "🏗️ Ofrecemos tres servicios principales:",
        construction: {
          title: "Construcción Nueva",
          description:
            "Realizamos todo tipo de construcciones nuevas, desde casas individuales hasta edificios comerciales e industriales.",
        },
        renovation: {
          title: "Renovación y Ampliación",
          description:
            "Transformación completa, renovación energética, ampliaciones... Damos nueva vida a tus espacios existentes.",
        },
        architecture: {
          title: "Arquitectura y Diseño",
          description:
            "Nuestros arquitectos crean proyectos a medida, desde estudios de viabilidad hasta la recepción de obras.",
        },
      },

      faq: {
        title: "❓ Aquí están las preguntas más frecuentes:",
        delays: {
          question: "¿Cuáles son sus plazos?",
          answer:
            "⏱️ **Nuestros Plazos** :\n\n• Casa individual: 6-10 meses\n• Renovación completa: 3-6 meses\n• Ampliación: 2-4 meses\n• Edificio comercial: 8-14 meses\n\n¡Cumplimos el 98% de nuestros plazos gracias a una planificación rigurosa!",
        },
        guarantees: {
          question: "¿Qué garantías ofrecen?",
          answer:
            "🛡️ **Nuestras Garantías** :\n\n✅ Garantía decenal obligatoria\n✅ Garantía de terminación perfecta (1 año)\n✅ Garantía bienal (2 años)\n✅ Seguro de responsabilidad civil\n✅ Servicio postventa reactivo",
        },
        freeQuote: {
          question: "¿El presupuesto es gratuito?",
          answer:
            "💰 **Presupuesto Gratuito** :\n\n✅ Estudio de viabilidad GRATUITO\n✅ Presupuesto detallado GRATUITO\n✅ Consejos personalizados GRATUITOS\n✅ Visita al sitio GRATUITA\n\n¡Sin compromiso de tu parte!",
        },
        serviceArea: {
          question: "¿En qué zona intervienen?",
          answer:
            "🗺️ **Zona de Intervención** :\n\n📍 Lyon y área metropolitana\n📍 Villefranche-sur-Saône\n📍 Bourg-en-Bresse\n📍 Saint-Étienne\n📍 Otros municipios bajo solicitud\n\n¡Nos desplazamos en un radio de 100km alrededor de Lyon!",
        },
      },

      contact: {
        title: "📞 **Nuestra Información de Contacto** :",
        address: "📍 123 Calle de la Construcción, 69000 Lyon",
        phone: "📞 04 78 XX XX XX",
        email: "📧 contact@constructpro.fr",
        hours: "🕒 **Horarios** :\nLun-Vie: 8h-18h | Sáb: 9h-12h",
        emergency: "🚨 Para emergencias: 06 XX XX XX XX (24/7)",
      },

      projectTypes: {
        construction: "Construcción Nueva",
        renovation: "Renovación",
        extension: "Ampliación",
        architecture: "Arquitectura",
        publicWorks: "Obras Públicas",
        other: "Otro",
      },

      budgets: {
        under50k: "Menos de €50,000",
        "50k-100k": "€50,000 - €100,000",
        "100k-200k": "€100,000 - €200,000",
        "200k-500k": "€200,000 - €500,000",
        over500k: "Más de €500,000",
      },
    },

    forms: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Email",
      phone: "Teléfono",
      projectType: "Tipo de Proyecto",
      budget: "Presupuesto",
      message: "Mensaje",
      required: "obligatorio",
      send: "Enviar",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito!",
      error: "Error al enviar mensaje",
    },

    crm: {
      dashboard: "Panel de Control",
      contacts: "Contactos",
      leads: "Prospectos",
      opportunities: "Oportunidades",
      pipeline: "Pipeline",
      activities: "Actividades",
      reports: "Reportes",
      settings: "Configuración",
      newContact: "Nuevo Contacto",
      newLead: "Nuevo Prospecto",
      newOpportunity: "Nueva Oportunidad",
      status: {
        new: "Nuevo",
        contacted: "Contactado",
        qualified: "Calificado",
        proposal: "Propuesta",
        negotiation: "Negociación",
        won: "Ganado",
        lost: "Perdido",
      },
      priority: {
        low: "Baja",
        medium: "Media",
        high: "Alta",
        urgent: "Urgente",
      },
    },
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.fr
}

export function detectLanguage(text: string): Language {
  const lowerText = text.toLowerCase()

  // Mots-clés pour détecter l'anglais
  const englishKeywords = [
    "hello",
    "hi",
    "quote",
    "construction",
    "building",
    "renovation",
    "architecture",
    "price",
    "cost",
  ]

  // Mots-clés pour détecter l'espagnol
  const spanishKeywords = [
    "hola",
    "presupuesto",
    "construcción",
    "edificio",
    "renovación",
    "arquitectura",
    "precio",
    "costo",
  ]

  // Mots-clés pour détecter le français
  const frenchKeywords = [
    "bonjour",
    "salut",
    "devis",
    "construction",
    "bâtiment",
    "rénovation",
    "architecture",
    "prix",
    "coût",
  ]

  const englishScore = englishKeywords.filter((keyword) => lowerText.includes(keyword)).length
  const spanishScore = spanishKeywords.filter((keyword) => lowerText.includes(keyword)).length
  const frenchScore = frenchKeywords.filter((keyword) => lowerText.includes(keyword)).length

  if (englishScore > spanishScore && englishScore > frenchScore) {
    return "en"
  } else if (spanishScore > frenchScore) {
    return "es"
  }

  return "fr" // Défaut français
}
