"use client"

import Link from "next/link"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Recycle, Bell, ChevronRight} from "lucide-react"
import Navbar from "@/components/elements/navbar";

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
    {id: "ELE", name: "Eletrônicos", description: "Computadores, celulares, tablets"},
    {id: "PAP", name: "Papel", description: "Jornais, revistas, papelão"},
    {id: "PLA", name: "Plástico", description: "Garrafas, embalagens, sacolas"},
    {id: "VID", name: "Vidro", description: "Garrafas, potes, recipientes"},
    {id: "MET", name: "Metal", description: "Latas, alumínio, ferro"},
    {id: "BAT", name: "Baterias", description: "Pilhas e baterias em geral"},
    {id: "TEX", name: "Têxteis", description: "Roupas, tecidos, calçados"},
    {id: "ORG", name: "Orgânicos", description: "Restos de comida, cascas"}
]

export default function CollectionPointDetailsPage() {
    const [collectionPoint, setCollectionPoint] = useState<CollectionPoint | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const id = window.location.pathname.split("/").pop()
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL
                const res = await fetch(`${apiUrl}/pontos/${id}`)
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

    if (collectionPoint) {
        const now = new Date()
        const dayOfWeekMap: Record<number, string> = {
            0: "DOM",
            1: "SEG",
            2: "TER",
            3: "QUA",
            4: "QUI",
            5: "SEX",
            6: "SAB"
        }

        const today = dayOfWeekMap[now.getDay()]
        const hours = now.getHours().toString().padStart(2, "0")
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const currentTime = hours + minutes // exemplo: "0930"

        const todaySchedule = collectionPoint.diasPontoColeta[today]

        if (todaySchedule) {
            const {open, close} = todaySchedule
            if (currentTime >= open && currentTime <= close) {
                setIsOpen(true)
            }
        }
    }

    const diasSemana: { codigo: string; nome: string }[] = [
        { codigo: "DOM", nome: "Domingo" },
        { codigo: "SEG", nome: "Segunda-feira" },
        { codigo: "TER", nome: "Terça-feira" },
        { codigo: "QUA", nome: "Quarta-feira" },
        { codigo: "QUI", nome: "Quinta-feira" },
        { codigo: "SEX", nome: "Sexta-feira" },
        { codigo: "SAB", nome: "Sábado" }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <Navbar/>

            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                    <Link href="/materials" className="hover:text-gray-700 transition-colors">
                        Pontos de Coleta
                    </Link>
                    <ChevronRight className="h-4 w-4"/>
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
                                <div className={`w-3 h-3 ${isOpen ? "bg-green-500" : "bg-red-500"} rounded-full`}/>
                                <p className="text-lg text-gray-900">{isOpen ? "Aberto" : "Fechado"}</p>
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
                                    {diasSemana.map(({codigo, nome}) => {
                                        const horario = collectionPoint.diasPontoColeta[codigo]
                                        if (!horario) return null

                                        return (
                                            <div className="flex justify-between" key={codigo}>
                                                <span>{nome}</span>
                                                <span>
                                                  {horario.open.slice(0, 2)}:{horario.open.slice(2)} - {horario.close.slice(0, 2)}:{horario.close.slice(2)}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
