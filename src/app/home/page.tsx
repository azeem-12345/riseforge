"use client"

import GameShell from '@/components/game/GameShell'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Lock, ChevronRight, Play, Trophy, Sparkles, BookOpen, Clock, Activity, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGameState } from '@/hooks/use-game-state'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const ACADEMY_PATH = [
  { 
    id: 'week-1', 
    title: 'The Essence', 
    description: 'Week 1: How to Start a Startup.', 
    type: 'core',
    topic: 'Strategy',
    duration: '10 mins',
    xp: '+80 XP',
    overview: 'The fundamental mindsets of elite founders, starting lean, and validating problems.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-2', 
    title: 'The Team', 
    description: 'Week 2: Hiring & Execution.', 
    type: 'core',
    topic: 'Leadership',
    duration: '12 mins',
    xp: '+80 XP',
    overview: 'How to choose co-founders, divide equity, and establish initial velocity.',
    skills: 'Leadership, Negotiation'
  },
  { 
    id: 'week-3', 
    title: 'The Truth', 
    description: 'Week 3: Startups Are Counterintuitive.', 
    type: 'core',
    topic: 'Strategy',
    duration: '15 mins',
    xp: '+80 XP',
    overview: 'Why conventional business advice fails in high-growth startups.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-4', 
    title: 'Psychology', 
    description: 'Week 4: The consumer mind.', 
    type: 'core',
    topic: 'Market',
    duration: '14 mins',
    xp: '+80 XP',
    overview: 'Understanding user pain points and developing a customer-centric feedback loop.',
    skills: 'Market, Negotiation'
  },
  { 
    id: 'week-5', 
    title: 'Finance', 
    description: 'Week 5: Vanities vs Reality.', 
    type: 'core',
    topic: 'Finance',
    duration: '18 mins',
    xp: '+100 XP',
    overview: 'Demystifying runway, burn rate, and unit economics calculations.',
    skills: 'Finance, Strategy'
  },
  { 
    id: 'week-6', 
    title: 'Growth', 
    description: 'Week 6: Sustainable Scaling.', 
    type: 'core',
    topic: 'Market',
    duration: '15 mins',
    xp: '+80 XP',
    overview: 'Channel discovery, acquisition loops, and optimizing user retention.',
    skills: 'Market, Finance'
  },
  { 
    id: 'week-7', 
    title: 'Culture', 
    description: 'Week 7: Building Strong Teams.', 
    type: 'special',
    topic: 'Leadership',
    duration: '11 mins',
    xp: '+80 XP',
    overview: 'Establishing company values, early employee motivation, and trust frameworks.',
    skills: 'Leadership'
  },
  { 
    id: 'week-8', 
    title: 'Principled Command', 
    description: 'Week 8: Multi-Perspective Decisions.', 
    type: 'core',
    topic: 'Strategy',
    duration: '16 mins',
    xp: '+80 XP',
    overview: 'Making high-stakes decisions under extreme uncertainty.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-9', 
    title: 'Hiring & Execution', 
    description: 'Week 9: Building Your Core Team.', 
    type: 'core',
    topic: 'Leadership',
    duration: '12 mins',
    xp: '+80 XP',
    overview: 'Structuring interview loops and managing performance metrics.',
    skills: 'Leadership'
  },
  { 
    id: 'week-10', 
    title: 'Finance & Legal', 
    description: 'Week 10: L1 Graduation.', 
    type: 'boss',
    topic: 'Finance',
    duration: '25 mins',
    xp: '+200 XP',
    overview: 'The final L1 exam: term sheets, dilution math, and board management.',
    skills: 'Finance, Negotiation'
  }
]

export default function WorldMapPage() {
  const { state } = useGameState()

  const getStatus = (lessonId: string, index: number) => {
    if (state.completedLessons.includes(lessonId)) return 'complete'
    if (index === 0) return 'current'
    const prevId = ACADEMY_PATH[index - 1].id
    if (state.completedLessons.includes(prevId)) return 'current'
    return 'locked'
  }

  return (
    <GameShell>
      <div className="space-y-10 pb-32 max-w-4xl mx-auto">
        {/* Hero Dashboard Section */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Academy Command Center
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                Welcome back, <br className="hidden sm:block" />
                <span className="text-primary">{state.name}</span>
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed font-sans">
                You are currently ranked as an <strong className="text-foreground">{state.levelTitle}</strong>. 
                Keep pushing through the curriculum to unlock new strategic paradigms and climb the global leaderboards.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white cursor-pointer" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
                  Continue Journey <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-border hover:bg-secondary cursor-pointer">
                  View Profile
                </Button>
              </div>
            </div>

            <div className="w-full md:w-auto bg-background/50 backdrop-blur-md border border-border/60 rounded-2xl p-6 shadow-xl shrink-0 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-inner">
                  {state.level}
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Current Status</p>
                  <p className="text-xl font-black text-foreground">{state.levelTitle}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="text-primary">{state.xp} / {state.level * 1000}</span>
                </div>
                <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (state.xp / (state.level * 1000)) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Modules</p>
                  <p className="text-lg font-black text-foreground">{state.completedLessons.length} / 10</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Current Streak</p>
                  <p className="text-lg font-black text-orange-500 flex items-center gap-1">{state.streak || 1} <span className="text-sm">🔥</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Header */}
        <div className="text-center py-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Your 10-Week Startup Journey
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-normal font-sans">Complete each week to unlock the next step in your path!</p>
        </div>

        {/* Timeline path container */}
        <div className="relative mt-8 max-w-3xl mx-auto px-4">
          {/* Vertical central tracking line */}
          <div className="absolute left-10 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/80 via-primary/30 to-border/40 pointer-events-none" />
          
          <div className="space-y-12 md:space-y-16">
            {ACADEMY_PATH.map((node, i) => {
              const status = getStatus(node.id, i)
              
              return (
                <div 
                  key={node.id} 
                  className="relative flex flex-row items-center w-full"
                >
                  {/* Bubble Node (Aligned center on desktop, left on mobile) */}
                  <div className="absolute left-10 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <Link href={status === 'locked' ? '#' : `/lesson/${node.id}`} className={status === 'locked' ? 'pointer-events-none' : ''}>
                      <motion.div
                        whileHover={status !== 'locked' ? { scale: 1.08 } : {}}
                        whileTap={status !== 'locked' ? { scale: 0.96 } : {}}
                        className={cn(
                          "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative shadow-md",
                          status === 'complete' 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-600" 
                            : status === 'current' 
                              ? "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb,59,130,246),0.25)] animate-pulse" 
                              : "bg-secondary border-border text-muted-foreground/40"
                        )}
                      >
                        {status === 'complete' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : status === 'current' ? (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}

                        {node.type === 'boss' && (
                          <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-md border border-background shadow">
                            <Trophy className="w-2.5 h-2.5" />
                          </div>
                        )}
                        {node.type === 'special' && (
                          <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white p-1 rounded-md border border-background shadow">
                            <Sparkles className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  </div>

                  {/* Card Container (Alternates on desktop, always right on mobile) */}
                  <div className={cn(
                    "w-full md:w-[45%] flex text-left pl-20 md:pl-0",
                    i % 2 === 0 
                      ? "md:ml-auto md:justify-start md:pl-10" 
                      : "md:mr-auto md:justify-end md:pr-10"
                  )}>
                    <Card className={cn(
                      "w-full max-w-sm transition-all duration-300 p-5 rounded-2xl relative overflow-hidden",
                      status === 'complete' 
                        ? "glass-card hover:border-emerald-500/30 shadow-sm opacity-95 hover:opacity-100" 
                        : status === 'current' 
                          ? "glass-card border-primary/40 shadow-[0_0_25px_rgba(var(--primary-rgb,59,130,246),0.08)] hover:border-primary/60" 
                          : "border border-border bg-secondary/15 opacity-50 select-none"
                    )}>
                      {/* Active Indicator Spotlight */}
                      {status === 'current' && (
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                      )}

                      {/* Card Content */}
                      <div className="space-y-3 relative z-10">
                        {/* Topic Tag and Status Indicator */}
                        <div className="flex justify-between items-center text-[11px] font-mono tracking-wide">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md font-medium text-[10px]",
                            status === 'complete' ? "bg-emerald-100 text-emerald-700 border border-emerald-200/50" :
                            status === 'current' ? "bg-primary/10 text-primary border border-primary/20" :
                            "bg-secondary text-muted-foreground/70 border border-border/50"
                          )}>
                            {node.topic}
                          </span>
                          {status === 'current' && (
                            <span className="text-primary font-medium tracking-wide animate-pulse flex items-center gap-1.5 text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Active Module
                            </span>
                          )}
                          {status === 'complete' && (
                            <span className="text-emerald-600 font-semibold tracking-wide flex items-center gap-1.5 text-[10px]">
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Title and Short Description */}
                        <div>
                          <h4 className={cn(
                            "font-semibold text-[15px] tracking-tight transition-colors",
                            status === 'complete' && "text-foreground/80 line-through decoration-muted-foreground/30",
                            status === 'current' && "text-foreground/90 group-hover:text-primary",
                            status === 'locked' && "text-muted-foreground/50"
                          )}>
                            {node.title}
                          </h4>
                          <p className="text-xs text-muted-foreground/80 leading-relaxed mt-1 font-sans">
                            {status === 'locked' ? 'Locked Module' : node.description}
                          </p>
                        </div>

                        {/* Show Details for Completed or Current */}
                        {status !== 'locked' && (
                          <div className="pt-3 border-t border-border/60 space-y-3">
                            <p className="text-[11px] text-muted-foreground/70 leading-relaxed font-sans">
                              {node.overview}
                            </p>
                            
                            <div className="flex justify-between items-center pt-1 text-[10px] text-muted-foreground/60 font-mono">
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> {node.duration}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Activity className="w-3 h-3" /> {node.skills}
                              </span>
                              <span className="text-emerald-600 font-bold text-[11px]">
                                {node.xp}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Launch Module Call to Action */}
                        {status === 'current' && (
                          <Button asChild className="w-full mt-4 h-10 bg-primary text-primary-foreground hover:bg-primary/90 text-[13px] font-medium rounded-xl shadow-[0_0_15px_rgba(var(--primary-rgb,59,130,246),0.2)] transition-all">
                            <Link href={`/lesson/${node.id}`}>
                              <span>Launch Lesson</span>
                              <ChevronRight className="w-4 h-4 ml-1.5" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </GameShell>
  )
}
