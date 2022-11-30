import { useEffect } from 'react'
import { arrayUnion, collection, doc, addDoc, setDoc, GeoPoint, deleteDoc, getDoc, getDocs, query, updateDoc, where, FieldValue } from 'firebase/firestore'
import { db } from './firebase'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import RestaurantInfo from './components/restaurants/restaurantInfo/RestaurantInfo'
import Restaurants from './components/restaurants/Restaurants'

function App() {

  // Import data from xml files
  const importData = (file) => {
    let xmlContent = ''

    fetch(file).then((response) => {
      response.text().then((xml) => {
        xmlContent = xml
        let parser = new DOMParser()
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
        let drinkTags = xmlDOM.querySelectorAll('Placemark')

        drinkTags.forEach(async (tagXmlNode) => {

          const ref = collection(db, 'imported-restaurants')
          const q = query(ref, where('name', '==', tagXmlNode.children[0].textContent.toLowerCase()))
          const qSnap = await getDocs(q)

          // Check if restaurants already exists in the db
          if (qSnap.size > 1) {

            qSnap.forEach(async (restaurant) => {
              const restRef = doc(db, 'imported-restaurants', restaurant.id)
              await updateDoc(restRef, {
                tags: arrayUnion(tagXmlNode.parentNode.children[0].textContent)
              })
            })
          } else {
            // If not, add a new document with a generated id
            await addDoc(collection(db, 'imported-restaurants'), {
              name: tagXmlNode.children[0].textContent.toLowerCase(),
              coordinates: new GeoPoint(+tagXmlNode.children[2].children[0].textContent.toString().split(',')[0],
                +tagXmlNode.children[2].children[0].textContent.toString().split(',')[1]),
              tags: tagXmlNode.parentNode.children[0].textContent
            })
          }
        })
      })
    })
  }

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
