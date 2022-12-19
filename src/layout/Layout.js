import React, { useState, useEffect } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { DrinkNFood, DrinkNFoodProvider } from '../context/Context'
import Navbar from '../components/navbar/Navbar'
import AuthModal from '../components/navbar/authentication/AuthModal'
import { auth } from '../firebase'
import { onAuthStateChanged } from "@firebase/auth"

const Layout = () => {

    const [restaurantList, setRestaurantList] = useState([])
    const [selectedTagsState, setSelectedTagsState] = useState([])
    const [selectedFiltersState, setSelectedFiltersState] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])

    return (
        <>
            <DrinkNFood.Provider value={{
                restaurantList,
                setRestaurantList,
                selectedTagsState,
                setSelectedTagsState,
                selectedFiltersState,
                setSelectedFiltersState,
                showModal,
                setShowModal,
                user
            }}>
                {
                    showModal ? <AuthModal /> : null
                }

                <Navbar />
                <div className='layout'>
                    <Sidebar />
                    <div className='page'>
                        <Outlet />
                    </div>

                </div>
            </DrinkNFood.Provider>
        </>
    )
}

export default Layout