"use client"

import { useMemo, useState } from 'react'
import GameShell from '@/components/game/GameShell'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Medal, Star, UserPlus, Globe, Flag, Brain, Zap, Target, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCollection, useAuth } from '@/firebase'
import { useGameState, GameState } from '@/hooks/use-game-state'
import { motion, AnimatePresence } from 'framer-motion'

// Country flag emoji mapping helper
function getCountryFlag(nationName: string): string {
  if (!nationName) return '🌐'
  const nation = nationName.trim().toLowerCase()
  if (nation.includes('united states') || nation === 'us' || nation === 'usa') return '🇺🇸'
  if (nation.includes('united kingdom') || nation === 'uk' || nation === 'gb') return '🇬🇧'
  if (nation.includes('canada') || nation === 'ca') return '🇨🇦'
  if (nation.includes('germany') || nation === 'de') return '🇩🇪'
  if (nation.includes('india') || nation === 'in') return '🇮🇳'
  if (nation.includes('brazil') || nation === 'br') return '🇧🇷'
  if (nation.includes('japan') || nation === 'jp') return '🇯🇵'
  if (nation.includes('australia') || nation === 'au') return '🇦🇺'
  if (nation.includes('singapore') || nation === 'sg') return '🇸🇬'
  if (nation.includes('france') || nation === 'fr') return '🇫🇷'
  if (nation.includes('pakistan') || nation === 'pk') return '🇵🇰'
  if (nation.includes('united arab emirates') || nation === 'uae') return '🇦🇪'
  
  if (nation.length === 2) {
    const codePoints = nation
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))
    try {
      return String.fromCodePoint(...codePoints)
    } catch {
      return '🌐'
    }
  }
  return '🌐'
}

interface RankedPlayer {
  id: string
  name: string
  levelTitle: string
  xp: number
  nation: string
  pfp?: string
  rank: number
  isCurrentUser: boolean
}

export default function LeaderboardPage() {
  const auth = useAuth()
  const currentUserId = auth?.currentUser?.uid
  const { state: currentGameState } = useGameState()
  const userNation = currentGameState?.nation || 'Global'

  // Modal display target
  const [viewingPlayer, setViewingPlayer] = useState<any | null>(null)

  // Fetch all users from Firestore
  const { data: dbUsers, isLoading } = useCollection<GameState & { id: string }>('users')

  // Parse and sort all users who have signed in (no strict filters)
  const globalRankings = useMemo(() => {
    if (!dbUsers) return []
    return [...dbUsers]
      .sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0))
      .map((player, idx) => ({
        id: player.id,
        name: player.name || 'Future Founder',
        levelTitle: player.levelTitle || 'Explorer',
        xp: Number(player.xp || 0),
        nation: player.nation || 'Global',
        pfp: player.pfp || '',
        rank: idx + 1,
        isCurrentUser: player.id === currentUserId
      }))
  }, [dbUsers, currentUserId])

  // Filter for national rankings
  const nationalRankings = useMemo(() => {
    return globalRankings
      .filter(p => p.nation.toLowerCase() === userNation.toLowerCase())
      .map((player, idx) => ({
        ...player,
        rank: idx + 1
      }))
  }, [globalRankings, userNation])

  // Click handler to resolve full document details
  const handleOpenProfile = (playerId: string, fallbackPlayer: RankedPlayer) => {
    const fullDoc = dbUsers?.find(u => u.id === playerId)
    setViewingPlayer(fullDoc ? { ...fullDoc, id: playerId } : fallbackPlayer)
  }

  // Render function for Leaderboard View
  const renderLeaderboard = (players: RankedPlayer[], typeLabel: string) => {
    const firstPlace = players[0]
    const secondPlace = players[1]
    const thirdPlace = players[2]
    const scrollablePlayers = players.slice(3)

    return (
      <div className="space-y-6">
        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end mb-8 pt-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center space-y-3 cursor-pointer" onClick={() => secondPlace && handleOpenProfile(secondPlace.id, secondPlace)}>
            <div className="relative">
              <div className={cn(
                "w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg transition-transform hover:scale-105 overflow-hidden bg-accent/5",
                secondPlace 
                  ? (secondPlace.isCurrentUser ? "border-primary bg-primary/10 text-primary" : "border-slate-400 bg-slate-50 text-slate-700") 
                  : "border-slate-200 border-dashed bg-slate-50 text-slate-300"
              )}>
                {secondPlace ? (
                  secondPlace.pfp ? (
                    <img src={secondPlace.pfp} className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://picsum.photos/seed/${secondPlace.name}/150/150`} className="w-full h-full object-cover" />
                  )
                ) : "?"}
              </div>
              {secondPlace && (
                <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white p-1 rounded-full shadow-md">
                  <Medal className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>
            <div className="text-center min-h-[48px]">
              <p className="font-bold text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] mx-auto">
                {secondPlace ? secondPlace.name : "Waiting..."}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold">
                {secondPlace ? `${Number(secondPlace.xp).toLocaleString()} XP` : "Slot Open"}
              </p>
              {secondPlace && (
                <span className="inline-block mt-0.5 text-xs" title={secondPlace.nation}>
                  {getCountryFlag(secondPlace.nation)}
                </span>
              )}
            </div>
            <div className="w-full h-16 sm:h-24 bg-slate-400/10 border-t border-x border-slate-400/20 rounded-t-2xl flex items-center justify-center text-slate-400 font-bold text-xl sm:text-2xl">
              2
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center space-y-3 cursor-pointer" onClick={() => firstPlace && handleOpenProfile(firstPlace.id, firstPlace)}>
            <div className="relative">
              <div className={cn(
                "w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center font-black text-3xl sm:text-4xl shadow-xl transition-transform hover:scale-105 relative overflow-hidden bg-accent/5",
                firstPlace 
                  ? (firstPlace.isCurrentUser ? "border-primary bg-primary/10 text-primary" : "border-yellow-500 bg-yellow-50/50 text-yellow-700") 
                  : "border-yellow-200 border-dashed bg-yellow-50/10 text-yellow-300"
              )}>
                {firstPlace ? (
                  firstPlace.pfp ? (
                    <img src={firstPlace.pfp} className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://picsum.photos/seed/${firstPlace.name}/150/150`} className="w-full h-full object-cover" />
                  )
                ) : "?"}
              </div>
              {firstPlace && (
                <>
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white p-1 rounded-full shadow-md animate-pulse">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-float">
                    <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 fill-yellow-500" />
                  </div>
                </>
              )}
            </div>
            <div className="text-center min-h-[48px]">
              <p className="font-bold text-sm sm:text-base truncate max-w-[90px] sm:max-w-[140px] mx-auto">
                {firstPlace ? firstPlace.name : "Waiting..."}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold">
                {firstPlace ? `${Number(firstPlace.xp).toLocaleString()} XP` : "Slot Open"}
              </p>
              {firstPlace && (
                <span className="inline-block mt-0.5 text-xs" title={firstPlace.nation}>
                  {getCountryFlag(firstPlace.nation)}
                </span>
              )}
            </div>
            <div className="w-full h-24 sm:h-32 bg-yellow-500/10 border-t border-x border-yellow-500/20 rounded-t-2xl flex items-center justify-center text-yellow-500 font-bold text-2xl sm:text-4xl">
              1
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center space-y-3 cursor-pointer" onClick={() => thirdPlace && handleOpenProfile(thirdPlace.id, thirdPlace)}>
            <div className="relative">
              <div className={cn(
                "w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg transition-transform hover:scale-105 overflow-hidden bg-accent/5",
                thirdPlace 
                  ? (thirdPlace.isCurrentUser ? "border-primary bg-primary/10 text-primary" : "border-orange-500 bg-orange-50 text-orange-700") 
                  : "border-orange-200 border-dashed bg-orange-50 text-orange-300"
              )}>
                {thirdPlace ? (
                  thirdPlace.pfp ? (
                    <img src={thirdPlace.pfp} className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://picsum.photos/seed/${thirdPlace.name}/150/150`} className="w-full h-full object-cover" />
                  )
                ) : "?"}
              </div>
              {thirdPlace && (
                <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1 rounded-full shadow-md">
                  <Medal className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>
            <div className="text-center min-h-[48px]">
              <p className="font-bold text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] mx-auto">
                {thirdPlace ? thirdPlace.name : "Waiting..."}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold">
                {thirdPlace ? `${Number(thirdPlace.xp).toLocaleString()} XP` : "Slot Open"}
              </p>
              {thirdPlace && (
                <span className="inline-block mt-0.5 text-xs" title={thirdPlace.nation}>
                  {getCountryFlag(thirdPlace.nation)}
                </span>
              )}
            </div>
            <div className="w-full h-12 sm:h-20 bg-orange-500/10 border-t border-x border-orange-500/20 rounded-t-2xl flex items-center justify-center text-orange-600 font-bold text-lg sm:text-xl">
              3
            </div>
          </div>
        </div>

        {/* Scrollable list */}
        {players.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl p-8 space-y-4">
            <UserPlus className="w-12 h-12 mx-auto text-muted-foreground animate-pulse" />
            <div className="space-y-1">
              <p className="font-bold text-lg">No active players yet</p>
              <p className="text-sm text-muted-foreground">Complete onboarding and complete lessons to claim your rank!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {scrollablePlayers.map((player) => (
              <div 
                key={player.id} 
                onClick={() => handleOpenProfile(player.id, player)}
                className={cn(
                 "flex items-center gap-4 p-4 rounded-2xl transition-all border cursor-pointer hover:-translate-y-0.5 active:translate-y-0 relative z-10",
                 player.isCurrentUser 
                   ? "bg-primary/10 border-primary/30 glow-primary" 
                   : "bg-card hover:bg-muted border-black/[0.06]"
                )}
              >
                <div className="w-8 font-bold text-muted-foreground flex justify-center text-sm">
                  #{player.rank}
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold shrink-0 shadow-sm bg-accent/5 border border-black/[0.04]">
                  {player.pfp ? (
                    <img src={player.pfp} className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://picsum.photos/seed/${player.name}/100/100`} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold flex items-center gap-2 truncate text-base">
                    {player.name} 
                    {player.isCurrentUser && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-white shrink-0">
                        YOU
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground font-semibold">{player.levelTitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary text-base">{Number(player.xp).toLocaleString()} XP</p>
                  <p className="text-[11px] text-muted-foreground uppercase font-black tracking-wider flex items-center gap-1 justify-end">
                    <span className="text-sm" title={player.nation}>{getCountryFlag(player.nation)}</span>
                    <span className="hidden sm:inline">{player.nation}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <GameShell>
      <div className="max-w-4xl mx-auto space-y-8 pb-12 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-600">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <h1 className="text-4xl font-headline font-black tracking-tight">World Rankings</h1>
          </div>
          <p className="text-muted-foreground text-base">
            Real student entrepreneurs learning and building across the globe. Click on any founder to view their progress card!
          </p>
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 glass-card rounded-3xl">
            <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm text-muted-foreground font-semibold">Updating world ranks...</p>
          </div>
        ) : (
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="bg-muted/50 p-1 mb-8 w-full sm:w-auto h-12 rounded-xl border border-black/[0.04]">
              <TabsTrigger value="global" className="rounded-lg px-8 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 cursor-pointer">
                <Globe className="w-4 h-4" /> Global
              </TabsTrigger>
              <TabsTrigger value="national" className="rounded-lg px-8 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2 cursor-pointer">
                <Flag className="w-4 h-4" /> National ({userNation})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 outline-none">
              {renderLeaderboard(globalRankings, 'Global')}
            </TabsContent>
            
            <TabsContent value="national" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 outline-none">
              {renderLeaderboard(nationalRankings, 'National')}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Interactive Player Detail Modal Overlay */}
      <AnimatePresence>
        {viewingPlayer && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-3xl border border-black/[0.08] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-accent/5 border border-accent/20 flex items-center justify-center text-2xl font-black text-accent shrink-0 shadow-sm">
                    {viewingPlayer.pfp ? (
                      <img src={viewingPlayer.pfp} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <img src={`https://picsum.photos/seed/${viewingPlayer.name}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-headline font-black flex items-center gap-2 leading-none">
                      {viewingPlayer.name} {getCountryFlag(viewingPlayer.nation)}
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1.5">
                      Level {viewingPlayer.level || 1} • {viewingPlayer.levelTitle || 'Explorer'}
                    </p>
                    <p className="text-[10px] text-primary uppercase font-black tracking-widest mt-0.5">{viewingPlayer.founderStage || 'Dreamer'}</p>
                  </div>
                </div>
                <button onClick={() => setViewingPlayer(null)} className="text-muted-foreground hover:text-foreground font-black text-sm p-1 cursor-pointer">✕</button>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center shadow-sm">
                  <p className="text-[9px] uppercase font-black tracking-wider text-muted-foreground">Total XP</p>
                  <p className="text-sm font-black text-primary">{Number(viewingPlayer.xp || 0).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center shadow-sm">
                  <p className="text-[9px] uppercase font-black tracking-wider text-muted-foreground">Lessons</p>
                  <p className="text-sm font-black text-primary">{(viewingPlayer.completedLessons || []).length}/10</p>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center shadow-sm">
                  <p className="text-[9px] uppercase font-black tracking-wider text-muted-foreground">Streak 🔥</p>
                  <p className="text-sm font-black text-orange-500">{viewingPlayer.streak || 0} Days</p>
                </div>
              </div>

              {/* Cognitive Skills Progress Bars */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Founder Cognitive DNA</p>
                <div className="space-y-2.5 border border-black/[0.05] p-4 rounded-2xl bg-black/[0.01]">
                  {[
                    { label: 'Strategic Thinking', val: viewingPlayer.skills?.strategicThinking || 10 },
                    { label: 'Market Awareness', val: viewingPlayer.skills?.marketAwareness || 10 },
                    { label: 'Risk Analysis', val: viewingPlayer.skills?.riskAnalysis || 10 },
                    { label: 'Leadership', val: viewingPlayer.skills?.leadership || 10 },
                    { label: 'Negotiation', val: viewingPlayer.skills?.negotiation || 10 },
                  ].map(skill => (
                    <div key={skill.label} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-muted-foreground">{skill.label}</span>
                        <span className="text-primary">{skill.val}%</span>
                      </div>
                      <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(skill.val, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges Earned */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Unlocked Achievements</p>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {viewingPlayer.badges && viewingPlayer.badges.length > 0 ? (
                    viewingPlayer.badges.map((badge: any, idx: number) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/5 text-primary border border-primary/10 text-[11px] font-bold shadow-sm">
                        <Award className="w-3.5 h-3.5" /> {badge.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic pl-1">No custom certifications unlocked yet.</p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setViewingPlayer(null)}
                className="w-full p-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/95 text-sm transition-all shadow-md shadow-primary/10 cursor-pointer text-center"
              >
                Close Profile Card
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
