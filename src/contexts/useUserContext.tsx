import { User } from "firebase/auth";
import { useEffect, useState } from "react";

import constate from "constate";
import { auth } from "../firebase";

function useUser() {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(auth.currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return {
    user,
    setUser,
  };
}

export const [UserProvider, useUserContext] = constate(useUser);
