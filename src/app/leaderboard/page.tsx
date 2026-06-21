"use client"

import { useMemo } from 'react'
import GameShell from '@/components/game/GameShell'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Medal, Star, UserPlus, Globe, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCollection, useAuth } from '@/firebase'
import { useGameState, GameState } from '@/hooks/use-game-state'

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
  if (nation.includes('japan') || nation === 'jp') return '🇯🇵'
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
  rank: number
  isCurrentUser: boolean
}

export default function LeaderboardPage() {
  const auth = useAuth()
  const currentUserId = auth?.currentUser?.uid
  const { state: currentGameState } = useGameState()
  const userNation = currentGameState?.nation || 'Global'

  // Fetch all users from Firestore
  const { data: dbUsers, isLoading } = useCollection<GameState & { id: string }>('users')

  // Parse and sort all onboarded users
  const globalRankings = useMemo(() => {
    if (!dbUsers) return []
    return dbUsers
      .filter(u => u.name && u.xp !== undefined) // Filter out incomplete profiles
      .sort((a, b) => b.xp - a.xp)
      .map((player, idx) => ({
        id: player.id,
        name: player.name || 'Future Founder',
        levelTitle: player.levelTitle || 'Explorer',
        xp: player.xp || 0,
        nation: player.nation || 'Global',
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
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className={cn(
                "w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg transition-transform hover:scale-105",
                secondPlace 
                  ? (secondPlace.isCurrentUser ? "border-primary bg-primary/10 text-primary" : "border-slate-400 bg-slate-50 text-slate-700") 
                  : "border-slate-200 border-dashed bg-slate-50 text-slate-300"
              )}>
                {secondPlace ? secondPlace.name[0].toUpperCase() : "?"}
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
                {secondPlace ? `${secondPlace.xp.toLocaleString()} XP` : "Slot Open"}
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
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className={cn(
                "w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center font-black text-3xl sm:text-4xl shadow-xl transition-transform hover:scale-105 relative",
                firstPlace 
                  ? (firstPlace.isCurrentUser ? "border-primary bg-primary/10 text-primary" : "border-yellow-500 bg-yellow-50/50 text-yellow-700") 
                  : "border-yellow-200 border-dashed bg-yellow-50/10 text-yellow-300"
              )}>
                {firstPlace ? firstPlace.name[0].toUpperCase() : "?"}
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
                {firstPlace ? `${firstPlace.xp.toLocaleString()} XP` : "Slot Open"}
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
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className={cn(
                "w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg transition-transform hover:scale-105",
                thirdPlace 
                  ? (thirdPlace.isCurrentUser ? "border-primary bg-primary/10 text-primary" : "border-orange-500 bg-orange-50 text-orange-700") 
                  : "border-orange-200 border-dashed bg-orange-50 text-orange-300"
              )}>
                {thirdPlace ? thirdPlace.name[0].toUpperCase() : "?"}
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
                {thirdPlace ? `${thirdPlace.xp.toLocaleString()} XP` : "Slot Open"}
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
                className={cn(
                 "flex items-center gap-4 p-4 rounded-2xl transition-all border",
                 player.isCurrentUser 
                   ? "bg-primary/10 border-primary/30 glow-primary" 
                   : "bg-card hover:bg-muted border-black/[0.06]"
                )}
              >
                <div className="w-8 font-bold text-muted-foreground flex justify-center text-sm">
                  #{player.rank}
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm",
                  player.isCurrentUser ? "bg-primary text-white" : "bg-accent/20 text-accent-foreground"
                )}>
                  {player.name[0].toUpperCase()}
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
                  <p className="font-bold text-primary text-base">{player.xp.toLocaleString()} XP</p>
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
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-600">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <h1 className="text-4xl font-headline font-black tracking-tight">World Rankings</h1>
          </div>
          <p className="text-muted-foreground text-base">
            Real student entrepreneurs learning and building across the globe. Consistency is your greatest strength!
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
              <TabsTrigger value="global" className="rounded-lg px-8 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2">
                <Globe className="w-4 h-4" /> Global
              </TabsTrigger>
              <TabsTrigger value="national" className="rounded-lg px-8 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2">
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
    </GameShell>
  )
}
