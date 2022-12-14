import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import RestaurantInfo from './components/restaurants/restaurantInfo/RestaurantInfo'
import Restaurants from './components/restaurants/Restaurants'
import Account from './pages/Account'
import { createContext } from 'react'
import { auth, db } from './firebase'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from "@firebase/auth"

export const AppContext = createContext()

function App() {

  const [restaurantList, setRestaurantList] = useState([])
  const [selectedTagsState, setSelectedTagsState] = useState([])
  const [selectedFiltersState, setSelectedFiltersState] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState(null)
  const [tagsArr, setTagsArr] = useState([])
  const [filtersArr, setFiltersArr] = useState([])

  const fetchRestaurants = async () => {

    // query
    var queryWhere = where("name", "!=", "")

    if (selectedTagsState.length !== 0) {
      queryWhere = where("tags", "array-contains-any", selectedTagsState)
    }

    const collectionRef = collection(db, 'imported-restaurants')
    const q = query(collectionRef, queryWhere, limit(20))
    const querySnapshot = await getDocs(q)

    let newRestaurantList = []

    // filter
    querySnapshot.forEach((doc) => {
      if (selectedFiltersState.length > 0) {
        if (selectedFiltersState.every(el => doc.data().filters?.includes(el))) {
          newRestaurantList = [...newRestaurantList, doc.data().name]
        }
      } else {
        newRestaurantList = [...newRestaurantList, doc.data().name]
      }
    })
    setRestaurantList(newRestaurantList)
  }

  const fetchFromDB = async (collectionName, arrayToFill, setMethod) => {
    setMethod(arrayToFill => [])
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("name", "!=", ""))
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

  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
    //fetchRestaurants()
    fetchTagsFromDB()
    fetchFiltersFromDB()
    onAuthStateChanged(auth, user => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchRestaurants()
    }
  }, [selectedTagsState, selectedFiltersState]);

  return (
    <AppContext.Provider value={{
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
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Restaurants />} />
          <Route path='restaurants/:restaurant' element={<RestaurantInfo />} />
          <Route path='account' element={<Account />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
