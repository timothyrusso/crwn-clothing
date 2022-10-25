import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

// Generate the Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Keep track of the authentication state of the user
export const auth = getAuth();

// Set up the login methods
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Call the Firestore db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  // Check if the userAuth exist
  if (!userAuth) return;

  // Check if there is a document reference in the db
  const userDocRef = doc(db, 'users', userAuth.uid);

  // Get the data of the user from the db
  const userSnapshot = await getDoc(userDocRef);

  // What if the user do not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Create the user in the db
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // What if the user already exist
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}