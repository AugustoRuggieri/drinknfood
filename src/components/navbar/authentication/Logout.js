import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

const Logout = () => {

    const logOut = () => {
        signOut(auth)
    }

    return (
        <button onClick={logOut}>
            Logout
        </button>
    )
}

export default Logout