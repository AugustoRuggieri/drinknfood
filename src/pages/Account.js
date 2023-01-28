import React, { useState, useContext } from 'react'
import { collection, doc, addDoc, GeoPoint, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import './Account.css'
import { AppContext } from '../App'

const Account = () => {

  const { tagsArr, filtersArr } = useContext(AppContext)

  const [fileName, setFileName] = useState('')
  const [restaurants, setRestaurants] = useState([])

  // Import data from xml files
  const importData = (file) => {

    if (file === '') {
      alert('Seleziona un file')
      return
    }

    let xmlContent = ''

    fetch(file).then((response) => {
      response.text().then((xml) => {
        xmlContent = xml
        let parser = new DOMParser()
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
        let restaurantMarkers = xmlDOM.querySelectorAll('Placemark')

        restaurantMarkers.forEach((tagXmlNode) => {

          try {
            var restaurantName = tagXmlNode.getElementsByTagName('name')[0].textContent.toLowerCase()
            var restaurant = restaurants.find((item) => item.name === restaurantName)

            if (!restaurant) {
              var restaurantPoint = tagXmlNode.getElementsByTagName('Point')[0].getElementsByTagName('coordinates')[0].textContent.toString().split(',')
              restaurant = {
                name: restaurantName,
                coordinates: [restaurantPoint[0].split(' ').at(-1), restaurantPoint[1]],
                tags: [],
                filters: []
              }
              restaurants.push(restaurant)
            }

            var tag = tagXmlNode.parentNode.children[0].textContent.toLowerCase()

            if (tagsArr.includes(tag)) {
              restaurant.tags = Array.from(new Set(restaurant.tags.concat(tag)))
            }
            if (filtersArr.includes(tag)) {
              restaurant.filters = Array.from(new Set(restaurant.filters.concat(tag)))
            }
          }
          catch (error) {
            console.error(error)
          }
        })
        alert('File importato correttamente')
      })
    })
  }

  const saveSingleRestaurantToDB = async (restaurant) => {
    try {
      const collectionRef = collection(db, 'imported-restaurants')
      const q = query(collectionRef, where("name", "==", restaurant.name))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        // Aggiungo il ristorante
        await addDoc(collection(db, 'imported-restaurants'), {
          name: restaurant.name,
          coordinates: new GeoPoint(restaurant.coordinates[0], restaurant.coordinates[1]),
          tags: restaurant.tags,
          filters: restaurant.filters
        })
        return
      }
      // Aggiungo tag e filtri a un ristorante già presente
      restaurant.tags.forEach(async (tag) => {
        var docTags = querySnapshot.docs[0].data().tags
        if (!docTags.includes(tag)) {
          await updateDoc(querySnapshot.docs[0].ref, {
            tags: [...docTags, tag]
          })
        }
      })
      restaurant.filters.forEach(async (filter) => {
        var docFilters = querySnapshot.docs[0].data().filters
        if (!docFilters.includes(filter)) {
          await updateDoc(querySnapshot.docs[0].ref, {
            filters: [...docFilters, filter]
          })
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const saveRestaurantsToDB = () => {
    if (restaurants.length === 0) {
      alert('Nessun dato da salvare')
      return
    }
    restaurants.forEach((item) => {
      saveSingleRestaurantToDB(item)
    })
    alert('Tutti i dati sono stati salvati nel database')
  }

  /* const exportData = async () => {

    const collectionRef = collection(db, 'imported-restaurants')
    const q = query(collectionRef, where("name", "!=", ""))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      restaurants.push(JSON.stringify(doc.data()))
    })

    var blob = new Blob([restaurants], { type: 'application/json' })
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'exported-restaurants-data'
    link.href = fileUrl
    link.click()

    setRestaurants([])
  } */

  const exportData = async () => {
    var restaurantsJSON = await readRestaurantsAsJSONArray()
    saveOnFile(restaurantsJSON, 'exported-restaurants-data')
  }

  const saveOnFile = (objectToBeSaved, fileName) => {
    var blob = new Blob([objectToBeSaved], { type: 'application/json' })
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = fileUrl
    link.click()
  }

  const readRestaurantsAsJSONArray = async () => {
    var restaurantsJSON = []
    const collectionRef = collection(db, 'imported-restaurants')
    const q = query(collectionRef, where("name", "!=", ""))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      restaurantsJSON.push(JSON.stringify(doc.data()))
    })
    return restaurantsJSON
  }

  return (
    <div className='account-page'>
      <h3 className='page-title'>Account</h3>

      <label>Seleziona il file da importare nel database</label>
      <select onChange={(e) => setFileName(e.target.value)} className='select'>
        <option></option>
        <option value='drink.xml'>Drink</option>
        <option value='food.xml'>Food</option>
      </select>

      <button className='import-btn' onClick={() => importData(fileName)}>Importa dati</button>
      <button className='import-btn' onClick={() => saveRestaurantsToDB()}>Salva nel database</button>
      <button className='import-btn' onClick={() => exportData()}>Esporta database</button>
    </div>
  )
}

export default Account