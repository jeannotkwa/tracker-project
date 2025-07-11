import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Home, Building, Zap, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RenovationPage() {
  const renovationTypes = [
    {
      icon: Home,
      title: "Rénovation Complète",
      description: "Transformation totale de votre habitat avec restructuration des espaces.",
      features: ["Démolition et reconstruction", "Nouveaux agencements", "Mise aux normes complète", "Design moderne"],
      image: "/placeholder.svg?height=300&width=400&text=Rénovation+Complète",
    },
    {
      icon: Zap,
      title: "Rénovation Énergétique",
      description: "Amélioration de la performance énergétique pour réduire vos factures.",
      features: ["Isolation renforcée", "Chauffage performant", "Ventilation optimisée", "Aides financières"],
      image: "/placeholder.svg?height=300&width=400&text=Rénovation+Énergétique",
    },
    {
      icon: Building,
      title: "Extension & Agrandissement",
      description: "Agrandissement de votre espace de vie sans déménager.",
      features: ["Extension horizontale", "Surélévation", "Véranda", "Aménagement combles"],
      image: "/placeholder.svg?height=300&width=400&text=Extension+Maison",
    },
    {
      icon: Palette,
      title: "Rénovation Décorative",
      description: "Rafraîchissement et modernisation de vos espaces intérieurs.",
      features: ["Peinture et revêtements", "Sols et carrelages", "Cuisine et salle de bain", "Éclairage design"],
      image: "/placeholder.svg?height=300&width=400&text=Rénovation+Décorative",
    },
  ]

  const beforeAfter = [
    {
      title: "Appartement Haussmannien",
      location: "Lyon 6ème",
      surface: "120 m²",
      before: "/placeholder.svg?height=300&width=400&text=Avant+Rénovation",
      after: "/placeholder.svg?height=300&width=400&text=Après+Rénovation",
      description: "Rénovation complète avec ouverture des espaces et modernisation.",
    },
    {
      title: "Maison des Années 70",
      location: "Villeurbanne",
      surface: "150 m²",
      before: "/placeholder.svg?height=300&width=400&text=Avant+Rénovation+70s",
      after: "/placeholder.svg?height=300&width=400&text=Après+Rénovation+Moderne",
      description: "Transformation énergétique et esthétique complète.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black">Rénovation & Extension</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Rénovation et Extension de Bâtiments</h1>
              <p className="text-xl mb-8">
                Donnez une nouvelle vie à votre habitat ! Spécialistes de la rénovation depuis 25 ans, nous transformons
                vos espaces avec expertise et créativité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href="/contact">Demander un Devis</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent"
                >
                  <Link href="/portfolio">Voir Nos Rénovations</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600&text=Rénovation+Moderne"
                alt="Rénovation moderne"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types de Rénovation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Types de Rénovation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la rénovation énergétique à la transformation complète, nous adaptons nos services à vos besoins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {renovationTypes.map((type, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={type.image || "/placeholder.svg"}
                  alt={type.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <type.icon className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avant/Après */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Avant / Après</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez la transformation spectaculaire de nos projets de rénovation.
            </p>
          </div>

          <div className="space-y-16">
            {beforeAfter.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative">
                      <Image
                        src={project.before || "/placeholder.svg"}
                        alt={`${project.title} - Avant`}
                        width={500}
                        height={400}
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white">Avant</Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Image
                        src={project.after || "/placeholder.svg"}
                        alt={`${project.title} - Après`}
                        width={500}
                        height={400}
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white">Après</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="mr-4">{project.location}</span>
                      <span>{project.surface}</span>
                    </div>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformez Votre Habitat</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous pour une étude personnalisée de votre projet de rénovation ou d'extension.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Link href="/contact">Demander un Devis Gratuit</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
