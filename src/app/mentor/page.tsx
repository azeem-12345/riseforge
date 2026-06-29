"use client"

import { useState, useEffect, useRef } from 'react'
import GameShell from '@/components/game/GameShell'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Brain, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  ListCheck, 
  Quote,
  Loader2,
  Terminal,
  User,
  History,
  Info,
  Plus,
  Trash2,
  X,
  Zap,
  Key
} from 'lucide-react'
import { useGameState } from '@/hooks/use-game-state'
import { founderMentor, type MentorOutput } from '@/ai/flows/founder-mentor-flow'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  role: 'user' | 'mentor'
  text?: string
  data?: MentorOutput
  timestamp: number
}

interface ChatThread {
  id: string
  title: string
  messages: ChatMessage[]
  timestamp: number
}

export default function MentorPage() {
  const { state } = useGameState()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro')
  const [customApiKey, setCustomApiKey] = useState('')
  const [showKeyInput, setShowKeyInput] = useState(false)
  
  // Threads State
  const [threads, setThreads] = useState<ChatThread[]>([])
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const scrollRef = useRef<HTMLDivElement>(null)

  // Initialize Threads from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('riseforge_api_key')
    if (savedKey) setCustomApiKey(savedKey)

    const savedThreads = localStorage.getItem('riseforge_mentor_threads')
    const activeId = localStorage.getItem('riseforge_mentor_active_thread_id')
    
    let loadedThreads: ChatThread[] = []
    if (savedThreads) {
      try {
        loadedThreads = JSON.parse(savedThreads)
      } catch (e) {
        console.error("Failed to parse saved threads", e)
      }
    }
    
    if (loadedThreads.length === 0) {
      const newId = `thread-${Date.now()}`
      loadedThreads = [{
        id: newId,
        title: 'New Conversation',
        messages: [],
        timestamp: Date.now()
      }]
      localStorage.setItem('riseforge_mentor_threads', JSON.stringify(loadedThreads))
      localStorage.setItem('riseforge_mentor_active_thread_id', newId)
      setActiveThreadId(newId)
    } else {
      if (activeId && loadedThreads.some(t => t.id === activeId)) {
        setActiveThreadId(activeId)
      } else {
        setActiveThreadId(loadedThreads[0].id)
      }
    }
    setThreads(loadedThreads)
  }, [])

  // Helper to save threads state and active thread ID
  const saveThreadsAndActive = (updatedThreads: ChatThread[], activeId: string) => {
    setThreads(updatedThreads)
    localStorage.setItem('riseforge_mentor_threads', JSON.stringify(updatedThreads))
    localStorage.setItem('riseforge_mentor_active_thread_id', activeId)
    setActiveThreadId(activeId)
  }

  // Scroll to bottom on updates
  const activeThread = threads.find(t => t.id === activeThreadId)
  const messages = activeThread ? activeThread.messages : []

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  const handleConsult = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || loading || !activeThreadId) return

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() }
    const updatedMessages = [...messages, userMsg]

    // Generate short thread name based on first message if currently default
    let updatedTitle = activeThread?.title || 'New Conversation'
    if (messages.length === 0) {
      updatedTitle = input.length > 25 ? input.slice(0, 25) + '...' : input
    }

    const updatedThreads = threads.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          title: updatedTitle,
          messages: updatedMessages,
          timestamp: Date.now()
        }
      }
      return t
    })

    // Sort to keep newest discussions at the top
    updatedThreads.sort((a, b) => b.timestamp - a.timestamp)
    saveThreadsAndActive(updatedThreads, activeThreadId)

    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      const result = await founderMentor({
        userQuestion: currentInput,
        level: state.level,
        levelTitle: state.levelTitle,
        modelPreference: selectedModel,
        customApiKey
      })
      
      const mentorMsg: ChatMessage = { role: 'mentor', data: result, timestamp: Date.now() }
      const finalMessages = [...updatedMessages, mentorMsg]
      
      const finalThreads = updatedThreads.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            messages: finalMessages,
            timestamp: Date.now()
          }
        }
        return t
      })
      
      saveThreadsAndActive(finalThreads, activeThreadId)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    const newId = `thread-${Date.now()}`
    const newThread: ChatThread = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      timestamp: Date.now()
    }
    const updatedThreads = [newThread, ...threads]
    saveThreadsAndActive(updatedThreads, newId)
  }

  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedThreads = threads.filter(t => t.id !== id)
    
    if (updatedThreads.length === 0) {
      const newId = `thread-${Date.now()}`
      const newThread: ChatThread = {
        id: newId,
        title: 'New Conversation',
        messages: [],
        timestamp: Date.now()
      }
      saveThreadsAndActive([newThread], newId)
    } else {
      const newActiveId = activeThreadId === id ? updatedThreads[0].id : activeThreadId!
      saveThreadsAndActive(updatedThreads, newActiveId)
    }
  }

  return (
    <GameShell>
      <div className="flex flex-col h-[calc(100vh-8rem)] -mt-6 -mx-4 md:-mx-8 lg:-mx-12">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-card/30 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-foreground/90">Master Mentor</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Oracle System Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-background/80 border border-white/10 rounded-full px-3 py-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-foreground font-semibold text-[11px] focus:outline-none cursor-pointer pr-1"
              >
                <option value="gemini-2.5-pro" className="bg-card text-foreground">✨ Gemini 2.5 Pro (Flagship)</option>
                <option value="claude-3-5-sonnet" className="bg-card text-foreground">🧠 Claude 3.5 Sonnet</option>
                <option value="gpt-4o" className="bg-card text-foreground">⚡ GPT-4o (Omni Advisor)</option>
                <option value="oracle" className="bg-card text-foreground">🛡️ Neural Oracle (100% Logic)</option>
              </select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={cn(
                "h-8 px-2.5 rounded-full border border-white/10 text-xs gap-1.5 transition-colors",
                customApiKey ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-background/80 text-muted-foreground hover:text-foreground"
              )}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase">{customApiKey ? "Key Active" : "Add API Key"}</span>
            </Button>

            <div className="hidden sm:flex px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10 items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-accent" />
              <span className="text-[9px] font-black text-accent uppercase">{state.levelTitle}</span>
            </div>
            
            {/* Sidebar toggle button (Mentor History icon) */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className={cn(
                "h-9 w-9 text-muted-foreground hover:text-primary transition-colors",
                sidebarOpen && "text-accent bg-accent/5 hover:text-accent"
              )}
            >
              <History className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* API Key Input Banner */}
        <AnimatePresence>
          {showKeyInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-card/95 border-b border-white/10 px-6 py-3 flex flex-wrap items-center justify-between gap-4 overflow-hidden backdrop-blur-md shrink-0 shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                <Key className="w-4 h-4 text-primary shrink-0" />
                <span>Paste your personal API Key (Google Gemini, OpenAI, or Anthropic):</span>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[280px] max-w-md">
                <input
                  type="password"
                  placeholder="AIza... or sk-..."
                  value={customApiKey}
                  onChange={(e) => {
                    setCustomApiKey(e.target.value)
                    localStorage.setItem('riseforge_api_key', e.target.value)
                  }}
                  className="w-full bg-background border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <Button size="sm" onClick={() => setShowKeyInput(false)} className="h-8 text-xs font-bold px-4">
                  Save Key
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split Screen Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Thread Sidebar (Chat History) */}
          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <div 
                className="w-64 border-r border-white/5 bg-black/20 flex flex-col p-4 shrink-0 overflow-hidden"
              >
                <Button 
                  onClick={handleNewChat}
                  className="w-full h-11 border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl mb-4 shrink-0 transition-all text-foreground/80 hover:text-foreground"
                >
                  <Plus className="w-4 h-4 text-primary" /> New Session
                </Button>
                
                <ScrollArea className="flex-1 pr-1">
                  <div className="space-y-2">
                    {threads.map(thread => (
                      <div 
                        key={thread.id}
                        onClick={() => saveThreadsAndActive(threads, thread.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl border cursor-pointer flex items-center justify-between group transition-all select-none",
                          thread.id === activeThreadId 
                            ? "border-accent/40 bg-accent/5" 
                            : "border-white/5 bg-white/[0.02] hover:border-white/15"
                        )}
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="text-[11px] font-bold truncate">{thread.title}</p>
                          <p className="text-[8px] text-muted-foreground font-bold uppercase mt-0.5">
                            {new Date(thread.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => handleDeleteChat(thread.id, e)}
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-500/10 rounded-lg shrink-0 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </AnimatePresence>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <ScrollArea className="flex-1">
              <div className="max-w-3xl mx-auto p-6 space-y-8">
                {messages.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 animate-float">
                      <Sparkles className="w-8 h-8 text-primary/40" />
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h3 className="text-xl font-semibold text-foreground/90 tracking-tight">Forge Your Strategy</h3>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        "A founder's greatest asset is clarity of thought. Describe your current hurdle, and I will sequence a path through the noise."
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md pt-8">
                      {[
                        "How should I price my first MVP?",
                        "Is my target market too niche?",
                        "How do I handle co-founder conflict?",
                        "What's the best way to find early adopters?"
                      ].map((suggestion, i) => (
                        <button 
                          key={i}
                          onClick={() => { setInput(suggestion); }}
                          className="text-left p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5 transition-all text-xs font-medium text-muted-foreground/90 hover:text-foreground/90"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-1",
                      msg.role === 'user' ? "bg-accent/20 text-accent border border-accent/20" : "bg-primary/20 text-primary border border-primary/20"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                    </div>

                    <div className={cn(
                      "max-w-[85%] sm:max-w-[75%] space-y-1.5",
                      msg.role === 'user' ? "text-right" : "text-left"
                    )}>
                      {msg.role === 'user' ? (
                        <div className="inline-block bg-accent/10 border border-accent/20 text-foreground rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed text-left">
                          {msg.text}
                        </div>
                      ) : msg.data ? (
                        <div className="space-y-4">
                          <div className="bg-card border border-white/5 rounded-2xl p-4 shadow-sm">
                            <p className="text-xs font-medium text-foreground/90 leading-relaxed italic">
                              "{msg.data.advice}"
                            </p>
                            {msg.data.isSimulated && (
                              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-[9px] text-amber-500 font-black uppercase tracking-widest">
                                <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                Simulated Response. Add GEMINI_API_KEY in .env.local to activate Gemini 2.5 Pro.
                              </div>
                            )}
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-3 p-5 rounded-2xl bg-primary/[0.03] border border-primary/10">
                              <div className="flex items-center gap-2.5 mb-2 border-b border-primary/10 pb-2">
                                <ListCheck className="w-4 h-4 text-primary" />
                                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary">Strategic Protocol</h4>
                              </div>
                              <ul className="space-y-2.5">
                                {msg.data.actionSteps.map((step, si) => (
                                  <li key={si} className="text-[13px] text-muted-foreground/90 flex gap-2.5 leading-relaxed">
                                    <span className="text-primary font-bold">{si+1}.</span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-3 p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/10">
                              <div className="flex items-center gap-2.5 mb-2 border-b border-red-500/10 pb-2">
                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-red-500">Risk Mitigation</h4>
                              </div>
                              <p className="text-[13px] text-muted-foreground/90 italic leading-relaxed">
                                {msg.data.riskAssessment}
                              </p>
                            </div>
                          </div>

                          <div className="relative p-5 rounded-2xl bg-accent/[0.03] border border-accent/10">
                            <Quote className="absolute top-3 left-3 w-5 h-5 text-accent opacity-10 rotate-180" />
                            <p className="text-[13px] font-medium text-accent/90 pl-6 leading-relaxed italic">
                              {msg.data.philosophicalInsight}
                            </p>
                          </div>
                        </div>
                      ) : null}
                      <div className="flex items-center justify-end gap-2 opacity-70 px-1 pt-1">
                        {msg.data?.modelUsed && (
                          <span className="text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            ⚡ {msg.data.modelUsed}
                          </span>
                        )}
                         <span className="text-[9px] font-bold text-muted-foreground uppercase">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest">Sequencing Logic...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} className="h-4" />
              </div>
            </ScrollArea>

            {/* Input Dock */}
            <div className="px-6 py-6 bg-card/50 border-t border-white/5 shrink-0">
              <div className="max-w-3xl mx-auto relative group">
                <form onSubmit={handleConsult} className="relative">
                  <Textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message Master Mentor..."
                    className="min-h-[56px] max-h-[200px] pr-14 pl-5 py-4 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-0 text-[13px] rounded-2xl transition-all resize-none shadow-inner"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleConsult()
                      }
                    }}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={loading || !input.trim() || !activeThreadId}
                    className="absolute right-2.5 bottom-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <div className="flex items-center justify-between mt-3 px-1">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1.5">
                        <Info className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[9px] text-muted-foreground uppercase font-bold">Encrypted Oracle Link</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[9px] text-muted-foreground uppercase font-bold">V1.2.0 Stable</span>
                     </div>
                  </div>
                  <p className="text-[9px] text-muted-foreground/60 uppercase font-bold tracking-widest">
                    Press Enter to Send
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </GameShell>
  )
}
