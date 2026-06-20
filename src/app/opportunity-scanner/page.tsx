"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  Zap, 
  Search, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  Loader2, 
  MessageSquare
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import PageGuide from '@/components/game/PageGuide'
import { generateMarketProblems } from '@/ai/flows/generate-problems-flow'
import { founderMentor } from '@/ai/flows/founder-mentor-flow'
import { useGameState } from '@/hooks/use-game-state'

export default function OpportunityScannerPage() {
  const { state } = useGameState()
  const router = useRouter()
  
  const [problems, setProblems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [selectedTrend, setSelectedTrend] = useState<any | null>(null)
  
  // Mentor Discussion trigger states
  const [discussing, setDiscussing] = useState(false)

  // Load saved notebook logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('riseforge_notebook_logs')
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs))
      } catch (e) {
        console.error("Failed to load notebook logs", e)
      }
    }
  }, [])

  const fetchProblems = async () => {
    setLoading(true)
    setError(null)
    setSelectedTrend(null)
    try {
      const result = await generateMarketProblems({ count: 3 })
      setProblems(result.problems)
    } catch (err) {
      console.error(err)
      setError("Unable to generate struggles. Please check that GEMINI_API_KEY or GOOGLE_GENAI_API_KEY is configured in your server environment.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProblems()
  }, [])

  const logPattern = (trend: any) => {
    if (logs.find(l => l.id === trend.id)) return;
    const newLogs = [...logs, { ...trend, timestamp: Date.now() }]
    setLogs(newLogs)
    localStorage.setItem('riseforge_notebook_logs', JSON.stringify(newLogs))
    setSelectedTrend(null)
  }

  const startMentorDiscussion = async (trend: any) => {
    if (discussing) return
    setDiscussing(true)
    try {
      const userMsgText = `I want to discuss the market opportunity: "${trend.title}" affecting "${trend.segment}". The problem description is: "${trend.description}". The suggested potential solution is: "${trend.potential}". How should I get started validating this?`
      
      // Call the server action to get strategic advice
      const result = await founderMentor({
        userQuestion: userMsgText,
        level: state.level,
        levelTitle: state.levelTitle
      })
      
      // Save to localStorage as a structured chat thread
      const saved = localStorage.getItem('riseforge_mentor_threads')
      const threads = saved ? JSON.parse(saved) : []
      
      const threadId = `thread-${Date.now()}`
      const userMsg = { role: 'user', text: userMsgText, timestamp: Date.now() }
      const mentorMsg = { role: 'mentor', data: result, timestamp: Date.now() }
      
      const newThread = {
        id: threadId,
        title: trend.title, // Short title for the chatbot thread sidebar
        messages: [userMsg, mentorMsg],
        timestamp: Date.now()
      }
      
      threads.unshift(newThread)
      localStorage.setItem('riseforge_mentor_threads', JSON.stringify(threads))
      localStorage.setItem('riseforge_mentor_active_thread_id', threadId)
      
      // Redirect to the mentor page
      router.push('/mentor')
    } catch (err) {
      console.error("Failed to start mentor discussion:", err)
    } finally {
      setDiscussing(false)
    }
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="opportunity-scanner"
        title="Finding Problems"
        description="This is the first step of being a founder. Before you have an idea, you must look for things that are broken or hard for people in the real world. If you find a big problem, you can build a big business to fix it!"
        icon={<Eye className="w-5 h-5" />}
      />

      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest shadow-[0_0_10px_rgba(var(--accent)/0.1)]">
              <Eye className="w-3.5 h-3.5" /> Problem Spotter
            </div>
            <h1 className="text-3xl font-headline font-semibold tracking-tight text-foreground/90">Finding Problems</h1>
            <p className="text-sm text-muted-foreground font-medium tracking-wide">Step 1: Look at the world and identify pain points.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchProblems} 
              disabled={loading}
              className="rounded-xl border-white/[0.08] h-11 px-4 text-xs font-semibold tracking-wide bg-white/[0.02] hover:bg-white/[0.06] shadow-sm transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh Struggles
            </Button>
            <div className="glass-card px-6 py-2.5 rounded-xl flex flex-col justify-center border-white/[0.08]">
              <p className="text-xs font-medium text-muted-foreground/80 tracking-wide">Struggles Found</p>
              <p className="text-lg font-semibold tabular-nums text-foreground/90 mt-0.5">{logs.length} <span className="text-sm text-muted-foreground/50">/ 10</span></p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-semibold tracking-tight text-primary/90 flex items-center gap-2 px-2">
              <Search className="w-4 h-4" /> Real-World Struggles
            </h3>
            
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="glass-card border-white/[0.08] animate-pulse">
                    <CardContent className="p-10" />
                  </Card>
                ))
              ) : error ? (
                <Card className="glass-card border-red-500/10 bg-red-500/[0.02] p-8 text-center space-y-4">
                  <p className="text-sm text-red-400 font-medium max-w-md mx-auto">{error}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchProblems}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 h-10 text-xs font-semibold tracking-wide rounded-xl"
                  >
                    Try Again
                  </Button>
                </Card>
              ) : (
                problems.map((trend) => (
                  <Card 
                    key={trend.id} 
                    onClick={() => setSelectedTrend(trend)}
                    className={cn(
                      "glass-card transition-all cursor-pointer group relative overflow-hidden",
                      selectedTrend?.id === trend.id ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20" : "border-white/[0.05] hover:border-white/[0.15]"
                    )}
                  >
                    <CardContent className="p-6 flex justify-between items-center">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <Badge variant="outline" className="text-[10px] font-medium tracking-wide uppercase border-white/10 bg-white/5 text-foreground/80">{trend.segment}</Badge>
                          <Badge className={cn(
                            "text-[10px] font-medium tracking-wide uppercase",
                            trend.intensity === 'High' ? "bg-red-500/15 text-red-400 border-red-500/20 border" : "bg-orange-500/15 text-orange-400 border-orange-500/20 border"
                          )}>Pain Level: {trend.intensity}</Badge>
                        </div>
                        <h4 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors text-foreground/90">{trend.title}</h4>
                        <p className="text-sm text-muted-foreground/80 line-clamp-1 italic">"{trend.description}"</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedTrend ? (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="glass-card border-primary/30 bg-primary/5 shadow-[0_0_40px_rgba(var(--primary)/0.1)] p-8 space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">Studying the Problem</p>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground/90 tracking-tight">{selectedTrend.title}</h3>
                    </div>
                    <div className="p-5 bg-background/50 rounded-2xl border border-white/[0.08]">
                      <p className="text-sm leading-relaxed text-muted-foreground italic">
                        "{selectedTrend.description}"
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary/80">
                        <Sparkles className="w-4 h-4" />
                        <h5 className="text-xs font-semibold uppercase tracking-wider">Possible Fix</h5>
                      </div>
                      <p className="text-[15px] font-medium text-foreground/80 leading-relaxed">{selectedTrend.potential}</p>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <Button 
                        onClick={() => logPattern(selectedTrend)}
                        variant="outline"
                        className="w-full h-12 rounded-xl border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05] text-foreground text-sm font-semibold transition-all"
                      >
                        Save to My Notebook
                      </Button>

                      {/* Mentor Discussion Trigger */}
                      <Button 
                        onClick={() => startMentorDiscussion(selectedTrend)}
                        disabled={discussing}
                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-[0_0_20px_rgba(var(--primary)/0.3)] flex items-center justify-center gap-2 transition-all"
                      >
                        {discussing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Prepping Advisor...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4" />
                            Discuss with Mentor
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full glass-card p-10 flex flex-col items-center justify-center text-center space-y-4 opacity-50 grayscale"
                >
                  <Search className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Pick a Struggle</p>
                  <p className="text-[11px] leading-relaxed">Select a problem from the list to see how it could be fixed.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="glass-card border-white/[0.08] overflow-hidden">
              <CardHeader className="p-6 border-b border-white/[0.08] bg-white/[0.02]">
                <CardTitle className="text-sm font-semibold text-foreground/90 tracking-wide flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-primary" /> My Notebook
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic text-center py-6">No struggles saved yet.</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all">
                      <p className="text-[13px] font-medium text-foreground/90 truncate pr-4">{log.title}</p>
                      <Badge variant="outline" className="text-[10px] font-medium tracking-wider bg-white/5 border-white/10">SAVED</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GameShell>
  )
}
