"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Trophy, Flame, Brain, Sparkles, ChevronRight, TrendingUp, 
  ArrowUpRight, Clock, Rocket, BookOpen, AlertCircle, Map,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { state, updateState, isLoaded, xpToNext } = useGameState()
  const router = useRouter()
  const [tourStep, setTourStep] = useState<number | null>(null)

  // Redirect to onboarding if not completed onboarding
  useEffect(() => {
    if (isLoaded && !state.onboarded) {
      router.push('/onboarding')
    }
  }, [isLoaded, state.onboarded, router])

  // Trigger tour if onboarded and hasn't seen the dashboard guide
  useEffect(() => {
    if (isLoaded && state.onboarded && !state.seenTutorials.includes('dashboard_tour')) {
      setTourStep(1)
    }
  }, [isLoaded, state.onboarded, state.seenTutorials])

  if (!isLoaded || !state.onboarded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
          <p className="text-sm font-sans font-medium text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const currentXpValue = Number(state.xp || 0)
  const progressValue = (currentXpValue / xpToNext) * 100 || 0

  // 8th-Grade Friendly Skill Profile Mapping
  const skillData = [
    { name: "Smart Planning", value: state.skills?.strategicThinking || 10, description: "Creating step-by-step startup goals." },
    { name: "Money Management", value: state.skills?.financialIntelligence || 10, description: "Understanding how much you earn and spend." },
    { name: "Handling Challenges", value: state.skills?.riskAnalysis || 10, description: "Making smart choices when things get tough." },
    { name: "Talking to People", value: state.skills?.negotiation || 10, description: "Explaining your ideas and making deals." },
    { name: "Knowing Customers", value: state.skills?.marketAwareness || 10, description: "Finding out what people really need and want." },
    { name: "Team Leadership", value: state.skills?.leadership || 10, description: "Inspiring others to work together on your idea." },
  ]

  // Purely educational objectives
  const goals = [
    {
      title: "Master the Fundamentals",
      description: "Read lessons in the How to Start a Startup path.",
      target: "10 Lessons",
      current: `${state.completedLessons.length} Lessons`,
      progress: Math.min(100, Math.floor((state.completedLessons.length / 10) * 100))
    },
    {
      title: "Build Your Skills",
      description: "Level up your customer research skills.",
      target: "Level 15",
      current: `Level ${state.skills?.marketAwareness || 10}`,
      progress: Math.min(100, Math.floor(((state.skills?.marketAwareness || 10) / 15) * 100))
    },
    {
      title: "Keep the Momentum",
      description: "Maintain your learning streak by logging in daily.",
      target: "5 Days",
      current: `${state.streak || 0} Days`,
      progress: Math.min(100, Math.floor(((state.streak || 0) / 5) * 100))
    }
  ]

  // Humanized and easy-to-read student activities
  const activityLogs = [
    {
      title: "Completed Lesson: How to Start a Startup",
      subtitle: "Learned the difference between standard businesses and high-growth ideas.",
      time: "2 hours ago",
      icon: <Trophy className="w-3.5 h-3.5 text-amber-500" />,
      xp: "+50 XP"
    },
    {
      title: "Earned Leadership Experience",
      subtitle: "Completed Week 2 course modules and leveled up smart coordination skills.",
      time: "Yesterday",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
      xp: "+50 XP"
    },
    {
      title: "Leveled Up: Smart Planning",
      subtitle: "Completed Week 1 introductory exercises on Y Combinator methods.",
      time: "3 days ago",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />,
      xp: "+50 XP"
    }
  ]

  // YC-Inspired tips rewritten in student-friendly tone
  const startupTips = [
    {
      type: "Focus on the Problem",
      message: "Don't build something just because it uses cool tech. Build it because it solves a problem that real people face every single day.",
      severity: "info"
    },
    {
      type: "Talk to Users",
      message: "The best way to know if your idea is good is to talk to 10 potential users. Ask them: 'How do you solve this problem today?'",
      severity: "warning"
    }
  ]

  // Animation constants
  const cardHoverEffect = {
    hover: { scale: 1.02, y: -4, transition: { type: "spring", stiffness: 300, damping: 15 } }
  }

  const nextTourStep = () => {
    if (tourStep === null) return
    if (tourStep < 4) {
      setTourStep(tourStep + 1)
    } else {
      updateState(prev => ({
        ...prev,
        seenTutorials: [...(prev.seenTutorials || []), 'dashboard_tour']
      }))
      setTourStep(null)
    }
  }

  return (
    <GameShell>
      <div className="space-y-6 md:space-y-8 pb-20 px-3 md:px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Header - Student Friendly Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide text-primary/80">Student Workspace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground/90 font-headline">
              My Learning Hub — Level {state.level}
            </h1>
            <p className="text-sm text-muted-foreground font-normal">
              Track your weekly lessons, earn achievements, and learn how to build your first startup.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm bg-card border border-black/[0.05] px-5 py-3 rounded-2xl shadow-sm backdrop-blur-xl">
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium tracking-wide font-sans">Level Progress</p>
              <p className="font-mono text-sm md:text-base font-semibold text-foreground mt-0.5">
                {currentXpValue} <span className="text-muted-foreground/60 font-normal">/ {xpToNext} XP</span>
              </p>
            </div>
            <div className="w-24 md:w-32">
              <Progress value={progressValue} className="h-2 bg-secondary" />
            </div>
          </div>
        </motion.div>

        {/* 8th-Grade Welcome Guidance Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary border border-primary/20 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full" />
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Rocket className="w-5 h-5 animate-bounce" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Your Learning Journey Guide</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-foreground">Welcome back, {state.name}!</h2>
                  <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    Ready to learn what it takes to start a business? Use the guides below to follow our interactive startup path, build key skills, and get personalized advice.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
                {[
                  { title: "1. Read Lessons", desc: "Follow the 10-week path to learn how companies start.", icon: <BookOpen className="w-4 h-4 text-blue-500" /> },
                  { title: "2. Earn Experience", desc: "Earn XP by completing modules and level up your skills.", icon: <Trophy className="w-4 h-4 text-emerald-500" /> },
                  { title: "3. Win Badges", desc: "Unlock achievement badges as you complete courses.", icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
                  { title: "4. Ask AI Mentor", desc: "Ask questions to get helpful, student-friendly explanations.", icon: <Brain className="w-4 h-4 text-purple-500" /> },
                ].map((step, idx) => (
                  <div key={idx} className="space-y-1 p-3 bg-background/50 rounded-xl border border-border/40 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-2">
                      {step.icon}
                      <h4 className="text-xs font-semibold text-foreground/90">{step.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">{step.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid - Pure Educational Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Lessons Completed", value: `${state.completedLessons.length} / 10`, icon: <BookOpen className="w-4 h-4" />, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Learning Streak", value: `${state.streak || 0} Days`, icon: <Flame className="w-4 h-4" />, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "My Learning Stage", value: state.levelTitle || "Explorer", icon: <Trophy className="w-4 h-4" />, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Badges Earned", value: `${state.badges?.length || 0} Badges`, icon: <Sparkles className="w-4 h-4" />, color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((stat, i) => (
            <motion.div key={i} whileHover="hover" variants={cardHoverEffect}>
              <Card className="glass-card h-full transition-all hover:border-border/80 shadow-sm cursor-default">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground/80 font-medium tracking-wide font-sans">{stat.label}</p>
                      <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90">{stat.value}</p>
                    </div>
                    <div className={cn("p-2 rounded-xl border border-border", stat.bg, stat.color)}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section (Col Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* My Entrepreneur Skills */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass-card shadow-sm">
                <CardHeader className="pb-4">
                  <h2 className="text-base font-semibold tracking-tight text-foreground/90 font-headline">My Entrepreneur Skills</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 font-sans">See how your business knowledge grows as you complete modules:</p>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillData.map((skill) => {
                      const percent = Math.min(100, Math.floor((skill.value / 100) * 100)) // Max skill is 100
                      return (
                        <div key={skill.name} className="space-y-2 p-4 bg-secondary/35 border border-black/[0.04] rounded-xl hover:bg-secondary/40 transition-colors">
                          <div className="flex justify-between items-center text-sm">
                            <div>
                              <span className="font-semibold text-foreground font-sans text-xs">{skill.name}</span>
                              <p className="text-[10px] text-muted-foreground font-sans mt-0.5">{skill.description}</p>
                            </div>
                            <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                              {skill.value}%
                            </span>
                          </div>
                          <Progress value={percent} className="h-2 bg-secondary" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements & Activity */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glass-card shadow-sm">
                <CardHeader className="pb-4">
                  <h2 className="text-base font-semibold tracking-tight text-foreground/90 font-headline">My Learning Journey Logs</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 font-sans">A history of lessons read and milestones completed:</p>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-border">
                    {activityLogs.map((event, index) => (
                      <div key={index} className="flex gap-5 relative items-start text-sm">
                        <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                          {event.icon}
                        </div>
                        <div className="space-y-1 flex-1 min-w-0 pt-1">
                          <div className="flex justify-between items-start gap-2">
                            <p className="font-medium text-foreground/90 font-sans text-xs">{event.title}</p>
                            <span className="font-mono text-[10px] font-semibold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded-md flex-shrink-0">
                              {event.xp}
                            </span>
                          </div>
                          <p className="text-muted-foreground/80 leading-relaxed text-[11px] font-sans">{event.subtitle}</p>
                          <p className="text-[10px] text-muted-foreground/50 flex items-center gap-1.5 pt-1">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* Right Section */}
          <div className="space-y-6">

            {/* Quick Access */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass-card shadow-sm">
                <CardHeader className="pb-4">
                  <h2 className="text-base font-semibold tracking-tight text-foreground/90 font-headline">Quick Actions</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 font-sans">Jump right back into your startup studies</p>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  <Button asChild className="w-full justify-between h-12 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary)/0.3)] transition-all px-4 rounded-xl cursor-pointer">
                    <Link href="/world-map" className="flex items-center justify-between w-full">
                      <span className="font-sans text-xs">Resume Startup Path</span>
                      <Map className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-between h-12 text-sm font-medium border-black/[0.06] bg-secondary/50 hover:bg-secondary text-foreground transition-colors px-4 rounded-xl cursor-pointer">
                    <Link href="/mentor" className="flex items-center justify-between w-full">
                      <span className="font-sans text-xs">Talk to Founder AI Mentor</span>
                      <Brain className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-between h-12 text-sm font-medium border-black/[0.06] bg-secondary/50 hover:bg-secondary text-foreground transition-colors px-4 rounded-xl cursor-pointer">
                    <Link href="/leaderboard" className="flex items-center justify-between w-full">
                      <span className="font-sans text-xs">View Leaderboard</span>
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* My Course Goals */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glass-card shadow-sm">
                <CardHeader className="pb-4">
                  <h2 className="text-base font-semibold tracking-tight text-foreground/90 font-headline">My Course Goals</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 font-sans">Active learning milestones to complete:</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2 text-sm">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-medium text-foreground/90 font-sans text-xs">{goal.title}</p>
                          <p className="text-[11px] text-muted-foreground/80 mt-0.5 font-sans">{goal.description}</p>
                        </div>
                        <span className="font-mono text-[11px] font-medium text-foreground/70">
                          {goal.progress}%
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-1.5 bg-secondary" />
                      <div className="flex justify-between text-[10px] text-muted-foreground/60 font-mono tracking-wide">
                        <span>Done: {goal.current}</span>
                        <span>Target: {goal.target}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Startup Tips */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="glass-card shadow-sm">
                <CardHeader className="pb-4">
                  <h2 className="text-base font-semibold tracking-tight text-foreground/90 font-headline">Startup Tips of the Day</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 font-sans">Learn from real founders and mentors</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {startupTips.map((tip, index) => (
                    <div key={index} className="p-3.5 bg-secondary/40 border border-black/[0.04] rounded-xl flex items-start gap-3 text-sm transition-colors hover:bg-secondary">
                      <div className="p-1.5 rounded-lg shrink-0 bg-blue-500/10">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 font-sans">{tip.type}</p>
                        <p className="text-muted-foreground/90 leading-relaxed text-[12px] font-sans">{tip.message}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Interactive Welcoming Tutorial Guide Modal Tour */}
      <AnimatePresence>
        {tourStep !== null && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-3xl border border-primary/20 p-6 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[120px] pointer-events-none" />
              
              <div className="space-y-4">
                {tourStep === 1 && (
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto text-2xl">🚀</div>
                    <h3 className="text-xl font-headline font-black">Welcome to RiseForge!</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Hey {state.name}! Welcome to your startup control center. We're here to help you learn what it takes to build a successful startup.
                    </p>
                  </div>
                )}

                {tourStep === 2 && (
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto text-2xl">🗺️</div>
                    <h3 className="text-xl font-headline font-black">10-Week Startup Path</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Navigate to <strong>"How to Start a Startup"</strong> in the sidebar. You will find a 10-week curriculum covering problem validation, building MVPs, and pitching.
                    </p>
                  </div>
                )}

                {tourStep === 3 && (
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mx-auto text-2xl">🧠</div>
                    <h3 className="text-xl font-headline font-black">Founder AI Mentor</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Stuck on a concept? The <strong>"Founder Mentor"</strong> tab lets you chat with an AI coach who gives you clear, simple advice and explains terms.
                    </p>
                  </div>
                )}

                {tourStep === 4 && (
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mx-auto text-2xl">🏆</div>
                    <h3 className="text-xl font-headline font-black">Climb the Leaderboards</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Complete lessons to earn XP and level up. Track your rank on the <strong>"Leaderboard"</strong> to compete with real peers around the world!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-black/[0.05]">
                <span className="text-xs text-muted-foreground font-semibold">Step {tourStep} of 4</span>
                <button 
                  onClick={nextTourStep}
                  className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-primary/95 transition-all shadow-md cursor-pointer"
                >
                  {tourStep === 4 ? "Let's Go!" : "Next Guide"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
