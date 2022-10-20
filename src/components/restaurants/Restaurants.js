import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useContext } from 'react'
import { DrinkNFood } from '../../context/Context'
import { db } from '../../firebase'
import RestaurantCard from './restaurantCard/RestaurantCard'
import './restaurants.css'

const Restaurants = () => {

  let { restaurantList, setRestaurantList, selectedTagsState, selectedFiltersState } = useContext(DrinkNFood)

  const fetchRestaurants = async () => {

    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef, where("name", "!=", ""))
    const querySnapshot = await getDocs(q)

    let newRestaurantList = []

    querySnapshot.forEach((doc) => {
      newRestaurantList = [...newRestaurantList, doc.data().name]
    })
    setRestaurantList(newRestaurantList)
  }

  const fetchRestaurantsByTags = async () => {

    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef, where("tags", "array-contains-any", selectedTagsState))
    const querySnapshot = await getDocs(q)

    let newRestaurantList = []

    querySnapshot.forEach((doc) => {

      if (selectedFiltersState.length > 0) {
        if (doc.data().filters.some(elem => selectedFiltersState.includes(elem))) {
          newRestaurantList = [...newRestaurantList, doc.data().name]
        }
      } else {
        newRestaurantList = [...newRestaurantList, doc.data().name]
      }
      // aggiungere funzione qui
      /* if (checkRestaurant(doc.data().tags, selectedTags_or, selectedTags_and)) {
        newRestaurantList = [...newRestaurantList, doc.data().name]
      }  */

      /* newRestaurantList = [...newRestaurantList, doc.data().name] */
    })
    setRestaurantList(newRestaurantList)
    if (newRestaurantList.length === 0) {
      alert('Nessun risultato')
    }
  }

  const fetchRestaurantsByFilters = async () => {

    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef, where("filters", "array-contains-any", selectedFiltersState))
    const querySnapshot = await getDocs(q)

    let newRestaurantList = []

    querySnapshot.forEach((doc) => {

      if (selectedTagsState.length > 0) {
        if (doc.data().tags.some(elem => selectedTagsState.includes(elem))) {
          newRestaurantList = [...newRestaurantList, doc.data().name]
        }
      } else {
        newRestaurantList = [...newRestaurantList, doc.data().name]
      }
    })
    setRestaurantList(newRestaurantList)
    if (newRestaurantList.length === 0) {
      alert('Nessun risultato')
    }
  }

  useEffect(() => {
    if (selectedTagsState.length > 0) {
      fetchRestaurantsByTags()
    } else if (selectedFiltersState.length > 0) {
      fetchRestaurantsByFilters()
    } else {
      fetchRestaurants()
    }
  }, [selectedTagsState, selectedFiltersState])

  return (
    <div className='restaurant-page'>
      <div className='restaurant-list'>
        {restaurantList.map((restaurant, index) => {
          return (
            <RestaurantCard key={index} restaurant={restaurant} />
          )
        })}
      </div>
    </div>
  )
}

export default Restaurants