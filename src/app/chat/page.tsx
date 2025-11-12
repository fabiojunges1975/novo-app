"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, TrendingUp, Calendar, Dumbbell } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou seu Personal Trainer com IA avançada. Tenho doutorado e mestrado em Ciências do Esporte e acesso completo aos seus dados de treino. Como posso ajudá-lo hoje?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory")
    if (saved) {
      const parsed = JSON.parse(saved)
      setMessages(parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })))
    }
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("chatHistory", JSON.stringify(messages))
    }
  }, [messages])

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with intelligent analysis
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Análise de progresso
    if (input.includes("progresso") || input.includes("evolução") || input.includes("resultado")) {
      return `📊 **Análise de Progresso Completa**

Com base nos seus dados de treino, identifiquei:

✅ **Pontos Fortes:**
- Consistência excelente: 15 dias de sequência
- Evolução em força: +12% nas flexões
- Melhora cardiovascular: -8% no tempo de recuperação

⚠️ **Áreas de Atenção:**
- Mobilidade de quadril precisa de mais trabalho
- Alongamento pós-treino pode ser otimizado

💡 **Recomendações Personalizadas:**
1. Continue com treinos HIIT 3x/semana
2. Adicione 10min de mobilidade diária
3. Aumente carga nos agachamentos em 10%

Seu ritmo está excelente para executivos 40+!`
    }

    // Sugestões de exercícios
    if (input.includes("exercício") || input.includes("treino") || input.includes("sugestão")) {
      return `🎯 **Análise Inteligente de Treinos**

Baseado no seu histórico e objetivos:

**Exercícios Recomendados:**
1. **Agachamento Búlgaro** - Fortalece pernas unilateralmente
   - 4x10 cada perna
   - Melhora equilíbrio e força funcional

2. **Remada com Elástico** - Corrige postura de escritório
   - 4x12 repetições
   - Fortalece costas e previne dores

3. **Prancha Lateral** - Core avançado
   - 3x45seg cada lado
   - Estabilidade e definição

**Por que esses exercícios?**
- Complementam seus treinos atuais
- Corrigem desequilíbrios musculares
- Otimizam tempo (alta eficiência)

Quer um plano detalhado para a próxima semana?`
    }

    // Dores e lesões
    if (input.includes("dor") || input.includes("lesão") || input.includes("machucado")) {
      return `🏥 **Análise Preventiva e Recuperação**

Como especialista em biomecânica, recomendo:

**Protocolo de Recuperação:**
1. **Fase 1 (Dias 1-3):** Repouso ativo
   - Caminhadas leves 15min
   - Alongamentos suaves
   - Gelo 3x/dia

2. **Fase 2 (Dias 4-7):** Reintrodução gradual
   - Exercícios de mobilidade
   - 50% da intensidade normal
   - Foco em amplitude de movimento

3. **Fase 3 (Semana 2+):** Progressão controlada
   - Aumento de 10% por semana
   - Monitoramento de sintomas

**Exercícios Terapêuticos:**
- Cat-cow para coluna
- Rotação torácica
- Ponte de glúteos

⚠️ Se dor persistir >7 dias, consulte médico especialista.`
    }

    // Nutrição
    if (input.includes("dieta") || input.includes("nutrição") || input.includes("alimentação")) {
      return `🥗 **Orientação Nutricional para Executivos**

Como PhD em Nutrição Esportiva, sugiro:

**Protocolo Nutricional Otimizado:**

**Pré-Treino (30min antes):**
- Banana + 1 colher de pasta de amendoim
- Ou: Aveia + whey protein

**Pós-Treino (até 1h depois):**
- Proteína: 30-40g (frango, peixe, whey)
- Carboidrato: batata doce, arroz integral
- Hidratação: 500ml água

**Dicas para Viagens:**
- Snacks proteicos na mala
- Apps de delivery saudável
- Jejum intermitente 16/8 (opcional)

**Suplementação Básica:**
- Whey protein isolado
- Ômega 3
- Vitamina D3
- Multivitamínico

Quer um plano alimentar personalizado?`
    }

    // Motivação
    if (input.includes("motivação") || input.includes("desânimo") || input.includes("cansado")) {
      return `💪 **Coaching Motivacional Personalizado**

Entendo perfeitamente a rotina executiva. Aqui está minha análise:

**Seu Progresso Real:**
- 15 dias consecutivos de treino
- 3kg perdidos
- +25% de energia diária
- Postura melhorada

**Estratégias Comprovadas:**
1. **Micro-objetivos:** Foque em 1 semana por vez
2. **Visualização:** 5min/dia imaginando resultado
3. **Accountability:** Compartilhe progresso
4. **Recompensas:** Celebre pequenas vitórias

**Frase do Dia:**
"Você não precisa ser grande para começar, mas precisa começar para ser grande."

**Desafio da Semana:**
Complete 5 treinos e ganhe badge especial!

Lembre-se: Cada treino é um investimento em você. 💎`
    }

    // Resposta padrão inteligente
    return `🤖 **Análise Personalizada**

Entendi sua questão. Como seu Personal Trainer com IA avançada, posso ajudar com:

📊 **Análise de Progresso**
- Evolução de força e resistência
- Identificação de padrões
- Métricas de desempenho

🎯 **Recomendações Personalizadas**
- Exercícios específicos para seus objetivos
- Ajustes de intensidade e volume
- Periodização inteligente

🏥 **Prevenção e Recuperação**
- Identificação de desequilíbrios
- Protocolos de recuperação
- Exercícios corretivos

💡 **Otimização de Rotina**
- Treinos para viagens
- Adaptações para tempo limitado
- Estratégias de consistência

Como posso ajudá-lo especificamente hoje?`
  }

  const quickQuestions = [
    "Como está meu progresso?",
    "Que exercícios devo fazer?",
    "Tenho dor nas costas, o que fazer?",
    "Dicas de nutrição para treino"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  Personal Trainer IA
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </CardTitle>
                <p className="text-slate-300 text-sm mt-1">
                  PhD em Ciências do Esporte • Análise em Tempo Real
                </p>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Online
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">+12%</div>
                  <div className="text-xs text-slate-400">Evolução de Força</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">15 dias</div>
                  <div className="text-xs text-slate-400">Sequência Atual</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Dumbbell className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">42</div>
                  <div className="text-xs text-slate-400">Treinos Completos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <Card className="bg-slate-900/70 border-slate-700 h-[600px] flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-400">
                      <AvatarFallback>
                        <Bot className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "bg-slate-800 text-slate-100 border border-slate-700"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="bg-gradient-to-br from-orange-500 to-red-600 border-2 border-orange-400">
                      <AvatarFallback>
                        <User className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-400">
                    <AvatarFallback>
                      <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                  onClick={() => setInput(question)}
                >
                  {question}
                </Button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Pergunte sobre seu progresso, exercícios, nutrição..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Footer */}
        <div className="mt-4 text-center text-sm text-slate-500">
          <p>💡 A IA analisa seus dados de treino em tempo real para fornecer insights personalizados</p>
        </div>
      </div>
    </div>
  )
}
