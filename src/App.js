import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import RestaurantInfo from './components/restaurants/restaurantInfo/RestaurantInfo'
import Restaurants from './components/restaurants/Restaurants'
import Account from './pages/Account'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Restaurants />} />
        <Route path='restaurants/:restaurant' element={<RestaurantInfo />} />
        <Route path='account' element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
