import React from 'react'
import './RestaurantCard.css'

const RestaurantCard = ({restaurant}) => {

  return (
    <div className='restaurant-card'>
        <h4>{restaurant}</h4>
    </div>
  )
}

export default RestaurantCard