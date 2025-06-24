"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Recycle, ArrowLeft, MapPin, Bell } from "lucide-react"
import { useState } from "react"

export default function CollectionPointRegisterPage() {
  const [formData, setFormData] = useState({
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    status: "T", // T = Temporário, A = Ativo, I = Inativo
  })

  const [operatingHours, setOperatingHours] = useState({
    monday: { isOpen: false, openTime: "08:00", closeTime: "18:00" },
    tuesday: { isOpen: false, openTime: "08:00", closeTime: "18:00" },
    wednesday: { isOpen: false, openTime: "08:00", closeTime: "18:00" },
    thursday: { isOpen: false, openTime: "08:00", closeTime: "18:00" },
    friday: { isOpen: false, openTime: "08:00", closeTime: "18:00" },
    saturday: { isOpen: false, openTime: "09:00", closeTime: "16:00" },
    sunday: { isOpen: false, openTime: "09:00", closeTime: "16:00" },
  })

  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const wasteTypes = [
    { id: "ELE", name: "Eletrônicos", description: "Computadores, celulares, tablets" },
    { id: "PAP", name: "Papel", description: "Jornais, revistas, papelão" },
    { id: "PLA", name: "Plástico", description: "Garrafas, embalagens, sacolas" },
    { id: "VID", name: "Vidro", description: "Garrafas, potes, recipientes" },
    { id: "MET", name: "Metal", description: "Latas, alumínio, ferro" },
    { id: "BAT", name: "Baterias", description: "Pilhas e baterias em geral" },
    { id: "TEX", name: "Têxteis", description: "Roupas, tecidos, calçados" },
    { id: "ORG", name: "Orgânicos", description: "Restos de comida, cascas" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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

    // Auto-fill address when CEP is complete
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

    if (!formData.cep) {
      newErrors.cep = "CEP é obrigatório"
    } else if (formData.cep.replace(/\D/g, "").length !== 8) {
      newErrors.cep = "CEP deve ter 8 dígitos"
    }

    if (!formData.logradouro) {
      newErrors.logradouro = "Logradouro é obrigatório"
    }

    if (!formData.bairro) {
      newErrors.bairro = "Bairro é obrigatório"
    }

    if (!formData.cidade) {
      newErrors.cidade = "Cidade é obrigatória"
    }

    if (!formData.estado) {
      newErrors.estado = "Estado é obrigatório"
    }

    if (selectedWasteTypes.length === 0) {
      newErrors.wasteTypes = "Selecione pelo menos um tipo de resíduo"
    }

    // Adicionar após a validação dos tipos de resíduos:
    const hasOpenDays = Object.values(operatingHours).some((day) => day.isOpen)
    if (!hasOpenDays) {
      newErrors.operatingHours = "Selecione pelo menos um dia de funcionamento"
    }

    // Validar horários
    Object.entries(operatingHours).forEach(([dayKey, day]) => {
      if (day.isOpen && day.openTime >= day.closeTime) {
        newErrors[`${dayKey}Time`] = "Horário de abertura deve ser anterior ao fechamento"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate userId (in real app, this would come from authentication)
      const userId = 1

      // Create collection point payload
      const collectionPointPayload = {
        userId: userId,
        cep: formData.cep.replace(/\D/g, ""), // Remove formatting
        logradouro: formData.logradouro,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        status: formData.status,
      }

      // Create waste types payload (assuming tipoColetaId would be returned from collection point creation)
      const wasteTypesPayload = selectedWasteTypes.map((wasteType) => ({
        tipoColetaId: 5, // This would be the ID returned from collection point creation
        tipoDescarte: wasteType,
      }))

      // Adicionar após wasteTypesPayload:
      const operatingHoursPayload = Object.entries(operatingHours)
        .filter(([_, day]) => day.isOpen)
        .map(([dayKey, day]) => ({
          dayOfWeek: dayKey,
          openTime: day.openTime,
          closeTime: day.closeTime,
          isOpen: day.isOpen,
        }))

      console.log("Horários de funcionamento:", operatingHoursPayload)

      console.log("Dados do ponto de coleta:", collectionPointPayload)
      console.log("Tipos de resíduos aceitos:", wasteTypesPayload)

      // Simulate successful registration
      alert("Ponto de coleta cadastrado com sucesso!")
      window.location.href = "/dashboard"
    }
  }

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-green-600 mr-2" />
              <CardTitle className="text-3xl font-bold text-gray-900">Cadastrar Ponto de Coleta</CardTitle>
            </div>
            <p className="text-gray-600">Registre seu ponto de coleta e ajude a comunidade a reciclar</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Address Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Informações de Endereço</h3>

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
                    {errors.logradouro && <p className="text-red-500 text-sm">{errors.logradouro}</p>}
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
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Tipos de Resíduos Aceitos *</h3>
                <p className="text-gray-600">Selecione os tipos de resíduos que seu ponto de coleta aceita:</p>

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
                        <Label htmlFor={wasteType.id} className="font-medium text-gray-900 cursor-pointer">
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
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Horários de Funcionamento *</h3>
                <p className="text-gray-600">Defina os dias e horários em que seu ponto de coleta estará aberto:</p>

                <div className="space-y-4">
                  {[
                    { key: "monday", label: "Segunda-feira" },
                    { key: "tuesday", label: "Terça-feira" },
                    { key: "wednesday", label: "Quarta-feira" },
                    { key: "thursday", label: "Quinta-feira" },
                    { key: "friday", label: "Sexta-feira" },
                    { key: "saturday", label: "Sábado" },
                    { key: "sunday", label: "Domingo" },
                  ].map((day) => (
                    <div key={day.key} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 min-w-[140px]">
                        <Checkbox
                          id={day.key}
                          checked={operatingHours[day.key as keyof typeof operatingHours].isOpen}
                          onCheckedChange={(checked) =>
                            handleOperatingHoursChange(day.key, "isOpen", checked as boolean)
                          }
                        />
                        <Label htmlFor={day.key} className="font-medium text-gray-900 cursor-pointer">
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

                      {errors[`${day.key}Time`] && <p className="text-red-500 text-sm">{errors[`${day.key}Time`]}</p>}
                    </div>
                  ))}
                </div>

                {errors.operatingHours && <p className="text-red-500 text-sm">{errors.operatingHours}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Cadastrar Ponto de Coleta
                </Button>
                <Link href="/dashboard" className="flex-1">
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
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
