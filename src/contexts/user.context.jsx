import { createContext, useEffect, useReducer } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

// Actual value we want to acces
export const UserContext = createContext({
  // Default value of this context, different from the starting value
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  console.log('dispached');
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// Context provider
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispach] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispach(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

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
