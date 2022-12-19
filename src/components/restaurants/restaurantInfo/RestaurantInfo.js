import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DrinkNFood } from '../../../context/Context'
import './restaurantInfo.css'
import MapComponent from './mapComponent/MapComponent'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import SingleEntry from '../../SingleEntry'

const RestaurantInfo = () => {

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })
  const [tags, setTags] = useState([])
  const [restaurantID, setRestaurantID] = useState('')

  let { selectedTagsState } = useContext(DrinkNFood)

  const { restaurant } = useParams()

  const navigate = useNavigate()

  const fetchCoordinates = async () => {

    const restaurantRef = collection(db, 'imported-restaurants')

    const q = query(restaurantRef, where('name', '==', restaurant))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())

      setRestaurantID(doc.id)

      setCoordinates({
        lat: doc.data().coordinates._long,
        lng: doc.data().coordinates._lat
      })

      if (doc.data().tags.length !== 0) {
        setTags([...doc.data().tags])
      } else {
        return
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCoordinates()
  }, [])

  useEffect(() => {
    console.log('lunghezza array: ' + tags.length)
  }, [tags])

  return (
    <div className='restaurant-info'>
      <h2>{restaurant}</h2>

      <MapComponent coordinates={coordinates} />

      <section>
        <h4>Tags</h4>
        <div className='tags-container'>
          {tags.length !== 0
            ?
            tags.map((tag, index) => {
              return (
                <SingleEntry
                  key={index}
                  tag={tag}
                  tags={tags}
                  setTags={setTags}
                  restaurantID={restaurantID}
                />
              )
            })
            :
            null
          }
        </div>
      </section>

      <button onClick={() => navigate(-1)}>Torna ai risultati</button>
    </div>
  )
}

export default RestaurantInfo