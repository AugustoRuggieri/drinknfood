import { useEffect } from 'react'
import { collection, addDoc, setDoc, GeoPoint, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import RestaurantInfo from './components/restaurants/restaurantInfo/RestaurantInfo';
import Restaurants from './components/restaurants/Restaurants';

function App() {

  // Importing data from xml files
  /* let xmlContent = ''

  fetch('food.xml').then((response) => {
    response.text().then((xml) => {
      xmlContent = xml
      let parser = new DOMParser()
      let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
      let drinkTags = xmlDOM.querySelectorAll('Placemark')

      drinkTags.forEach(async (tagXmlNode) => {

        // Add a new document with a generated id
        await addDoc(collection(db, 'imported-restaurants'), {
          name: tagXmlNode.children[0].textContent.toLowerCase(),
          coordinates: new GeoPoint(+tagXmlNode.children[2].children[0].textContent.toString().split(',')[0],
            +tagXmlNode.children[2].children[0].textContent.toString().split(',')[1])
        })
      })
    })
  }) */

  /* const collectionRef = collection(db, 'imported-restaurants');

  const deleteCollection = async (dbRef) => {
    const docSnap = await getDocs(dbRef)
    docSnap.forEach(async (doc) => {
      await deleteDoc(doc)
    })
  }

  deleteCollection(collectionRef) */

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Restaurants />} />
        <Route path='restaurants/:restaurant' element={<RestaurantInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
