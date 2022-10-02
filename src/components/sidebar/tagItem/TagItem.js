import { doc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../../firebase'
import './TagItem.css'

const TagItem = ({ tag }) => {

  const handleSelect = async () => {

    const collectionRef = doc(db, 'tags')

    const res = await collectionRef.update({selected: true});

  }

  return (
    <div className='tag-item' onClick={handleSelect}>
        <p>{tag}</p>
    </div>
  )
}

export default TagItem