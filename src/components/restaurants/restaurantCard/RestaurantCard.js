import React, { useState, useContext, useEffect } from 'react'
import './RestaurantCard.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../App'

const RestaurantCard = ({ restaurant, coordinates }) => {

  const navigate = useNavigate()

  let { userPosition, selectedTagsState, selectedFiltersState } = useContext(AppContext)

  const [distance, setDistance] = useState()

  const calcDistanceFromUser = (userCoordinates, restaurantCoordinates) => {
    var distance
    var p = 0.017453292519943295
    var c = Math.cos
    var a = 0.5 - c((restaurantCoordinates.latitude - userCoordinates.latitude) * p)/2 + 
            c(userCoordinates.latitude * p) * c(restaurantCoordinates.latitude * p) * 
            (1 - c((restaurantCoordinates.longitude - userCoordinates.longitude) * p))/2
  
    distance = ((12742 * Math.asin(Math.sqrt(a))).toFixed(2)) * 1000
    if (distance.toString().length > 3) {
      distance = (distance / 1000).toFixed(1) + " km"
    } else {
      distance = distance + " m"
    }
    setDistance(distance)
  }

/*   const getRestaurantDetails = async (name) => {
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

  /* const result = getRestaurantDetails(restaurant)
  let restaurantPhone = result.phoneNumber
  let restaurantLogo = result.logo */

  /* useEffect(() => {
    calcDistanceFromUser(userPosition, coordinates)
  }, [selectedTagsState, selectedFiltersState]) */

  /* useEffect(() => {
    getRestaurantDetails(restaurant)
  }, []) */

  return (
    <div className='restaurant-card' onClick={() => navigate(`/restaurants/${restaurant}`)}>
      <h4>{restaurant}</h4>
      {/* <p>Distanza: <b>{distance}</b></p> */}
    </div>
  )
}

export default RestaurantCard