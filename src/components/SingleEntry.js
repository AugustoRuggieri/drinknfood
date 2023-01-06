import React from 'react'
import { db } from '../firebase'
import { arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const SingleEntry = ({ restaurantID, text, id, setTags, setFilters }) => {

  const removeItemFromList = async (text) => {

    const restaurantRef = doc(db, "imported-restaurants", restaurantID)

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

    // Elimina la tag dall'array delle tag se non c'è nessun ristorante con quella tag
    /* const q = query(collection(db, 'imported-restaurants'), where('tags', 'array-contains', tag))
    const querySnapshot = await getDocs(q)
    console.log("snapshot size: " + querySnapshot.size)
    if (querySnapshot.size === 0) {
      await deleteDoc(collection(db, 'tags', where('name', '==', tag)))
    } */
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