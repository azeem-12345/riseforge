"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  ChevronRight, 
  Target, 
  Brain, 
  Zap,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Flame,
  LineChart,
  User
} from 'lucide-react'
import { useGameState, UserProfile } from '@/hooks/use-game-state'
import { useAuth } from '@/firebase'
import { Progress } from '@/components/ui/progress'

const onboardingQuestions = [
  {
    id: 'goal',
    title: 'Identify your primary trajectory',
    options: [
      { text: 'Launch First Venture', val: 'Start' },
      { text: 'Scale Operations', val: 'Scale' },
      { text: 'Hypothesis Validation', val: 'Explore' },
    ],
    icon: Target
  },
  {
    id: 'experience',
    title: 'Assess tactical experience',
    options: [
      { text: 'Explorer (Beginner)', val: 'Beginner' },
      { text: 'Builder (Intermediate)', val: 'Intermediate' },
      { text: 'Architect (Advanced)', val: 'Advanced' },
    ],
    icon: Brain
  },
  {
    id: 'dna',
    title: 'Define your dominant archetype',
    options: [
      { text: 'Risk Specialist', val: 'Risk' },
      { text: 'Strategic Analyst', val: 'Strategy' },
      { text: 'Growth Engineer', val: 'Growth' },
    ],
    icon: Zap
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0) // Step 0: Name & Nation. Steps 1,2,3: Questions.
  const [fullName, setFullName] = useState('')
  const [country, setCountry] = useState('')
  const [otherCountry, setOtherCountry] = useState('')
  const [error, setError] = useState('')
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    dna: { 
      type: 'Unassigned',
      riskTolerance: 50,
      creativity: 50,
      financialAcumen: 50,
      leadership: 50,
      decisionSpeed: 50
    }
  })
  const [isCalculated, setIsCalculated] = useState(false)
  const router = useRouter()
  const auth = useAuth()
  const { updateState } = useGameState()

  // Pre-populate name if logged in via Google/Facebook
  useEffect(() => {
    if (auth?.currentUser?.displayName && !fullName) {
      setFullName(auth.currentUser.displayName)
    }
  }, [auth?.currentUser, fullName])

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setError('Please enter your full name')
      return
    }
    const finalNation = country === 'Other' ? otherCountry : country
    if (!finalNation || !finalNation.trim()) {
      setError('Please select or type your nation')
      return
    }
    setError('')
    setCurrentStep(1)
  }

  const handleOptionClick = (val: string) => {
    const questionIndex = currentStep - 1
    const key = onboardingQuestions[questionIndex].id
    setProfile(prev => ({ ...prev, [key]: val }))

    if (currentStep < onboardingQuestions.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      finalizeOnboarding()
    }
  }

  const finalizeOnboarding = () => {
    setIsCalculated(true)
    
    // Simulate DNA calculation logic
    const finalProfile = {
      ...profile,
      dna: {
        type: profile.dna === 'Risk' ? 'The Audacious' : 'The Analyst',
        riskTolerance: profile.dna === 'Risk' ? 85 : 40,
        creativity: 70,
        financialAcumen: 60,
        leadership: 65,
        decisionSpeed: 75
      }
    } as UserProfile

    const finalNation = country === 'Other' ? otherCountry : country

    setTimeout(() => {
      updateState(prev => ({
        ...prev,
        name: fullName.trim(),
        nation: finalNation.trim(),
        onboarded: true,
        profile: finalProfile,
        founderStage: 'Dreamer',
        reputation: 100
      }))
      router.push('/home')
    }, 3000)
  }

  const totalSteps = onboardingQuestions.length + 1 // Details (0) + 3 Questions

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="max-w-2xl w-full space-y-12 relative z-10">
        {!isCalculated ? (
          <>
            {/* Step Progress Indicators */}
            <div className="flex justify-between items-center px-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 mx-1 flex-1 rounded-full transition-all duration-700 ${idx <= currentStep ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-black/5'}`} 
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 0 ? (
                <motion.div
                  key="step-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-2xl">
                      <User className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-headline font-black tracking-tight leading-none">
                      Tell us about yourself
                    </h1>
                    <p className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground">
                      Let's set up your profile for the global startup rankings
                    </p>
                  </div>

                  <div className="glass-card p-8 rounded-3xl border border-black/[0.06] bg-white/80 space-y-6">
                    <form onSubmit={handleDetailsSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="What should other founders call you?"
                          className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-base"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Nation / Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-base"
                          required
                        >
                          <option value="" disabled>Where are you building from?</option>
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

                      {country === 'Other' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Type your Nation</label>
                          <input
                            type="text"
                            value={otherCountry}
                            onChange={(e) => setOtherCountry(e.target.value)}
                            placeholder="e.g. New Zealand"
                            className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-base"
                            required
                          />
                        </motion.div>
                      )}

                      {error && (
                        <p className="text-sm text-destructive font-semibold text-center">{error}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full p-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span>Continue Setup</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-2xl">
                      {(() => {
                        const Icon = onboardingQuestions[currentStep - 1].icon
                        return <Icon className="w-10 h-10" />
                      })()}
                    </div>
                    <h1 className="text-4xl font-headline font-black tracking-tight leading-none">
                      {onboardingQuestions[currentStep - 1].title}
                    </h1>
                    <p className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground">
                      Operating System Calibration Phase {currentStep} of {onboardingQuestions.length}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {onboardingQuestions[currentStep - 1].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option.val)}
                        className="p-6 text-left rounded-2xl border border-black/[0.06] bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center justify-between shadow-xl cursor-pointer"
                      >
                        <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {option.text}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center space-y-12 py-10"
          >
            <div className="relative w-40 h-40 mx-auto">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <ShieldCheck className="w-16 h-16 text-primary animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-headline font-black tracking-tighter">Initializing Founder OS</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sequencing Cognitive DNA & Market Readiness...</p>
            </div>
            <div className="max-w-xs mx-auto space-y-3">
              <Progress value={85} className="h-1 bg-black/5" />
              <div className="flex justify-between text-[8px] font-black text-primary uppercase tracking-widest">
                 <span>Calibrating</span>
                 <span>85%</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
