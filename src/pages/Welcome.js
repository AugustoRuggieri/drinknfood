import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Welcome.css'

const Welcome = () => {

    const navigate = useNavigate()

    return (
        <div className='welcome-page'>
            <div className='welcome-content'>
                <h1>Benvenut* su aperitiBO</h1>
                <p>Inizia subito a cercare locali vicino a te!</p>
                <button onClick={() => navigate('/home')}>Inizia</button>
            </div>
        </div>
    )
}

export default Welcome