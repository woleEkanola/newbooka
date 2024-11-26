import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase only if config is available
let app;
let auth;

try {
  if (
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  ) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn('Firebase configuration is missing or incomplete');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email, password) => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    await signInWithEmailAndPassword(auth, email, password);
  },
  signUp: async (email, password) => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    await createUserWithEmailAndPassword(auth, email, password);
  },
  signOut: async () => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    await firebaseSignOut(auth);
    set({ user: null });
  },
}));

// Subscribe to auth state changes
if (auth) {
  onAuthStateChanged(auth, (user) => {
    useAuth.setState({ user, loading: false });
  });
}