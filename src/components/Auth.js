import React from 'react'
import Login from '../Authentication/Login'
import SignUp from '../Authentication/SignUp'

const Auth = () => {
    return (
        <div className='auth-container'>
            <Login />
            <SignUp />
        </div>
    )
}

export default Auth