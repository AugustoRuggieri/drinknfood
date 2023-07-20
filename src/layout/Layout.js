import React, { useContext } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import AuthModal from '../components/navbar/authentication/AuthModal'
import NewRestaurantModal from '../components/searchbar/new-restaurant-modal/NewRestaurantModal'
import Footer from '../components/footer/Footer'
import { AppContext } from '../App'

const Layout = () => {

    const { showModal, newRestaurantModal } = useContext(AppContext)

    return (
        <>
            {showModal ? <AuthModal /> : null}
            {newRestaurantModal ? <NewRestaurantModal /> : null}
            <Navbar />
            <div className='page'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout