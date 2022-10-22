import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useContext } from 'react'
import { DrinkNFood } from '../../context/Context'
import { db } from '../../firebase'
import RestaurantCard from './restaurantCard/RestaurantCard'
import './restaurants.css'

const Restaurants = () => {

  let { restaurantList, setRestaurantList, selectedTagsState, selectedFiltersState } = useContext(DrinkNFood)

  const fetchRestaurants = async () => {

    // query
    var queryWhere = where("name", "!=", "")

    if (selectedTagsState.length !== 0) {
      queryWhere = where("tags", "array-contains-any", selectedTagsState)
    }

    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef, queryWhere)
    const querySnapshot = await getDocs(q)

    let newRestaurantList = []

    // filter
    querySnapshot.forEach((doc) => {
      if (selectedFiltersState.length > 0) {
        if (selectedFiltersState.every(el => doc.data().filters.includes(el))) {
          newRestaurantList = [...newRestaurantList, doc.data().name]
        }
      } else {
        newRestaurantList = [...newRestaurantList, doc.data().name]
      }
    })
    setRestaurantList(newRestaurantList)
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    fetchRestaurants()
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