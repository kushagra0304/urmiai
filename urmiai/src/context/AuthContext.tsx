import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  authError: string | null;
  signUp: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<any>;
  githubSignIn: () => Promise<any>;
  twitterSignIn: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Set a timeout to ensure loading state doesn't get stuck
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.log('Auth initialization timeout - forcing loading to false');
          setLoading(false);
        }
      }, 3000); // 3 second timeout

      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          setCurrentUser(user);
          setLoading(false);
        },
        (error) => {
          console.error('Auth state change error:', error);
          setAuthError(error.message);
          setLoading(false);
        }
      );

      // Clean up the timeout and auth listener
      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up auth listener:", error);
      setLoading(false);
      return () => {}; // Empty cleanup function
    }
  }, []);

  // Email/Password Authentication
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Social Authentication
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const twitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const value = {
    currentUser,
    loading,
    authError,
    signUp,
    login,
    logout,
    resetPassword,
    googleSignIn,
    githubSignIn,
    twitterSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 