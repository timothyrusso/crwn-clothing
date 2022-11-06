import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChangedListener,
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

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
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
