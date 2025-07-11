"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    { id: "all", label: "Tous les Projets" },
    { id: "residential", label: "Résidentiel" },
    { id: "commercial", label: "Commercial" },
    { id: "industrial", label: "Industriel" },
    { id: "renovation", label: "Rénovation" },
    { id: "public", label: "Public" },
  ]

  const projects = [
    {
      id: 1,
      title: "Villa Contemporaine Les Jardins",
      category: "residential",
      location: "Lyon 6ème",
      year: "2024",
      surface: "250 m²",
      budget: "450 000€",
      description:
        "Villa moderne avec piscine et jardin paysager. Architecture contemporaine alliant confort et performance énergétique.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Construction Neuve", "Maison Individuelle", "Piscine"],
      services: ["Gros Œuvre", "Second Œuvre", "Aménagement Extérieur"],
    },
    {
      id: 2,
      title: "Centre Commercial Confluence",
      category: "commercial",
      location: "Lyon 2ème",
      year: "2023",
      surface: "5 000 m²",
      budget: "2 500 000€",
      description:
        "Centre commercial moderne avec parking souterrain de 200 places. Conception durable et espaces modulables.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Gros Œuvre", "Commercial", "Parking"],
      services: ["Construction", "Aménagement", "Parking"],
    },
    {
      id: 3,
      title: "Rénovation Loft Industriel",
      category: "renovation",
      location: "Villeurbanne",
      year: "2024",
      surface: "180 m²",
      budget: "180 000€",
      description:
        "Transformation complète d'un ancien entrepôt en loft de luxe. Conservation des éléments industriels authentiques.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Rénovation", "Loft", "Industriel"],
      services: ["Rénovation", "Aménagement", "Design"],
    },
    {
      id: 4,
      title: "Résidence Les Terrasses",
      category: "residential",
      location: "Caluire-et-Cuire",
      year: "2023",
      surface: "1 200 m²",
      budget: "1 800 000€",
      description:
        "Résidence de 12 appartements avec terrasses et espaces verts. Architecture bioclimatique et matériaux durables.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Logement Collectif", "Terrasses", "Écologique"],
      services: ["Construction", "Architecture", "Paysagisme"],
    },
    {
      id: 5,
      title: "Usine Agroalimentaire BioTech",
      category: "industrial",
      location: "Meyzieu",
      year: "2023",
      surface: "3 500 m²",
      budget: "1 200 000€",
      description:
        "Usine moderne respectant les normes alimentaires les plus strictes. Conception optimisée pour les flux de production.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Industriel", "Agroalimentaire", "Normes"],
      services: ["Gros Œuvre", "Installations", "Normes"],
    },
    {
      id: 6,
      title: "École Primaire Écologique",
      category: "public",
      location: "Bron",
      year: "2022",
      surface: "2 800 m²",
      budget: "3 200 000€",
      description:
        "École primaire de 12 classes avec restaurant scolaire. Bâtiment passif avec panneaux solaires et récupération d'eau.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Public", "École", "Écologique"],
      services: ["Construction", "Énergies Renouvelables", "Aménagement"],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-yellow-500 text-black">Nos Réalisations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio de Nos Projets</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Découvrez nos réalisations récentes qui témoignent de notre savoir-faire et de notre engagement qualité
              dans tous les domaines de la construction.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{project.year}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium">Surface:</span>
                      <br />
                      <span className="text-gray-600">{project.surface}</span>
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span>
                      <br />
                      <span className="text-gray-600">{project.budget}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors bg-transparent"
                    asChild
                  >
                    <Link href={`/portfolio/${project.id}`}>Voir le Projet</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun projet trouvé pour ces critères.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchTerm("")
                }}
                className="mt-4"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Chiffres Clés</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projets Réalisés" },
              { number: "25", label: "Années d'Expérience" },
              { number: "98%", label: "Clients Satisfaits" },
              { number: "50M€", label: "Chiffre d'Affaires" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Votre Projet Sera Notre Prochaine Réussite</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez nos clients satisfaits et confiez-nous la réalisation de votre projet de construction ou de
            rénovation.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Link href="/contact">Démarrer Mon Projet</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
