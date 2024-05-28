import React, { useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'

const Navbar = () => {

    const { showModal, setShowModal, user } = useContext(AppContext)

    const navigate = useNavigate()

    const userAuth = () => {
        setShowModal(!showModal)
    }

    const logOut = () => {
        try {
            signOut(auth).then(alert('Hai eseguito il logout. A presto!'))
        } catch(err) {
            alert(err.message);
        }
    }

    const showTagsAndFiltersList = () => {
        document.getElementById('sidebar').classList.toggle('active')
    }

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <h3 className='logo' onClick={() => navigate('home')}>aperitiBO</h3>
                <div className='toggle-btn' onClick={() => showTagsAndFiltersList()}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <div className='icons-wrapper'>
                    <div className='auth-btn' onClick={user ? logOut : userAuth}>
                        {
                            user ? <img src={user.photoURL} className='profile-avatar' /> : <FontAwesomeIcon icon={faUser} className="user-icon" />
                        }
                        <h5 className='btn-text'>{user ? <span>logout</span> : <span className='login-btn'>login</span>}</h5>
                    </div>
                    <div className='settings-btn' onClick={() => navigate('/account')} >
                        <FontAwesomeIcon icon={faGear} className='settings-icon' />
                        <h5 className='btn-text'>impostazioni</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar