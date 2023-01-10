import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import React, { useEffect, useContext, useState, useRef, useCallback } from 'react'
import { db } from '../../firebase'
import RestaurantCard from './restaurantCard/RestaurantCard'
import './restaurants.css'
import { AppContext } from '../../App'

const Restaurants = () => {

  let { restaurantList } = useContext(AppContext)

  const [increase, setIncrease] = useState(10)

  const showMoreResults = () => {
    setIncrease(increase + 10)
  }

  return (
    <div className='restaurant-page'>
      <div className='restaurant-list'>
        {restaurantList.slice(0, increase).map((restaurant, index) => {
          return (
            <RestaurantCard key={index} restaurant={restaurant} />
          )
        })}
      </div>
      <div className='show-more-results'>
        {
          restaurantList.length > increase ?
            <button id='show-more-btn' onClick={() => showMoreResults()}>
              Mostra altri {restaurantList.length - increase} risultati...
            </button> :
            null
        }
      </div>
    </div>
  )
}

export default Restaurants