import React, { useState, useEffect, useContext } from 'react'
import './TagItem.css'
import { DrinkNFood } from '../../../context/Context'
import { db } from '../../../firebase'
import { collection, getDocs, query, where } from '@firebase/firestore'
/* import { selectedTags } from '../../../layout/Layout' */

var selectedTags = []

const TagItem = ({ tag }) => {

  let { restaurantList, setRestaurantList/* , selectedTags, setSelectedTags */ } = useContext(DrinkNFood)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = async (e) => {
    debugger

    setActiveBtn(activeBtn => !activeBtn)

    if (selectedTags.indexOf(tag) === -1) {

      /* setSelectedTags(selectedTags => [...selectedTags, tag]) */

      /* let newSelectedTags = [...selectedTags, tag] */

      selectedTags = [...selectedTags, tag]

      /* setSelectedTags(selectedTags => newSelectedTags) */

    } else {

      /* setSelectedTags(selectedTags => selectedTags.filter(el => el !== tag)) */

      selectedTags = selectedTags.filter(el => el !== tag)

      /* setSelectedTags(selectedTags => newSelectedTags) */
    }

    // query
    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef, where("tags", "array-contains-any", selectedTags))
    const querySnapshot = await getDocs(q)

    let newRestaurantList = []

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      newRestaurantList = [...newRestaurantList, doc.data().name]
    })
    setRestaurantList(restaurantList => newRestaurantList)
  }

  return (
    <div className={`tag-item ${toggleActiveClass}`} onClick={(e) => handleSelect(e)}>
      <p>{tag}</p>
    </div>
  )
}

export default TagItem