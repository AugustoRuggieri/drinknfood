import React, { useContext, createContext } from 'react'
import { collection, doc, getDocs, onSnapshot, query, where } from '@firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'
import { auth, db } from '../firebase'

export const DrinkNFood = createContext()

    /* const [inputText, setInputText] = useState("")
    const [inputList, setInputList] = useState([])*/

    /* useEffect(() => {
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
    }, [user])*/

export const DrinkNFoodProvider = DrinkNFood.Provider

export const CryptoState = () => {
    return useContext(DrinkNFood)
}