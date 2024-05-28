import React, { useState, useContext } from 'react'
import './newRestaurantModal.css'
import { AppContext } from '../../../App'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { GeoPoint } from 'firebase/firestore'
import { saveSingleRestaurantToDB } from '../../../utils'
import { mapsLibraries } from '../../../config/config'

export default function Places() {

  const { newRestaurantModal, setNewRestaurantModal } = useContext(AppContext)

  window.onclick = (e) => {
    var modal = document.getElementById('new-restaurant-modal')
    if (e.target === modal) {
      setNewRestaurantModal(!newRestaurantModal)
    }
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCF0qsU8VoJjp30mFr5si410gxg233zxps',
    libraries: mapsLibraries
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <div id='new-restaurant-modal'>
        <div className='restaurant-modal-content'>
          <Map />
        </div>
      </div>
    </>
  )
}

function Map() {

  const { userPosition } = useContext(AppContext)

  const center = { lat: 44.494, lng: 11.342 }
  const [selected, setSelected] = useState(null)

  const user = {
    lat: parseFloat(userPosition.lat),
    lng: parseFloat(userPosition.lng)
  }

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
        <Marker
          position={user}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />
      </GoogleMap>
    </>
  )
}

const PlacesAutocomplete = ({ setSelected }) => {

  const { newRestaurantModal, setNewRestaurantModal, setRestaurantList } = useContext(AppContext)

  const [showBtn, setShowBtn] = useState(false)
  const [newRestaurantData, setNewRestaurantData] = useState(null)

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = getLatLng(results[0])
    setSelected({ lat, lng })
    setShowBtn(true)

    setNewRestaurantData({
      name: address.split(',')[0].toLowerCase().replace(/'\s+/g, "'"),
      coordinates: new GeoPoint(lat, lng),
      tags: [],
      filters: []
    })

  }

  const handleNewRestaurantAdded = () => {
    setNewRestaurantModal(!newRestaurantModal)
    saveSingleRestaurantToDB(newRestaurantData)
    setRestaurantList(restaurantList => [...restaurantList, {
      name: newRestaurantData.name,
      coordinates: newRestaurantData.coordinates
    }])
    /* if (user) {
      setNewRestaurantModal(!newRestaurantModal)
      saveSingleRestaurantToDB(newRestaurantData)
      setRestaurantList(restaurantList => [...restaurantList, {
        name: newRestaurantData.name,
        coordinates: newRestaurantData.coordinates
      }])
    } else {
      alert('Esegui l\'accesso per aggiungere nuovi locali')
    } */
  }

  return (
    <>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Cerca bar, vinerie, ristoranti..."
        />
        <ComboboxPopover className='combobox-popover'>
          <ComboboxList className='combobox-list'>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption className='combobox-option' key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

      {showBtn && <button className='combo-add-btn' onClick={() => handleNewRestaurantAdded()}>aggiungi</button>}
    </>
  )
}