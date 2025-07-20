"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, Bell, ChevronRight } from "lucide-react"

interface DiasPontoColeta {
  [key: string]: {
    open: string
    close: string
  }
}

interface CollectionPoint {
  idPontoColeta: number
  nome: string
  endereco: string
  tiposColeta: string[]
  diasPontoColeta: DiasPontoColeta
}

const wasteTypes = [
  { id: "ELE", name: "Eletrônicos", description: "Computadores, celulares, tablets" },
  { id: "PAP", name: "Papel", description: "Jornais, revistas, papelão" },
  { id: "PLA", name: "Plástico", description: "Garrafas, embalagens, sacolas" },
  { id: "VID", name: "Vidro", description: "Garrafas, potes, recipientes" },
  { id: "MET", name: "Metal", description: "Latas, alumínio, ferro" },
  { id: "BAT", name: "Baterias", description: "Pilhas e baterias em geral" },
  { id: "TEX", name: "Têxteis", description: "Roupas, tecidos, calçados" },
  { id: "ORG", name: "Orgânicos", description: "Restos de comida, cascas" }
]

export default function CollectionPointDetailsPage() {
  const [collectionPoint, setCollectionPoint] = useState<CollectionPoint | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const id = window.location.pathname.split("/").pop()
      try {
        const res = await fetch(`http://localhost:8080/pontos/${id}`)
        const data = await res.json()
        setCollectionPoint(data)
      } catch (error) {
        console.error("Erro ao buscar dados do ponto de coleta", error)
      }
    }

    fetchData()
  }, [])

  if (!collectionPoint) {
    return <div className="p-6">Carregando...</div>
  }

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Recycle className="h-6 w-6 text-gray-800" />
              <span className="text-xl font-semibold text-gray-800">Recicle-Me</span>
            </div>

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

        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/collection-points" className="hover:text-gray-700 transition-colors">
              Pontos de Coleta
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Detalhes do Ponto de Coleta</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{collectionPoint.nome}</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Endereço</h3>
                <p className="text-lg text-gray-900">{collectionPoint.endereco}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-lg text-gray-900">Aberto</p>
                </div>
              </div>
            </div>

            {/* Tipos de Coleta */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Materiais Aceitos</h3>
                <ul className="space-y-2 text-gray-700">
                  {collectionPoint.tiposColeta.map((tipo) => {
                    const tipoInfo = wasteTypes.find((t) => t.id === tipo)
                    return (
                        <li key={tipo}>
                          • <strong>{tipoInfo?.name || tipo}</strong>: {tipoInfo?.description || "Descrição não disponível"}
                        </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>

            <div className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Horário de Funcionamento</h3>
                  <div className="space-y-2 text-gray-700">
                    {Object.entries(collectionPoint.diasPontoColeta).map(([dia, horario]) => (
                        <div className="flex justify-between" key={dia}>
                          <span>{dia}</span>
                          <span>
                        {horario.open.slice(0, 2)}:{horario.open.slice(2)} - {horario.close.slice(0, 2)}:{horario.close.slice(2)}
                      </span>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  )
}
