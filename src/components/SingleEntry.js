import React from 'react'
import { db } from '../firebase'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'

const SingleEntry = ({ restaurantID, tag, tags, setTags }) => {

  const removeItemFromTagList = async (tag) => {

    const restaurantRef = doc(db, "imported-restaurants", restaurantID)
    await updateDoc(restaurantRef, { 
      tags: arrayRemove(...tag)
    })
    setTags(tags => tags.filter((el) => el !== tag))
  }  

  return (
    <div className='single-entry'>
      {tag}
      <div className='deleteTag-btn' onClick={() => removeItemFromTagList(tag)}>x</div>
    </div>
  )
}

export default SingleEntry