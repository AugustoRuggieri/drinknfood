import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { AppContext } from '../../../App'

const Login = () => {

    const { showModal, setShowModal } = useContext(AppContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            alert("Riempi tutti i campi!")
            return
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            console.log(result.user)
            alert(`Bentornat* ${result.user.email}!`)
            setShowModal(!showModal)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='login-container'>
            <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>
                Accedi
            </button>
        </div>
    )
}

export default Login