import React, { useState, useContext } from 'react'
import './TagItem.css'
import { DrinkNFood } from '../../../context/Context'
import { db } from '../../../firebase' 
import { collection, getDocs, query, where } from '@firebase/firestore'
import { CryptoState } from '../../../context/Context'

const TagItem = ({ tag }) => {

  let { restaurantList, setRestaurantList } = useContext(DrinkNFood)
  
  const [selectedTags, setSelectedTags] = useState([])
  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = async (e) => {

    setRestaurantList(restaurantList => [])
    
    setActiveBtn(activeBtn => !activeBtn)

    const collectionRef = collection(db, 'restaurants')

    const q = query(collectionRef, where("tags", "array-contains", tag))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setRestaurantList(restaurantList => [...restaurantList, doc.data().name])
    }) 
  }

  return (
    <div className={`tag-item ${toggleActiveClass}`} onClick={(e) => handleSelect(e)}>
      <p>{tag}</p>
    </div>
  )
}

export default TagItem