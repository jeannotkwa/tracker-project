import type { CRMContact, CRMLead, CRMOpportunity, CRMActivity, CRMStats, CRMIntegration } from "./types"

export class CRMService {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl = "/api/crm", apiKey?: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_CRM_API_KEY || ""
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`CRM API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Contacts
  async getContacts(params?: {
    page?: number
    limit?: number
    search?: string
    source?: string
    assignedTo?: string
  }): Promise<{ contacts: CRMContact[]; total: number; page: number; limit: number }> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.search) searchParams.set("search", params.search)
    if (params?.source) searchParams.set("source", params.source)
    if (params?.assignedTo) searchParams.set("assignedTo", params.assignedTo)

    return this.request<{ contacts: CRMContact[]; total: number; page: number; limit: number }>(
      `/contacts?${searchParams.toString()}`,
    )
  }

  async getContact(id: string): Promise<CRMContact> {
    return this.request<CRMContact>(`/contacts/${id}`)
  }

  async createContact(contact: Omit<CRMContact, "id" | "createdAt" | "updatedAt">): Promise<CRMContact> {
    return this.request<CRMContact>("/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    })
  }

  async updateContact(id: string, updates: Partial<CRMContact>): Promise<CRMContact> {
    return this.request<CRMContact>(`/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async deleteContact(id: string): Promise<void> {
    await this.request(`/contacts/${id}`, { method: "DELETE" })
  }

  // Leads
  async getLeads(params?: {
    page?: number
    limit?: number
    status?: string
    assignedTo?: string
    projectType?: string
  }): Promise<{ leads: CRMLead[]; total: number; page: number; limit: number }> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.status) searchParams.set("status", params.status)
    if (params?.assignedTo) searchParams.set("assignedTo", params.assignedTo)
    if (params?.projectType) searchParams.set("projectType", params.projectType)

    return this.request<{ leads: CRMLead[]; total: number; page: number; limit: number }>(
      `/leads?${searchParams.toString()}`,
    )
  }

  async getLead(id: string): Promise<CRMLead> {
    return this.request<CRMLead>(`/leads/${id}`)
  }

  async createLead(lead: Omit<CRMLead, "id" | "createdAt" | "updatedAt" | "activities">): Promise<CRMLead> {
    return this.request<CRMLead>("/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    })
  }

  async updateLead(id: string, updates: Partial<CRMLead>): Promise<CRMLead> {
    return this.request<CRMLead>(`/leads/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async deleteLead(id: string): Promise<void> {
    await this.request(`/leads/${id}`, { method: "DELETE" })
  }

  // Opportunities
  async getOpportunities(params?: {
    page?: number
    limit?: number
    stage?: string
    assignedTo?: string
  }): Promise<{ opportunities: CRMOpportunity[]; total: number; page: number; limit: number }> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.stage) searchParams.set("stage", params.stage)
    if (params?.assignedTo) searchParams.set("assignedTo", params.assignedTo)

    return this.request<{ opportunities: CRMOpportunity[]; total: number; page: number; limit: number }>(
      `/opportunities?${searchParams.toString()}`,
    )
  }

  async createOpportunity(
    opportunity: Omit<CRMOpportunity, "id" | "createdAt" | "updatedAt">,
  ): Promise<CRMOpportunity> {
    return this.request<CRMOpportunity>("/opportunities", {
      method: "POST",
      body: JSON.stringify(opportunity),
    })
  }

  // Activities
  async getActivities(params?: {
    contactId?: string
    leadId?: string
    opportunityId?: string
    assignedTo?: string
    type?: string
    status?: string
  }): Promise<CRMActivity[]> {
    const searchParams = new URLSearchParams()
    if (params?.contactId) searchParams.set("contactId", params.contactId)
    if (params?.leadId) searchParams.set("leadId", params.leadId)
    if (params?.opportunityId) searchParams.set("opportunityId", params.opportunityId)
    if (params?.assignedTo) searchParams.set("assignedTo", params.assignedTo)
    if (params?.type) searchParams.set("type", params.type)
    if (params?.status) searchParams.set("status", params.status)

    return this.request<CRMActivity[]>(`/activities?${searchParams.toString()}`)
  }

  async createActivity(activity: Omit<CRMActivity, "id" | "createdAt" | "updatedAt">): Promise<CRMActivity> {
    return this.request<CRMActivity>("/activities", {
      method: "POST",
      body: JSON.stringify(activity),
    })
  }

  // Statistics
  async getStats(period?: "week" | "month" | "quarter" | "year"): Promise<CRMStats> {
    const searchParams = new URLSearchParams()
    if (period) searchParams.set("period", period)

    return this.request<CRMStats>(`/stats?${searchParams.toString()}`)
  }

  // Integrations
  async getIntegrations(): Promise<CRMIntegration[]> {
    return this.request<CRMIntegration[]>("/integrations")
  }

  async syncIntegration(integrationId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/integrations/${integrationId}/sync`, {
      method: "POST",
    })
  }

  // Chatbot Integration
  async createLeadFromChatbot(data: {
    name: string
    email: string
    phone: string
    projectType: string
    budget?: string
    message: string
    language: string
    source: string
  }): Promise<{ contact: CRMContact; lead: CRMLead }> {
    return this.request<{ contact: CRMContact; lead: CRMLead }>("/chatbot/lead", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async trackChatbotInteraction(data: {
    sessionId: string
    action: string
    data: any
    language: string
  }): Promise<void> {
    await this.request("/chatbot/interaction", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

// Instance globale du service CRM
export const crmService = new CRMService()
