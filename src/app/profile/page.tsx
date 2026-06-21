"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Trophy, 
  Settings, 
  Mail, 
  Linkedin, 
  Globe, 
  Twitter, 
  LogOut, 
  Calendar,
  Flame,
  Zap,
  Target,
  Edit2,
  Share2,
  Award,
  Palette,
  Check,
  Brain,
  Camera
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { useUser, useAuth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { motion, AnimatePresence } from 'framer-motion'

const THEME_PRESETS = [
  { name: 'Electric Blue', primary: '217 91% 45%', accent: '199 89% 48%' },
  { name: 'Solar Gold', primary: '45 100% 50%', accent: '35 90% 45%' },
  { name: 'Emerald Peak', primary: '142 71% 45%', accent: '160 84% 39%' },
  { name: 'Crimson Fury', primary: '0 84% 60%', accent: '346 84% 45%' },
]

export default function ProfilePage() {
  const { state, updateState, xpToNext } = useGameState()
  const [activeTheme, setActiveTheme] = useState(THEME_PRESETS[0].name)
  const auth = useAuth()
  const { user } = useUser()

  // Profile Edit Modal States
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(state.name || '')
  const [tempNation, setTempNation] = useState(state.nation || '')
  const [tempOtherNation, setTempOtherNation] = useState('')
  const [tempPfp, setTempPfp] = useState(state.pfp || '')
  const [error, setError] = useState('')

  // Share Modal States
  const [isSharing, setIsSharing] = useState(false)

  // Sync state values when modal opens
  useEffect(() => {
    if (isEditing) {
      setTempName(state.name || '')
      setTempPfp(state.pfp || '')
      const countryList = ["United States", "United Kingdom", "Canada", "India", "Germany", "Australia", "Singapore", "France", "Japan", "Brazil", "Pakistan", "United Arab Emirates"]
      if (countryList.includes(state.nation)) {
        setTempNation(state.nation)
        setTempOtherNation('')
      } else {
        setTempNation('Other')
        setTempOtherNation(state.nation || '')
      }
    }
  }, [isEditing, state])

  const handleLogout = async () => {
    if (!auth) return
    try {
      await signOut(auth)
    } catch (e) {
      console.error("Sign out error:", e)
    }
  }

  const applyTheme = (theme: typeof THEME_PRESETS[0]) => {
    setActiveTheme(theme.name)
    document.documentElement.style.setProperty('--primary', theme.primary)
    document.documentElement.style.setProperty('--ring', theme.primary)
    document.documentElement.style.setProperty('--accent', theme.accent)
  }

  // Real join date formatting
  const getFormattedJoinDate = () => {
    const creationTime = user?.metadata?.creationTime
    if (!creationTime) return 'Joined Jun 2026'
    const date = new Date(creationTime)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `Joined ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }

  // Share Message string
  const shareMessage = `🚀 I'm learning how to start a startup on RiseForge! Level: ${state.levelTitle || 'Explorer'} (${state.level || 1}) | Total XP: ${Number(state.totalXp !== undefined ? state.totalXp : (state.xp || 0)).toLocaleString()} | Lessons Mastered: ${state.completedLessons?.length || 0}/10. Nation: ${state.nation || 'Global'}. Join me in forging the future: https://riseforge.vercel.app/`

  // Compress & resize uploaded file to 128x128 base64 JPEG
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 128
        const MAX_HEIGHT = 128
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75)
          setTempPfp(dataUrl)
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  // Render text emoji into a JPEG DataURL
  const handleSelectEmojiPfp = (emoji: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 128, 128)
      gradient.addColorStop(0, '#2563eb')
      gradient.addColorStop(1, '#7c3aed')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 128, 128)
      
      ctx.font = '72px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(emoji, 64, 68)
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
      setTempPfp(dataUrl)
    }
  }

  const handleSaveProfile = () => {
    if (!tempName.trim()) {
      setError('Name cannot be empty')
      return
    }
    const finalNation = tempNation === 'Other' ? tempOtherNation : tempNation
    if (!finalNation || !finalNation.trim()) {
      setError('Please provide your country/nation')
      return
    }
    setError('')
    updateState(prev => ({
      ...prev,
      name: tempName.trim(),
      nation: finalNation.trim(),
      pfp: tempPfp
    }))
    setIsEditing(false)
  }

  const currentXpValue = Number(state.xp || 0)
  const totalXpValue = Number(state.totalXp !== undefined ? state.totalXp : (state.xp || 0))

  const stats = [
    { label: 'Current Streak', value: `${state.streak} Days`, icon: Flame, color: 'text-orange-500' },
    { label: 'Total XP', value: totalXpValue.toLocaleString(), icon: Zap, color: 'text-primary' },
    { label: 'Lessons Mastered', value: state.completedLessons.length, icon: Target, color: 'text-accent' },
    { label: 'Founder Level', value: state.level, icon: Trophy, color: 'text-violet-500' },
  ]

  return (
    <GameShell>
      <div className="max-w-6xl mx-auto space-y-8 pb-20 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-6">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center text-accent text-4xl font-black shadow-lg overflow-hidden relative">
                {state.pfp ? (
                  <img src={state.pfp} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <img src={`https://picsum.photos/seed/${state.name}/200/200`} alt="Avatar" className="w-full h-full object-cover" />
                )}
                <div 
                  onClick={() => setIsEditing(true)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary flex items-center justify-center border-2 border-background shadow-lg">
                <Trophy className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-headline font-bold">{state.name}</h1>
              <div className="flex items-center gap-2">
                <UIBadge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                  {state.levelTitle}
                </UIBadge>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {getFormattedJoinDate()}
                </span>
                {state.nation && (
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest px-1.5 py-0.5 bg-black/5 rounded-full">
                    {state.nation}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsSharing(true)}
              className="rounded-xl border-black/[0.08] hover:bg-black/5 h-9 text-[10px] font-black uppercase tracking-widest flex-1 sm:flex-initial"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share Journey
            </Button>
            <Button 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="rounded-xl shadow-lg shadow-primary/20 h-9 px-6 text-[10px] font-black uppercase tracking-widest flex-1 sm:flex-initial"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-muted/50 border border-black/[0.04] p-1 h-11 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg px-6 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-lg px-6 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Certifications</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg px-6 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500 outline-none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <Card key={i} className="glass-card border-black/[0.06] hover:border-primary/20 transition-all shadow-sm">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-xl bg-black/5", stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                      <p className="text-sm font-black">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 glass-card border-black/[0.06]">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" /> Ascension Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black">Progress to Level {state.level + 1}</p>
                      <h4 className="text-xl font-black tabular-nums">{currentXpValue} / {xpToNext} XP</h4>
                    </div>
                    <p className="text-[10px] font-black text-primary">{Math.round((currentXpValue / xpToNext) * 100)}%</p>
                  </div>
                  <Progress value={(currentXpValue / xpToNext) * 100} className="h-2 bg-black/5" />
                  <p className="text-[10px] text-muted-foreground italic">
                    "Consistent output is the only metric that matters in the long game."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-black/[0.06]">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-accent" /> Digital Presence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-accent/30 transition-all cursor-pointer">
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-medium">linkedin.com/in/{state.name.toLowerCase().replace(' ', '')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-accent/30 transition-all cursor-pointer">
                    <Twitter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-medium">@future_founder</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-accent/30 transition-all cursor-pointer">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-medium">portfolio.riseforge.io</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="animate-in fade-in duration-500 outline-none">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Early Adopter', date: 'Genesis Phase', icon: Zap, color: 'text-yellow-500', desc: 'Joined during the early builder launch phase.' },
                { name: 'Consistency King', date: 'Active', icon: Flame, color: 'text-orange-500', desc: 'Maintained a learning streak.' },
                { name: 'Mindset Master', date: 'Foundation Phase 1', icon: Brain, color: 'text-accent', desc: 'Completed how to start a startup modules.' },
                { name: 'Alpha Founder', date: 'Active Rank', icon: Trophy, color: 'text-primary', desc: 'Earned XP and climbed level ranks.' },
              ].map((badge, i) => (
                <Card key={i} className="glass-card border-black/[0.06] group hover:border-primary/40 transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={cn("w-16 h-16 mx-auto rounded-full bg-black/5 border border-black/[0.06] flex items-center justify-center group-hover:scale-110 transition-transform", badge.color)}>
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">{badge.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-black">{badge.date}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{badge.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-in fade-in duration-500 space-y-6 outline-none">
            <Card className="glass-card border-black/[0.06]">
              <CardHeader>
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Palette className="w-4 h-4" />
                   </div>
                   <div>
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest">System Personalization</CardTitle>
                    <CardDescription className="text-[10px]">Select your primary core color for the RiseForge interface.</CardDescription>
                   </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEME_PRESETS.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => applyTheme(theme)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all text-left space-y-3 relative overflow-hidden group cursor-pointer",
                        activeTheme === theme.name 
                          ? "border-primary bg-primary/5" 
                          : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.15]"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-6 h-6 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: `hsl(${theme.primary})` }} />
                        {activeTheme === theme.name && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="max-w-2xl space-y-6">
              <Card className="glass-card border-black/[0.06]">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-sans">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-[11px] font-bold">Email Address</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{user?.email || 'guest@riseforge.io'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-[11px] font-bold">Sign Out</p>
                        <p className="text-[10px] text-muted-foreground">Sign out of your session on this device.</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer">Sign Out</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-red-500/10 bg-red-500/[0.02]">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-red-500">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground italic">
                    "Deleting your account will purge all XP, streaks, and unlocked certifications. This action is irreversible."
                  </p>
                  <Button variant="destructive" size="sm" className="rounded-xl font-black text-[10px] uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" /> Delete Forge Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Setup Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-3xl border border-black/[0.08] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-2 border-b border-black/[0.05]">
                <h3 className="text-xl font-headline font-black">Edit Profile Setup</h3>
                <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground font-black text-sm p-1 cursor-pointer">✕</button>
              </div>

              <div className="space-y-5">
                {/* Profile Photo selector */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group w-24 h-24 rounded-3xl border-2 border-primary/20 overflow-hidden bg-accent/5 flex items-center justify-center font-black text-3xl shadow-md">
                    {tempPfp ? (
                      <img src={tempPfp} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary">{tempName ? tempName[0].toUpperCase() : '?'}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <label className="cursor-pointer bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/10">
                      <span>Upload Image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange} 
                      />
                    </label>
                    {tempPfp && (
                      <button 
                        onClick={() => setTempPfp('')}
                        className="bg-red-500/10 text-red-500 text-xs font-bold px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Quick Emoji selection */}
                  <div className="space-y-2 text-center w-full pt-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">Or Use Quick Emoji Avatar</p>
                    <div className="flex justify-center gap-2">
                      {['🚀', '💡', '🧠', '🏆', '🔥'].map(emoji => (
                        <button 
                          key={emoji}
                          onClick={() => handleSelectEmojiPfp(emoji)}
                          className="w-10 h-10 rounded-xl border border-black/[0.06] bg-card hover:bg-muted text-lg flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                          type="button"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Full Name</label>
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-black/[0.08] bg-background text-foreground text-sm outline-none focus:border-primary transition-colors font-sans"
                    placeholder="e.g. Alex Smith"
                    required
                  />
                </div>

                {/* Nation Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Nation / Country</label>
                  <select
                    value={tempNation}
                    onChange={(e) => setTempNation(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-black/[0.08] bg-background text-foreground text-sm outline-none focus:border-primary transition-colors font-sans"
                    required
                  >
                    <option value="United States">🇺🇸 United States</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="India">🇮🇳 India</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="France">🇫🇷 France</option>
                    <option value="Japan">🇯🇵 Japan</option>
                    <option value="Brazil">🇧🇷 Brazil</option>
                    <option value="Pakistan">🇵🇰 Pakistan</option>
                    <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                    <option value="Other">Other / International</option>
                  </select>
                </div>

                {tempNation === 'Other' && (
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Type Country Name</label>
                    <input 
                      type="text" 
                      value={tempOtherNation}
                      onChange={(e) => setTempOtherNation(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-black/[0.08] bg-background text-foreground text-sm outline-none focus:border-primary transition-colors font-sans"
                      placeholder="e.g. New Zealand"
                      required
                    />
                  </div>
                )}

                {error && <p className="text-xs text-red-500 font-bold text-center">{error}</p>}
              </div>

              <div className="flex gap-3 pt-4 border-t border-black/[0.05]">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 p-3 rounded-xl border border-black/[0.08] bg-card text-foreground font-bold hover:bg-muted text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 p-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/95 text-sm transition-all shadow-md shadow-primary/10 cursor-pointer"
                >
                  Save Setup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Journey Multi-Channel Modal */}
      <AnimatePresence>
        {isSharing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-3xl border border-black/[0.08] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-2 border-b border-black/[0.05]">
                <h3 className="text-xl font-headline font-black">Share Your Journey</h3>
                <button onClick={() => setIsSharing(false)} className="text-muted-foreground hover:text-foreground font-black text-sm p-1 cursor-pointer">✕</button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-muted-foreground font-medium">
                  Tell other builders about your learning milestones on RiseForge!
                </p>

                {/* Message preview */}
                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04] text-[11px] font-mono select-all break-words leading-relaxed text-muted-foreground/80">
                  {shareMessage}
                </div>

                {/* Quick share channels */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* WhatsApp */}
                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                  >
                    <span>WhatsApp</span>
                  </a>
                  
                  {/* Twitter / X */}
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-black hover:bg-black/90 text-white font-bold text-xs transition-all shadow-md shadow-black/10 cursor-pointer"
                  >
                    <span>X / Twitter</span>
                  </a>

                  {/* Gmail */}
                  <a 
                    href={`mailto:?subject=My%20RiseForge%20Startup%20Journey!&body=${encodeURIComponent(shareMessage)}`}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#EA4335] hover:bg-[#d9372a] text-white font-bold text-xs transition-all shadow-md shadow-red-500/10 cursor-pointer"
                  >
                    <span>Gmail</span>
                  </a>

                  {/* Copy Link */}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(shareMessage)
                      alert("Journey status copied to clipboard! Share it on Instagram or anywhere else 🚀")
                    }}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs transition-all shadow-md shadow-primary/10 cursor-pointer"
                  >
                    <span>Copy Status</span>
                  </button>
                </div>
                
                <p className="text-[10px] text-muted-foreground/70 italic text-center pt-1">
                  Note: Instagram doesn't support web links sharing. Use "Copy Status" to paste it into your bio or stories!
                </p>
              </div>

              <button 
                onClick={() => setIsSharing(false)}
                className="w-full p-3 rounded-xl border border-black/[0.08] bg-card text-foreground font-bold hover:bg-muted text-sm transition-all cursor-pointer text-center"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GameShell>
  )
}
