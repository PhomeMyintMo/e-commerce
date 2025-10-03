import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getIdTokenResult,
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type AppUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  // optional role fetched from Firestore or token claims
  role?: string;
} | null;

const AuthContext = createContext<{
  user: AppUser;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Optionally fetch a role from Firestore 'users' collection (simple approach)
        try {
          const userDoc = await getDoc(doc(db, "users", fbUser.uid));
          const role = userDoc.exists() ? (userDoc.data() as any).role : undefined;

          setUser({
            uid: fbUser.uid,
            displayName: fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
            role,
          });
        } catch (err) {
          console.error("failed fetching user doc", err);
          setUser({
            uid: fbUser.uid,
            displayName: fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    console.log("button clicked!");
    try{
const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    // Optional: create/update a user doc with default role
    await setDoc(doc(db, "users", fbUser.uid), {
      email: fbUser.email,
      displayName: fbUser.displayName,
      role: "user", // default — change as needed
    }, { merge: true });
        console.log("user sign in:", result.user );

    }catch(error){
      console.log("error:", error);
    }
    
    // onAuthStateChanged will update `user`
  };

  const signOutUser = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
