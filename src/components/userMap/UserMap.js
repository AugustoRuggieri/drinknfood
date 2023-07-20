import React, { useEffect, useRef, useState } from 'react'
import './userMap.css'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const UserMap = ({ restaurantsCoordinates, userCoordinates }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCF0qsU8VoJjp30mFr5si410gxg233zxps',
        libraries: ['places']
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
            center={center}
            mapContainerClassName='user-map'
        >
            <Marker position={center} title={"La tua posizione"} />

            {
                mapMarkers.map((marker, index) => {
                    return <Marker key={index} position={marker.position} title={marker.name} />
                })
            }
            {/* {
                selected && <Marker position={selected} />
            } */}
        </GoogleMap>
    )
}

export default UserMap