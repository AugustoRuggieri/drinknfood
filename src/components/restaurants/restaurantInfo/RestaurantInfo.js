import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DrinkNFood } from '../../../context/Context'
import './restaurantInfo.css'

const RestaurantInfo = () => {

  let { selectedTagsState } = useContext(DrinkNFood)

  const { restaurant } = useParams()
  const navigate = useNavigate()

  return (
    <div className='restaurant-info'>
      <h2>{restaurant}</h2>
      <button onClick={() => navigate(-1)}>Torna ai risultati</button>
    </div>
  )
}

export default RestaurantInfo