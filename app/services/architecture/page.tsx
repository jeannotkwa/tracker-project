import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Compass, FileText, Eye, Cog } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ArchitecturePage() {
  const services = [
    {
      icon: Compass,
      title: "Études de Faisabilité",
      description: "Analyse complète de votre projet pour valider sa faisabilité technique et réglementaire.",
      features: ["Étude de terrain", "Contraintes urbanistiques", "Budget prévisionnel", "Planning réaliste"],
      image: "/placeholder.svg?height=300&width=400&text=Étude+Faisabilité",
    },
    {
      icon: FileText,
      title: "Conception & Plans",
      description: "Création de plans architecturaux personnalisés selon vos besoins et contraintes.",
      features: ["Plans 2D et 3D", "Modélisation BIM", "Rendus photoréalistes", "Plans techniques"],
      image: "/placeholder.svg?height=300&width=400&text=Plans+Architecture",
    },
    {
      icon: Eye,
      title: "Permis de Construire",
      description: "Constitution et suivi de votre dossier de permis de construire jusqu'à l'obtention.",
      features: ["Dossier complet", "Suivi administratif", "Modifications si nécessaire", "Délais optimisés"],
      image: "/placeholder.svg?height=300&width=400&text=Permis+Construire",
    },
    {
      icon: Cog,
      title: "Suivi de Chantier",
      description: "Accompagnement et contrôle de la réalisation pour respecter les plans et la qualité.",
      features: ["Visites régulières", "Contrôle qualité", "Coordination équipes", "Réception travaux"],
      image: "/placeholder.svg?height=300&width=400&text=Suivi+Chantier",
    },
  ]

  const architecturalStyles = [
    {
      title: "Architecture Contemporaine",
      description: "Lignes épurées, matériaux modernes et intégration environnementale.",
      image: "/placeholder.svg?height=300&width=400&text=Architecture+Contemporaine",
      features: ["Design minimaliste", "Grandes ouvertures", "Matériaux nobles", "Efficacité énergétique"],
    },
    {
      title: "Architecture Traditionnelle",
      description: "Respect du patrimoine local avec matériaux et techniques traditionnels.",
      image: "/placeholder.svg?height=300&width=400&text=Architecture+Traditionnelle",
      features: ["Matériaux locaux", "Savoir-faire artisanal", "Intégration paysagère", "Charme authentique"],
    },
    {
      title: "Architecture Bioclimatique",
      description: "Conception optimisée pour le climat local et l'efficacité énergétique.",
      image: "/placeholder.svg?height=300&width=400&text=Architecture+Bioclimatique",
      features: ["Orientation optimale", "Isolation performante", "Énergies renouvelables", "Confort naturel"],
    },
  ]

  const team = [
    {
      name: "Marie Leroy",
      role: "Architecte en Chef",
      speciality: "Architecture résidentielle et commerciale",
      experience: "15 ans",
      image: "/placeholder.svg?height=300&width=300&text=Marie+Leroy",
    },
    {
      name: "Thomas Dubois",
      role: "Architecte Senior",
      speciality: "Rénovation et patrimoine",
      experience: "12 ans",
      image: "/placeholder.svg?height=300&width=300&text=Thomas+Dubois",
    },
    {
      name: "Sophie Martin",
      role: "Architecte",
      speciality: "Architecture durable et bioclimatique",
      experience: "8 ans",
      image: "/placeholder.svg?height=300&width=300&text=Sophie+Martin",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black">Architecture & Conception</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Services d'Architecture et de Conception</h1>
              <p className="text-xl mb-8">
                Nos architectes expérimentés donnent vie à vos projets avec créativité et expertise technique. De la
                conception à la réalisation, nous vous accompagnons à chaque étape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href="/contact">Demander un Devis</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  <Link href="/portfolio">Voir Nos Créations</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600&text=Architecture+Design"
                alt="Architecture et design"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Architecture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services d'Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'étude de faisabilité à la réception des travaux, nous vous accompagnons dans toutes les phases de
              votre projet architectural.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <service.icon className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
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

      {/* Styles Architecturaux */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Styles Architecturaux</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous maîtrisons différents styles architecturaux pour répondre à tous vos goûts et contraintes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {architecturalStyles.map((style, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={style.image || "/placeholder.svg"}
                  alt={style.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{style.title}</h3>
                  <p className="text-gray-600 mb-4">{style.description}</p>
                  <div className="space-y-2">
                    {style.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
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

      {/* Équipe d'Architectes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Équipe d'Architectes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels expérimentés et passionnés pour donner vie à vos projets architecturaux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow text-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.speciality}</p>
                  <Badge variant="outline">{member.experience} d'expérience</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Concrétisez Votre Vision Architecturale</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nos architectes sont à votre écoute pour créer des espaces uniques qui vous ressemblent.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Link href="/contact">Consulter un Architecte</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
