import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import React from 'react'

const InputField = ({ inputText, setInputText, inputList, setInputList, user }) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const collectionRef = doc(db, "entries", user.uid)

        if (inputText === "") {
            alert("Scrivi qualcosa prima di confermare!")
        } else {
            setInputList([...inputList, inputText])
            try {
                await setDoc(collectionRef, {
                    entries: inputList ? [...inputList, inputText] : [inputText]
                })
            } catch (error) {
                alert(error.message)
            }
            setInputText("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={inputText}
                placeholder='Scrivi qualcosa...'
                onChange={(e) => setInputText(e.target.value)}
            />
            <button type='submit'>
                Aggiungi alla lista
            </button>
        </form>
    )
}

export default InputField