import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore';



const AuthContext = createContext()

function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState('')
    // create  user with email and password
    function signUp(email, password) {
        try {
            createUserWithEmailAndPassword(auth, email, password)
            setDoc(doc(db, 'users', email), {
                savedMovies: [],
                // savedShows: []
            })

        } catch (error) {
            console.log(error.message)
        }
    }


    // login  user
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout  user
    function logOut() {
        return signOut(auth)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setUserName(() => {
                return currentUser?.email.split('@')[0]
            })
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={ { signUp, logIn, logOut, user, userName } }>
            { children }
        </AuthContext.Provider>
    )
}

function UserAuth() {
    return useContext(AuthContext)
}

export { AuthContextProvider, UserAuth }