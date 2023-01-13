import React, { useContext } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import AuthModal from '../components/navbar/authentication/AuthModal'
import Footer from '../components/footer/Footer'
import { AppContext } from '../App'

const Layout = () => {

    const { showModal } = useContext(AppContext)

    return (
        <>
            {
                showModal ? <AuthModal /> : null
            }
            <Navbar />
            <div className='page'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout