import React, { useState } from 'react'
import { collection, doc, addDoc, GeoPoint, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import './Account.css'

const Account = () => {

  const [fileName, setFileName] = useState('')

  const [restaurants, setRestaurants] = useState([])
  const [result, setResult] = useState([])

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
          // if !restaurants contains name
          //     crea ristorante
          //     crea array vuoto tags e array vuoto filters
          //     push nuovo ristorante in restaurants
          // if  placemark è contenuto in tags
          //     push placemark in tags
          // if  placemark è contenuto in filters
          //     push placemark in filters 
          restaurants.push({
            name: tagXmlNode.children[0].textContent.toLowerCase(),
            coordinates: [tagXmlNode.children[2].children[0].textContent.toString().split(',')[0].split(' ').at(-1),
            tagXmlNode.children[2].children[0].textContent.toString().split(',')[1]],
            tags: tagXmlNode.parentNode.children[0].textContent.toLowerCase()
          })
        })

        // Find duplicates checking name property
        restaurants.forEach((object) => {
          const existing = result.filter((item) => item.name === object.name)
          if (existing.length) {
            const existingIndex = result.indexOf(existing[0])
            result[existingIndex].tags = Array.from(new Set(result[existingIndex].tags.concat(object.tags)))
          } else {
            if (typeof object.tags == 'string') object.tags = [object.tags]
            result.push(object)
          }
        })
        alert('File importato correttamente')
      })
    })
  }

  const saveFilesToDB = () => {
    if (result.length !== 0) {
      result.forEach(async (item) => {
        await addDoc(collection(db, 'imported-restaurants'), {
          name: item.name,
          coordinates: new GeoPoint(item.coordinates[0], item.coordinates[1]),
          tags: item.tags,
          filters: []
        })
      })
      setRestaurants([])
      setResult([])
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