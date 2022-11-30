import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DrinkNFood } from '../../../context/Context'
import './restaurantInfo.css'
import MapComponent from './mapComponent/MapComponent'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'

const RestaurantInfo = () => {

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null})

  let { selectedTagsState } = useContext(DrinkNFood)

  const { restaurant } = useParams()

  const navigate = useNavigate()

  const fetchCoordinates = async () => {
    
    const restaurantRef = collection(db, 'restaurants')

    const q = query(restaurantRef, where('name', '==', restaurant))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
      setCoordinates({
        lat: doc.data().coordinates._lat,
        lng: doc.data().coordinates._long
      })
    })
  }

  useEffect(() => {
    fetchCoordinates()
  }, [])


  return (
    <div className='restaurant-info'>
      <h2>{restaurant}</h2>

      <MapComponent coordinates={coordinates} />

      <button onClick={() => navigate(-1)}>Torna ai risultati</button>
    </div>
  )
}

export default RestaurantInfo