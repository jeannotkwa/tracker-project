"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Phone, Mail, Building, Filter, Download, Eye } from "lucide-react"
import { ContactForm } from "./contact-form"
import { ContactDetails } from "./contact-details"
import { crmService } from "@/lib/crm/crm-service"
import type { CRMContact } from "@/lib/crm/types"

export function ContactsTable() {
  const [contacts, setContacts] = useState<CRMContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSource, setSelectedSource] = useState<string>("")
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  })

  useEffect(() => {
    loadContacts()
  }, [pagination.page, searchTerm, selectedSource])

  const loadContacts = async () => {
    try {
      setIsLoading(true)
      const response = await crmService.getContacts({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        source: selectedSource,
      })

      setContacts(response.contacts)
      setPagination((prev) => ({
        ...prev,
        total: response.total,
      }))
    } catch (error) {
      console.error("Erreur lors du chargement des contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactSaved = () => {
    loadContacts()
    setIsContactFormOpen(false)
  }

  const handleEditContact = (contact: CRMContact) => {
    setSelectedContact(contact)
    setIsContactFormOpen(true)
  }

  const handleViewContact = (contact: CRMContact) => {
    setSelectedContact(contact)
    setIsContactDetailsOpen(true)
  }

  const handleDeleteContact = async (contactId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
      try {
        await crmService.deleteContact(contactId)
        loadContacts()
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const getSourceColor = (source: string) => {
    const colors = {
      website: "bg-blue-100 text-blue-800",
      chatbot: "bg-green-100 text-green-800",
      referral: "bg-purple-100 text-purple-800",
      social: "bg-pink-100 text-pink-800",
      advertising: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[source as keyof typeof colors] || colors.other
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Contacts ({pagination.total})
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
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedContact ? "Modifier le Contact" : "Nouveau Contact"}</DialogTitle>
                </DialogHeader>
                <ContactForm
                  contact={selectedContact}
                  onSaved={handleContactSaved}
                  onCancel={() => {
                    setIsContactFormOpen(false)
                    setSelectedContact(null)
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
              placeholder="Rechercher par nom, email ou entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Toutes les sources</option>
            <option value="website">Site web</option>
            <option value="chatbot">Chatbot</option>
            <option value="referral">Recommandation</option>
            <option value="social">Réseaux sociaux</option>
            <option value="advertising">Publicité</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Entreprise</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Source</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Langue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Dernière activité</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Aucun contact trouvé
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getInitials(contact.firstName, contact.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">{contact.company || "-"}</div>
                        {contact.position && <div className="text-sm text-gray-500">{contact.position}</div>}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getSourceColor(contact.source)}>{contact.source}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{contact.language.toUpperCase()}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        {contact.lastContactedAt
                          ? new Date(contact.lastContactedAt).toLocaleDateString("fr-FR")
                          : "Jamais"}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewContact(contact)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteContact(contact.id)} className="text-red-600">
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
              {Math.min(pagination.page * pagination.limit, pagination.total)} sur {pagination.total} contacts
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

      {/* Dialog pour les détails du contact */}
      <Dialog open={isContactDetailsOpen} onOpenChange={setIsContactDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails du Contact</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <ContactDetails
              contact={selectedContact}
              onClose={() => {
                setIsContactDetailsOpen(false)
                setSelectedContact(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
