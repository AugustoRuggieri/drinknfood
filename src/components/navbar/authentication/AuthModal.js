import React, { useContext, useState, useEffect } from 'react'
import { DrinkNFood } from '../../../context/Context'
import './AuthModal.css'
import Login from './Login'
import SignUp from './SignUp'

const AuthModal = () => {

  const { showModal, setShowModal } = useContext(DrinkNFood)

  const [tabValue, setTabValue] = useState(0)
  const [modalContent, setModalContent] = useState(<Login />)

  window.onclick = (e) => {
    var modal = document.getElementById('auth-modal')
    if (e.target == modal) {
      setShowModal(!showModal)
    }
  }

  useEffect(() => {
    if (tabValue == 1) {
      setModalContent(<SignUp />)
    } else {
      setModalContent(<Login />)
    }
  }, [tabValue])


  return (
    <div id='auth-modal'>
      <div className='modal-content'>
        <header>
          <table>
            <thead>
              <tr>
                <th className='tab' onClick={() => setTabValue(0)}>Log in</th>
                <th className='tab' onClick={() => setTabValue(1)}>Sign up</th>
              </tr>
            </thead>
          </table>
        </header>
        <div>
          {modalContent}
        </div>
      </div>
    </div>
  )
}

export default AuthModal