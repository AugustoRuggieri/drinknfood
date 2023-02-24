import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React from 'react'
import './userMap.css'

const UserMap = ({ restaurantsCoordinates, userCoordinates }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCF0qsU8VoJjp30mFr5si410gxg233zxps'
    })

    if (!isLoaded) return <div>Loading...</div>

    const center = {
        lat: parseFloat(userCoordinates.lat), 
        lng: parseFloat(userCoordinates.lng)
    }

    var mapMarkers = []

    restaurantsCoordinates.map((restaurant) => {
        mapMarkers.push({
            name: restaurant.name,
            position: {
                lat: restaurant.coordinates._lat, 
                lng: restaurant.coordinates._long
            }
        })
    })

    return (
        <GoogleMap
            zoom={16}
            center={ center }
            mapContainerClassName='user-map'
        >
            <Marker position={ center } title={"La tua posizione"} />

            {
                mapMarkers.map((marker, index) => {
                    return <Marker key={index} position={marker.position} title={marker.name} />
                })
            }
        </GoogleMap>
    )
}

export default UserMap