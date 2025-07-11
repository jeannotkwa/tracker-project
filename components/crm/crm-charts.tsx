"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, PieChart, TrendingUp } from "lucide-react"
import type { CRMStats } from "@/lib/crm/types"

interface CRMChartsProps {
  stats: CRMStats | null
}

export function CRMCharts({ stats }: CRMChartsProps) {
  if (!stats) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Évolution Mensuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Graphique d'évolution</p>
              <p className="text-sm text-gray-500">Croissance: +{stats.monthlyGrowth}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Répartition Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Valeur Pipeline</span>
              <span className="text-lg font-bold">{stats.pipelineValue.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Affaires Gagnées</span>
              <span className="text-green-600 font-medium">{stats.wonDeals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Affaires Perdues</span>
              <span className="text-red-600 font-medium">{stats.lostDeals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Taux de Conversion</span>
              <span className="text-blue-600 font-medium">{stats.conversionRate}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
