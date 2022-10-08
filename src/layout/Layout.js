import React, { useState } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Restaurants from '../components/restaurants/Restaurants'
import { DrinkNFood } from '../context/Context'

const Layout = () => {

    const [restaurantList, setRestaurantList] = useState([])

    return (
        <div className='layout'>
            <DrinkNFood.Provider value={{ restaurantList, setRestaurantList }}>
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