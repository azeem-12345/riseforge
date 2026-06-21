"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Trophy, Flame, Brain, Sparkles, ChevronRight, TrendingUp, 
  Globe, ArrowUpRight, MessageSquare, Clock, 
  Rocket, DollarSign, Building2, AlertCircle, Map, FlaskConical,
  BookOpen, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { state, isLoaded, xpToNext } = useGameState()

  if (!isLoaded) {
    return (
      <GameShell>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </GameShell>
    )
  }

  const progressValue = (state.xp / xpToNext) * 100 || 0

  // 8th-Grade Friendly Skill Profile Mapping
  const skillData = [
    { name: "Smart Planning", value: state.skills?.strategicThinking || 10, description: "Creating step-by-step startup goals." },
    { name: "Money Management", value: state.skills?.financialIntelligence || 10, description: "Understanding how much you earn and spend." },
    { name: "Handling Challenges", value: state.skills?.riskAnalysis || 10, description: "Making smart choices when things get tough." },
    { name: "Talking to People", value: state.skills?.negotiation || 10, description: "Explaining your ideas and making deals." },
    { name: "Knowing Customers", value: state.skills?.marketAwareness || 10, description: "Finding out what people really need and want." },
    { name: "Team Leadership", value: state.skills?.leadership || 10, description: "Inspiring others to work together on your idea." },
  ]

  // Mock student objectives based on YC models
  const goals = [
    {
      title: "Save Virtual Cash",
      description: "Earn enough funds to start your first project.",
      target: "$10,000",
      current: `$${(state.company?.cash || 1000).toLocaleString()}`,
      progress: Math.min(100, Math.floor(((state.company?.cash || 1000) / 10000) * 100))
    },
    {
      title: "Know Your Market",
      description: "Improve your customer research skills.",
      target: "Level 15",
      current: `Level ${state.skills?.marketAwareness || 10}`,
      progress: Math.min(100, Math.floor(((state.skills?.marketAwareness || 10) / 15) * 100))
    },
    {
      title: "Read Academy Lessons",
      description: "Complete lessons in your startup path.",
      target: "10 Lessons",
      current: `${state.completedLessons.length} Lessons`,
      progress: Math.min(100, Math.floor((state.completedLessons.length / 10) * 100))
    }
  ]

  // Humanized and easy-to-read student activities
  const activityLogs = [
    {
      title: "Completed Lesson: How to Start a Startup",
      subtitle: "Learned the difference between standard businesses and high-growth ideas.",
      time: "2 hours ago",
      icon: <Trophy className="w-3.5 h-3.5 text-amber-500" />,
      xp: "+80 XP"
    },
    {
      title: "Project Feedback Received",
      subtitle: `Your startup idea "${state.company?.name || 'Aether'}" is getting great feedback from virtual mentors!`,
      time: "Yesterday",
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />,
      xp: "+120 XP"
    },
    {
      title: "Found a Problem to Solve",
      subtitle: "Spotted a daily life issue in the Opportunity Scanner: delivering neighborhood school items easily.",
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

  return (
    <GameShell>
      <div className="space-y-6 md:space-y-8 pb-20 px-3 md:px-4 max-w-7xl mx-auto">
        
        {/* Header - Student Friendly Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-primary/80">Student Workspace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground/90">
              My Startup Hub — Level {state.level}
            </h1>
            <p className="text-sm text-muted-foreground font-normal">
              Track your progress, build projects, and learn how to launch your own business.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm bg-card border border-border px-5 py-3 rounded-2xl shadow-sm backdrop-blur-xl">
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium tracking-wide font-sans">Level Progress</p>
              <p className="font-mono text-sm md:text-base font-semibold text-foreground mt-0.5">
                {state.xp} <span className="text-muted-foreground/60 font-normal">/ {xpToNext} XP</span>
              </p>
            </div>
            <div className="w-24 md:w-32">
              <Progress value={progressValue} className="h-2 bg-secondary" />
            </div>
          </div>
        </motion.div>

        {/* 8th-Grade Welcome Guidance Banner */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary border border-primary/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Rocket className="w-5 h-5 animate-bounce" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Getting Started Guide</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-foreground">Welcome to RiseForge, {state.name}!</h2>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Starting a business might seem hard, but we make it easy step-by-step. Use this hub to manage your startup, learn key skills, and turn your best ideas into reality.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
              {[
                { title: "1. Learn", desc: "Follow the Academy Path to master startup basics.", icon: <BookOpen className="w-4 h-4 text-blue-500" /> },
                { title: "2. Spot Problems", desc: "Scan your school and community for real-world issues.", icon: <Globe className="w-4 h-4 text-emerald-500" /> },
                { title: "3. Brainstorm", desc: "Use the Idea Lab to sketch out business solutions.", icon: <FlaskConical className="w-4 h-4 text-amber-500" /> },
                { title: "4. Ask for Help", desc: "Get advice anytime from your personal Founder Mentor.", icon: <Brain className="w-4 h-4 text-purple-500" /> },
              ].map((step, idx) => (
                <div key={idx} className="space-y-1 p-3 bg-background/50 rounded-xl border border-border/40">
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <h4 className="text-xs font-semibold text-foreground/90">{step.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid - Kid Friendly Labels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "My Startup Savings", value: `$${state.company?.cash?.toLocaleString() || '1,000'}`, icon: <DollarSign className="w-4 h-4" />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Founder Reputation", value: state.reputation || 0, icon: <Trophy className="w-4 h-4" />, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Learning Streak", value: `${state.streak || 0} Days`, icon: <Flame className="w-4 h-4" />, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "My Startup Projects", value: state.company ? "1 Active" : "0 Active", icon: <Building2 className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10" },
          ].map((stat, i) => (
            <Card key={i} className="glass-card transition-all hover:border-border/80">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground/80 font-medium tracking-wide font-sans">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-semibold tracking-tight text-foreground/90">{stat.value}</p>
                  </div>
                  <div className={cn("p-2 rounded-xl border border-border", stat.bg, stat.color)}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main Section (Col Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Startup Projects Grid */}
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-semibold tracking-tight text-foreground/90">My Startup Projects</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Manage and track your active business ideas</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!state.company ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1.5 max-w-sm">
                      <p className="text-sm font-semibold text-foreground/90 font-sans">No projects started yet</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Ready to start your entrepreneur journey? Head over to the Idea Lab to launch your first virtual business project!
                      </p>
                    </div>
                    <Button asChild size="sm" variant="outline" className="rounded-xl mt-2">
                      <Link href="/idea-lab">
                        <span>Go to Idea Lab</span>
                        <FlaskConical className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-secondary/30 border border-border/85 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[11px] font-mono font-medium text-primary uppercase tracking-wider">
                              {state.company.type} startup
                            </span>
                            <h3 className="font-semibold text-lg text-foreground/90 flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-primary" /> {state.company.name}
                            </h3>
                          </div>
                          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border", "text-emerald-500 bg-emerald-500/10 border-emerald-500/20")}>
                            {state.company.stage} Stage
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                          &ldquo;{state.company.mission || "Build the future."}&rdquo;
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground font-sans">Estimated Value</p>
                          <p className="font-mono font-semibold text-foreground mt-0.5">
                            ${state.company.valuation?.toLocaleString() || '1,000'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-sans">Monthly Earnings</p>
                          <p className="font-mono font-semibold text-foreground mt-0.5">
                            ${state.company.revenue?.toLocaleString() || '0'}/mo
                          </p>
                        </div>
                      </div>

                      <Button asChild size="sm" variant="outline" className="w-full rounded-xl">
                        <Link href="/idea-lab" className="flex items-center justify-center gap-1.5">
                          <span>Open Idea Lab</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="p-5 bg-secondary/15 border border-border/30 border-dashed rounded-2xl flex flex-col items-center justify-center text-center py-8">
                      <div className="p-3 bg-secondary rounded-full border border-border">
                        <Sparkles className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mt-3 font-sans">Start a new project</p>
                      <p className="text-xs text-muted-foreground/70 max-w-[200px] mt-1.5">
                        Got another idea? Learn how to validate it and launch a second company.
                      </p>
                      <Button asChild size="sm" variant="ghost" className="rounded-xl mt-3 text-primary hover:text-primary">
                        <Link href="/opportunity-scanner">
                          <span>Scan for Problems</span>
                          <ChevronRight className="w-3.5 h-3.5 font-sans" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Entrepreneur Skills - Replaced RadarChart with beautiful progress bars */}
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <h2 className="text-base font-semibold tracking-tight text-foreground/90">My Entrepreneur Skills</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Track your learning progress across six essential skills:</p>
              </CardHeader>
              <CardContent className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillData.map((skill) => {
                    const percent = Math.min(100, Math.floor((skill.value / 50) * 100))
                    return (
                      <div key={skill.name} className="space-y-2 p-4 bg-secondary/30 border border-border/60 rounded-xl">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-semibold text-foreground">{skill.name}</span>
                            <p className="text-xs text-muted-foreground font-sans">{skill.description}</p>
                          </div>
                          <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            Lvl {skill.value}
                          </span>
                        </div>
                        <Progress value={percent} className="h-2 bg-secondary" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Achievements & Activity */}
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <h2 className="text-base font-semibold tracking-tight text-foreground/90">My Startup Journey Logs</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Here are the awesome milestones you&apos;ve completed!</p>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-border">
                  {activityLogs.map((event, index) => (
                    <div key={index} className="flex gap-5 relative items-start text-sm">
                      <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0 z-10 shadow-sm animate-pulse">
                        {event.icon}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start gap-2">
                          <p className="font-medium text-foreground/90 font-sans">{event.title}</p>
                          <span className="font-mono text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex-shrink-0">
                            {event.xp}
                          </span>
                        </div>
                        <p className="text-muted-foreground/80 leading-relaxed text-[13px] font-sans">{event.subtitle}</p>
                        <p className="text-xs text-muted-foreground/50 flex items-center gap-1.5 pt-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Section (Col Span 1) */}
          <div className="space-y-6">

            {/* Quick Access (Strategic Gateways) */}
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <h2 className="text-base font-semibold tracking-tight text-foreground/90">Where to Next?</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Select a tool to continue building and learning</p>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <Button asChild className="w-full justify-between h-12 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary)/0.3)] transition-all px-4 rounded-xl">
                  <Link href="/world-map" className="flex items-center justify-between w-full">
                    <span className="font-sans">Resume Academy Path</span>
                    <Map className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between h-12 text-sm font-medium border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors px-4 rounded-xl">
                  <Link href="/opportunity-scanner" className="flex items-center justify-between w-full">
                    <span className="font-sans">Find Problems to Solve</span>
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between h-12 text-sm font-medium border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors px-4 rounded-xl">
                  <Link href="/idea-lab" className="flex items-center justify-between w-full">
                    <span className="font-sans">Brainstorm in Idea Lab</span>
                    <FlaskConical className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between h-12 text-sm font-medium border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors px-4 rounded-xl">
                  <Link href="/mentor" className="flex items-center justify-between w-full">
                    <span className="font-sans">Talk to Founder Mentor</span>
                    <Brain className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* My Startup Goals (Replaced OKR Milestones) */}
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <h2 className="text-base font-semibold tracking-tight text-foreground/90">My Startup Goals</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Active goals for your current level</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2 text-sm">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-medium text-foreground/90 font-sans">{goal.title}</p>
                        <p className="text-xs text-muted-foreground/80 mt-0.5 font-sans">{goal.description}</p>
                      </div>
                      <span className="font-mono text-xs font-medium text-foreground/70">
                        {goal.progress}%
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-1.5 bg-secondary" />
                    <div className="flex justify-between text-[11px] text-muted-foreground/60 font-mono tracking-wide">
                      <span>Val: {goal.current}</span>
                      <span>Target: {goal.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Startup Tips (Replaced Market Ticker) */}
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <h2 className="text-base font-semibold tracking-tight text-foreground/90">Startup Tips of the Day</h2>
                <p className="text-sm text-muted-foreground mt-0.5 font-sans">Learn from real founders and mentors</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {startupTips.map((tip, index) => (
                  <div key={index} className="p-3.5 bg-secondary/40 border border-border rounded-xl flex items-start gap-3 text-sm transition-colors hover:bg-secondary">
                    <div className={cn("p-1.5 rounded-lg shrink-0 bg-blue-500/10")}>
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 font-sans">{tip.type}</p>
                      <p className="text-muted-foreground/90 leading-relaxed text-[13px] font-sans">{tip.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </GameShell>
  )
}
