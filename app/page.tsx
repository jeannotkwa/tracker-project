import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Award, Phone, Mail, MapPin, ArrowRight, CheckCircle, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const services = [
    {
      title: "Construction Neuve",
      description: "Maisons individuelles, bâtiments commerciaux et industriels",
      icon: Building2,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Rénovation",
      description: "Rénovation complète et extension de bâtiments existants",
      icon: Users,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Architecture",
      description: "Conception, plans et suivi de projets architecturaux",
      icon: Award,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const recentProjects = [
    {
      title: "Villa Moderne - Résidentiel",
      location: "Lyon, France",
      category: "Construction Neuve",
      image: "/placeholder.svg?height=250&width=400",
      description: "Villa contemporaine de 200m² avec piscine et jardin paysager",
    },
    {
      title: "Centre Commercial - Commercial",
      location: "Marseille, France",
      category: "Gros Œuvre",
      image: "/placeholder.svg?height=250&width=400",
      description: "Centre commercial de 5000m² avec parking souterrain",
    },
    {
      title: "Rénovation Loft - Résidentiel",
      location: "Paris, France",
      category: "Rénovation",
      image: "/placeholder.svg?height=250&width=400",
      description: "Transformation d'un ancien entrepôt en loft de luxe",
    },
  ]

  const stats = [
    { number: "500+", label: "Projets Réalisés" },
    { number: "25", label: "Années d'Expérience" },
    { number: "50+", label: "Collaborateurs" },
    { number: "98%", label: "Clients Satisfaits" },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Construisons Ensemble
              <span className="block text-yellow-400">Votre Avenir</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Spécialistes en construction et architecture depuis 25 ans. De la conception à la réalisation, nous
              donnons vie à vos projets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/contact" className="flex items-center">
                  Demander un Devis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Nos Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Excellence dans Tous Nos Domaines</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la construction neuve à la rénovation, en passant par l'architecture, nous maîtrisons tous les aspects
              de votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-blue-600 group-hover:text-white bg-transparent"
                    asChild
                  >
                    <Link
                      href={
                        service.title === "Construction Neuve"
                          ? "/services/construction"
                          : service.title === "Rénovation"
                            ? "/services/renovation"
                            : "/services/architecture"
                      }
                    >
                      En Savoir Plus
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Nos Réalisations</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projets Récents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-unes de nos réalisations récentes qui témoignent de notre savoir-faire et de notre
              engagement qualité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Button variant="outline" size="sm">
                    Voir le Projet
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/portfolio">
                Voir Toutes Nos Réalisations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Pourquoi Nous Choisir</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                25 Ans d'Excellence dans la Construction
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Notre expertise reconnue, notre équipe qualifiée et notre engagement qualité font de nous le partenaire
                idéal pour tous vos projets de construction.
              </p>

              <div className="space-y-4">
                {[
                  "Équipe d'experts certifiés et expérimentés",
                  "Respect des délais et du budget convenu",
                  "Matériaux de qualité et techniques innovantes",
                  "Suivi personnalisé de A à Z",
                  "Garanties étendues sur tous nos travaux",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Équipe de construction"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Témoignages</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce Que Disent Nos Clients</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dubois",
                role: "Propriétaire",
                content: "Excellent travail sur la construction de notre maison. Équipe professionnelle et à l'écoute.",
                rating: 5,
              },
              {
                name: "Jean Martin",
                role: "Promoteur Immobilier",
                content:
                  "Partenaire de confiance depuis 10 ans. Qualité et respect des délais toujours au rendez-vous.",
                rating: 5,
              },
              {
                name: "Sophie Laurent",
                role: "Architecte",
                content: "Collaboration parfaite sur plusieurs projets. Leur expertise technique est remarquable.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à Démarrer Votre Projet ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/contact" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Appelez-nous
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
            >
              <Link href="/contact" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Demander un Devis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">ConstructPro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre partenaire de confiance pour tous vos projets de construction et d'architecture.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white">
                    Construction Neuve
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Rénovation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Gros Œuvre
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white">
                    Réalisations
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Actualités
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>123 Rue de la Construction, 69000 Lyon</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>04 78 XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@constructpro.fr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ConstructPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
