import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DrinkNFood } from '../../../context/Context'
import './restaurantInfo.css'
import MapComponent from './mapComponent/MapComponent'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import SingleEntry from '../../SingleEntry'

const RestaurantInfo = () => {

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })
  const [tags, setTags] = useState([])
  const [restaurantID, setRestaurantID] = useState('')
  const [tagsArr, setTagsArr] = useState([])

  let { selectedTagsState } = useContext(DrinkNFood)

  const { restaurant } = useParams()

  const navigate = useNavigate()

  const fetchCoordinates = async () => {
    const restaurantRef = collection(db, 'imported-restaurants')
    const q = query(restaurantRef, where('name', '==', restaurant))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
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

  const fetchTagsFromDB = async () => {
    const tagsRef = collection(db, 'tags')
    const querySnapshot = await getDocs(tagsRef)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().name)
      setTagsArr(tagsArr => [...tagsArr, doc.data().name])
    })
  }

  const addTag = async (newTag) => {
    setTags(tags => [...tags, newTag])

    const restaurantRef = doc(db, 'imported-restaurants', restaurantID)
    await updateDoc(restaurantRef, {
      tags: [...tags, newTag]
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCoordinates()
    fetchTagsFromDB()
  }, [])

  return (
    <div className='restaurant-info'>
      <h2>{restaurant}</h2>

      <MapComponent coordinates={coordinates} />

      <section className='tags-section'>
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

        <div className='tags-select'>
          <select onChange={(e) => addTag(e.target.value)}>
            <option></option>
            {tagsArr.map((tag) => {
              return (
                <option>{tag}</option>
              )
            })}
          </select>
          <button>Aggiungi tag</button>
        </div>
      </section>

      <button onClick={() => navigate(-1)}>Torna ai risultati</button>
    </div>
  )
}

export default RestaurantInfo