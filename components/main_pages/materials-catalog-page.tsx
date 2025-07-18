import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, ArrowLeft } from "lucide-react"

export default function MaterialsCatalogPage() {
  const materials = [
    {
      id: "ELE",
      name: "Eletrônicos",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600",
      description: "Computadores, telefones, tablets e dispositivos eletrônicos",
    },
    {
      id: "PAP",
      name: "Papel",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500",
      description: "Jornais, revistas, papelão e papel de escritório",
    },
    {
      id: "PLA",
      name: "Plástico",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-cyan-300 to-blue-400",
      description: "Garrafas, recipientes, sacolas e embalagens plásticas",
    },
    {
      id: "VID",
      name: "Vidro",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-teal-600 to-green-800",
      description: "Garrafas, potes e recipientes de vidro",
    },
    {
      id: "MET",
      name: "Metal",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
      description: "Latas de alumínio, aço e sucata metálica",
    },
    {
      id: "BAT",
      name: "Baterias",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-green-600 to-green-800",
      description: "Todos os tipos de baterias e células de energia",
    },
    {
      id: "TEX",
      name: "Têxteis",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
      description: "Roupas, tecidos e materiais têxteis",
    },
    {
      id: "ORG",
      name: "Resíduos Orgânicos",
      image: "/placeholder.svg?height=200&width=300",
      bgColor: "bg-gradient-to-br from-green-500 to-green-700",
      description: "Materiais compostáveis e matéria orgânica",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-gray-800" />
            <span className="text-xl font-semibold text-gray-800">Recicle-Me</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 transition-colors">
              Início
            </Link>
            <Link href="/materials" className="text-gray-900 font-medium">
              Materiais
            </Link>
            <Link href="/collection-points" className="text-gray-600 hover:text-gray-800 transition-colors">
              Localizações
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
              Sobre Nós
            </Link>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">Começar</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Materiais</h1>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            Explore nosso catálogo abrangente de materiais aceitos para reciclagem e descarte. Cada material é
            categorizado com informações detalhadas para ajudá-lo a entender como preparar e descartar adequadamente
            seus itens.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {materials.map((material) => (
            <Link key={material.id} href={`/collection-points?material=${material.id}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  {/* Material Image/Icon */}
                  <div className={`h-48 ${material.bgColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Material-specific icons/representations */}
                      {material.id === "electronics" && (
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                          <div className="w-8 h-8 bg-white rounded border-2 border-gray-300"></div>
                        </div>
                      )}
                      {material.id === "paper" && (
                        <div className="relative">
                          <Recycle className="h-16 w-16 text-white opacity-80" />
                        </div>
                      )}
                      {material.id === "plastic" && (
                        <div className="flex space-x-1">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-white rounded-full opacity-70"
                              style={{
                                transform: `translate(${(i % 4) * 8}px, ${Math.floor(i / 4) * 8}px)`,
                              }}
                            ></div>
                          ))}
                        </div>
                      )}
                      {material.id === "glass" && (
                        <div className="w-12 h-16 bg-white bg-opacity-30 rounded-t-full rounded-b-lg border-2 border-white border-opacity-50"></div>
                      )}
                      {material.id === "metal" && (
                        <div className="grid grid-cols-2 gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-6 h-6 bg-white bg-opacity-40 rounded"></div>
                          ))}
                        </div>
                      )}
                      {material.id === "batteries" && (
                        <div className="flex space-x-2">
                          <div className="w-4 h-8 bg-white bg-opacity-60 rounded-sm"></div>
                          <div className="w-4 h-8 bg-white bg-opacity-60 rounded-sm"></div>
                          <div className="w-4 h-8 bg-white bg-opacity-60 rounded-sm"></div>
                        </div>
                      )}
                      {material.id === "textiles" && (
                        <div className="space-y-1">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-12 h-2 bg-white bg-opacity-50 rounded"></div>
                          ))}
                        </div>
                      )}
                      {material.id === "organic" && (
                        <div className="relative">
                          <div className="w-8 h-8 bg-green-300 rounded-full"></div>
                          <div className="absolute -top-2 -right-1 w-4 h-6 bg-green-400 rounded-t-full"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Material Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {material.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{material.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
