import React, { useContext, useEffect, useState } from 'react'
import RestaurantCard from './restaurantCard/RestaurantCard'
import './restaurants.css'
import { AppContext } from '../../App'
import Searchbar from '../searchbar/Searchbar'
import UserMap from '../userMap/UserMap'

const Restaurants = () => {

  let { restaurantList, searchedRestaurants, setSearchedRestaurants, userPosition } = useContext(AppContext)

  const [increase, setIncrease] = useState(10)

  const showMoreResults = () => {
    setIncrease(increase + 10)
  }

  const showAllRestaurants = () => {
    setSearchedRestaurants([])
  }

  /* const getRestaurantDetails = async (name, address) => {
    const apiKey = 'AIzaSyCF0qsU8VoJjp30mFr5si410gxg233zxps';
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&fields=place_id&key=${apiKey}`
  
    try {
      const response = await fetch(url)
      const placeId = response.data.candidates[0].place_id
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,icon&key=${apiKey}`
    
      const detailsResponse = await fetch(detailsUrl)
      const phoneNumber = detailsResponse.data.result.formatted_phone_number
      const logo = detailsResponse.data.result.icon

      return {
        phoneNumber,
        logo
      }
    
    } catch (error) {
      console.error('Errore durante il recupero dei dettagli del ristorante:', error)
      return null
    }
  } */

  useEffect(() => {
    const data = window.localStorage.getItem('increase')
    if (data !== null) setIncrease(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('increase', JSON.stringify(increase))
  }, [increase])

  return (
    <div className='restaurant-page'>

      <UserMap restaurantsCoordinates={restaurantList} userCoordinates={userPosition} />

      <Searchbar />

      <div className='restaurant-list'>
        {searchedRestaurants.length > 0
          ?
          searchedRestaurants.map((restaurant, index) => {
            return (
              <RestaurantCard
                key={index}
                restaurant={restaurant.name}
                coordinates={restaurant.coordinates}
              />
            )
          })
          :
          restaurantList.slice(0, increase).map((restaurant, index) => {
            return (
              <RestaurantCard
                key={index}
                restaurant={restaurant.name}
                coordinates={restaurant.coordinates}
              />
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