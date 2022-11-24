import { createContext, useState } from 'react';

// The stored value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// The actual componenet. A component that needs access to
// data should be wrapped with this provider.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
