import React, { useContext, useState, useEffect, createContext } from 'react'
import { collection, doc, getDocs, onSnapshot, query, where } from '@firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'
import { auth, db } from '../firebase'
import Sidebar from '../components/sidebar/Sidebar'
import Restaurants from '../components/restaurants/Restaurants'

export const DrinkNFood = createContext()

const Context = ({ children }) => {

    const [inputText, setInputText] = useState("")
    const [inputList, setInputList] = useState([])
    const [user, setUser] = useState(null)
    const [restaurantList, setRestaurantList] = useState([])
    

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
        <DrinkNFood.Provider value={{ restaurantList, setRestaurantList }}>
            <Sidebar />
            <Restaurants />
        </DrinkNFood.Provider>
    )
}

export const DrinkNFoodProvider = DrinkNFood.Provider

export const CryptoState = () => {
    return useContext(DrinkNFood)
}