import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Home, Wrench, PenTool, CheckCircle, ArrowRight, Hammer, Building, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Building,
      title: "Construction Neuve",
      description: "Construction de maisons individuelles, bâtiments commerciaux et industriels",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Maisons individuelles sur mesure",
        "Bâtiments commerciaux et industriels",
        "Logements collectifs",
        "Constructions écologiques",
        "Suivi de chantier complet",
      ],
      process: "De l'étude de faisabilité à la remise des clés, nous gérons votre projet dans sa globalité.",
    },
    {
      icon: Wrench,
      title: "Rénovation & Extension",
      description: "Rénovation complète, extension et transformation de bâtiments existants",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Rénovation énergétique",
        "Extensions de maisons",
        "Transformation de locaux",
        "Mise aux normes",
        "Rénovation de façades",
      ],
      process: "Diagnostic, conception, réalisation : nous redonnons vie à vos espaces existants.",
    },
    {
      icon: PenTool,
      title: "Architecture & Conception",
      description: "Conception architecturale, plans et suivi de projets",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Études de faisabilité",
        "Conception de plans",
        "Permis de construire",
        "Suivi de chantier",
        "Architecture durable",
      ],
      process: "De l'idée à la réalisation, nos architectes donnent forme à vos projets.",
    },
  ]

  const specialties = [
    {
      icon: Home,
      title: "Gros Œuvre",
      description: "Fondations, murs porteurs, charpente, couverture",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Palette,
      title: "Second Œuvre",
      description: "Plomberie, électricité, isolation, cloisons",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Building2,
      title: "Aménagement",
      description: "Finitions, peinture, revêtements, aménagements",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Hammer,
      title: "Travaux Publics",
      description: "Voirie, réseaux, terrassement, assainissement",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-yellow-500 text-black">Nos Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Une Expertise Complète à Votre Service</h1>
            <p className="text-xl max-w-3xl mx-auto">
              De la conception à la réalisation, nous maîtrisons tous les aspects de vos projets de construction,
              rénovation et architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  <p className="text-gray-600 mb-6">{service.process}</p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild>
                    <Link href="/contact">
                      Demander un Devis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Nos Spécialités</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Expertise Technique Complète</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos équipes spécialisées maîtrisent tous les corps de métier pour vous offrir une prestation complète et
              de qualité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={specialty.image || "/placeholder.svg"}
                  alt={specialty.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <specialty.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{specialty.title}</h3>
                  <p className="text-gray-600">{specialty.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Notre Processus</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment Nous Travaillons</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthode éprouvée pour garantir la réussite de votre projet, du premier contact à la livraison finale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Analyse de vos besoins et étude de faisabilité de votre projet.",
              },
              {
                step: "02",
                title: "Conception",
                description: "Élaboration des plans et devis détaillé avec nos architectes.",
              },
              {
                step: "03",
                title: "Réalisation",
                description: "Exécution des travaux par nos équipes qualifiées et expérimentées.",
              },
              {
                step: "04",
                title: "Livraison",
                description: "Réception des travaux et remise des clés avec garanties.",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à Concrétiser Votre Projet ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour une consultation gratuite et un devis personnalisé adapté à vos besoins
            spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/contact">Demander un Devis Gratuit</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
            >
              <Link href="/portfolio">Voir Nos Réalisations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
