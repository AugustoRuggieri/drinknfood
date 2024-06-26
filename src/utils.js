import { collection, addDoc, GeoPoint, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'

export const saveSingleRestaurantToDB = async (restaurant) => {
    try {
        const collectionRef = collection(db, 'restaurants')
        const q = query(collectionRef, where("name", "==", restaurant.name))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            // Aggiungo il ristorante
            await addDoc(collection(db, 'restaurants'), {
                name: restaurant.name,
                coordinates: new GeoPoint(restaurant.coordinates.latitude, restaurant.coordinates.longitude),
                tags: restaurant.tags,
                filters: restaurant.filters
            })
            return
        }
        // Aggiungo tag e filtri a un ristorante già presente
        if (restaurant.tags === undefined) {
            alert('Tags indefinito per il ristorante ' + restaurant.name)
            return
        }
        restaurant.tags.forEach(async (tag) => {
            var docTags = querySnapshot.docs[0].data().tags
            if (!docTags.includes(tag)) {
                await updateDoc(querySnapshot.docs[0].ref, {
                    tags: [...docTags, tag]
                })
            }
        })
        if (restaurant.filters === undefined) {
            alert('Filters indefinito per il ristorante ' + restaurant.name)
            return
        }
        restaurant.filters.forEach(async (filter) => {
            var docFilters = querySnapshot.docs[0].data().filters
            if (!docFilters.includes(filter)) {
                await updateDoc(querySnapshot.docs[0].ref, {
                    filters: [...docFilters, filter]
                })
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const saveOnFile = (objectToBeSaved, fileName) => {
    var blob = new Blob([objectToBeSaved], { type: 'application/json' })
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = fileUrl
    link.click()
}

export const readCollection = async (database, collectionName, queryConstraint) => {
    var documents = []
    const collectionRef = collection(database, collectionName)
    const q = query(collectionRef, queryConstraint)
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        documents.push(doc.data())
    })
    return documents
}

export const convertToJSON = (arrayToBeConverted) => {
    var documentsJSON = []
    arrayToBeConverted.forEach((doc) => {
        documentsJSON.push(JSON.stringify(doc))
    })
    return documentsJSON
}

export const fetchFromDB = async (collectionName, arrayToFill, setMethod) => {
    setMethod(arrayToFill => [])
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("name", "!=", ""))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setMethod(arrayToFill => [...arrayToFill, doc.data().name]);
    })
  }