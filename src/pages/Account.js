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

        restaurantMarkers.forEach(async (tagXmlNode) => {

          var restaurantName = tagXmlNode.children[0].textContent.toLowerCase()
          var restaurant = restaurants.find((item) => item.name === restaurantName)

          if (!restaurant) {
            restaurant = {
              name: restaurantName,
              coordinates: [tagXmlNode.children[2].children[0].textContent.toString().split(',')[0].split(' ').at(-1),
              tagXmlNode.children[2].children[0].textContent.toString().split(',')[1]],
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
        })
        alert('File importato correttamente')
      })
    })
  }

  const saveFilesToDB = () => {
    if (restaurants.length !== 0) {
      restaurants.forEach(async (item) => {
        await addDoc(collection(db, 'imported-restaurants'), {
          name: item.name,
          coordinates: new GeoPoint(item.coordinates[0], item.coordinates[1]),
          tags: item.tags,
          filters: item.filters
        })
      })
      setRestaurants([])
      alert('Tutti i dati sono stati salvati nel database')
    } else {
      alert('Nessun dato da salvare')
    }
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

      <button className='import-btn' onClick={() => saveFilesToDB()}>Salva nel database</button>
    </div>
  )
}

export default Account