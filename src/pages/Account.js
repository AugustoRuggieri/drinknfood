import React, { useState } from 'react'
import { collection, doc, addDoc, GeoPoint, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import './Account.css'

const Account = () => {

  const [fileName, setFileName] = useState('')

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

        let restaurants = []

        restaurantMarkers.forEach(async (tagXmlNode) => {

          restaurants.push({
            name: tagXmlNode.children[0].textContent.toLowerCase(),
            coordinates: [tagXmlNode.children[2].children[0].textContent.toString().split(',')[0].split(' ').at(-1),
            tagXmlNode.children[2].children[0].textContent.toString().split(',')[1]],
            tags: tagXmlNode.parentNode.children[0].textContent.toLowerCase()
          })
        })

        // Find duplicates checking name property
        const result = []
        restaurants.forEach((object) => {
          const existing = result.filter((item) => item.name === object.name)
          if (existing.length) {
            const existingIndex = result.indexOf(existing[0])
            result[existingIndex].tags = result[existingIndex].tags.concat(object.tags)
          } else {
            if (typeof object.tags == 'string') object.tags = [object.tags]
            result.push(object)
          }
        })
        console.log(result)

        result.forEach(async (item) => {
          await addDoc(collection(db, 'imported-restaurants'), {
            name: item.name,
            coordinates: new GeoPoint(item.coordinates[0], item.coordinates[1]),
            tags: item.tags
          })
        })
      })
    })
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
    </div>
  )
}

export default Account