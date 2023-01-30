import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './restaurantInfo.css'
import MapComponent from './mapComponent/MapComponent'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import SingleEntry from '../../SingleEntry'
import { AppContext } from '../../../App'

const RestaurantInfo = () => {

  const [restaurantID, setRestaurantID] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })
  const [tags, setTags] = useState([])
  const [filters, setFilters] = useState([])
  const [newTagEntry, setNewTagEntry] = useState('')
  const [newFilterEntry, setNewFilterEntry] = useState('')
  const [selectTags, setSelectTags] = useState([])
  const [selectFilters, setSelectFilters] = useState([])

  const { tagsArr, filtersArr } = useContext(AppContext)

  const { restaurant } = useParams()
  const navigate = useNavigate()

  const fetchCoordinates = async () => {
    const restaurantRef = collection(db, 'restaurants')
    const q = query(restaurantRef, where('name', '==', restaurant))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setRestaurantID(doc.id)
      setCoordinates({
        lat: doc.data().coordinates._lat,
        lng: doc.data().coordinates._long
      })
      if (doc.data().tags.length !== 0) {
        setTags([...doc.data().tags])
      }
      if (doc.data().filters.length !== 0) {
        setFilters([...doc.data().filters])
      }
    })
  }

  // Check to prevent showing tags already associated with the restaurant in the select 
  const filterTagsArrForSelect = () => {
    setSelectTags([])
    tagsArr.forEach((tag) => {
      if (!tags.includes(tag)) {
        setSelectTags(selectTags => [...selectTags, tag])
      }
    })
  }

  const filterFiltersArrForSelect = () => {
    setSelectFilters([])
    filtersArr.forEach((filter) => {
      if (!filters.includes(filter)) {
        setSelectFilters(selectFilters => [...selectFilters, filter])
      }
    })
  }

  const addTag = async (newTag) => {
    setTags(tags => [...tags, newTag])
    const restaurantRef = doc(db, 'restaurants', restaurantID)
    await updateDoc(restaurantRef, {
      tags: [...tags, newTag]
    })
  }

  const addFilter = async (newFilter) => {
    setFilters(filters => [...filters, newFilter])
    const restaurantRef = doc(db, 'restaurants', restaurantID)
    await updateDoc(restaurantRef, {
      filters: [...filters, newFilter]
    })
  }

  const addNewTagEntry = async (tagEntry) => {
    tagEntry = tagEntry.toLowerCase()
    addTag(tagEntry)
    await addDoc(collection(db, 'tags'), {
      name: tagEntry
    })
    setNewTagEntry('')
  }

  const addNewFilterEntry = async (filterEntry) => {
    filterEntry = filterEntry.toLowerCase()
    addFilter(filterEntry)
    await addDoc(collection(db, 'filters'), {
      name: filterEntry
    })
    setNewFilterEntry('')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCoordinates()
  }, [])

  useEffect(() => {
    filterTagsArrForSelect()
  }, [tags])

  useEffect(() => {
    filterFiltersArrForSelect()
  }, [filters])

  return (
    <div className='restaurant-info'>
      <header className='restaurant-header'>
        <div className='info-section half-row-section'>
          <div className='restaurant-name'>
            <h2>{restaurant}</h2>
          </div>
          <section className='user-notes-section'>
            <h4>Note:</h4>
            {/* <div className='user-notes'>
              { }
            </div>
            <button>Aggiungi note</button>
            <textarea /> */}
          </section>
        </div>
        <div className='map-container half-row-section'>
          <MapComponent coordinates={coordinates} />
        </div>
      </header>

      <div className='tags-and-filters-wrapper'>
        <div className='container-row'>
          <div className='half-row-section'>
            <h3>Tag associate a questo locale: </h3>
            <div className='list-container' id='tags-container'>
              {
                tags.length !== 0
                  ?
                  tags.map((tag, index) => {
                    return (
                      <SingleEntry
                        key={index}
                        id="tag"
                        text={tag}
                        setTags={setTags}
                        restaurantID={restaurantID}
                      />
                    )
                  })
                  :
                  null
              }
            </div>
          </div>

          <div className='half-row-section'>
            <h3>Filtri associati a questo locale: </h3>
            <div className='list-container' id='filters-container'>
              {
                filters.length !== 0
                  ?
                  filters.map((filter, index) => {
                    return (
                      <SingleEntry
                        key={index}
                        id="filter"
                        text={filter}
                        setFilters={setFilters}
                        restaurantID={restaurantID}
                      />
                    )
                  })
                  :
                  null
              }
            </div>
          </div>
        </div>
      </div>

      <div className='select-wrapper'>
        <div className='container-row'>
          <div className='half-row-section'>
            <h4>Seleziona una tag da associare a questo locale: </h4>
            <select onChange={(e) => addTag(e.target.value)}>
              <option selected disabled></option>
              {selectTags.map((tag, index) => {
                return (
                  <option key={index}>{tag}</option>
                )
              })}
            </select>
            <div className='user-entry'>
              <h4>Aggiungi una nuova tag</h4>
              <div className='input-entry'>
                <input onChange={(e) => setNewTagEntry(e.target.value)} value={newTagEntry} placeholder='Scrivi qualcosa...' />
                <button onClick={() => addNewTagEntry(newTagEntry)}>Aggiungi tag</button>
              </div>
            </div>
          </div>
          <div className='half-row-section'>
            <h4>Seleziona un filtro da associare a questo locale: </h4>
            <select onChange={(e) => addFilter(e.target.value)}>
              <option selected disabled></option>
              {selectFilters.map((filter, index) => {
                return (
                  <option key={index}>{filter}</option>
                )
              })}
            </select>
            <div className='user-entry'>
              <h4>Aggiungi un nuovo filtro</h4>
              <div className='input-entry'>
                <input onChange={(e) => setNewFilterEntry(e.target.value)} value={newFilterEntry} placeholder='Scrivi qualcosa...' />
                <button onClick={() => addNewFilterEntry(newFilterEntry)}>Aggiungi filtro</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='btn-wrapper'>
        <button id='go-back-btn' onClick={() => navigate(-1)}>Torna ai risultati</button>
      </div>
    </div>
  )
}

export default RestaurantInfo