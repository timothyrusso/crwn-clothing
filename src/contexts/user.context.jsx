import { createContext, useState } from 'react';


// Actual value we want to acces
export const UserContext = createContext({
    // Default value of this context, different from the starting value
    currentUser: null,
    setCurrentUser: () => null,
})

// Context provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // Values that we want to pass to the nested components
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>
        // All the components that need this value have to be nested here
        {children}
    </UserContext.Provider>
}