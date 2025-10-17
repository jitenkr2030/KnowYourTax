"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Mic, 
  MicOff, 
  MessageSquare, 
  Bot, 
  Globe, 
  Volume2,
  VolumeX,
  Send,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  Languages,
  Headphones
} from "lucide-react"

interface VoiceInterfaceProps {
  userId: string
}

interface VoiceCommand {
  id: string
  command: string
  category: string
  description: string
  language: string
  confidence: number
}

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  message: string
  timestamp: Date
  language: string
}

interface LanguageOption {
  code: string
  name: string
  nativeName: string
  voiceSupport: boolean
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', voiceSupport: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', voiceSupport: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', voiceSupport: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', voiceSupport: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', voiceSupport: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', voiceSupport: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', voiceSupport: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', voiceSupport: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', voiceSupport: true },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', voiceSupport: true }
]

const SAMPLE_VOICE_COMMANDS: VoiceCommand[] = [
  {
    id: '1',
    command: 'Add income tax entry',
    category: 'Tax Entry',
    description: 'Create a new income tax entry',
    language: 'en',
    confidence: 0.95
  },
  {
    id: '2',
    command: 'Show my tax summary',
    category: 'Reports',
    description: 'Display comprehensive tax summary',
    language: 'en',
    confidence: 0.92
  },
  {
    id: '3',
    command: 'Calculate GST for this bill',
    category: 'GST',
    description: 'Calculate GST for a specific bill',
    language: 'en',
    confidence: 0.88
  },
  {
    id: '4',
    command: 'आयकर जोड़ें',
    category: 'Tax Entry',
    description: 'Add income tax entry (Hindi)',
    language: 'hi',
    confidence: 0.91
  },
  {
    id: '5',
    command: 'ஜிஎஸ்டி கணக்கிடு',
    category: 'GST',
    description: 'Calculate GST (Tamil)',
    language: 'ta',
    confidence: 0.87
  }
]

const TAX_FAQ = [
  {
    question: 'What is the current income tax slab?',
    answer: 'For FY 2023-24, the income tax slabs are: Up to ₹3 lakh - Nil, ₹3-6 lakh - 5%, ₹6-9 lakh - 10%, ₹9-12 lakh - 15%, ₹12-15 lakh - 20%, Above ₹15 lakh - 30%.'
  },
  {
    question: 'How can I save tax under Section 80C?',
    answer: 'You can save up to ₹1.5 lakh under Section 80C through investments in PPF, ELSS, NSC, life insurance premiums, and tuition fees for children.'
  },
  {
    question: 'What is the difference between old and new tax regime?',
    answer: 'The old regime offers various deductions and exemptions, while the new regime has lower tax rates but fewer deductions. You can choose the regime that benefits you more.'
  },
  {
    question: 'How is GST calculated?',
    answer: 'GST is calculated as a percentage of the taxable value. For most goods and services, it\'s 18% (9% CGST + 9% SGST). Some items have different rates like 0%, 5%, 12%, 28%.'
  },
  {
    question: 'When is the last date for filing ITR?',
    answer: 'For individual taxpayers, the last date for filing Income Tax Returns (ITR) is usually July 31st of the assessment year.'
  }
]

export default function VoiceInterface({ userId }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([])
  const [recognition, setRecognition] = useState<any>(null)
  
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = selectedLanguage
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          handleVoiceCommand(transcript)
        }
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
        
        recognitionInstance.onend = () => {
          setIsListening(false)
        }
        
        setRecognition(recognitionInstance)
      }
    }
    
    // Initialize chat with welcome message
    setChatMessages([
      {
        id: '1',
        type: 'bot',
        message: 'Hello! I\'m your Tax Assistant. How can I help you with your taxes today?',
        timestamp: new Date(),
        language: selectedLanguage
      }
    ])
    
    // Initialize recent commands
    setRecentCommands(SAMPLE_VOICE_COMMANDS.slice(0, 3))
  }, [selectedLanguage])

  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const handleVoiceCommand = (command: string) => {
    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command: command,
      category: 'Voice Command',
      description: 'User voice command',
      language: selectedLanguage,
      confidence: 0.9
    }
    
    setRecentCommands(prev => [newCommand, ...prev.slice(0, 4)])
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: command,
      timestamp: new Date(),
      language: selectedLanguage
    }
    
    setChatMessages(prev => [...prev, userMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(command)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse,
        timestamp: new Date(),
        language: selectedLanguage
      }
      
      setChatMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const generateBotResponse = (command: string): string => {
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('tax') && lowerCommand.includes('entry')) {
      return 'I can help you add a tax entry. Please provide the amount, category, and description.'
    } else if (lowerCommand.includes('summary') || lowerCommand.includes('report')) {
      return 'Your tax summary shows you\'ve paid ₹125,000 total this year. Would you like me to break this down by category?'
    } else if (lowerCommand.includes('gst') && lowerCommand.includes('calculate')) {
      return 'I can help you calculate GST. Please provide the bill amount and I\'ll calculate the GST for you.'
    } else if (lowerCommand.includes('help') || lowerCommand.includes('assist')) {
      return 'I can help you with: adding tax entries, calculating GST, viewing tax summaries, tax planning advice, and answering tax-related questions. What would you like to know?'
    } else {
      return 'I understand you said: "' + command + '". How can I help you with your taxes?'
    }
  }

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      handleVoiceCommand(currentMessage)
      setCurrentMessage('')
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    if (recognition) {
      recognition.lang = language
    }
  }

  const getLanguageName = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === code)
    return lang ? lang.nativeName : 'English'
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Voice & Conversational Interface</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Speak naturally or chat with our AI tax assistant
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Languages className="h-3 w-3 mr-1" />
            {getLanguageName(selectedLanguage)}
          </Badge>
        </div>
      </div>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Preferences
          </CardTitle>
          <CardDescription>
            Choose your preferred language for voice and text interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="text-xs">{lang.nativeName}</span>
                {lang.voiceSupport && <Headphones className="h-3 w-3" />}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Interface */}
      <Tabs defaultValue="voice" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="voice">Voice Commands</TabsTrigger>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Voice Control */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice Control
                </CardTitle>
                <CardDescription>
                  Click the microphone and speak your tax-related commands
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <Button
                    size="lg"
                    className={`w-24 h-24 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={isListening ? stopListening : startListening}
                  >
                    {isListening ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {isListening ? 'Listening...' : 'Tap to speak'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isListening ? 'Speak now' : 'Voice commands enabled'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                    >
                      {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      {voiceEnabled ? 'Voice On' : 'Voice Off'}
                    </Button>
                  </div>
                </div>
                
                <Alert>
                  <Mic className="h-4 w-4" />
                  <AlertDescription>
                    Try saying: "Add income tax entry" or "Show my tax summary"
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Recent Commands */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Commands
                </CardTitle>
                <CardDescription>
                  Your recent voice commands and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCommands.map((cmd) => (
                    <div key={cmd.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{cmd.command}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {cmd.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(cmd.confidence * 100)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <Languages className="h-3 w-3" />
                          {getLanguageName(cmd.language)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {cmd.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Commands */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample Voice Commands</CardTitle>
              <CardDescription>
                Try these commands to get started with voice control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SAMPLE_VOICE_COMMANDS.map((cmd) => (
                  <div key={cmd.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{cmd.command}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {cmd.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {getLanguageName(cmd.language)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(cmd.confidence * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Tax Chat Assistant
              </CardTitle>
              <CardDescription>
                Chat with our AI assistant for instant tax help and answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your tax question..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common tax questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {TAX_FAQ.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful
                      </Button>
                      <Button size="sm" variant="outline">
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        Not Helpful
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}