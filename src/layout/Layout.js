import React, { useState } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { DrinkNFood } from '../context/Context'

const Layout = () => {

    const [restaurantList, setRestaurantList] = useState([])
    const [selectedTagsState, setSelectedTagsState] = useState([])
    const [selectedFiltersState, setSelectedFiltersState] = useState([])


    return (
        <div className='layout'>
            <DrinkNFood.Provider value={{
                restaurantList,
                setRestaurantList,
                selectedTagsState,
                setSelectedTagsState,
                selectedFiltersState,
                setSelectedFiltersState
            }}>
                <Sidebar />
                <div className='page'>
                    <Outlet />
                </div>
            </DrinkNFood.Provider>
        </div>
    )
}

export default Layout