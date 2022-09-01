import React, { useContext, createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db, auth } from "../firebase-config"
import { doc, setDoc, getDoc } from "firebase/firestore";  

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)  

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).then(async (result) => {
            const userName = result.user.displayName;
            const firstName = userName.split(' ').slice(0, -1).join(' ');
            const lastName = userName.split(' ').slice(-1).join(' ');
            
            const docRef = doc(db, "users", auth.currentUser.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) { //Already signed in once
                return;
            } else {
                await setDoc(doc(db, "users", auth.currentUser.uid), { // Store google data into db
                    first_name: firstName,
                    last_name: lastName,
                    user_type: "User"
                }); 
                return;
            }

            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }

    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // console.log("User", currentUser)
        });
        return () => {
            unsubscribe()
        }
    }, [])

    const value = {
        user,
        googleSignIn, 
        logIn, 
        signUp,
        resetPassword,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}