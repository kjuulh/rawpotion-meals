import { useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";
import { useAppDispatch } from "../redux/hooks";
import { userIsAlreadySignedIn } from "@features/user/userSlice";
import LogRocket from "logrocket";

export const UserContext = createContext<any>({});

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
          LogRocket.identify(user.uid, {
            email: user.email,
          });
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
