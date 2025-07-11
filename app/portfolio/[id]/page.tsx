import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { MapPin, Calendar, DollarSign, Square, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Base de données des projets (en production, cela viendrait d'une vraie base de données)
const projects = {
  "1": {
    id: 1,
    title: "Villa Contemporaine Les Jardins",
    category: "residential",
    location: "Lyon 6ème",
    year: "2024",
    surface: "250 m²",
    budget: "450 000€",
    duration: "8 mois",
    client: "Famille Dubois",
    architect: "Marie Leroy",
    description:
      "Villa moderne avec piscine et jardin paysager. Architecture contemporaine alliant confort et performance énergétique. Ce projet ambitieux combine design moderne et respect de l'environnement.",
    longDescription: `
      Cette villa contemporaine de 250m² représente l'excellence de notre savoir-faire en construction résidentielle haut de gamme. 
      Située dans le prestigieux 6ème arrondissement de Lyon, elle allie parfaitement modernité architecturale et performance énergétique.

      Le projet s'articule autour d'un concept architectural novateur privilégiant les espaces ouverts et la luminosité naturelle. 
      Les grandes baies vitrées offrent une vue imprenable sur le jardin paysager de 800m² et créent une continuité parfaite entre 
      l'intérieur et l'extérieur.

      La villa intègre les dernières innovations en matière d'efficacité énergétique avec une isolation renforcée, 
      une pompe à chaleur géothermique et des panneaux solaires photovoltaïques, permettant d'atteindre le label BBC 
      (Bâtiment Basse Consommation).
    `,
    images: [
      "/placeholder.svg?height=600&width=800&text=Vue+extérieure+principale",
      "/placeholder.svg?height=600&width=800&text=Salon+avec+baies+vitrées",
      "/placeholder.svg?height=600&width=800&text=Cuisine+moderne+ouverte",
      "/placeholder.svg?height=600&width=800&text=Piscine+et+terrasse",
      "/placeholder.svg?height=600&width=800&text=Chambre+parentale",
      "/placeholder.svg?height=600&width=800&text=Jardin+paysager",
    ],
    tags: ["Construction Neuve", "Maison Individuelle", "Piscine", "BBC", "Domotique"],
    services: ["Gros Œuvre", "Second Œuvre", "Aménagement Extérieur", "Piscine"],
    features: [
      "4 chambres avec suites parentales",
      "Salon-séjour de 60m² avec cheminée",
      "Cuisine équipée haut de gamme",
      "Piscine chauffée 12x6m",
      "Garage double avec borne électrique",
      "Système domotique intégré",
      "Jardin paysager avec éclairage LED",
      "Terrasse en bois exotique 80m²",
    ],
    challenges: [
      "Terrain en pente nécessitant des fondations spéciales",
      "Intégration harmonieuse dans l'environnement urbain",
      "Respect des contraintes architecturales locales",
      "Optimisation de l'orientation pour l'efficacité énergétique",
    ],
    solutions: [
      "Fondations sur pieux avec mur de soutènement paysager",
      "Façades en pierre naturelle locale et enduit minéral",
      "Toiture végétalisée partielle",
      "Orientation sud-ouest optimisée avec brise-soleil automatiques",
    ],
    testimonial: {
      text: "ConstructPro a dépassé toutes nos attentes. La qualité de construction est exceptionnelle et l'équipe a su nous accompagner tout au long du projet avec professionnalisme et écoute.",
      author: "M. et Mme Dubois",
      role: "Propriétaires",
    },
  },
  "2": {
    id: 2,
    title: "Centre Commercial Confluence",
    category: "commercial",
    location: "Lyon 2ème",
    year: "2023",
    surface: "5 000 m²",
    budget: "2 500 000€",
    duration: "14 mois",
    client: "Groupe Immobilier Rhône",
    architect: "Cabinet Architecture Moderne",
    description:
      "Centre commercial moderne avec parking souterrain de 200 places. Conception durable et espaces modulables pour une expérience shopping optimale.",
    longDescription: `
      Le Centre Commercial Confluence représente un projet d'envergure de 5 000m² situé au cœur du dynamique 2ème arrondissement de Lyon. 
      Ce complexe commercial moderne redéfinit l'expérience shopping avec ses espaces modulables et sa conception durable.

      L'architecture contemporaine du bâtiment privilégie la luminosité naturelle grâce à une verrière centrale de 800m² et des façades 
      largement vitrées. Les espaces commerciaux modulables permettent d'accueillir aussi bien des grandes enseignes que des boutiques 
      de créateurs locaux.

      Le projet intègre un parking souterrain de 200 places sur deux niveaux, équipé de bornes de recharge électrique et d'un système 
      de ventilation naturelle innovant. La toiture végétalisée de 1 200m² contribue à la régulation thermique et à la biodiversité urbaine.
    `,
    images: [
      "/placeholder.svg?height=600&width=800&text=Façade+principale+du+centre",
      "/placeholder.svg?height=600&width=800&text=Hall+central+avec+verrière",
      "/placeholder.svg?height=600&width=800&text=Galerie+commerciale",
      "/placeholder.svg?height=600&width=800&text=Parking+souterrain",
      "/placeholder.svg?height=600&width=800&text=Toiture+végétalisée",
      "/placeholder.svg?height=600&width=800&text=Espace+restauration",
    ],
    tags: ["Gros Œuvre", "Commercial", "Parking", "Développement Durable", "Verrière"],
    services: ["Construction", "Aménagement", "Parking", "Espaces Verts"],
    features: [
      "25 boutiques modulables de 50 à 300m²",
      "Espace restauration de 800m²",
      "Parking souterrain 200 places",
      "20 bornes de recharge électrique",
      "Verrière centrale 800m²",
      "Toiture végétalisée 1 200m²",
      "Système de climatisation géothermique",
      "Éclairage LED avec détection de présence",
    ],
    challenges: [
      "Construction en centre-ville avec contraintes de circulation",
      "Excavation complexe pour le parking souterrain",
      "Intégration de la verrière structurelle",
      "Respect des normes ERP (Établissement Recevant du Public)",
    ],
    solutions: [
      "Phasage des travaux avec circulation alternée",
      "Technique de parois moulées pour l'excavation",
      "Structure métallique légère pour la verrière",
      "Système de sécurité incendie avec désenfumage naturel",
    ],
    testimonial: {
      text: "Un projet complexe mené avec une expertise remarquable. ConstructPro a su gérer tous les aspects techniques tout en respectant nos délais serrés.",
      author: "Jean-Pierre Martin",
      role: "Directeur Groupe Immobilier Rhône",
    },
  },
  "3": {
    id: 3,
    title: "Rénovation Loft Industriel",
    category: "renovation",
    location: "Villeurbanne",
    year: "2024",
    surface: "180 m²",
    budget: "180 000€",
    duration: "5 mois",
    client: "Sophie et Marc Laurent",
    architect: "Atelier Rénovation Design",
    description:
      "Transformation complète d'un ancien entrepôt en loft de luxe. Conservation des éléments industriels authentiques avec intégration d'équipements modernes.",
    longDescription: `
      Ce projet de rénovation exceptionnelle transforme un ancien entrepôt industriel de 1920 en loft contemporain de 180m². 
      Situé à Villeurbanne, ce bâtiment chargé d'histoire retrouve une seconde vie tout en conservant son caractère industriel authentique.

      La rénovation respecte l'architecture d'origine avec ses poutres métalliques apparentes, ses murs en briques rouges et ses 
      grandes verrières d'atelier. L'intervention contemporaine se veut discrète et met en valeur le patrimoine industriel existant.

      L'aménagement intérieur privilégie les espaces ouverts avec une mezzanine créant un niveau supplémentaire pour l'espace nuit. 
      Les matériaux nobles comme le béton ciré, l'acier brut et le bois massif s'harmonisent parfaitement avec l'existant.
    `,
    images: [
      "/placeholder.svg?height=600&width=800&text=Loft+avant+rénovation",
      "/placeholder.svg?height=600&width=800&text=Espace+de+vie+rénové",
      "/placeholder.svg?height=600&width=800&text=Cuisine+industrielle+moderne",
      "/placeholder.svg?height=600&width=800&text=Mezzanine+chambre",
      "/placeholder.svg?height=600&width=800&text=Salle+de+bain+design",
      "/placeholder.svg?height=600&width=800&text=Détails+poutres+métalliques",
    ],
    tags: ["Rénovation", "Loft", "Industriel", "Patrimoine", "Design"],
    services: ["Rénovation", "Aménagement", "Design", "Isolation"],
    features: [
      "Conservation des poutres métalliques d'origine",
      "Murs en briques apparentes restaurés",
      "Mezzanine en acier et bois sur 60m²",
      "Cuisine ouverte avec îlot central",
      "Salle de bain avec douche à l'italienne",
      "Chauffage au sol basse température",
      "Isolation thermique renforcée",
      "Éclairage LED sur rails industriels",
    ],
    challenges: [
      "Conservation du patrimoine industriel",
      "Mise aux normes électriques et thermiques",
      "Création de la mezzanine sans altérer la structure",
      "Isolation phonique en milieu urbain",
    ],
    solutions: [
      "Restauration minutieuse des éléments d'origine",
      "Installation électrique apparente style industriel",
      "Structure métallique indépendante pour la mezzanine",
      "Double vitrage phonique sur les verrières",
    ],
    testimonial: {
      text: "ConstructPro a su préserver l'âme de ce lieu tout en le modernisant. Le résultat dépasse nos espérances, c'est exactement le loft dont nous rêvions.",
      author: "Sophie et Marc Laurent",
      role: "Propriétaires",
    },
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects[params.id as keyof typeof projects]

  if (!project) {
    notFound()
  }

  const projectIds = Object.keys(projects)
  const currentIndex = projectIds.indexOf(params.id)
  const prevProject = currentIndex > 0 ? projectIds[currentIndex - 1] : null
  const nextProject = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au portfolio
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black">{project.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-2" />
                  <span>{project.surface}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{project.budget}</span>
                </div>
              </div>
              <p className="text-xl">{project.description}</p>
            </div>
            <div>
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none mb-12">
                <h2 className="text-3xl font-bold mb-6">Description du Projet</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{project.longDescription}</div>
              </div>

              {/* Image Gallery */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Galerie Photos</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.slice(1).map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 2}`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Caractéristiques Principales</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">Défis Techniques</h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span className="text-gray-600">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Solutions Apportées</h3>
                  <ul className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Témoignage Client</h3>
                  <blockquote className="text-lg text-gray-700 italic mb-4">"{project.testimonial.text}"</blockquote>
                  <div>
                    <div className="font-semibold">{project.testimonial.author}</div>
                    <div className="text-sm text-gray-500">{project.testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Informations Projet</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Client:</span>
                      <br />
                      <span className="text-gray-600">{project.client}</span>
                    </div>
                    <div>
                      <span className="font-medium">Architecte:</span>
                      <br />
                      <span className="text-gray-600">{project.architect}</span>
                    </div>
                    <div>
                      <span className="font-medium">Durée:</span>
                      <br />
                      <span className="text-gray-600">{project.duration}</span>
                    </div>
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
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Services Réalisés</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-4">Projet Similaire ?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Vous avez un projet similaire ? Contactez-nous pour un devis personnalisé.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Demander un Devis</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation between projects */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              {prevProject && (
                <Link
                  href={`/portfolio/${prevProject}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Projet précédent
                </Link>
              )}
            </div>
            <div>
              <Link href="/portfolio" className="text-gray-600 hover:text-blue-600">
                Tous les projets
              </Link>
            </div>
            <div>
              {nextProject && (
                <Link
                  href={`/portfolio/${nextProject}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Projet suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
