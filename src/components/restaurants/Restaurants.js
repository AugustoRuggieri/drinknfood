import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import React, { useState, useEffect, useContext } from 'react'
import { DrinkNFood } from '../../context/Context'
import { CryptoState } from '../../context/Context'
import { db } from '../../firebase'
import RestaurantCard from './restaurantCard/RestaurantCard'
import './restaurants.css'

const Restaurants = () => {
  let { restaurantList, setRestaurantList } = useContext(DrinkNFood)

  const fetchRestaurants = async () => {

    const collectionRef = collection(db, 'restaurants')

    const q = query(collectionRef, where("name", "!=", ""))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setRestaurantList(restaurantList => [...restaurantList, doc.data().name])
    })
    console.log("Restaurants : " + restaurantList)
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  return (
    <div className='restaurant-page'>
      <h1>Restaurants</h1>
      <div className='restaurant-list'>
        {
          restaurantList.map((restaurant, index) => {
            return (
              <RestaurantCard key={index} restaurant={restaurant} />
            )
          })
        }
      </div>

    </div>
  )
}

export default Restaurants