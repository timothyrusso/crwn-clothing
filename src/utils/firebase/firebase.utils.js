import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA9nS-PG0QHq3WeZSlp_IpVxsssZJ6Yaws',
  authDomain: 'crwn-clothing-db-987d8.firebaseapp.com',
  projectId: 'crwn-clothing-db-987d8',
  storageBucket: 'crwn-clothing-db-987d8.appspot.com',
  messagingSenderId: '136897132025',
  appId: '1:136897132025:web:353038128344d3609d3928',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
