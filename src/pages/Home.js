import React from 'react'
import { CryptoState } from '../context/Context'
import Auth from '../components/Auth'
import Logout from '../Authentication/Logout'
import InputField from '../components/InputField'
import EntriesList from '../components/EntriesList'
import SearchField from '../components/SearchField'
import Restaurants from '../components/restaurants/Restaurants'

const Home = () => {

    /* const { user } = CryptoState() */

    return (
        <div>

            <Restaurants />

            {/* {user ? <Logout /> : <Auth />}

            {user

                ?

                <div>
                    <InputField />
                    <EntriesList />
                </div>
                :

                <div style={{
                    color: "white",
                    margin: "25px"
                }}>Non hai trovato quello che cercavi? Effettua il login per inserire un nuovo locale o nuove etichette
                </div>
            } 

            <SearchField />
            */}
        </div>
    )
}

export default Home