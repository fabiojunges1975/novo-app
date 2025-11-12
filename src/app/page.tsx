"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, Clock, Dumbbell, MapPin, Play, Star, TrendingUp, Users, Zap, Quote, CheckCircle2, Calendar, Award, Target, Activity } from "lucide-react"

type Exercise = {
  name: string
  videoUrl: string
  description: string
}

type Workout = {
  id: string
  title: string
  duration: number
  level: "iniciante" | "intermediario" | "avancado"
  equipment: string
  exercises: Exercise[]
  benefits: string[]
  videoUrl?: string
}

const workouts: Workout[] = [
  {
    id: "1",
    title: "Treino Express Matinal",
    duration: 15,
    level: "iniciante",
    equipment: "Peso corporal",
    exercises: [
      { name: "Aquecimento dinâmico - 2min", videoUrl: "https://www.youtube.com/embed/3vVg_0RfOCs", description: "Movimentos leves para preparar o corpo" },
      { name: "Flexões (adaptadas se necessário) - 3x10", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4", description: "Fortalece peito, ombros e tríceps" },
      { name: "Agachamentos - 3x15", videoUrl: "https://www.youtube.com/embed/aclHkVaku9U", description: "Trabalha pernas e glúteos" },
      { name: "Prancha - 3x30seg", videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw", description: "Fortalece core e estabilidade" },
      { name: "Polichinelos - 2x20", videoUrl: "https://www.youtube.com/embed/c4DAnQ6DtF8", description: "Cardio e coordenação" },
      { name: "Alongamento - 2min", videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A", description: "Relaxamento muscular" }
    ],
    benefits: ["Ativa metabolismo", "Melhora disposição", "Fortalece core"],
    videoUrl: "https://www.youtube.com/embed/3vVg_0RfOCs"
  },
  {
    id: "2",
    title: "Força com Elásticos",
    duration: 25,
    level: "intermediario",
    equipment: "Faixa elástica",
    exercises: [
      { name: "Aquecimento - 3min", videoUrl: "https://www.youtube.com/embed/3vVg_0RfOCs", description: "Preparação articular" },
      { name: "Remada com elástico - 4x12", videoUrl: "https://www.youtube.com/embed/8lDC4Ri9zAQ", description: "Fortalece costas" },
      { name: "Supino com elástico - 4x12", videoUrl: "https://www.youtube.com/embed/Qb8v0dFgHBw", description: "Trabalha peito" },
      { name: "Agachamento com elástico - 4x15", videoUrl: "https://www.youtube.com/embed/IB3OHNPm-cc", description: "Pernas com resistência" },
      { name: "Desenvolvimento ombros - 3x12", videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog", description: "Fortalece ombros" },
      { name: "Rosca bíceps - 3x12", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo", description: "Trabalha bíceps" },
      { name: "Tríceps com elástico - 3x12", videoUrl: "https://www.youtube.com/embed/2-LAMcpzODU", description: "Fortalece tríceps" },
      { name: "Alongamento - 3min", videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A", description: "Recuperação muscular" }
    ],
    benefits: ["Fortalece músculos", "Melhora postura", "Previne lesões"],
    videoUrl: "https://www.youtube.com/embed/8lDC4Ri9zAQ"
  },
  {
    id: "3",
    title: "HIIT Executivo",
    duration: 20,
    level: "avancado",
    equipment: "Peso corporal",
    exercises: [
      { name: "Aquecimento - 2min", videoUrl: "https://www.youtube.com/embed/3vVg_0RfOCs", description: "Preparação cardiovascular" },
      { name: "Burpees - 4x10", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA", description: "Exercício completo" },
      { name: "Mountain climbers - 4x20", videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM", description: "Cardio intenso" },
      { name: "Jump squats - 4x12", videoUrl: "https://www.youtube.com/embed/A-cFYWvaHr0", description: "Explosão de pernas" },
      { name: "Flexões explosivas - 4x8", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4", description: "Força explosiva" },
      { name: "Prancha lateral - 3x30seg cada lado", videoUrl: "https://www.youtube.com/embed/K2VljzCC16g", description: "Core lateral" },
      { name: "Sprint no lugar - 4x30seg", videoUrl: "https://www.youtube.com/embed/hGvyEg4o28M", description: "Cardio máximo" },
      { name: "Desaquecimento - 2min", videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A", description: "Recuperação ativa" }
    ],
    benefits: ["Queima calorias", "Aumenta resistência", "Melhora cardiovascular"],
    videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA"
  },
  {
    id: "4",
    title: "Mobilidade & Postura",
    duration: 20,
    level: "iniciante",
    equipment: "Peso corporal",
    exercises: [
      { name: "Rotação cervical - 2min", videoUrl: "https://www.youtube.com/embed/SozzCXMZQDg", description: "Mobilidade pescoço" },
      { name: "Círculos de ombros - 2min", videoUrl: "https://www.youtube.com/embed/5MqXNWHw7Ow", description: "Mobilidade ombros" },
      { name: "Cat-cow (gato-vaca) - 3x10", videoUrl: "https://www.youtube.com/embed/kqnua4rHVVA", description: "Mobilidade coluna" },
      { name: "Rotação torácica - 3x10 cada lado", videoUrl: "https://www.youtube.com/embed/vOgxWp0WyiI", description: "Mobilidade tronco" },
      { name: "Alongamento de quadril - 2min cada lado", videoUrl: "https://www.youtube.com/embed/UGEpQ1BRx-4", description: "Flexibilidade quadril" },
      { name: "Ponte de glúteos - 3x15", videoUrl: "https://www.youtube.com/embed/wPM8icPu6H8", description: "Ativa glúteos" },
      { name: "Alongamento completo - 5min", videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A", description: "Relaxamento total" }
    ],
    benefits: ["Reduz dores", "Melhora postura", "Aumenta flexibilidade"],
    videoUrl: "https://www.youtube.com/embed/kqnua4rHVVA"
  },
  {
    id: "5",
    title: "Força Total com Elásticos",
    duration: 30,
    level: "avancado",
    equipment: "Faixa elástica",
    exercises: [
      { name: "Aquecimento dinâmico - 3min", videoUrl: "https://www.youtube.com/embed/3vVg_0RfOCs", description: "Preparação completa" },
      { name: "Agachamento búlgaro com elástico - 4x10 cada perna", videoUrl: "https://www.youtube.com/embed/2C-uNgKwPLE", description: "Pernas unilateral" },
      { name: "Supino inclinado com elástico - 4x12", videoUrl: "https://www.youtube.com/embed/Qb8v0dFgHBw", description: "Peito superior" },
      { name: "Remada unilateral - 4x10 cada lado", videoUrl: "https://www.youtube.com/embed/8lDC4Ri9zAQ", description: "Costas unilateral" },
      { name: "Afundo com elástico - 3x12 cada perna", videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U", description: "Pernas dinâmicas" },
      { name: "Elevação lateral - 3x15", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo", description: "Ombros laterais" },
      { name: "Prancha com elevação de perna - 3x10 cada lado", videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw", description: "Core avançado" },
      { name: "Alongamento - 3min", videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A", description: "Recuperação" }
    ],
    benefits: ["Força máxima", "Definição muscular", "Resistência"],
    videoUrl: "https://www.youtube.com/embed/2C-uNgKwPLE"
  },
  {
    id: "6",
    title: "Cardio Hotel Room",
    duration: 18,
    level: "intermediario",
    equipment: "Peso corporal",
    exercises: [
      { name: "Aquecimento - 2min", videoUrl: "https://www.youtube.com/embed/3vVg_0RfOCs", description: "Preparação cardio" },
      { name: "High knees - 3x30seg", videoUrl: "https://www.youtube.com/embed/8opcQdC-V-U", description: "Cardio intenso" },
      { name: "Burpees modificados - 3x8", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA", description: "Corpo inteiro" },
      { name: "Skaters - 3x20", videoUrl: "https://www.youtube.com/embed/qbKP5NjQF4I", description: "Lateral cardio" },
      { name: "Flexões com toque no ombro - 3x10", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4", description: "Força e equilíbrio" },
      { name: "Agachamento jump - 3x10", videoUrl: "https://www.youtube.com/embed/A-cFYWvaHr0", description: "Explosão" },
      { name: "Prancha dinâmica - 3x30seg", videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw", description: "Core estabilidade" },
      { name: "Desaquecimento - 2min", videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A", description: "Volta à calma" }
    ],
    benefits: ["Queima gordura", "Melhora condicionamento", "Sem equipamento"],
    videoUrl: "https://www.youtube.com/embed/8opcQdC-V-U"
  }
]

const plans = [
  {
    name: "Mensal",
    price: "R$ 47",
    period: "/mês",
    features: [
      "Treinos diários personalizados",
      "Acesso a todos os níveis",
      "Vídeos demonstrativos HD",
      "Suporte por email",
      "Cancele quando quiser"
    ],
    popular: false
  },
  {
    name: "Trimestral",
    price: "R$ 119",
    period: "/3 meses",
    savings: "Economize 15%",
    features: [
      "Tudo do plano Mensal",
      "Plano de treino personalizado",
      "Consultoria mensal",
      "Grupo VIP no WhatsApp",
      "Garantia de 30 dias"
    ],
    popular: true
  },
  {
    name: "Anual",
    price: "R$ 377",
    period: "/ano",
    savings: "Economize 33%",
    features: [
      "Tudo do plano Trimestral",
      "Avaliação física online",
      "Plano nutricional básico",
      "Prioridade no suporte",
      "Acesso vitalício a conteúdos"
    ],
    popular: false
  }
]

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "CEO, Tech Solutions",
    age: 47,
    content: "Consegui voltar a treinar regularmente mesmo com viagens constantes. Perdi 8kg em 3 meses e minha energia triplicou!",
    rating: 5
  },
  {
    name: "Roberto Silva",
    role: "Diretor Comercial",
    age: 52,
    content: "Os treinos de 20 minutos cabem perfeitamente na minha rotina. Não preciso mais de academia e economizo tempo precioso.",
    rating: 5
  },
  {
    name: "Fernando Costa",
    role: "Empresário",
    age: 45,
    content: "Finalmente um app que entende a realidade de quem viaja muito. Treino no hotel, no parque, onde estiver. Mudou minha vida!",
    rating: 5
  },
  {
    name: "Marcelo Oliveira",
    role: "VP de Vendas",
    age: 49,
    content: "Minha postura melhorou muito e as dores nas costas sumiram. Os vídeos são claros e fáceis de seguir.",
    rating: 5
  }
]

export default function Home() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>("todos")
  const [completedDays, setCompletedDays] = useState<string[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [darkMode, setDarkMode] = useState(true)

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
      setDarkMode(saved === "dark")
    }
  }, [])

  // Load completed days from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("completedWorkouts")
    if (saved) {
      const days = JSON.parse(saved)
      setCompletedDays(days)
      calculateStreak(days)
    }
  }, [])

  // Calculate current streak
  const calculateStreak = (days: string[]) => {
    if (days.length === 0) {
      setCurrentStreak(0)
      return
    }

    const sortedDays = [...days].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < sortedDays.length; i++) {
      const checkDate = new Date(sortedDays[i])
      checkDate.setHours(0, 0, 0, 0)
      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)
      expectedDate.setHours(0, 0, 0, 0)

      if (checkDate.getTime() === expectedDate.getTime()) {
        streak++
      } else {
        break
      }
    }

    setCurrentStreak(streak)
  }

  // Mark workout as completed
  const completeWorkout = () => {
    const today = new Date().toISOString().split('T')[0]
    if (!completedDays.includes(today)) {
      const updated = [...completedDays, today]
      setCompletedDays(updated)
      localStorage.setItem("completedWorkouts", JSON.stringify(updated))
      calculateStreak(updated)
    }
    setSelectedWorkout(null)
  }

  // Check if today is completed
  const isTodayCompleted = () => {
    const today = new Date().toISOString().split('T')[0]
    return completedDays.includes(today)
  }

  const filteredWorkouts = selectedLevel === "todos" 
    ? workouts 
    : workouts.filter(w => w.level === selectedLevel)

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-b from-slate-50 via-white to-slate-50'
    }`}>
      {/* Hero Section Premium */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' 
            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
        }`} />
        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className={`mb-4 ${
              darkMode
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
                : 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200'
            }`}>
              <Zap className="w-3 h-3 mr-1" />
              Premium Training for Executives
            </Badge>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Excelência em Cada<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Movimento
              </span>
            </h1>
            <p className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Treinos de elite para executivos que não aceitam menos que a perfeição. 
              15-30 minutos de alta performance, onde e quando você decidir.
            </p>

            {/* Premium Stats Cards */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className={`${
                darkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-slate-200 shadow-lg'
              } backdrop-blur-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Sequência</div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {currentStreak} dias
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${
                darkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-slate-200 shadow-lg'
              } backdrop-blur-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isTodayCompleted() 
                        ? 'bg-gradient-to-br from-green-500 to-green-600' 
                        : darkMode ? 'bg-slate-700' : 'bg-slate-200'
                    }`}>
                      <CheckCircle2 className={`w-5 h-5 ${
                        isTodayCompleted() ? 'text-white' : darkMode ? 'text-slate-500' : 'text-slate-400'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Hoje</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {isTodayCompleted() ? 'Concluído' : 'Pendente'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${
                darkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-slate-200 shadow-lg'
              } backdrop-blur-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Nível</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Premium
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Treino Premium
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={`${
                  darkMode
                    ? 'border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500'
                    : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                }`}
              >
                Ver Planos Exclusivos
              </Button>
            </div>

            {/* Premium Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>15-30min</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Alta Performance</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>100%</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Flexível</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>Elite</div>
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Qualidade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section Premium */}
      <section className={`py-16 sm:py-20 ${
        darkMode ? 'bg-slate-800/50' : 'bg-slate-100/50'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Por Que Líderes Escolhem FIT BUSINESS
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className={`${
              darkMode 
                ? 'bg-slate-900/50 border-slate-700 hover:border-blue-500/50' 
                : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-lg'
            } transition-all duration-300 hover:shadow-2xl`}>
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl w-fit mb-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-900'}>
                  Otimização Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Máxima eficiência em mínimo tempo. Treinos científicos de 15-30min
                </p>
              </CardContent>
            </Card>

            <Card className={`${
              darkMode 
                ? 'bg-slate-900/50 border-slate-700 hover:border-purple-500/50' 
                : 'bg-white border-slate-200 hover:border-purple-500/50 shadow-lg'
            } transition-all duration-300 hover:shadow-2xl`}>
              <CardHeader>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl w-fit mb-3">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-900'}>
                  Liberdade Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Hotel 5 estrelas, escritório executivo ou home office premium
                </p>
              </CardContent>
            </Card>

            <Card className={`${
              darkMode 
                ? 'bg-slate-900/50 border-slate-700 hover:border-blue-500/50' 
                : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-lg'
            } transition-all duration-300 hover:shadow-2xl`}>
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl w-fit mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-900'}>
                  Precisão Cirúrgica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Cada movimento otimizado para resultados mensuráveis
                </p>
              </CardContent>
            </Card>

            <Card className={`${
              darkMode 
                ? 'bg-slate-900/50 border-slate-700 hover:border-purple-500/50' 
                : 'bg-white border-slate-200 hover:border-purple-500/50 shadow-lg'
            } transition-all duration-300 hover:shadow-2xl`}>
              <CardHeader>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl w-fit mb-3">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-900'}>
                  Performance Elite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Metodologia validada para executivos de alto desempenho
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workouts Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Biblioteca Premium de Treinos
            </h2>
            <p className={`max-w-2xl mx-auto ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Vídeos em alta definição com instruções detalhadas
            </p>
          </div>

          <Tabs defaultValue="todos" className="max-w-6xl mx-auto" onValueChange={setSelectedLevel}>
            <TabsList className={`grid w-full grid-cols-4 mb-8 ${
              darkMode 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-white border border-slate-200'
            }`}>
              <TabsTrigger value="todos" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                Todos
              </TabsTrigger>
              <TabsTrigger value="iniciante" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                Iniciante
              </TabsTrigger>
              <TabsTrigger value="intermediario" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                Intermediário
              </TabsTrigger>
              <TabsTrigger value="avancado" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                Avançado
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedLevel} className="space-y-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <Card 
                    key={workout.id} 
                    className={`${
                      darkMode 
                        ? 'bg-slate-900/70 border-slate-700 hover:border-blue-500/50' 
                        : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-lg'
                    } transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer`}
                    onClick={() => setSelectedWorkout(workout)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant="outline" 
                          className={
                            workout.level === "iniciante" 
                              ? "border-green-500/50 text-green-400" 
                              : workout.level === "intermediario"
                              ? "border-orange-500/50 text-orange-400"
                              : "border-red-500/50 text-red-400"
                          }
                        >
                          {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
                        </Badge>
                        <div className={`flex items-center ${
                          darkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{workout.duration}min</span>
                        </div>
                      </div>
                      <CardTitle className={darkMode ? 'text-white' : 'text-slate-900'}>
                        {workout.title}
                      </CardTitle>
                      <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                        {workout.equipment}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className={`text-sm font-medium ${
                          darkMode ? 'text-slate-500' : 'text-slate-700'
                        }`}>Benefícios:</div>
                        <div className="flex flex-wrap gap-2">
                          {workout.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className={`text-xs ${
                              darkMode 
                                ? 'bg-slate-800 text-slate-300' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWorkout(workout)
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Ver Treino Completo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 sm:py-20 ${
        darkMode ? 'bg-slate-800/50' : 'bg-slate-100/50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Depoimentos de Executivos
            </h2>
            <p className={`max-w-2xl mx-auto ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Resultados reais de líderes que transformaram sua performance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className={`${
                darkMode 
                  ? 'bg-slate-900/70 border-slate-700 hover:border-blue-500/30' 
                  : 'bg-white border-slate-200 hover:border-blue-500/30 shadow-lg'
              } transition-all duration-300 hover:shadow-2xl`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className={`w-6 h-6 ${
                      darkMode ? 'text-slate-600' : 'text-slate-300'
                    }`} />
                  </div>
                  <CardTitle className={`text-lg ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>{testimonial.name}</CardTitle>
                  <CardDescription className={`text-sm ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {testimonial.role} • {testimonial.age} anos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm italic ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section Premium */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Investimento em Excelência
            </h2>
            <p className={`max-w-2xl mx-auto ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Planos exclusivos para executivos que valorizam qualidade
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card 
                key={idx}
                className={`relative ${
                  plan.popular 
                    ? darkMode
                      ? "bg-gradient-to-b from-blue-900/50 to-slate-900/50 border-blue-500 shadow-2xl shadow-blue-500/20" 
                      : "bg-gradient-to-b from-blue-50 to-white border-blue-500 shadow-2xl shadow-blue-500/20"
                    : darkMode
                    ? "bg-slate-900/50 border-slate-700"
                    : "bg-white border-slate-200 shadow-lg"
                } hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Mais Escolhido
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className={`text-2xl ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className={`text-4xl font-bold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>{plan.price}</span>
                    <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                      {plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <Badge variant="outline" className="mt-2 border-green-500/50 text-green-400 w-fit">
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className={`flex items-start ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        : darkMode
                        ? "bg-slate-800 hover:bg-slate-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    Assinar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className={`text-center mt-8 text-sm ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <p>✓ Cancele quando quiser • ✓ Garantia de 7 dias • ✓ Suporte prioritário</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={`py-16 sm:py-20 ${
        darkMode ? 'bg-slate-800/50' : 'bg-slate-100/50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Comunidade de Elite
            </h2>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Líderes de todo o Brasil já transformaram sua performance
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  5.000+
                </div>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Executivos Ativos
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  4.9★
                </div>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Avaliação Premium
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  96%
                </div>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Taxa de Satisfação
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Premium */}
      <section className={`py-16 sm:py-20 ${
        darkMode 
          ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' 
          : 'bg-gradient-to-r from-blue-100/50 to-purple-100/50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Pronto Para a Transformação?
            </h2>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Junte-se à elite executiva. Resultados garantidos em 30 dias.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <Play className="w-6 h-6 mr-2" />
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Workout Detail Dialog */}
      <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
        <DialogContent className={`${
          darkMode 
            ? 'bg-slate-900 border-slate-700 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        } max-w-4xl max-h-[90vh] overflow-y-auto`}>
          {selectedWorkout && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={
                      selectedWorkout.level === "iniciante" 
                        ? "border-green-500/50 text-green-400" 
                        : selectedWorkout.level === "intermediario"
                        ? "border-orange-500/50 text-orange-400"
                        : "border-red-500/50 text-red-400"
                    }
                  >
                    {selectedWorkout.level.charAt(0).toUpperCase() + selectedWorkout.level.slice(1)}
                  </Badge>
                  <div className={`flex items-center ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{selectedWorkout.duration} minutos</span>
                  </div>
                </div>
                <DialogTitle className="text-2xl">{selectedWorkout.title}</DialogTitle>
                <DialogDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  {selectedWorkout.equipment}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Exercícios com Vídeos Demonstrativos:</h3>
                  <div className="space-y-4">
                    {selectedWorkout.exercises.map((exercise, idx) => (
                      <Card key={idx} className={`${
                        darkMode 
                          ? 'bg-slate-800/50 border-slate-700' 
                          : 'bg-slate-50 border-slate-200'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <span className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-1 shadow-lg">
                              {idx + 1}
                            </span>
                            <div className="flex-1">
                              <h4 className={`font-semibold mb-1 ${
                                darkMode ? 'text-white' : 'text-slate-900'
                              }`}>{exercise.name}</h4>
                              <p className={`text-sm mb-3 ${
                                darkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>{exercise.description}</p>
                              <div className={`aspect-video rounded-lg overflow-hidden ${
                                darkMode ? 'bg-slate-900' : 'bg-slate-200'
                              }`}>
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={exercise.videoUrl}
                                  title={exercise.name}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Benefícios:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkout.benefits.map((benefit, idx) => (
                      <Badge key={idx} className={`${
                        darkMode 
                          ? 'bg-slate-800 text-slate-300 border-slate-700' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <Check className="w-3 h-3 mr-1" />
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg py-6 shadow-lg"
                  onClick={completeWorkout}
                  disabled={isTodayCompleted()}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {isTodayCompleted() ? 'Treino Concluído Hoje!' : 'Marcar Como Concluído'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
