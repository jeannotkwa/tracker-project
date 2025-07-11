"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Target, Filter, Download, Eye, DollarSign } from "lucide-react"
import { LeadForm } from "./lead-form"
import { LeadDetails } from "./lead-details"
import { crmService } from "@/lib/crm/crm-service"
import type { CRMLead } from "@/lib/crm/types"

export function LeadsTable() {
  const [leads, setLeads] = useState<CRMLead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedProjectType, setSelectedProjectType] = useState<string>("")
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null)
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  })

  useEffect(() => {
    loadLeads()
  }, [pagination.page, selectedStatus, selectedProjectType])

  const loadLeads = async () => {
    try {
      setIsLoading(true)
      const response = await crmService.getLeads({
        page: pagination.page,
        limit: pagination.limit,
        status: selectedStatus,
        projectType: selectedProjectType,
      })

      setLeads(response.leads)
      setPagination((prev) => ({
        ...prev,
        total: response.total,
      }))
    } catch (error) {
      console.error("Erreur lors du chargement des prospects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLeadSaved = () => {
    loadLeads()
    setIsLeadFormOpen(false)
  }

  const handleEditLead = (lead: CRMLead) => {
    setSelectedLead(lead)
    setIsLeadFormOpen(true)
  }

  const handleViewLead = (lead: CRMLead) => {
    setSelectedLead(lead)
    setIsLeadDetailsOpen(true)
  }

  const handleDeleteLead = async (leadId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce prospect ?")) {
      try {
        await crmService.deleteLead(leadId)
        loadLeads()
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-green-100 text-green-800",
      proposal: "bg-purple-100 text-purple-800",
      negotiation: "bg-orange-100 text-orange-800",
      won: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || colors.new
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const getProjectTypeLabel = (type: string) => {
    const labels = {
      construction: "Construction",
      renovation: "Rénovation",
      extension: "Extension",
      architecture: "Architecture",
      publicWorks: "Travaux Publics",
      other: "Autre",
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Prospects ({pagination.total})
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Prospect
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedLead ? "Modifier le Prospect" : "Nouveau Prospect"}</DialogTitle>
                </DialogHeader>
                <LeadForm
                  lead={selectedLead}
                  onSaved={handleLeadSaved}
                  onCancel={() => {
                    setIsLeadFormOpen(false)
                    setSelectedLead(null)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par titre ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="contacted">Contacté</option>
            <option value="qualified">Qualifié</option>
            <option value="proposal">Proposition</option>
            <option value="negotiation">Négociation</option>
            <option value="won">Gagné</option>
            <option value="lost">Perdu</option>
          </select>
          <select
            value={selectedProjectType}
            onChange={(e) => setSelectedProjectType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Tous les types</option>
            <option value="construction">Construction</option>
            <option value="renovation">Rénovation</option>
            <option value="extension">Extension</option>
            <option value="architecture">Architecture</option>
            <option value="publicWorks">Travaux Publics</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Prospect</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type de Projet</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Valeur Estimée</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Priorité</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Créé le</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    Aucun prospect trouvé
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">{lead.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{lead.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{getProjectTypeLabel(lead.projectType)}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span className="font-medium">{lead.estimatedValue.toLocaleString()}€</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getPriorityColor(lead.priority)}>{lead.priority}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">{new Date(lead.createdAt).toLocaleDateString("fr-FR")}</div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewLead(lead)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteLead(lead.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total > pagination.limit && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Affichage de {(pagination.page - 1) * pagination.limit + 1} à{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} sur {pagination.total} prospects
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page * pagination.limit >= pagination.total}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* Dialog pour les détails du prospect */}
      <Dialog open={isLeadDetailsOpen} onOpenChange={setIsLeadDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails du Prospect</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <LeadDetails
              lead={selectedLead}
              onClose={() => {
                setIsLeadDetailsOpen(false)
                setSelectedLead(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
