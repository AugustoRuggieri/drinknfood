const DeleteConfirm = ({restaurantID, isVisible, setIsVisible }) => {
    return(
        <div>
            <p>Sei sicuro?</p>
            <div>
                <button onClick={() => alert(`stai cancellando il ristorante ${restaurantID}`)}>si</button>
                <button onClick={() => setIsVisible(false)}>no</button>
            </div>
        </div>
    )
}

export default DeleteConfirm