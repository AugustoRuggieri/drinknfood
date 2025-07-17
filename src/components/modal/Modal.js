import "./Modal.css"

const Modal = ({ header, children, isVisible, setIsVisible }) => {

    window.onclick = (e) => {
        var modal = document.getElementById('modal')
        if (e.target == modal) {
            setIsVisible(!isVisible)
        }
    }


    return (
        <div id='modal'>
            <div className='modal-content'>
                {header &&
                    <header>
                        {header}
                    </header>}
                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal