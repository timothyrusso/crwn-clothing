import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Call the Firestore db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // What if the user already exist
  return userDocRef;
};
