import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, ArrowRight, Briefcase, Clock, Users, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CareersPage() {
  const jobs = [
    {
      title: "Chef de Chantier",
      location: "Lyon",
      type: "CDI",
      experience: "5+ ans",
      description:
        "Nous recherchons un chef de chantier expérimenté pour superviser nos projets de construction résidentielle et commerciale.",
      responsibilities: [
        "Coordonner les équipes sur le terrain",
        "Assurer le respect des délais et de la qualité",
        "Gérer les approvisionnements et la logistique",
        "Veiller au respect des normes de sécurité",
      ],
      requirements: [
        "5+ ans d'expérience en tant que chef de chantier",
        "Connaissance approfondie des techniques de construction",
        "Capacité à gérer des équipes",
        "Permis B obligatoire",
      ],
    },
    {
      title: "Architecte",
      location: "Lyon",
      type: "CDI",
      experience: "3+ ans",
      description:
        "Rejoignez notre équipe d'architecture pour concevoir des projets innovants et durables pour nos clients.",
      responsibilities: [
        "Concevoir des plans architecturaux",
        "Collaborer avec les clients pour comprendre leurs besoins",
        "Travailler avec les ingénieurs et les entrepreneurs",
        "Assurer le suivi des projets",
      ],
      requirements: [
        "Diplôme en architecture",
        "3+ ans d'expérience en cabinet d'architecture",
        "Maîtrise des logiciels de CAO (AutoCAD, Revit)",
        "Connaissance des normes de construction",
      ],
    },
    {
      title: "Conducteur de Travaux",
      location: "Lyon",
      type: "CDI",
      experience: "3+ ans",
      description:
        "Nous recherchons un conducteur de travaux pour gérer nos projets de construction du début à la fin.",
      responsibilities: [
        "Planifier et coordonner les travaux",
        "Gérer les équipes et les sous-traitants",
        "Assurer le suivi budgétaire",
        "Garantir la qualité et le respect des délais",
      ],
      requirements: [
        "Formation BTP ou génie civil",
        "3+ ans d'expérience en conduite de travaux",
        "Excellentes compétences en gestion de projet",
        "Permis B obligatoire",
      ],
    },
    {
      title: "Ouvrier Qualifié en Maçonnerie",
      location: "Lyon",
      type: "CDI",
      experience: "2+ ans",
      description: "Nous recherchons des maçons qualifiés pour rejoindre nos équipes de construction.",
      responsibilities: [
        "Réaliser des travaux de maçonnerie",
        "Lire et interpréter les plans",
        "Respecter les normes de qualité et de sécurité",
        "Travailler en équipe",
      ],
      requirements: [
        "CAP/BEP en maçonnerie ou équivalent",
        "2+ ans d'expérience en maçonnerie",
        "Connaissance des techniques de construction",
        "Permis B souhaité",
      ],
    },
  ]

  const benefits = [
    {
      icon: Users,
      title: "Équipe Soudée",
      description: "Rejoignez une équipe passionnée et solidaire où chacun peut s'épanouir.",
    },
    {
      icon: GraduationCap,
      title: "Formation Continue",
      description: "Nous investissons dans votre développement professionnel avec des formations régulières.",
    },
    {
      icon: Clock,
      title: "Équilibre Vie Pro/Perso",
      description: "Nous valorisons l'équilibre entre vie professionnelle et personnelle.",
    },
    {
      icon: Briefcase,
      title: "Évolution de Carrière",
      description: "Des opportunités d'évolution au sein d'une entreprise en croissance.",
    },
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
                <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Actualités
                </Link>
                <Link href="/careers" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
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
            <Badge className="mb-4 bg-yellow-500 text-black">Carrières</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez Notre Équipe</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Nous recherchons des talents passionnés pour construire ensemble l'avenir. Découvrez nos opportunités de
              carrière et grandissez avec nous.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Pourquoi Nous Rejoindre</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Construisez Votre Carrière Avec Nous
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Chez ConstructPro, nous valorisons nos collaborateurs et leur offrons un environnement de travail
                stimulant où chacun peut développer son potentiel. Rejoindre notre équipe, c'est participer à des
                projets ambitieux et innovants dans un cadre professionnel et bienveillant.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <benefit.icon className="h-10 w-10 text-blue-600 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
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

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Postes Ouverts</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Opportunités Actuelles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos offres d'emploi et rejoignez une entreprise en pleine croissance où votre talent sera
              valorisé.
            </p>
          </div>

          <div className="space-y-8">
            {jobs.map((job, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-blue-600">{job.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <Badge variant="outline" className="mb-4">
                        {job.experience} d'expérience
                      </Badge>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>

                    <div className="p-6">
                      <h4 className="font-semibold mb-3">Responsabilités</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {job.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6">
                      <h4 className="font-semibold mb-3">Prérequis</h4>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        {job.requirements.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">Postuler</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Processus de Recrutement</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment Postuler</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Candidature",
                description: "Envoyez votre CV et lettre de motivation via notre formulaire en ligne.",
              },
              {
                step: "02",
                title: "Entretien",
                description: "Premier entretien avec notre équipe RH pour discuter de votre parcours.",
              },
              {
                step: "03",
                title: "Évaluation",
                description: "Rencontre technique avec les responsables du département concerné.",
              },
              {
                step: "04",
                title: "Intégration",
                description: "Bienvenue dans l'équipe ! Programme d'intégration personnalisé.",
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

      {/* Spontaneous Application */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pas de Poste Correspondant à Votre Profil ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de talents. N'hésitez pas à nous envoyer une candidature spontanée.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact" className="flex items-center">
              Candidature Spontanée <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
