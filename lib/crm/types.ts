export interface CRMContact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  source: "website" | "chatbot" | "referral" | "social" | "advertising" | "other"
  language: "fr" | "en" | "es"
  tags: string[]
  notes: string
  createdAt: Date
  updatedAt: Date
  lastContactedAt?: Date
  assignedTo?: string
  customFields: Record<string, any>
}

export interface CRMLead {
  id: string
  contactId: string
  title: string
  description: string
  projectType: "construction" | "renovation" | "extension" | "architecture" | "publicWorks" | "other"
  budget?: string
  estimatedValue: number
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost"
  priority: "low" | "medium" | "high" | "urgent"
  source: string
  assignedTo?: string
  expectedCloseDate?: Date
  actualCloseDate?: Date
  lostReason?: string
  tags: string[]
  notes: string
  createdAt: Date
  updatedAt: Date
  activities: CRMActivity[]
}

export interface CRMOpportunity {
  id: string
  leadId: string
  contactId: string
  title: string
  description: string
  value: number
  probability: number
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closing" | "won" | "lost"
  expectedCloseDate: Date
  actualCloseDate?: Date
  assignedTo: string
  products: string[]
  competitors: string[]
  nextAction: string
  nextActionDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface CRMActivity {
  id: string
  type: "call" | "email" | "meeting" | "task" | "note" | "quote_sent" | "proposal_sent" | "contract_signed"
  title: string
  description: string
  contactId?: string
  leadId?: string
  opportunityId?: string
  assignedTo: string
  status: "planned" | "completed" | "cancelled"
  scheduledAt?: Date
  completedAt?: Date
  duration?: number
  outcome?: string
  nextAction?: string
  createdAt: Date
  updatedAt: Date
}

export interface CRMPipeline {
  id: string
  name: string
  stages: CRMPipelineStage[]
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CRMPipelineStage {
  id: string
  name: string
  order: number
  probability: number
  color: string
}

export interface CRMStats {
  totalContacts: number
  totalLeads: number
  totalOpportunities: number
  totalValue: number
  conversionRate: number
  averageDealSize: number
  salesCycle: number
  monthlyGrowth: number
  topSources: Array<{ source: string; count: number; percentage: number }>
  pipelineValue: number
  wonDeals: number
  lostDeals: number
}

export interface CRMIntegration {
  id: string
  name: string
  type: "hubspot" | "salesforce" | "pipedrive" | "zoho" | "custom"
  isActive: boolean
  config: Record<string, any>
  lastSyncAt?: Date
  syncStatus: "success" | "error" | "pending"
  syncErrors: string[]
}
