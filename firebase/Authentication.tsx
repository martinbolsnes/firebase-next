import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import firebase from '../services/config/firebase-config';

export const auth = getAuth(firebase);

export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const signInAnonymous = () => signInAnonymously(auth);

export const logOut = () => signOut(auth);
