import React, { useState, useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { DrinkNFood } from '../../context/Context'

const Navbar = () => {

    const { showModal, setShowModal } = useContext(DrinkNFood)

    const userAuth = () => {
        setShowModal(!showModal)
    }

    return (
        <div className='navbar'>
            <h3 className='logo'>drink n food</h3>
            <FontAwesomeIcon icon={faUser} className="user-icon" onClick={userAuth} />

        </div>
    )
}

export default Navbar