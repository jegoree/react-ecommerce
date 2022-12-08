import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// The stored value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Action types avaliable for dispatch
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// The reducer function that will return a new object with state
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandeled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// The actual componenet. A component that needs access to
// data should be wrapped with this provider.
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  // Check and update auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
