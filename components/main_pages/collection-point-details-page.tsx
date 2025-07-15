import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, Bell, ChevronRight } from "lucide-react"

export default function CollectionPointDetailsPage() {
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
            <Link href="/collection-points" className="text-gray-600 hover:text-gray-800 transition-colors">
              Pontos de Coleta
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contato
            </Link>

            {/* Notification and Profile */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/collection-points" className="hover:text-gray-700 transition-colors">
            Pontos de Coleta
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Detalhes do Ponto de Coleta</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Hero Image */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src="/images/recycling-facility.jpg"
            alt="Instalação do Centro de Reciclagem EcoHub"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Facility Information */}
        <div className="space-y-8">
          {/* Title and Description */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Centro de Reciclagem EcoHub</h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
              O Centro de Reciclagem EcoHub é uma instalação dedicada ao descarte responsável de resíduos eletrônicos e
              recicláveis. Aceitamos uma ampla gama de itens, incluindo computadores, telefones, baterias e vários tipos
              de plásticos e metais. Nosso objetivo é garantir que todos os materiais sejam processados de forma
              ambientalmente responsável, minimizando seu impacto no planeta.
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Address */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Endereço</h3>
              <p className="text-lg text-gray-900">Rua Verde, 123, Qualquer Cidade</p>
            </div>

            {/* Zip Code */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">CEP</h3>
              <p className="text-lg text-gray-900">12345</p>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-lg text-gray-900">Aberto</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium">
              Traçar Rota
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium"
            >
              Adicionar aos Favoritos
            </Button>
          </div>

          {/* Additional Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 pt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Materiais Aceitos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dispositivos eletrônicos (computadores, telefones, tablets)</li>
                  <li>• Baterias (todos os tipos)</li>
                  <li>• Plásticos e metais</li>
                  <li>• Pequenos eletrodomésticos</li>
                  <li>• Cabos e fios</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Horário de Funcionamento</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Segunda - Sexta</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>09:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
