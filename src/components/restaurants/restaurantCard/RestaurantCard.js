import React, { useEffect } from 'react'
import './RestaurantCard.css'
import { useNavigate } from 'react-router-dom'

const RestaurantCard = ({ restaurant }) => {

  const navigate = useNavigate()

  /* const splitRestaurantName = (restaurantName) => {
    const nameIsMoreThanOneWord = restaurantName.split(' ').length > 1
    console.log(nameIsMoreThanOneWord)
  } */

  return (
    <div className='restaurant-card' onClick={() => navigate(`/restaurants/${restaurant}`)}>
      {

      }
      <h4>{restaurant}</h4>
    </div>
  )
}

export default RestaurantCard