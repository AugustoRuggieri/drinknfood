import React, { useEffect, useState } from 'react'
import { APIProvider, AdvancedMarker, InfoWindow, Map, Pin } from '@vis.gl/react-google-maps'
import './userMap.css'

const UserMap = ({ restaurantsCoordinates }) => {

    const [userCoordinates, setUserCoordinates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );
    }, []);

    if (loading) {
        return <div>Loading user coordinates...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    var mapMarkers = [];

    restaurantsCoordinates.map((restaurant, index) => {
        mapMarkers.push({
            name: restaurant.name,
            position: {
                lat: restaurant.coordinates._lat,
                lng: restaurant.coordinates._long
            },
            key: index
        })
    });

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <div className='user-map'>
                <Map
                    defaultZoom={16}
                    defaultCenter={userCoordinates}
                    mapId={process.env.REACT_APP_GOOGLE_MAPS_USER_MAP_ID}
                >
                    <AdvancedMarker position={userCoordinates} zIndex={9999} onClick={() => setOpen(true)}>
                        <Pin
                            background={"#FBBC04"}
                            borderColor={"#000"}
                            glyphColor={"#000"}
                        />
                    </AdvancedMarker>
                    {open && <InfoWindow position={userCoordinates} onCloseClick={() => setOpen(false)}><p>La tua posizione</p></InfoWindow>}
                    {mapMarkers.map((marker, index) => (
                        <React.Fragment key={index}>
                            <AdvancedMarker
                                position={marker.position}
                                onClick={() => setOpenIndex(index)}
                            >
                            </AdvancedMarker>
                            {openIndex === index && (
                                <InfoWindow
                                    position={marker.position}
                                    onCloseClick={() => setOpenIndex(null)}
                                >
                                    <p>{marker.name}</p>
                                </InfoWindow>
                            )}
                        </React.Fragment>
                    ))}
                </Map>
            </div>
        </APIProvider>
    )
}

export default UserMap