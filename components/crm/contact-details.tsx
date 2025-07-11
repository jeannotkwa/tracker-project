"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Building, Calendar, Tag, MessageSquare, Target, Edit, Plus } from "lucide-react"
import { crmService } from "@/lib/crm/crm-service"
import type { CRMContact, CRMLead, CRMActivity } from "@/lib/crm/types"

interface ContactDetailsProps {
  contact: CRMContact
  onClose: () => void
}

export function ContactDetails({ contact, onClose }: ContactDetailsProps) {
  const [leads, setLeads] = useState<CRMLead[]>([])
  const [activities, setActivities] = useState<CRMActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContactData()
  }, [contact.id])

  const loadContactData = async () => {
    try {
      setIsLoading(true)
      const [leadsData, activitiesData] = await Promise.all([
        crmService.getLeads({ contactId: contact.id }),
        crmService.getActivities({ contactId: contact.id }),
      ])

      setLeads(leadsData.leads)
      setActivities(activitiesData)
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
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

  return (
    <div className="space-y-6">
      {/* En-tête du contact */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {getInitials(contact.firstName, contact.lastName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {contact.firstName} {contact.lastName}
            </h2>
            {contact.company && (
              <p className="text-gray-600 flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {contact.company}
                {contact.position && ` - ${contact.position}`}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {contact.email}
              </span>
              {contact.phone && (
                <span className="text-sm text-gray-500 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.phone}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </div>

      {/* Informations générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <Badge className={getSourceColor(contact.source)}>{contact.source}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Langue</p>
                <Badge variant="outline">{contact.language.toUpperCase()}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Créé le</p>
                <p className="font-medium">{new Date(contact.createdAt).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {contact.tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Onglets */}
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Prospects ({leads.length})</TabsTrigger>
          <TabsTrigger value="activities">Activités ({activities.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Prospects associés</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Prospect
            </Button>
          </div>

          {leads.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun prospect associé à ce contact</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{lead.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{lead.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                          <span className="text-sm text-gray-500">{lead.estimatedValue.toLocaleString()}€</span>
                          <span className="text-sm text-gray-500">
                            {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Historique des activités</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Activité
            </Button>
          </div>

          {activities.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune activité enregistrée</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{activity.title}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contact.notes ? (
                <div className="whitespace-pre-wrap">{contact.notes}</div>
              ) : (
                <p className="text-gray-500 italic">Aucune note disponible</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
