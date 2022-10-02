import React from 'react'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const SingleEntry = ({ input, inputList, user }) => {

  const removeItemFromList = async (input) => {
    const collectionRef = doc(db, "entries", user.uid)

    try {
      await setDoc(collectionRef,
        { entries: inputList.filter((entry) => entry !== input) },
        { merge: true }
      )
      alert("Oggetto rimosso correttamente")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='single-entry'>
      {input}
      <div onClick={() => removeItemFromList(input)}>x</div>
    </div>
  )
}

export default SingleEntry