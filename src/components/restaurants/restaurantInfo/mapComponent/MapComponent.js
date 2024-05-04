import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React from 'react'
import './MapComponent.css'

const MapComponent = ({ coordinates }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCF0qsU8VoJjp30mFr5si410gxg233zxps'
    })

    if (!isLoaded) return <div>Loading...</div>

    const center = { lat: parseFloat(coordinates.lat) , lng: parseFloat(coordinates.lng) }

    return (
        <GoogleMap
            zoom={14}
            center={ center }
            mapContainerClassName='map-container'
        >
            <Marker position={ center } />
        </GoogleMap>
    )
}

export default MapComponent