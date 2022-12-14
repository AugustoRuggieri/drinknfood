import React, { useContext, useState, useEffect } from 'react'
import './AuthModal.css'
import Login from './Login'
import SignUp from './SignUp'
import { AppContext } from '../../../App'

const AuthModal = () => {

  const { showModal, setShowModal } = useContext(AppContext)

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
      document.getElementById('login-tab').classList.remove('selected')
      document.getElementById('signup-tab').classList.add('selected')
    } else {
      setModalContent(<Login />)
      document.getElementById('signup-tab').classList.remove('selected')
      document.getElementById('login-tab').classList.add('selected')
    }
  }, [tabValue])


  return (
    <div id='auth-modal'>
      <div className='modal-content'>
        <header>
          <table>
            <thead>
              <tr>
                <th className='tab' id='login-tab' onClick={() => setTabValue(0)}>Accedi</th>
                <th className='tab' id='signup-tab' onClick={() => setTabValue(1)}>Registrati</th>
              </tr>
            </thead>
          </table>
        </header>
        <div className='modal-body'>
          {modalContent}
        </div>
      </div>
    </div>
  )
}

export default AuthModal