import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Recycle, ArrowLeft} from "lucide-react"
import Navbar from "@/components/elements/navbar";

export default function MaterialsCatalogPage() {
    const materials = [
        {
            id: "ELE",
            name: "Eletrônicos",
            icon: "💻",
            color: "bg-blue-500",
            description: "Computadores, telefones, tablets e dispositivos eletrônicos",
        },
        {
            id: "PAP",
            name: "Papel",
            icon: "📄",
            color: "bg-yellow-500",
            description: "Jornais, revistas, papelão e papel de escritório",
        },
        {
            id: "PLA",
            name: "Plástico",
            icon: "🥤",
            color: "bg-red-500",
            description: "Garrafas, recipientes, sacolas e embalagens plásticas",
        },
        {
            id: "VID",
            name: "Vidro",
            icon: "🍶",
            color: "bg-green-500",
            description: "Garrafas, potes e recipientes de vidro",
        },
        {
            id: "MET",
            name: "Metal",
            icon: "🥫",
            color: "bg-gray-500",
            description: "Latas de alumínio, aço e sucata metálica",
        },
        {
            id: "BAT",
            name: "Baterias",
            icon: "🔋",
            color: "bg-orange-500",
            description: "Todos os tipos de baterias e células de energia",
        },
        {
            id: "TEX",
            name: "Têxteis",
            icon: "👕",
            color: "bg-purple-500",
            description: "Roupas, tecidos e materiais têxteis",
        },
        {
            id: "ORG",
            name: "Resíduos Orgânicos",
            icon: "🍎",
            color: "bg-green-600",
            description: "Materiais compostáveis e matéria orgânica",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Materiais</h1>
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {materials.map((material) => (
                        <Link key={material.id} href={`/collection-points?material=${material.id}`}>
                            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-48">
                                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                                    <div className="text-4xl mb-4">{material.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                        {material.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{material.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Back Button */}
                <div className="flex justify-start">
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="flex items-center space-x-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                            <ArrowLeft className="h-4 w-4"/>
                            <span>Voltar</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
