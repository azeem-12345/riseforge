"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  Target, 
  Users, 
  ChevronRight,
  TrendingUp
} from 'lucide-react'
import { useUser } from '@/firebase'

export default function LandingPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [activeWeek, setActiveWeek] = useState(1)

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm font-semibold">Preparing your academy...</p>
        </div>
      </div>
    )
  }

  // If user is logged in, hide landing page structure while transitioning
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm font-semibold">Redirecting to Dashboard...</p>
        </div>
      </div>
    )
  }

  const weeks = [
    { num: 1, title: 'Mindset & YC Foundations', desc: 'Shift from a student to a builder. Discover what a startup is and explore the fundamental rules of rapid growth.' },
    { num: 2, title: 'Finding Great Problems', desc: 'Stop building useless apps. Learn how to observe real-world friction and identify problems worth solving.' },
    { num: 3, title: 'User Conversations', desc: 'Talk to real people. Discover the Mom Test approach to ask questions that reveal actual needs without bias.' },
    { num: 4, title: 'The MVP Blueprint', desc: 'Build the absolute simplest thing. Learn to deploy value in days rather than months to test your assumptions.' },
    { num: 5, title: 'Launching & First Users', desc: 'Push your work live. Use organic loops, school networks, and student spaces to gain your first 10 loyal users.' },
    { num: 6, title: 'Product Market Fit (PMF)', desc: 'Measure user love. Understand why retention is the only metric that guarantees your startup’s survival.' },
    { num: 7, title: 'Growth & Distribution', desc: 'Learn how to spread your product. Explore viral mechanics, word-of-mouth loops, and simple marketing channels.' },
    { num: 8, title: 'The Art of Pitching', desc: 'Tell a compelling story. Frame your problem, solution, and growth into a clear, simple pitch for peers and judges.' },
    { num: 9, title: 'Unit Economics', desc: 'Demystify money. Calculate how much it costs to acquire a user (CAC) and the long-term value they bring (LTV).' },
    { num: 10, title: 'Legal & Final Launch', desc: 'Understand the legal basics. Set up structure, navigate equity shares, and launch your final pitch to the world.' },
  ]

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 relative overflow-x-hidden font-sans">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0 opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[55%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-black/[0.04] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-headline font-black text-xl tracking-tight cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Rocket className="w-4 h-4 fill-white" />
            </div>
            <span>Rise<span className="text-primary">Forge</span></span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/auth')} 
              className="text-sm font-bold hover:text-primary transition-colors px-4 py-2 cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push('/auth')} 
              className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/10 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> High School Startup Academy
            </div>

            <h1 className="text-5xl sm:text-6xl font-headline font-black tracking-tight text-foreground leading-[1.05]">
              Master the Art of <br />
              Starting a <span className="primary-gradient">Startup</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground/90 leading-relaxed font-sans max-w-2xl">
              A highly professional, gamified 10-week curriculum designed specifically for high schoolers. 
              Learn Y Combinator-grade validation, build real MVPs, earn XP, and climb the Global Leaderboards.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button 
                onClick={() => router.push('/auth')}
                className="bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer text-base"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#curriculum"
                className="border border-black/[0.08] hover:border-primary/30 bg-card hover:bg-muted text-foreground font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>Explore 10-Week Roadmap</span>
              </a>
            </div>

            {/* Quick stats / social proof */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/[0.05] max-w-lg">
              <div>
                <p className="text-3xl font-headline font-black text-primary">10</p>
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Action Weeks</p>
              </div>
              <div>
                <p className="text-3xl font-headline font-black text-primary">100%</p>
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Real Humans</p>
              </div>
              <div>
                <p className="text-3xl font-headline font-black text-primary">0</p>
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Dummy Data</p>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Mock Interactive App Preview */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-indigo-500/10 rounded-[32px] blur-2xl transform rotate-3" />
            <div className="relative glass-card p-6 rounded-[32px] border border-black/[0.06] bg-white/80 shadow-2xl space-y-6">
              {/* Profile Card Mockup */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-md">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">Jane Doe 🇺🇸</p>
                  <p className="text-[11px] text-muted-foreground font-semibold">Level 3 • Innovator</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary text-sm">1,250 XP</p>
                  <p className="text-[9px] uppercase tracking-wider text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block">
                    Streak 🔥 5
                  </p>
                </div>
              </div>

              {/* Progress Panel */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-muted-foreground">Course Completion</span>
                  <span className="font-black text-primary">40% (Week 4 of 10)</span>
                </div>
                <div className="w-full bg-black/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[40%]" />
                </div>
              </div>

              {/* Action List Preview */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Active Startup Track</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">1</div>
                    <p className="font-bold text-foreground">Week 1: Foundations Mindset</p>
                    <span className="ml-auto text-green-600 font-bold">✓ Done</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">2</div>
                    <p className="font-bold text-foreground">Week 2: Solve Great Problems</p>
                    <span className="ml-auto text-green-600 font-bold">✓ Done</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-xs">
                    <div className="w-6 h-6 rounded-full bg-black/5 text-muted-foreground flex items-center justify-center font-black">3</div>
                    <p className="font-bold text-foreground">Week 3: Ask Honest Questions</p>
                    <span className="ml-auto text-primary font-bold animate-pulse">Active</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Rankings list widget */}
              <div className="space-y-2 pt-2 border-t border-black/[0.05]">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Live Challenger Arena</p>
                  <span className="text-[9px] font-bold text-primary flex items-center gap-1">Global 🌐</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10 text-center">
                    <p className="text-[10px] font-black text-yellow-600 truncate">#1 Ryan H. 🇮🇳</p>
                    <p className="text-[8px] text-muted-foreground">11,200 XP</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-400/5 border border-slate-400/10 text-center">
                    <p className="text-[10px] font-black text-slate-600 truncate">#2 Jane D. 🇺🇸</p>
                    <p className="text-[8px] text-muted-foreground">9,850 XP</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 text-center">
                    <p className="text-[10px] font-black text-orange-600 truncate">#3 Liam K. 🇬🇧</p>
                    <p className="text-[8px] text-muted-foreground">8,400 XP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Section */}
      <section className="bg-white py-20 border-y border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-headline font-black tracking-tight">
              An Educational Platform Built for Builders
            </h2>
            <p className="text-muted-foreground text-base">
              No simulated companies, fake cash counters, or bot players. We focus purely on world-class education, 
              real-time progress, and matching with peer founders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl border border-black/[0.04] bg-background space-y-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline text-foreground">Interactive 10-Week Track</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Go from understanding the startup mindset to writing pitches. Fully optimized content, rewritten in friendly, humanized English for high schoolers.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl border border-black/[0.04] bg-background space-y-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shadow-inner">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline text-foreground">Earn XP & Level Up</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Every concept you learn yields XP points. Develop tactical skills like strategic thinking, market awareness, risk analysis, and customer interviewing.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl border border-black/[0.04] bg-background space-y-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline text-foreground">100% Real World Leaderboard</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Rank up against active students. Enter your name and select your country to compete on the global podium or find local rivals inside the national directory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap Section */}
      <span id="curriculum" />
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            Academy Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline font-black tracking-tight">
            The 10-Week Startup Journey
          </h2>
          <p className="text-muted-foreground text-base">
            Each week provides actionable guidance mapping directly to actual methods used by top startup accelerators like Y Combinator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Week list column */}
          <div className="lg:col-span-5 space-y-2">
            {weeks.map((week) => (
              <button
                key={week.num}
                onClick={() => setActiveWeek(week.num)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer",
                  activeWeek === week.num 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-card hover:bg-muted border-black/[0.04]"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0",
                  activeWeek === week.num ? "bg-white/20 text-white" : "bg-black/5 text-muted-foreground"
                )}>
                  W{week.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{week.title}</p>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 shrink-0 transition-transform",
                  activeWeek === week.num ? "translate-x-1" : "text-muted-foreground"
                )} />
              </button>
            ))}
          </div>

          {/* Active week detail view panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-black/[0.04] p-8 sm:p-10 shadow-lg min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[120px] pointer-events-none" />
            
            <div className="space-y-6">
              <span className="text-5xl font-headline font-black text-primary/25">Week {activeWeek}</span>
              <div className="space-y-3">
                <h3 className="text-2xl font-headline font-black text-foreground">
                  {weeks[activeWeek - 1].title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed font-sans">
                  {weeks[activeWeek - 1].desc}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-black/[0.05] mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Estimated reward:</span>
                <span className="text-sm font-black text-green-600 font-sans">+150 XP</span>
              </div>
              <button 
                onClick={() => router.push('/auth')}
                className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <span>Access Course Content</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="bg-muted/40 py-20 text-center border-y border-black/[0.03]">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <p className="text-xl sm:text-2xl font-headline italic text-foreground leading-relaxed max-w-3xl mx-auto">
            "The best way to start a company is just to build something people actually want, and talk to your users."
          </p>
          <div className="space-y-1">
            <p className="font-bold text-primary text-sm uppercase tracking-widest">Paul Graham</p>
            <p className="text-xs text-muted-foreground font-semibold">Co-founder, Y Combinator</p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-primary text-white rounded-[32px] p-8 sm:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-indigo-800" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-headline font-black tracking-tight leading-none text-white">
              Forge Your Future Today.
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans">
              Create your account, select your country, and start learning. Claim your spot on the world rankings today.
            </p>
            <div className="flex justify-center pt-2">
              <button 
                onClick={() => router.push('/auth')}
                className="bg-white text-primary hover:bg-slate-50 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl flex items-center gap-2 cursor-pointer text-base"
              >
                <span>Launch Your Academy Account</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] bg-white py-12 text-center text-sm text-muted-foreground font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-headline font-black text-sm text-foreground">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white">
              <Rocket className="w-3 h-3 fill-white" />
            </div>
            <span>RiseForge</span>
          </div>
          <p>© 2026 RiseForge. Built for future student leaders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
