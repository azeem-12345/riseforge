"use client"

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LevelUpModal from '@/components/game/LevelUpModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  Zap,
  BookOpen,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Lightbulb,
  Info
} from 'lucide-react'
import { useGameState } from '@/hooks/use-game-state'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ACADEMY_CONTENT } from '@/lib/academy-data'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { useUser } from '@/firebase'

type Step = 'intro' | 'theory' | 'examples' | 'mistakes' | 'vocabulary' | 'summary'
const STEPS: Step[] = ['intro', 'theory', 'examples', 'mistakes', 'vocabulary', 'summary']

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95
  })
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const lesson = ACADEMY_CONTENT[id]
  const router = useRouter()
  const { completeLesson, state } = useGameState()
  const { user, isLoading } = useUser()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-sm font-sans font-medium text-muted-foreground animate-pulse">Verifying credentials...</p>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground font-body">
        <div className="text-center py-24">
          <h2 className="text-lg font-bold">Strategic Link Broken</h2>
          <p className="text-muted-foreground mt-2">The curriculum module is currently under encryption.</p>
          <Button onClick={() => router.push('/world-map')} className="mt-8 rounded-xl h-11 px-8 font-black uppercase text-[10px] tracking-widest">Return to Academy Path</Button>
        </div>
      </div>
    )
  }

  const currentStep = STEPS[currentStepIndex]
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setDirection(1)
      setCurrentStepIndex(prev => prev + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1)
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const handleFinish = () => {
    completeLesson(id, 50)
    setIsFinished(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-y-auto">
      <LevelUpModal />
      <div className="max-w-5xl mx-auto min-h-screen flex flex-col px-6 md:px-10 pb-24">
        {/* Sticky Top Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-md z-30 flex items-center justify-between py-3 border-b border-border shrink-0 -mx-6 md:-mx-10 px-6 md:px-10 mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push('/world-map')} className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="space-y-0.5">
              <h1 className="text-[12px] font-bold tracking-tight uppercase leading-none">Week {lesson.week}: {lesson.title}</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Level {lesson.level}: Foundation Module</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-5 h-1 rounded-full transition-all duration-500",
                    i <= currentStepIndex ? "bg-primary" : "bg-secondary"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-start relative py-2">
          <AnimatePresence mode="wait" custom={direction}>
            {!isFinished ? (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 }
                }}
                className="w-full flex justify-center"
              >
                {/* Step 1: Introduction & Objective */}
                {currentStep === 'intro' && (
                  <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden border-border relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
                      <CardContent className="p-8 md:p-12 space-y-6">
                        <div className="space-y-4 text-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5 animate-spin" /> Week {lesson.week} Briefing
                          </div>
                          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground/95 leading-tight font-sans">
                            {lesson.title}
                          </h2>
                          <p className="text-sm font-sans font-medium text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
                            Welcome to Week {lesson.week} of the RiseForge Founder Academy curriculum. Let's look at the learning plan for this module.
                          </p>
                        </div>

                        <div className="p-6 bg-secondary/50 rounded-2xl border border-border space-y-4 max-w-2xl mx-auto">
                          <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Weekly Learning Objective
                          </h3>
                          <p className="text-sm font-medium leading-relaxed text-foreground/90 font-sans">
                            {lesson.objective}
                          </p>
                        </div>

                        <div className="flex justify-center pt-6">
                          <Button 
                            onClick={handleNext}
                            className="rounded-xl h-11 px-8 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/25 bg-primary hover:bg-primary/95 text-white"
                          >
                            Begin Module <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 2: Concept Theory */}
                {currentStep === 'theory' && (
                  <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden flex flex-col relative mx-auto border-border">
                      {/* Premium Accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
                      
                      <CardContent className="p-6 md:p-12 space-y-4 flex-1">
                        <div className="space-y-3 border-b border-border pb-8">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80 mb-1 flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Core Concept • Week {lesson.week}
                          </p>
                          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/90 leading-tight">{lesson.title}</h2>
                        </div>

                        <div className="space-y-6 pt-4">
                           <div className="text-sm leading-relaxed text-foreground/80 space-y-6">
                             {lesson.theory.split('\n').map((line, i) => {
                               const trimmed = line.trim();
                               if (trimmed === '') return null;

                               // 1. Image tags
                               if (trimmed.startsWith('!!IMAGE:')) {
                                 const imageId = trimmed.replace('!!IMAGE:', '').replace('!!', '').trim()
                                 const imageData = PlaceHolderImages.find(img => img.id === imageId)
                                 if (imageData) {
                                   return (
                                     <div key={i} className="my-10 flex flex-col items-center">
                                       <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-sm max-w-4xl mx-auto group">
                                         <Image 
                                           src={imageData.imageUrl} 
                                           alt={imageData.description}
                                           fill
                                           className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                                         />
                                       </div>
                                       <p className="text-[10px] font-semibold text-muted-foreground mt-4 tracking-widest uppercase">{imageData.description}</p>
                                     </div>
                                   )
                                 }
                               }

                               // 2. Headings (strip all ## or # symbols)
                               if (trimmed.startsWith('#') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
                                 const cleanText = trimmed.replace(/^#+\s*/, '').replaceAll('**', '').replaceAll('*', '').trim();
                                 return (
                                   <h3 key={i} className="text-lg font-bold text-primary mt-8 mb-4 tracking-wide border-l-2 border-primary pl-4 font-sans">
                                     {cleanText}
                                   </h3>
                                 )
                               }

                               // 3. Blockquotes (strip > markers and markdown bold stars)
                               if (trimmed.startsWith('> ')) {
                                 const cleanLine = trimmed.replace(/^>\s*/, '');
                                 let type = 'info';
                                 let content = cleanLine;
                                 if (cleanLine.startsWith('[!IMPORTANT]')) {
                                   type = 'important';
                                   content = cleanLine.replace('[!IMPORTANT]', '').trim();
                                 } else if (cleanLine.startsWith('[!WARNING]')) {
                                   type = 'warning';
                                   content = cleanLine.replace('[!WARNING]', '').trim();
                                 } else if (cleanLine.startsWith('[!TIP]')) {
                                   type = 'tip';
                                   content = cleanLine.replace('[!TIP]', '').trim();
                                 }
                                 
                                 const cleanContent = content.replaceAll('**', '').replaceAll('*', '').trim();
                                 return (
                                   <div key={i} className={cn(
                                     "p-5 rounded-xl border my-6 flex gap-4 text-[14px] leading-relaxed font-sans",
                                     type === 'important' && "bg-primary/5 border-primary/20 text-foreground",
                                     type === 'warning' && "bg-amber-500/5 border-amber-500/20 text-foreground",
                                     type === 'tip' && "bg-emerald-500/5 border-emerald-500/20 text-foreground",
                                     type === 'info' && "bg-secondary border-border text-foreground"
                                   )}>
                                     <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                     <div className="font-medium">
                                       {cleanContent}
                                     </div>
                                   </div>
                                 )
                               }

                               // 4. Tables (strip bold stars)
                               if (trimmed.startsWith('|')) {
                                 const cells = trimmed.split('|').filter(c => c.trim() !== '').map(c => c.trim());
                                 if (cells.length === 0 || trimmed.includes('---')) return null;
                                 const cleanCol1 = cells[0].replaceAll('**', '').replaceAll('*', '');
                                 const cleanCol2 = cells[1].replaceAll('**', '').replaceAll('*', '');
                                 return (
                                   <div key={i} className="grid grid-cols-[1fr_2fr] gap-6 py-3.5 border-b border-border last:border-0 font-sans">
                                     <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">{cleanCol1}</span>
                                     <span className="text-[14px] text-muted-foreground/95 font-medium leading-relaxed">{cleanCol2}</span>
                                   </div>
                                 )
                               }

                               // 5. Bullet Lists (strip bullet symbol and show styled dots)
                               if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                                 const content = trimmed.replace(/^[-*]\s+/, '');
                                 const cleanContent = content.replaceAll('**', '').replaceAll('*', '').trim();
                                 return (
                                   <div key={i} className="flex items-start gap-2.5 my-2 pl-4 text-foreground/80 font-sans">
                                     <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                                     <span className="text-sm font-normal leading-relaxed">{cleanContent}</span>
                                   </div>
                                 )
                               }

                               // 6. Regular paragraphs (strip bold stars)
                               const cleanParagraph = trimmed.replaceAll('**', '').replaceAll('*', '');
                               return <p key={i} className="font-normal text-[15px] leading-relaxed text-foreground/90 font-sans my-3">{cleanParagraph}</p>
                             })}
                           </div>
                        </div>
                      </CardContent>
                      
                      {/* Footer Decoration */}
                      <div className="p-5 border-t border-border bg-secondary/50 flex justify-between items-center text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                        <span>RiseForge Academy Internal Document</span>
                        <span>CONFIDENTIAL • FOR EDUCATIONAL USE</span>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Step 3: Case Studies */}
                {currentStep === 'examples' && (
                  <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden border-border relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
                      <CardContent className="p-8 md:p-12 space-y-6">
                        <div className="space-y-3 text-center border-b border-border pb-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2 justify-center">
                            <Lightbulb className="w-3.5 h-3.5" /> Real-World Examples
                          </p>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground/95 leading-tight">
                            Startup Case Studies
                          </h2>
                          <p className="text-xs text-muted-foreground/80">
                            See how famous startup founders applied these principles in their early days:
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          {lesson.examples.map((ex, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 hover:border-emerald-500/30 transition-all shadow-sm">
                              <div className="p-2.5 h-10 w-10 shrink-0 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5" />
                              </div>
                              <div className="space-y-1 pt-0.5">
                                <h4 className="text-sm font-bold text-foreground">Case Study #{i + 1}</h4>
                                <p className="text-sm font-medium leading-relaxed text-muted-foreground/90 font-sans italic">
                                  "{ex}"
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 4: Pitfalls & Mistakes */}
                {currentStep === 'mistakes' && (
                  <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden border-border relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-amber-500 opacity-80" />
                      <CardContent className="p-8 md:p-12 space-y-6">
                        <div className="space-y-3 text-center border-b border-border pb-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500 flex items-center gap-2 justify-center">
                            <Info className="w-3.5 h-3.5" /> Common Pitfalls
                          </p>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground/95 leading-tight">
                            Founder Mistakes to Avoid
                          </h2>
                          <p className="text-xs text-muted-foreground/80">
                            Learn what goes wrong so you can make smart startup choices:
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          {lesson.mistakes.map((mistake, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/30 transition-all shadow-sm">
                              <div className="p-2.5 h-10 w-10 shrink-0 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                              </div>
                              <div className="space-y-1 pt-0.5">
                                <h4 className="text-sm font-bold text-foreground">Mistake #{i + 1}</h4>
                                <p className="text-sm font-sans font-medium leading-relaxed text-muted-foreground/90">
                                  {mistake}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 5: Key Vocabulary */}
                {currentStep === 'vocabulary' && (
                  <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden border-border relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-80" />
                      <CardContent className="p-8 md:p-12 space-y-6">
                        <div className="space-y-3 text-center border-b border-border pb-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2 justify-center">
                            <BookOpen className="w-3.5 h-3.5" /> Founder Dictionary
                          </p>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground/95 leading-tight">
                            Core Terminology
                          </h2>
                          <p className="text-xs text-muted-foreground/80">
                            Make sure you understand these basic startup words:
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-1 pt-2">
                          {lesson.vocabulary.map((v, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-purple-500/[0.03] border border-purple-500/10 hover:border-purple-500/30 transition-all shadow-sm space-y-2">
                              <span className="font-bold text-purple-600 text-sm block tracking-wide">{v.word}</span>
                              <p className="text-sm font-sans font-medium text-muted-foreground/90 leading-relaxed">
                                {v.definition}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 6: Summary & Complete */}
                {currentStep === 'summary' && (
                  <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden border-border relative text-center">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
                      <CardContent className="p-8 md:p-12 space-y-6">
                        <div className="relative inline-block mb-2">
                          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                          <Trophy className="w-20 h-20 text-primary relative z-10 mx-auto drop-shadow-[0_0_20px_rgba(var(--primary),0.4)]" />
                        </div>
                        <div className="space-y-2 max-w-xl mx-auto">
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">Module Mastery</h2>
                          <p className="text-sm text-muted-foreground leading-relaxed font-sans font-medium">{lesson.summary}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
                          <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-1 text-center">
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">XP Awarded</p>
                            <p className="text-xl font-bold">+{lesson.xpReward}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-1 text-center">
                            <p className="text-[10px] font-black uppercase text-accent tracking-widest">Growth Status</p>
                            <p className="text-xl font-bold">STABLE</p>
                          </div>
                        </div>
                        <div className="pt-6">
                          <Button 
                            onClick={handleFinish}
                            className="rounded-xl h-11 px-8 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/25 bg-primary hover:bg-primary/95 text-white cursor-pointer"
                          >
                            Finalize Module
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </motion.div>
            ) : (
               <div className="h-80 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h2 className="text-xl font-black uppercase tracking-tighter">Module Complete</h2>
                  <p className="text-[12px] text-muted-foreground max-w-xs leading-relaxed font-sans font-medium">You have successfully mastered this strategic unit and earned your rewards.</p>
                  <Button onClick={() => router.push('/world-map')} className="rounded-xl h-10 px-8 font-black bg-primary text-[9px] uppercase tracking-widest cursor-pointer">Return to Path</Button>
               </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Controls */}
        {!isFinished && (
          <div className="fixed bottom-0 left-0 right-0 p-3 md:p-4 border-t border-white/5 bg-background/80 backdrop-blur-md z-40">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStepIndex === 0}
                className="h-9 px-4 rounded-lg border-white/10 text-[8px] font-black uppercase tracking-widest disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1.5" /> Back
              </Button>

              <div className="flex-1 text-center hidden sm:block">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest font-sans">Page {currentStepIndex + 1} of {STEPS.length}</p>
              </div>

              <Button 
                onClick={handleNext} 
                className="h-9 px-6 rounded-lg bg-primary text-white font-black uppercase text-[8px] tracking-widest shadow-xl shadow-primary/20 cursor-pointer"
              >
                {currentStepIndex === STEPS.length - 1 ? "FINALIZE MODULE" : "NEXT PAGE"} <ChevronRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
