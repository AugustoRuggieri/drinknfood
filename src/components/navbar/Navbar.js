import React, { useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { DrinkNFood } from '../../context/Context'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { showModal, setShowModal, user } = useContext(DrinkNFood)

    const navigate = useNavigate()

    const userAuth = () => {
        setShowModal(!showModal)
    }

    const logOut = () => {
        signOut(auth)
    }

    return (
        <div className='navbar'>
            <h3 className='logo' onClick={() => navigate('/')}>drink n food</h3>
            <div className='auth-btn'>
                <h3>{user ? <span onClick={logOut}>Esci</span> : <span onClick={userAuth}>Accedi / Registrati</span>}</h3>
                <FontAwesomeIcon icon={faUser} className="user-icon" onClick={() => navigate('/account')} />
            </div>
        </div>
    )
}

export default Navbar