import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Clock, Users, Award, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ConstructionPage() {
  const processSteps = [
    {
      step: "01",
      title: "Étude de Faisabilité",
      description: "Analyse du terrain, étude géotechnique et vérification des contraintes urbanistiques.",
      duration: "2-3 semaines",
    },
    {
      step: "02",
      title: "Conception & Plans",
      description: "Élaboration des plans architecturaux et techniques en collaboration avec nos architectes.",
      duration: "4-6 semaines",
    },
    {
      step: "03",
      title: "Permis de Construire",
      description: "Constitution et dépôt du dossier de permis de construire auprès des autorités compétentes.",
      duration: "2-3 mois",
    },
    {
      step: "04",
      title: "Préparation du Chantier",
      description: "Préparation du terrain, installation du chantier et commande des matériaux.",
      duration: "1-2 semaines",
    },
    {
      step: "05",
      title: "Gros Œuvre",
      description: "Fondations, élévation des murs, charpente et couverture.",
      duration: "3-6 mois",
    },
    {
      step: "06",
      title: "Second Œuvre",
      description: "Plomberie, électricité, isolation, cloisons et finitions.",
      duration: "2-4 mois",
    },
    {
      step: "07",
      title: "Finitions & Livraison",
      description: "Finitions, nettoyage, réception des travaux et remise des clés.",
      duration: "2-4 semaines",
    },
  ]

  const services = [
    {
      title: "Maisons Individuelles",
      description: "Construction de maisons sur mesure adaptées à vos besoins et votre budget.",
      features: ["Plans personnalisés", "Choix des matériaux", "Suivi personnalisé", "Garantie décennale"],
      image: "/placeholder.svg?height=300&width=400&text=Maison+Individuelle",
    },
    {
      title: "Bâtiments Commerciaux",
      description: "Conception et construction de locaux commerciaux et bureaux.",
      features: ["Espaces modulables", "Normes ERP", "Accessibilité PMR", "Efficacité énergétique"],
      image: "/placeholder.svg?height=300&width=400&text=Bâtiment+Commercial",
    },
    {
      title: "Constructions Industrielles",
      description: "Bâtiments industriels et entrepôts adaptés à votre activité.",
      features: ["Grandes portées", "Résistance renforcée", "Équipements spécialisés", "Normes industrielles"],
      image: "/placeholder.svg?height=300&width=400&text=Bâtiment+Industriel",
    },
    {
      title: "Logements Collectifs",
      description: "Immeubles résidentiels et programmes immobiliers.",
      features: ["Optimisation des espaces", "Normes RT2020", "Espaces communs", "Parking intégré"],
      image: "/placeholder.svg?height=300&width=400&text=Logement+Collectif",
    },
  ]

  const advantages = [
    {
      icon: Users,
      title: "Équipe Experte",
      description: "Plus de 25 ans d'expérience dans la construction neuve avec une équipe de 50 professionnels.",
    },
    {
      icon: Award,
      title: "Qualité Certifiée",
      description: "Certification Qualibat et respect des normes les plus strictes pour tous nos projets.",
    },
    {
      icon: Shield,
      title: "Garanties Complètes",
      description: "Assurance décennale, garantie de parfait achèvement et service après-vente.",
    },
    {
      icon: Clock,
      title: "Respect des Délais",
      description: "Planning rigoureux et suivi quotidien pour respecter les délais convenus.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black">Construction Neuve</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Construction de Bâtiments Neufs</h1>
              <p className="text-xl mb-8">
                Spécialistes de la construction neuve depuis 25 ans, nous réalisons vos projets de A à Z avec expertise
                et passion. De la maison individuelle aux grands complexes commerciaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href="/contact">Demander un Devis</Link>
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
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600&text=Construction+Moderne"
                alt="Construction moderne"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Types de Construction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous maîtrisons tous les types de construction neuve, du résidentiel à l'industriel, en passant par le
              commercial.
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
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
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

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Processus de Construction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus éprouvé en 7 étapes pour garantir la réussite de votre projet de construction.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x">
                    <div className="p-6 bg-blue-50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2">
                          {step.step}
                        </div>
                        <Badge variant="secondary">{step.duration}</Badge>
                      </div>
                    </div>
                    <div className="md:col-span-3 p-6">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi Choisir ConstructPro</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre expertise et notre engagement qualité font la différence sur tous vos projets de construction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <advantage.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à Construire Votre Projet ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour une étude personnalisée et un devis détaillé de votre projet de construction.
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
              <Link href="/portfolio">Voir Nos Constructions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
