import { doc, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { CryptoState } from '../../context/Context'
import { db } from '../../firebase'
import './restaurants.css'

const Restaurants = () => {

    /* const { tags } = CryptoState() */

    const [restaurantList, setRestaurantList] = useState([])

    /* const fetchRestaurants = () => {
        const collectionRef = doc(db, 'restaurants')

        const q = query(collectionRef, where("tags", "array-contains", tag))
    }

    useEffect(() => {
        fetchRestaurants()
    }, []) */
    

  return (
    <div>
        Restaurants
    </div>
  )
}

export default Restaurants