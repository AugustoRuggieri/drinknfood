import { useContext } from "react"
import { ModalContext } from "../../../contexts/ModalContext"
import { db } from "../../../firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { AppContext } from "../../../App"
import { useNavigate } from "react-router-dom"
import "./DeleteConfirm.css"

const DeleteConfirm = ({ restaurantID }) => {

    const { setIsVisible } = useContext(ModalContext)
    const { fetchRestaurants } = useContext(AppContext)

    const navigate = useNavigate()

    const deleteRestaurant = async () => {
        try {
            await deleteDoc(doc(db, 'restaurants', restaurantID));
            alert('Questo locale è stato eliminato dal database');
            await fetchRestaurants();
            setIsVisible(false);
            navigate('/home');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h2>Sei sicuro?</h2>
            <div className="deleteButtons">
                <button onClick={() => deleteRestaurant()}>si</button>
                <button onClick={() => setIsVisible(false)}>no</button>
            </div>
        </>
    )
}

export default DeleteConfirm