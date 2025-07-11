"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        })
        // Réinitialiser le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Une erreur est survenue",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Erreur de connexion. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Effacer le message de statut quand l'utilisateur modifie le formulaire
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-yellow-500 text-black">Contact</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Parlons de Votre Projet</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Contactez nos experts pour une consultation gratuite et un devis personnalisé. Nous sommes là pour
              concrétiser vos projets de construction et d'architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Demande de Devis Gratuit</CardTitle>
                  <p className="text-gray-600">
                    Remplissez ce formulaire et nous vous recontacterons dans les 24h pour discuter de votre projet.
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Message de statut */}
                  {submitStatus.type && (
                    <Alert
                      className={`mb-6 ${submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                        {submitStatus.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectType">Type de Projet *</Label>
                        <Select
                          onValueChange={(value) => handleChange("projectType", value)}
                          disabled={isSubmitting}
                          value={formData.projectType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="construction-neuve">Construction Neuve</SelectItem>
                            <SelectItem value="renovation">Rénovation</SelectItem>
                            <SelectItem value="extension">Extension</SelectItem>
                            <SelectItem value="architecture">Architecture</SelectItem>
                            <SelectItem value="travaux-publics">Travaux Publics</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Estimé</Label>
                        <Select
                          onValueChange={(value) => handleChange("budget", value)}
                          disabled={isSubmitting}
                          value={formData.budget}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une fourchette" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moins-50k">Moins de 50 000€</SelectItem>
                            <SelectItem value="50k-100k">50 000€ - 100 000€</SelectItem>
                            <SelectItem value="100k-200k">100 000€ - 200 000€</SelectItem>
                            <SelectItem value="200k-500k">200 000€ - 500 000€</SelectItem>
                            <SelectItem value="plus-500k">Plus de 500 000€</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Description du Projet *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Décrivez votre projet en détail : localisation, surface, délais souhaités, contraintes particulières..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Envoyer ma Demande
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nos Coordonnées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">
                        123 Rue de la Construction
                        <br />
                        69000 Lyon, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600">
                        <a href="tel:+33478000000" className="hover:text-blue-600">
                          04 78 XX XX XX
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">
                        <a href="mailto:contact@constructpro.fr" className="hover:text-blue-600">
                          contact@constructpro.fr
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-gray-600">
                        Lun - Ven : 8h00 - 18h00
                        <br />
                        Sam : 9h00 - 12h00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Urgence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Pour les urgences en dehors des heures d'ouverture :</p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href="tel:+33600000000">
                      <Phone className="mr-2 h-4 w-4" />
                      06 XX XX XX XX
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zone d'Intervention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">
                    Nous intervenons principalement dans la région Auvergne-Rhône-Alpes :
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Lyon et agglomération</li>
                    <li>• Villefranche-sur-Saône</li>
                    <li>• Bourg-en-Bresse</li>
                    <li>• Saint-Étienne</li>
                    <li>• Autres communes sur demande</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Localisation</h2>
            <p className="text-gray-600">Retrouvez-nous facilement dans nos bureaux au cœur de Lyon</p>
          </div>

          {/* Placeholder for Google Maps */}
          <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600">Carte Google Maps</p>
              <p className="text-sm text-gray-500">123 Rue de la Construction, 69000 Lyon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
