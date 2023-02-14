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

  /* useEffect(() => {
    calcDistanceFromUser(userPosition, coordinates)
  }, [selectedTagsState, selectedFiltersState]) */

  return (
    <div className='restaurant-card' onClick={() => navigate(`/restaurants/${restaurant}`)}>
      <h4>{restaurant}</h4>
      {/* <p>Distanza: <b>{distance}</b></p> */}
    </div>
  )
}

export default RestaurantCard