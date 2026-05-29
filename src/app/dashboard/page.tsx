"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Zap, Trophy, Flame, Brain, Sparkles, ChevronRight, TrendingUp, 
  ShieldCheck, Globe, Target, ArrowUpRight, MessageSquare, Clock, Rocket 
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import PageGuide from '@/components/game/PageGuide'

export default function DashboardPage() {
  const { state, isLoaded, xpToNext } = useGameState()

  if (!isLoaded) return null

  const progressValue = (state.xp / xpToNext) * 100

  const skillData = [
    { skill: "Strategy", value: state.skills.strategicThinking },
    { skill: "Finance", value: state.skills.financialIntelligence },
    { skill: "Risk", value: state.skills.riskAnalysis },
    { skill: "Negotiation", value: state.skills.negotiation },
    { skill: "Market", value: state.skills.marketAwareness },
    { skill: "Leadership", value: state.skills.leadership },
  ]

  const chartConfig = {
    value: { label: "Mastery", color: "hsl(var(--primary))" },
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="dashboard"
        title="Command Center"
        description="Welcome to your home base! Track your progress as a founder."
        icon={<Target className="w-5 h-5" />}
      />
      
      <div className="space-y-8 pb-20 px-4 max-w-7xl mx-auto">
        {/* Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold tracking-tight">Level {state.level}</h1>
            <p className="text-xl text-muted-foreground">Founder • RiseForge OS</p>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">XP Progress</p>
              <p className="font-mono text-2xl font-semibold">{state.xp} / {xpToNext}</p>
            </div>
            <div className="w-32">
              <Progress value={progressValue} className="h-3" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Cash", value: `$${state.cash.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, color: "text-emerald-500" },
            { label: "Reputation", value: state.reputation, icon: <Trophy className="w-6 h-6" />, color: "text-amber-500" },
            { label: "Streak", value: `${state.streak || 7} days`, icon: <Flame className="w-6 h-6" />, color: "text-orange-500" },
            { label: "Companies", value: "2 Active", icon: <Globe className="w-6 h-6" />, color: "text-blue-500" },
          ].map((stat, i) => (
            <Card key={i} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-semibold mt-2">{stat.value}</p>
                  </div>
                  <div className={cn("opacity-80", stat.color)}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Radar */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">Founder Skills</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 13 }} />
                  <Radar
                    name="Mastery"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Continue Your Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-between text-base py-6">
                <Link href="/simulation">
                  Enter CEO Simulator <Rocket className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between text-base py-6">
                <Link href="/pitch-arena">
                  Practice Pitch <ArrowUpRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Complete Week 12: Market Research</p>
                    <p className="text-sm text-muted-foreground">2 days left</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GameShell>
  )
}