import React, { useState, useEffect } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { DrinkNFood } from '../context/Context'
import Navbar from '../components/navbar/Navbar'
import AuthModal from '../components/navbar/authentication/AuthModal'
import { auth, db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from "@firebase/auth"
import Footer from '../components/footer/Footer'

const Layout = () => {

    const [restaurantList, setRestaurantList] = useState([])
    const [selectedTagsState, setSelectedTagsState] = useState([])
    const [selectedFiltersState, setSelectedFiltersState] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState(null)
    const [tagsArr, setTagsArr] = useState([])
    const [filtersArr, setFiltersArr] = useState([])

    const fetchFromDB = async (collectionName, arrayToFill, setMethod) => {
        setMethod(arrayToFill => [])
        const tagsRef = collection(db, collectionName);
        const q = query(tagsRef, where("name", "!=", ""))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setMethod(arrayToFill => [...arrayToFill, doc.data().name]);
        })
    }

    const fetchTagsFromDB = async () => {
        fetchFromDB('tags', tagsArr, setTagsArr)
    }

    const fetchFiltersFromDB = async () => {
        fetchFromDB('filters', filtersArr, setFiltersArr)
    }

    useEffect(() => {
        fetchTagsFromDB()
        fetchFiltersFromDB()
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
                user,
                tagsArr,
                setTagsArr,
                filtersArr,
                setFiltersArr
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
                <Footer />
            </DrinkNFood.Provider>
        </>
    )
}

export default Layout