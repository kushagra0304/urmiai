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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { auth, googleProvider, githubProvider, twitterProvider }; 