import { User } from "firebase/auth";
import { useEffect, useState } from "react";

import constate from "constate";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

function useUser() {
  const [user, setUser] = useState<User | null | undefined>();

  const [isFarmer, setIsFarmer] = useState<boolean | null>(null);
  const [collectionUID, setCollectionUID] = useState<string>('');

  useEffect(() => {
    async function getIsFarmer() {
      if (user) {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("user_id", "==", user.uid));        
        const querySnapshot = await getDocs(userQuery);
        
        let farmer = false;
        querySnapshot.forEach((doc) => {
          setIsFarmer(doc.data().isFarmer);
          farmer = doc.data().isFarmer;
        });
        let idRef;
        if (farmer) {
          idRef = collection(db, "sellers");
        } else {
          idRef = collection(db, "buyers");
        }
        const idQuery = query(idRef, where("email_address", "==", user.email));
        const idQuerySnapshot = await getDocs(idQuery);
        idQuerySnapshot.forEach(doc => {
          setCollectionUID(doc.id)});
        }
    };
    if (isFarmer == null) {
      getIsFarmer();
    }
  }, [collectionUID, isFarmer, user]);

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
    isFarmer,
    collectionUID,
  };
}

export const [UserProvider, useUserContext] = constate(useUser);
