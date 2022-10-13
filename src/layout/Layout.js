import React, { useState } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Restaurants from '../components/restaurants/Restaurants'
import { DrinkNFood } from '../context/Context'

/* var selectedTags = 'pippo'

export { selectedTags } */

const Layout = () => {

    const [restaurantList, setRestaurantList] = useState([])
    /* const [selectedTags, setSelectedTags] = useState([]) */

    return (
        <div className='layout'>
            <DrinkNFood.Provider value={{ restaurantList, setRestaurantList/* , selectedTags, setSelectedTags */ }}>
                <Sidebar />
                <div className='page'>
                <Restaurants />
                </div>
            </DrinkNFood.Provider>
            {/* {            

                <Outlet />

            } */}
        </div>
    )
}

export default Layout