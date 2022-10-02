import React, { useContext, useState, useEffect, createContext } from 'react'
import { collection, doc, getDocs, onSnapshot, query, where } from '@firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'
import { auth, db } from '../firebase'

const DrinkNFood = createContext()

const Context = ({ children }) => {

    const [inputText, setInputText] = useState("")
    const [inputList, setInputList] = useState([])
    const [tags, setTags] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (user) {
            const collectionRef = doc(db, "entries", user.uid)

            var unsubscribe = onSnapshot(collectionRef, (entry) => {
                if (entry.exists()) {
                    console.log("entry : " + entry.data().entries)
                    setInputList(entry.data().entries)
                } else {
                    console.log("Non è presente nessuna etichetta")
                }
            })
            return () => {
                unsubscribe()
            }
        }
    }, [user])

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])

    return (
        <DrinkNFood.Provider value={{ inputText, inputList, tags, setTags, user }}>
            {children}
        </DrinkNFood.Provider>
    )
}

export default Context

export const CryptoState = () => {
    return useContext(DrinkNFood)
}