"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Zap, Trophy, Flame, Brain, Sparkles, ChevronRight, TrendingUp, 
  ShieldCheck, Globe, Target, ArrowUpRight, MessageSquare, Clock, 
  Rocket, DollarSign 
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts"
import PageGuide from '@/components/game/PageGuide'

export default function DashboardPage() {
  const { state, isLoaded, xpToNext } = useGameState()

  if (!isLoaded) {
    return (
      <GameShell>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading your command center...</p>
        </div>
      </GameShell>
    )
  }

  const progressValue = (state.xp / xpToNext) * 100 || 0

  const skillData = [
    { skill: "Strategy", value: state.skills?.strategicThinking || 50 },
    { skill: "Finance", value: state.skills?.financialIntelligence || 50 },
    { skill: "Risk", value: state.skills?.riskAnalysis || 50 },
    { skill: "Negotiation", value: state.skills?.negotiation || 50 },
    { skill: "Market", value: state.skills?.marketAwareness || 50 },
    { skill: "Leadership", value: state.skills?.leadership || 50 },
  ]

  return (
    <GameShell>
      <div className="space-y-8 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Level {state.level}</h1>
            <p className="text-xl text-muted-foreground">Founder Command Center</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">XP Progress</p>
              <p className="font-mono text-2xl font-semibold">{state.xp} / {xpToNext}</p>
            </div>
            <div className="w-36">
              <Progress value={progressValue} className="h-3" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Cash", value: `$${state.cash?.toLocaleString() || '0'}`, icon: <DollarSign className="w-6 h-6" />, color: "text-emerald-500" },
            { label: "Reputation", value: state.reputation || 0, icon: <Trophy className="w-6 h-6" />, color: "text-amber-500" },
            { label: "Streak", value: `${state.streak || 7} days`, icon: <Flame className="w-6 h-6" />, color: "text-orange-500" },
            { label: "Active Companies", value: "2", icon: <Globe className="w-6 h-6" />, color: "text-blue-500" },
          ].map((stat, i) => (
            <Card key={i} className="hover:shadow-lg transition-all border border-border/50">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Founder Skill Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                  <Radar
                    name="Mastery"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.25}
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
              <CardTitle>Continue Building</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild size="lg" className="w-full justify-between">
                <Link href="/simulation">Enter CEO Simulator <Rocket className="w-5 h-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-between">
                <Link href="/pitch-arena">Practice Pitch <ArrowUpRight className="w-5 h-5" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </GameShell>
  )
}