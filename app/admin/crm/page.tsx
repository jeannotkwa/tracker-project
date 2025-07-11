"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, DollarSign, Target, Download, RefreshCw } from "lucide-react"
import { ContactsTable } from "@/components/crm/contacts-table"
import { LeadsTable } from "@/components/crm/leads-table"
import { OpportunitiesTable } from "@/components/crm/opportunities-table"
import { PipelineView } from "@/components/crm/pipeline-view"
import { ActivitiesTimeline } from "@/components/crm/activities-timeline"
import { CRMCharts } from "@/components/crm/crm-charts"
import { crmService } from "@/lib/crm/crm-service"
import type { CRMStats as CRMStatsType } from "@/lib/crm/types"

export default function CRMDashboard() {
  const [stats, setStats] = useState<CRMStatsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter" | "year">("month")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    loadStats()
  }, [selectedPeriod])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      const data = await crmService.getStats(selectedPeriod)
      setStats(data)
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    loadStats()
  }

  const handleExport = () => {
    // Logique d'export des données
    console.log("Export des données CRM")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
              <p className="text-gray-600">Gestion des contacts, prospects et opportunités</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contacts Totaux</p>
                    <p className="text-2xl font-bold">{stats.totalContacts}</p>
                    <p className="text-xs text-green-600">+{stats.monthlyGrowth}% ce mois</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Prospects Actifs</p>
                    <p className="text-2xl font-bold">{stats.totalLeads}</p>
                    <p className="text-xs text-blue-600">Taux conversion: {stats.conversionRate}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Valeur Pipeline</p>
                    <p className="text-2xl font-bold">{stats.pipelineValue.toLocaleString()}€</p>
                    <p className="text-xs text-purple-600">{stats.totalOpportunities} opportunités</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Affaires Gagnées</p>
                    <p className="text-2xl font-bold">{stats.wonDeals}</p>
                    <p className="text-xs text-orange-600">Cycle: {stats.salesCycle} jours</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="leads">Prospects</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="activities">Activités</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CRMCharts stats={stats} />
              <Card>
                <CardHeader>
                  <CardTitle>Sources de Prospects</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats?.topSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{source.count}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <ActivitiesTimeline />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTable />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsTable />
          </TabsContent>

          <TabsContent value="opportunities">
            <OpportunitiesTable />
          </TabsContent>

          <TabsContent value="pipeline">
            <PipelineView />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesTimeline detailed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
