import React, { useState, useContext } from 'react'
import { where } from 'firebase/firestore'
import { db } from '../firebase'
import './Account.css'
import { AppContext } from '../App'
import { saveSingleRestaurantToDB, saveOnFile, readCollection, convertToJSON } from '../utils'

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
                coordinates: [restaurantPoint[1], restaurantPoint[0].split(' ').at(-1)],
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

  const exportData = async () => {
    var restaurants = await readCollection(db, 'restaurants', where("name", "!=", ""))
    var restaurantsJSON = convertToJSON(restaurants)
    saveOnFile(restaurantsJSON, 'exported-restaurants-data')
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