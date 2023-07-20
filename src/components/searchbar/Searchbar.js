import React, { useContext, useState } from 'react'
import './searchbar.css'
import { AppContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Searchbar = () => {

    const { restaurantList, searchedRestaurants, setSearchedRestaurants, newRestaurantModal, setNewRestaurantModal } = useContext(AppContext)

    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        setSearch("")
        if (search.length > 0) {
            let newSearchedRestaurants = []
            newSearchedRestaurants = restaurantList.filter(el => el.name.includes(search.toLowerCase()))
            setSearchedRestaurants(newSearchedRestaurants)
        } else {
            alert('Scrivi qualcosa')
        }
    }

    const showNewRestaurantModal = () => {
        setNewRestaurantModal(!newRestaurantModal)
    }

    return (
        <div className='search-section'>
            <input className='search-input' onChange={handleChange} value={search} placeholder='cerca un locale...' />
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' onClick={() => handleSearch()} />

            <button id='add-new-restaurant-btn' onClick={showNewRestaurantModal}>aggiungi nuovo locale</button>
        </div>
    )
}

export default Searchbar