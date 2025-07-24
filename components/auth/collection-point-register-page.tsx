"use client"

import type React from "react"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Checkbox} from "@/components/ui/checkbox"
import {Recycle, ArrowLeft, MapPin, Bell} from "lucide-react"
import {useState} from "react"
import jwt_decode, {JwtPayload} from "jwt-decode"
import Navbar from "@/components/elements/navbar";
import PrivateRoute from "@/components/PrivateRoute";

export default function CollectionPointRegisterPage() {
    const [formData, setFormData] = useState({
        cep: "",
        nome: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
        status: "T", // T = Temporário, A = Ativo, I = Inativo
    })

    const [operatingHours, setOperatingHours] = useState({
        monday: {isOpen: false, openTime: "08:00", closeTime: "18:00"},
        tuesday: {isOpen: false, openTime: "08:00", closeTime: "18:00"},
        wednesday: {isOpen: false, openTime: "08:00", closeTime: "18:00"},
        thursday: {isOpen: false, openTime: "08:00", closeTime: "18:00"},
        friday: {isOpen: false, openTime: "08:00", closeTime: "18:00"},
        saturday: {isOpen: false, openTime: "09:00", closeTime: "16:00"},
        sunday: {isOpen: false, openTime: "09:00", closeTime: "16:00"},
    })

    const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoadingCep, setIsLoadingCep] = useState(false)
    const [responseError, setResponseError] = useState<string | null>(null)

    const wasteTypes = [
        {id: "ELE", name: "Eletrônicos", description: "Computadores, celulares, tablets"},
        {id: "PAP", name: "Papel", description: "Jornais, revistas, papelão"},
        {id: "PLA", name: "Plástico", description: "Garrafas, embalagens, sacolas"},
        {id: "VID", name: "Vidro", description: "Garrafas, potes, recipientes"},
        {id: "MET", name: "Metal", description: "Latas, alumínio, ferro"},
        {id: "BAT", name: "Baterias", description: "Pilhas e baterias em geral"},
        {id: "TEX", name: "Têxteis", description: "Roupas, tecidos, calçados"},
        {id: "ORG", name: "Orgânicos", description: "Restos de comida, cascas"},
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const formatCEP = (value: string) => {
        const cleanValue = value.replace(/\D/g, "")
        if (cleanValue.length <= 8) {
            return cleanValue.replace(/(\d{5})(\d{3})/, "$1-$2")
        }
        return value
    }

    const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCEP(e.target.value)
        setFormData((prev) => ({
            ...prev,
            cep: formattedValue,
        }))

        const cleanCEP = formattedValue.replace(/\D/g, "")
        if (cleanCEP.length === 8) {
            setIsLoadingCep(true)
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
                const data = await response.json()

                if (!data.erro) {
                    setFormData((prev) => ({
                        ...prev,
                        logradouro: data.logradouro || "",
                        bairro: data.bairro || "",
                        cidade: data.localidade || "",
                        estado: data.uf || "",
                    }))
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error)
            } finally {
                setIsLoadingCep(false)
            }
        }
    }

    const handleWasteTypeChange = (wasteTypeId: string, checked: boolean) => {
        if (checked) {
            setSelectedWasteTypes((prev) => [...prev, wasteTypeId])
        } else {
            setSelectedWasteTypes((prev) => prev.filter((id) => id !== wasteTypeId))
        }
    }

    const handleOperatingHoursChange = (day: string, field: string, value: string | boolean) => {
        setOperatingHours((prev) => ({
            ...prev,
            [day]: {
                ...prev[day as keyof typeof prev],
                [field]: value,
            },
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.cep) newErrors.cep = "CEP é obrigatório"
        if (!formData.logradouro) newErrors.logradouro = "Logradouro é obrigatório"
        if (!formData.bairro) newErrors.bairro = "Bairro é obrigatório"
        if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória"
        if (!formData.estado) newErrors.estado = "Estado é obrigatório"
        if (selectedWasteTypes.length === 0) newErrors.wasteTypes = "Selecione ao menos um tipo de resíduo"

        const hasOpenDay = Object.values(operatingHours).some(d => d.isOpen)
        if (!hasOpenDay) newErrors.operatingHours = "Selecione ao menos um dia de funcionamento"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setResponseError(null)
        setErrors({})

        if (!validateForm()) return

        const token = localStorage.getItem("jwt")
        if (!token) {
            setResponseError("Usuário não autenticado.")
            return
        }

        let userId: number
        try {
            const decoded = jwt_decode<JwtPayload>(token)
            console.log("Decoded token:", decoded)

            // Preferencialmente pega o 'id'; se não existir, tenta usar o 'sub'
            if (decoded.id !== undefined) {
                userId = decoded.id
            } else if (decoded.sub) {
                userId = parseInt(decoded.sub)
            } else {
                throw new Error("Token não contém ID válido.")
            }
        } catch (err) {
            console.error("Erro ao decodificar token:", err)
            setResponseError("Erro de autenticação.")
            return
        }

        const fullAddress = `${formData.logradouro}, ${formData.cidade}, ${formData.estado}`
        let latitude: number | null = null
        let longitude: number | null = null

        try {
            const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
                {
                    headers: {
                        "User-Agent": "Recicle-Me (recicle-me@example.com)", // coloque um e-mail válido ou identificador
                    },
                }
            )
            const geoData = await geoRes.json()

            if (geoData && geoData.length > 0) {
                latitude = parseFloat(geoData[0].lat)
                longitude = parseFloat(geoData[0].lon)
            } else {
                setResponseError("Não foi possível localizar o endereço. Verifique os dados informados.")
                return
            }
        } catch (error) {
            console.error("Erro ao buscar coordenadas:", error)
            setResponseError("Erro ao buscar coordenadas do endereço. Tente novamente.")
            return
        }

        const payload = {
            userId,
            cep: formData.cep,
            nome: formData.nome,
            logradouro: formData.logradouro,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            status: formData.status,
            latitude,
            longitude,
            tipoColeta: selectedWasteTypes.map((tipo) => ({tipoDescarte: tipo})),
            diasPontoColeta: Object.entries(operatingHours)
                .filter(([_, v]) => v.isOpen)
                .map(([k, v]) => ({
                    dayFlag: {
                        monday: "SEG",
                        tuesday: "TER",
                        wednesday: "QUA",
                        thursday: "QUI",
                        friday: "SEX",
                        saturday: "SAB",
                        sunday: "DOM",
                    }[k as keyof typeof operatingHours],
                    openHour: v.openTime.replace(":", ""),
                    closeHour: v.closeTime.replace(":", ""),
                })),
        }

        try {
            const res = await fetch("http://localhost:8080/cad/ponto_coleta", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok || result.status === "BAD_REQUEST") {
                if (result.messages) {
                    const newErrors: Record<string, string> = {}
                    result.messages.forEach((msg: { field: string; message: string }) => {
                        newErrors[msg.field] = msg.message
                    })
                    setErrors(newErrors)
                } else {
                    setResponseError("Erro ao cadastrar ponto de coleta. Tente novamente.")
                }
                return
            }

            window.location.href = "/"
        } catch (error) {
            console.error("Erro ao cadastrar ponto de coleta:", error)
            setResponseError("Erro ao cadastrar ponto de coleta. Tente novamente.")
        }
    }

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
                {/* Navigation Header */}
                <Navbar/>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <Card className="shadow-lg">
                        <CardHeader className="text-center pb-6">
                            <div className="flex items-center justify-center mb-4">
                                <MapPin className="h-8 w-8 text-green-600 mr-2"/>
                                <CardTitle className="text-3xl font-bold text-gray-900">Cadastrar Ponto de
                                    Coleta</CardTitle>
                            </div>
                            <p className="text-gray-600">Registre seu ponto de coleta e ajude a comunidade a
                                reciclar</p>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                                            Nome *
                                        </Label>
                                        <Input
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            placeholder="Luis Coleta Lixo Inc."
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                                                errors.nome ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {errors.logradouro &&
                                            <p className="text-red-500 text-sm">{errors.logradouro}</p>}
                                    </div>

                                    {/* CEP Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cep" className="text-sm font-medium text-gray-700">
                                            CEP *
                                        </Label>
                                        <Input
                                            id="cep"
                                            name="cep"
                                            type="text"
                                            placeholder="00000-000"
                                            value={formData.cep}
                                            onChange={handleCEPChange}
                                            maxLength={9}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                                                errors.cep ? "border-red-500" : "border-gray-300"
                                            }`}
                                            disabled={isLoadingCep}
                                        />
                                        {isLoadingCep && <p className="text-blue-500 text-sm">Buscando endereço...</p>}
                                        {errors.cep && <p className="text-red-500 text-sm">{errors.cep}</p>}
                                    </div>

                                    {/* Address Fields Grid */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="logradouro" className="text-sm font-medium text-gray-700">
                                                Logradouro *
                                            </Label>
                                            <Input
                                                id="logradouro"
                                                name="logradouro"
                                                type="text"
                                                placeholder="Rua, Avenida, etc."
                                                value={formData.logradouro}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                                                    errors.logradouro ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.logradouro &&
                                                <p className="text-red-500 text-sm">{errors.logradouro}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bairro" className="text-sm font-medium text-gray-700">
                                                Bairro *
                                            </Label>
                                            <Input
                                                id="bairro"
                                                name="bairro"
                                                type="text"
                                                placeholder="Nome do bairro"
                                                value={formData.bairro}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                                                    errors.bairro ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.bairro && <p className="text-red-500 text-sm">{errors.bairro}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="cidade" className="text-sm font-medium text-gray-700">
                                                Cidade *
                                            </Label>
                                            <Input
                                                id="cidade"
                                                name="cidade"
                                                type="text"
                                                placeholder="Nome da cidade"
                                                value={formData.cidade}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                                                    errors.cidade ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="estado" className="text-sm font-medium text-gray-700">
                                                Estado *
                                            </Label>
                                            <Input
                                                id="estado"
                                                name="estado"
                                                type="text"
                                                placeholder="SP"
                                                value={formData.estado}
                                                onChange={handleInputChange}
                                                maxLength={2}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                                                    errors.estado ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Waste Types Selection */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Tipos de Resíduos
                                        Aceitos *</h3>
                                    <p className="text-gray-600">Selecione os tipos de resíduos que seu ponto de coleta
                                        aceita:</p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {wasteTypes.map((wasteType) => (
                                            <div
                                                key={wasteType.id}
                                                className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                                            >
                                                <Checkbox
                                                    id={wasteType.id}
                                                    checked={selectedWasteTypes.includes(wasteType.id)}
                                                    onCheckedChange={(checked) => handleWasteTypeChange(wasteType.id, checked as boolean)}
                                                    className="mt-1"
                                                />
                                                <div className="flex-1">
                                                    <Label htmlFor={wasteType.id}
                                                           className="font-medium text-gray-900 cursor-pointer">
                                                        {wasteType.name}
                                                    </Label>
                                                    <p className="text-sm text-gray-600 mt-1">{wasteType.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {errors.wasteTypes && <p className="text-red-500 text-sm">{errors.wasteTypes}</p>}
                                </div>

                                {/* Operating Hours Section */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Horários de
                                        Funcionamento *</h3>
                                    <p className="text-gray-600">Defina os dias e horários em que seu ponto de coleta
                                        estará
                                        aberto:</p>

                                    <div className="space-y-4">
                                        {[
                                            {key: "monday", label: "Segunda-feira"},
                                            {key: "tuesday", label: "Terça-feira"},
                                            {key: "wednesday", label: "Quarta-feira"},
                                            {key: "thursday", label: "Quinta-feira"},
                                            {key: "friday", label: "Sexta-feira"},
                                            {key: "saturday", label: "Sábado"},
                                            {key: "sunday", label: "Domingo"},
                                        ].map((day) => (
                                            <div key={day.key}
                                                 className="flex items-center space-x-4 p-4 border rounded-lg">
                                                <div className="flex items-center space-x-3 min-w-[140px]">
                                                    <Checkbox
                                                        id={day.key}
                                                        checked={operatingHours[day.key as keyof typeof operatingHours].isOpen}
                                                        onCheckedChange={(checked) =>
                                                            handleOperatingHoursChange(day.key, "isOpen", checked as boolean)
                                                        }
                                                    />
                                                    <Label htmlFor={day.key}
                                                           className="font-medium text-gray-900 cursor-pointer">
                                                        {day.label}
                                                    </Label>
                                                </div>

                                                {operatingHours[day.key as keyof typeof operatingHours].isOpen && (
                                                    <div className="flex items-center space-x-4 flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Label className="text-sm text-gray-600">Abertura:</Label>
                                                            <Input
                                                                type="time"
                                                                value={operatingHours[day.key as keyof typeof operatingHours].openTime}
                                                                onChange={(e) => handleOperatingHoursChange(day.key, "openTime", e.target.value)}
                                                                className="w-32"
                                                            />
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Label className="text-sm text-gray-600">Fechamento:</Label>
                                                            <Input
                                                                type="time"
                                                                value={operatingHours[day.key as keyof typeof operatingHours].closeTime}
                                                                onChange={(e) => handleOperatingHoursChange(day.key, "closeTime", e.target.value)}
                                                                className="w-32"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {!operatingHours[day.key as keyof typeof operatingHours].isOpen && (
                                                    <div className="flex-1">
                                                        <span className="text-gray-500 text-sm">Fechado</span>
                                                    </div>
                                                )}

                                                {errors[`${day.key}Time`] &&
                                                    <p className="text-red-500 text-sm">{errors[`${day.key}Time`]}</p>}
                                            </div>
                                        ))}
                                    </div>

                                    {errors.operatingHours &&
                                        <p className="text-red-500 text-sm">{errors.operatingHours}</p>}
                                </div>
                                {/* Error Message */}
                                {responseError && (
                                    <p className="text-red-500 text-sm text-center">{responseError}</p>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Cadastrar Ponto de Coleta
                                    </Button>

                                    <Link href="/" className="flex-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium"
                                        >
                                            Cancelar
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Back Button */}
                    <div className="mt-6 text-center">
                        <Link href="/">
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-4 w-4"/>
                                <span>Voltar ao Dashboard</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    )
}
