import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, Search, ChevronUp, ChevronDown } from "lucide-react"

export default function CollectionPointsPage() {
  const collectionPoints = [
    {
      id: 1,
      name: "Eco-Centro",
      address: "Rua Verde, 123, Qualquer Cidade",
      icon: <Recycle className="h-5 w-5 text-green-600" />,
    },
    {
      id: 2,
      name: "Depósito de Reciclagem",
      address: "Avenida Azul, 456, Qualquer Cidade",
      icon: <Recycle className="h-5 w-5 text-green-600" />,
    },
    {
      id: 3,
      name: "Centro de Gerenciamento de Resíduos",
      address: "Estrada Vermelha, 789, Qualquer Cidade",
      icon: <Recycle className="h-5 w-5 text-green-600" />,
    },
    {
      id: 4,
      name: "Centro Comunitário de Reciclagem",
      address: "Alameda Amarela, 101, Qualquer Cidade",
      icon: <Recycle className="h-5 w-5 text-green-600" />,
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

          {/* Navigation Links and Search */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
              Início
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-800 transition-colors">
              Serviços
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contato
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar"
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">Começar</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Collection Points List */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          {/* Header with Sort Controls */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Pontos de Coleta</h1>
            <div className="flex flex-col">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronUp className="h-4 w-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Collection Points List */}
          <div className="space-y-4">
            {collectionPoints.map((point) => (
              <Link key={point.id} href={`/collection-points/${point.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{point.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{point.name}</h3>
                        <p className="text-sm text-gray-600">{point.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side - Map Area */}
        <div className="flex-1 relative bg-gray-100">
          {/* Map Search */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white rounded-lg shadow-md p-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 relative overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" className="text-white">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Street Lines */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" className="text-white opacity-60">
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="2" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="2" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="currentColor" strokeWidth="2" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="currentColor" strokeWidth="2" />
                <line x1="20%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="1" />
                <line x1="80%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Location Markers */}
            <Link href="/collection-points/1" className="absolute top-1/4 left-1/3">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
            </Link>
            <Link href="/collection-points/2" className="absolute top-1/2 right-1/3">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
            </Link>
            <Link href="/collection-points/3" className="absolute bottom-1/3 left-1/4">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
            </Link>
            <Link href="/collection-points/4" className="absolute top-2/3 right-1/4">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
            </Link>

            {/* City Label */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                <span className="text-sm font-medium text-gray-700 tracking-wider">QUALQUER CIDADE</span>
              </div>
            </div>

            {/* Map Integration Placeholder */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Mapa Interativo</h3>
                <p className="text-sm text-gray-600">
                  Esta área exibirá um mapa interativo mostrando todos os pontos de coleta em sua região. A integração
                  com Google Maps, Mapbox ou serviço similar ficaria aqui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
