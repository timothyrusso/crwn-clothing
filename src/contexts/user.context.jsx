import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// Actual value we want to acces
export const UserContext = createContext({
  // Default value of this context, different from the starting value
  currentUser: null,
  setCurrentUser: () => null,
});

// Context provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Values that we want to pass to the nested components
  const value = { currentUser, setCurrentUser };

  // Centralized handler for user authentication.
  // When the user state change, the listener method listen the event and update the user state.
  // If the user doesn't exist,create a new one, if the user exist just login.
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={value}>
      {/* All the components that need this value have to be nested here*/}
      {children}
    </UserContext.Provider>
  );
};
