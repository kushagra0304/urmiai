import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth';

// Firebase configuration - Replace with your own Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDtFa1KdF76kh-LnC3Q3JJ3BFuzBozYmfw",
    authDomain: "urmi-b9868.firebaseapp.com",
    projectId: "urmi-b9868",
    storageBucket: "urmi-b9868.firebasestorage.app",
    messagingSenderId: "1005549801381",
    appId: "1:1005549801381:web:c452e3b14fe90ababc624c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { auth, googleProvider, githubProvider, twitterProvider }; 