import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth';

// Firebase configuration using environment variables with fallbacks
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDtFa1KdF76kh-LnC3Q3JJ3BFuzBozYmfw",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "urmi-b9868.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "urmi-b9868",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "urmi-b9868.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1005549801381",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1005549801381:web:c452e3b14fe90ababc624c",
};

// Initialize Firebase with error handling
let app;
let auth;
let googleProvider;
let githubProvider;
let twitterProvider;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize auth
  auth = getAuth(app);
  
  // Initialize providers
  googleProvider = new GoogleAuthProvider();
  githubProvider = new GithubAuthProvider();
  twitterProvider = new TwitterAuthProvider();
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  
  // Create fallback empty objects to prevent app crashes
  if (!app) app = {} as any;
  if (!auth) auth = {} as any;
  if (!googleProvider) googleProvider = {} as any;
  if (!githubProvider) githubProvider = {} as any;
  if (!twitterProvider) twitterProvider = {} as any;
}

export { auth, googleProvider, githubProvider, twitterProvider }; 