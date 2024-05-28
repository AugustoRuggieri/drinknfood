import React, { useContext, useState } from 'react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../firebase'
import { AppContext } from '../../../App'
import GoogleButton from 'react-google-button'

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

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleProvider).then(async res => {
            alert(res.user.email + ' accesso effettuato');
            setShowModal(!showModal);
        }).catch(err => {
            alert(err.message)
        })
    }

    return (
        <div className='login-container'>
            <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button id='login-btn' onClick={handleSubmit}>
                accedi
            </button>
            <div className='google-auth-container'>
                <span>oppure</span>
                <GoogleButton onClick={signInWithGoogle} />
            </div>
        </div>
    )
}

export default Login