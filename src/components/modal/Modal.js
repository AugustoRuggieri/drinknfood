import { useContext } from "react"
import "./Modal.css"
import { ModalContext } from "../../contexts/ModalContext"

const Modal = (/* { header, children, isVisible, setIsVisible } */) => {
    const {isVisible, setIsVisible, modalContent} = useContext(ModalContext)

    window.onclick = (e) => {
        var modal = document.getElementById('modal')
        if (e.target == modal) {
            setIsVisible(!isVisible)
        }
    }

    return (
        <div id='modal'>
            <div className='modal-content'>
                {/* {header &&
                    <header>
                        {header}
                    </header>} */}
                <div className='modal-body'>
                    {modalContent}
                </div>
            </div>
        </div>
    )
}

export default Modal