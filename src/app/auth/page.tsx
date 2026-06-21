'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { initializeFirebase, useUser } from '@/firebase';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { auth } = initializeFirebase();
  const { user, isLoading } = useUser();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/home');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/home');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/onboarding');
      }
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/home');
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/home');
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Facebook.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-sm font-sans font-medium text-muted-foreground animate-pulse">Entering the Forge...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent rounded-full blur-[150px]" />
        </div>
        
        <Link href="/" className="flex items-center gap-2 relative z-10 text-white">
          <Rocket className="w-8 h-8" />
          <span className="font-headline text-3xl font-bold tracking-tighter">RiseForge</span>
        </Link>

        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-extrabold text-white leading-tight">
            The Journey to <br />
            Greatness Starts <br />
            <span className="text-accent underline">Right Here.</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Join thousands of explorers building the future one skill at a time.
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2026 RiseForge Inc.
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-bold">
              {isLogin ? 'Welcome Back, Explorer' : 'Begin Your Journey'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'Enter your credentials to enter the Forge.' : 'Create your account to start leveling up.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="explorer@riseforge.com" 
                    className="pl-10 h-11" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-11" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 mt-2" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')} 
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          {/* Separator line */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-sans">Or continue with</span>
            </div>
          </div>

          {/* Social Sign-In Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGoogleSignIn} 
              disabled={loading || isLoading}
              className="rounded-xl h-11 border-border flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.4 7.56l3.87 3c.92-2.76 3.49-4.52 6.73-4.52z"/>
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.87 3c2.26-2.09 3.55-5.16 3.55-8.82z"/>
                <path fill="#FBBC05" d="M5.27 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.4 7.56C.51 9.34 0 11.35 0 13.5s.51 4.16 1.4 5.94l3.87-3.16z"/>
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.87-3c-1.08.72-2.48 1.16-4.09 1.16-3.24 0-5.81-1.76-6.73-4.52l-3.87 3C3.37 20.35 7.35 23 12 23z"/>
              </svg>
              <span className="font-sans">Google</span>
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleFacebookSignIn} 
              disabled={loading || isLoading}
              className="rounded-xl h-11 border-border flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-sans">Facebook</span>
            </Button>
          </div>

          <div className="text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
              }}
              className="text-sm font-medium text-primary hover:underline transition-all"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
