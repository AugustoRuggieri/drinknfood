import React from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'

const Layout = () => {

    return (
        <div className='layout'>
            <Sidebar />
            <div className='page'>

                <Outlet />

            </div>
        </div>
    )
}

export default Layout