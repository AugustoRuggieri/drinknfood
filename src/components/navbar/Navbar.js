import React, { useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import TagItem from '../sidebar/tagItem/TagItem'
import FilterItem from '../sidebar/filterItem/FilterItem'

const Navbar = () => {

    const { showModal, setShowModal, user, tagsArr, filtersArr } = useContext(AppContext)

    const navigate = useNavigate()

    const userAuth = () => {
        setShowModal(!showModal)
    }

    const logOut = () => {
        signOut(auth)
    }

    const showTagsAndFiltersList = () => {
        document.getElementById('tags-and-filter-list-container').classList.toggle('active')
    }

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <h3 className='logo' onClick={() => navigate('/')}>aperitiBO</h3>
                <a href='#' className='toggle-btn' onClick={() => showTagsAndFiltersList()}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </a>
                <div id='tags-and-filter-list-container'>
                    <div className='tags-list'>
                        <h5>Tipo di cucina:</h5>
                        {tagsArr.map((tag, index) => <TagItem key={index} tag={tag} />)}
                    </div>

                    <hr />

                    <div className='filters-list'>
                        <h5>Filtri:</h5>
                        {filtersArr.map((filter, index) => <FilterItem key={index} filter={filter} />)}
                    </div>
                </div>
                <div className='auth-btn'>
                    <h3>{user ? <span onClick={logOut}>Esci</span> : <span className='login-btn' onClick={userAuth}>Accedi / Registrati</span>}</h3>
                    <FontAwesomeIcon icon={faUser} className="user-icon" onClick={() => navigate('/account')} />
                </div>
            </div>
        </div>
    )
}

export default Navbar