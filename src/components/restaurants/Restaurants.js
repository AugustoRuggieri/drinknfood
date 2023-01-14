import React, { useContext, useState, useRef, useCallback } from 'react'
import RestaurantCard from './restaurantCard/RestaurantCard'
import './restaurants.css'
import { AppContext } from '../../App'
import Searchbar from '../searchbar/Searchbar'

const Restaurants = () => {

  let { restaurantList, searchedRestaurants, setSearchedRestaurants } = useContext(AppContext)

  const [increase, setIncrease] = useState(10)

  const showMoreResults = () => {
    setIncrease(increase + 10)
  }

  const showAllRestaurants = () => {
    setSearchedRestaurants([])
  }

  return (
    <div className='restaurant-page'>
      <Searchbar />
      <div className='restaurant-list'>
        {searchedRestaurants.length > 0
          ?
          searchedRestaurants.map((restaurant, index) => {
            return (
              <RestaurantCard key={index} restaurant={restaurant} />
            )
          })
          :
          restaurantList.slice(0, increase).map((restaurant, index) => {
            return (
              <RestaurantCard key={index} restaurant={restaurant} />
            )
          })}
      </div>
      <div className='show-more-results'>
        {
          searchedRestaurants.length > 0
            ?
            <button id='show-all-btn' onClick={() => showAllRestaurants()}>
              Mostra tutti i ristoranti
            </button>
            :
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