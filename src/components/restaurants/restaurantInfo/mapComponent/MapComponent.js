import React, { useEffect, useState } from 'react'
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import './MapComponent.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';

const MapComponent = ({ restaurant }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [restaurantPosition, setRestaurantPosition] = useState(null);

    const fetchRestaurantCoordinates = async () => {
        const restaurantRef = collection(db, 'restaurants')
        const q = query(restaurantRef, where('name', '==', restaurant))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setRestaurantPosition({
                    lat: doc.data().coordinates._lat,
                    lng: doc.data().coordinates._long
                })
            })
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRestaurantCoordinates();
    }, [])

    if (loading) {
        return <div>Loading restaurant coordinates...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <div className='map-container'>
                <Map
                    defaultZoom={14}
                    defaultCenter={restaurantPosition}
                    mapId={process.env.REACT_APP_GOOGLE_MAPS_RESTAURANT_MAP_ID}
                >
                    <AdvancedMarker position={restaurantPosition}></AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    )
}

export default MapComponent