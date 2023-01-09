import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { AppContext } from '../../../App'

const SignUp = () => {

    const { showModal, setShowModal } = useContext(AppContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            alert("Hai inserito due password diverse!")
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(`Benvenut* ${result.user.email}!`)
            setShowModal(!showModal)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='signup-container'>
            <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <input type="password" value={confirmPassword} placeholder='Conferma password' onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleSubmit}>Registrati</button>
        </div>
    )
}

export default SignUp