import { createContext, useContext, useEffect, useState } from "react";
import { updateDoc, doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import { UserAuth } from "./AuthContext"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";




const SavedItemsContext = createContext()


function SavedItemsContextProvider({ children }) {

    const { user } = UserAuth()
    const [movies, setMovies] = useState([])

    const movieRef = doc(db, 'users', `${user?.email}`)


    const deleteSaved = async (passedId) => {
        try {
            // console.log('delete')
            const result = movies.filter(item => item.id !== passedId)
            await updateDoc(movieRef, {
                savedMovies: result
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedMovies);
        });
    }, [user?.email])
    console.log(movies)
    return (
        <SavedItemsContext.Provider value={ { movies, deleteSaved } }>
            { children }
        </SavedItemsContext.Provider >
    )
}

function UserSaved() {
    return useContext(SavedItemsContext)
}

export { SavedItemsContextProvider, UserSaved }