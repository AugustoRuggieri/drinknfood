import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'

const SignUp = () => {

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
            console.log(result)
            console.log(`Benvenut* ${result.user.email}!`)
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