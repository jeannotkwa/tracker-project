import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, User, Clock, ArrowRight, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "Les Nouvelles Tendances en Construction Écologique",
      excerpt:
        "Découvrez les dernières innovations en matière de construction durable et comment nous les intégrons dans nos projets.",
      image: "/placeholder.svg?height=300&width=500",
      date: "15 juin 2024",
      author: "Marie Leroy",
      readTime: "5 min",
      category: "Écologie",
      tags: ["Construction Durable", "Innovation", "Écologie"],
    },
    {
      id: 2,
      title: "Comment Choisir le Bon Architecte pour Votre Projet",
      excerpt:
        "Un guide complet pour vous aider à sélectionner l'architecte idéal pour votre projet de construction ou de rénovation.",
      image: "/placeholder.svg?height=300&width=500",
      date: "2 juin 2024",
      author: "Pierre Durand",
      readTime: "7 min",
      category: "Conseils",
      tags: ["Architecture", "Conseils", "Projet"],
    },
    {
      id: 3,
      title: "Inauguration de Notre Nouveau Siège Social",
      excerpt:
        "ConstructPro a inauguré son nouveau siège social, un bâtiment moderne et écologique qui reflète nos valeurs et notre savoir-faire.",
      image: "/placeholder.svg?height=300&width=500",
      date: "20 mai 2024",
      author: "Jean Moreau",
      readTime: "3 min",
      category: "Entreprise",
      tags: ["Actualité", "Entreprise"],
    },
    {
      id: 4,
      title: "Les Étapes Clés d'un Projet de Rénovation Réussi",
      excerpt:
        "De la planification à la réalisation, découvrez les étapes essentielles pour mener à bien votre projet de rénovation.",
      image: "/placeholder.svg?height=300&width=500",
      date: "10 mai 2024",
      author: "Sophie Bernard",
      readTime: "6 min",
      category: "Rénovation",
      tags: ["Rénovation", "Conseils", "Planification"],
    },
    {
      id: 5,
      title: "Nouvelles Réglementations Thermiques : Ce Qui Change en 2024",
      excerpt: "Un point complet sur les nouvelles normes thermiques et leur impact sur vos projets de construction.",
      image: "/placeholder.svg?height=300&width=500",
      date: "1 mai 2024",
      author: "Pierre Durand",
      readTime: "8 min",
      category: "Réglementation",
      tags: ["Normes", "Thermique", "Réglementation"],
    },
    {
      id: 6,
      title: "ConstructPro Remporte le Prix de l'Innovation 2024",
      excerpt: "Notre entreprise a été récompensée pour son approche innovante dans le secteur de la construction.",
      image: "/placeholder.svg?height=300&width=500",
      date: "15 avril 2024",
      author: "Marie Leroy",
      readTime: "4 min",
      category: "Récompenses",
      tags: ["Innovation", "Prix", "Reconnaissance"],
    },
  ]

  const categories = [
    { name: "Tous", count: articles.length },
    { name: "Écologie", count: 3 },
    { name: "Conseils", count: 5 },
    { name: "Entreprise", count: 2 },
    { name: "Rénovation", count: 4 },
    { name: "Réglementation", count: 2 },
    { name: "Récompenses", count: 1 },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ConstructPro</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Accueil
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  À Propos
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Services
                </Link>
                <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Réalisations
                </Link>
                <Link href="/blog" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  Actualités
                </Link>
                <Link href="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Carrières
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>
            <Button asChild>
              <Link href="/contact">Demander un Devis</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-yellow-500 text-black">Actualités</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Restez informé des dernières tendances, innovations et actualités dans le domaine de la construction et de
              l'architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                        {category.name}
                      </Link>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Articles Populaires</h3>
                  <div className="space-y-4">
                    {articles.slice(0, 3).map((article, index) => (
                      <div key={index} className="flex gap-3">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={80}
                          height={60}
                          className="rounded object-cover w-20 h-16"
                        />
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-blue-600">
                            <Link href="#">{article.title}</Link>
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-bold mb-3">Newsletter</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Abonnez-vous pour recevoir nos derniers articles et actualités.
                  </p>
                  <div className="space-y-2">
                    <input type="email" placeholder="Votre email" className="w-full px-3 py-2 border rounded-md" />
                    <Button className="w-full">S'abonner</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">{article.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{article.date}</span>
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">{article.author}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        <Link href="#">{article.title}</Link>
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full bg-transparent">
                        Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg" className="bg-transparent">
                  Charger Plus d'Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
