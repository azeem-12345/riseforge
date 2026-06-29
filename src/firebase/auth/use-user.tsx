'use client';
import { useEffect, useState }from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

export const useUser = () => {
  const auth = useAuth();
  const [user, setUser] = useState<any | null>(auth ? auth.currentUser : null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLocalUser = () => {
      try {
        if (typeof window !== 'undefined') {
          const local = localStorage.getItem('riseforge_mock_user');
          if (local) {
            setUser(JSON.parse(local));
            setIsLoading(false);
            return true;
          }
        }
      } catch (e) {}
      return false;
    };

    if (checkLocalUser()) {
      // Local user found
    }

    const handleAuthChange = () => {
      const found = checkLocalUser();
      if (!found && !auth?.currentUser) {
        setUser(null);
      }
    };
    window.addEventListener('riseforge-auth-change', handleAuthChange);

    if (!auth) {
      setIsLoading(false);
      return () => window.removeEventListener('riseforge-auth-change', handleAuthChange);
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          checkLocalUser();
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('onAuthStateChanged error', error);
        checkLocalUser();
        setIsLoading(false);
      }
    );
    return () => {
      unsubscribe();
      window.removeEventListener('riseforge-auth-change', handleAuthChange);
    };
  }, [auth]);

  return { user, isLoading };
};
