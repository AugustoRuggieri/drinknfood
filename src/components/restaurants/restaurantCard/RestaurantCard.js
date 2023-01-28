import React, { useState, useContext, useEffect } from 'react'
import './RestaurantCard.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../App'

const RestaurantCard = ({ restaurant, coordinates }) => {

  const navigate = useNavigate()

  let { userPosition } = useContext(AppContext)

  const [distance, setDistance] = useState()

  const calculateDistanceFromUser = (userCoordinates, restaurantCoordinates) => {
    var distance
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((restaurantCoordinates.latitude - userCoordinates.latitude) * p)/2 + 
            c(userCoordinates.latitude * p) * c(restaurantCoordinates.latitude * p) * 
            (1 - c((restaurantCoordinates.longitude - userCoordinates.longitude) * p))/2;
  
    distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    setDistance(distance)
  }

  useEffect(() => {
    calculateDistanceFromUser(userPosition, coordinates)
  }, [])

  return (
    <div className='restaurant-card' onClick={() => navigate(`/restaurants/${restaurant}`)}>
      <h4>{restaurant}</h4>
      <p>Distanza: {distance}</p>
    </div>
  )
}

export default RestaurantCard