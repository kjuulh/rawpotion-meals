import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";
import { useAppDispatch } from "../lib/redux/hooks";
import { userIsAlreadySignedIn } from "../lib/features/user/userSlice";

export const UserContext = createContext<{}>({});

export default function UserContextComp({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          dispatch(
            userIsAlreadySignedIn({ userId: user.uid, email: user.email })
          );
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
