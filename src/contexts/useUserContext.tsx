import { User } from "firebase/auth";
import { useEffect, useState } from "react";

import constate from "constate";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { auth, db } from "../firebase";

function useUser() {
  const [user, setUser] = useState<User | null | undefined>();

  const [databaseUserUID, setDatabaseUserUID] = useState<string>('');
  const [databaseUser, setDatabaseUser] = useState<DocumentData | null>(null);
  const [collectionUID, setCollectionUID] = useState<string>('');
  const [collectionUser, setCollectionUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    async function getDatabaseUser() {
      if (user) {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("user_id", "==", user.uid));        
        const querySnapshot = await getDocs(userQuery);
        
        let farmer = false;
        querySnapshot.forEach((doc) => {
          setDatabaseUser(doc.data());
          setDatabaseUserUID(doc.id);
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
          setCollectionUser(doc.data());
          setCollectionUID(doc.id)});
        }
    };
    if (databaseUser == null) {
      getDatabaseUser();
    }
  }, [collectionUID, databaseUser, user]);

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
    databaseUserUID,
    databaseUser,
    collectionUID,
    collectionUser
  };
}

export const [UserProvider, useUserContext] = constate(useUser);
