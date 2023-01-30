import React from 'react'
import { db } from '../firebase'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const SingleEntry = ({ restaurantID, text, id, setTags, setFilters }) => {

  const removeItemFromList = async (text) => {

    const restaurantRef = doc(db, "restaurants", restaurantID)

    switch (id) {
      case "tag":
        await updateDoc(restaurantRef, {
          tags: arrayRemove(text)
        })
        setTags(tags => tags.filter((el) => el !== text))
      case "filter":
        await updateDoc(restaurantRef, {
          filters: arrayRemove(text)
        })
        setFilters(filters => filters.filter((el) => el !== text))
    }
  }

  return (
    <div className='single-entry'>
      {text}
      <div className='deleteTag-btn' onClick={() => removeItemFromList(text)}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
    </div>
  )
}

export default SingleEntry