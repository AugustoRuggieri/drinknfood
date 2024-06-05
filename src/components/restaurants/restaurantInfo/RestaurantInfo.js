import React, { useState, useContext, useEffect, memo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './restaurantInfo.css'
import MapComponent from './mapComponent/MapComponent'
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import SingleEntry from '../../SingleEntry'
import { AppContext } from '../../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartCrack, faTrash } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import { InputField } from '../../InputField'

export const RestaurantInfo = memo(function RestaurantInfo() {

  const [restaurantID, setRestaurantID] = useState('')
  const [tags, setTags] = useState([])
  const [filters, setFilters] = useState([])
  const [selectTags, setSelectTags] = useState([])
  const [addedTags, setAddedTags] = useState([])
  const [selectFilters, setSelectFilters] = useState([])
  const [addedFilters, setAddedFilters] = useState([])

  const { tagsArr, filtersArr, user, favorites } = useContext(AppContext);
  const { restaurant } = useParams();
  const navigate = useNavigate();
  const inFavorites = favorites.includes(restaurant);

  const fetchRestaurantInfo = async () => {
    const restaurantRef = collection(db, 'restaurants')
    const q = query(restaurantRef, where('name', '==', restaurant))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setRestaurantID(doc.id)
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
        setSelectTags(selectTags => [...selectTags, {
          value: tag,
          label: tag
        }])
      }
    })
  }

  const filterFiltersArrForSelect = () => {
    setSelectFilters([])
    filtersArr.forEach((filter) => {
      if (!filters.includes(filter)) {
        setSelectFilters(selectFilters => [...selectFilters, {
          value: filter,
          label: filter
        }])
      }
    })
  }

  const handleTagsSelectChange = (selectedOptions) => {
    setAddedTags(selectedOptions);
  }

  const handleFiltersSelectChange = (selectedOptions) => {
    setAddedFilters(selectedOptions);
  }

  const addTag = async (newTag) => {
    const newTags = Array.isArray(newTag) ? newTag : [newTag];
    setTags(tags => [...tags, ...newTags])
    const restaurantRef = doc(db, 'restaurants', restaurantID)
    await updateDoc(restaurantRef, {
      tags: [...tags, ...newTags]
    })
  }

  const addFilter = async (newFilter) => {
    const newFilters = Array.isArray(newFilter) ? newFilter : [newFilter];
    setFilters(filters => [...filters, ...newFilters])
    const restaurantRef = doc(db, 'restaurants', restaurantID)
    await updateDoc(restaurantRef, {
      filters: [...filters, ...newFilters]
    })
  }

  const handleTagsConfirmClick = () => {
    const selectedValues = addedTags.map(item => item.value);
    addTag(selectedValues);
  }

  const handleFiltersConfirmClick = () => {
    const selectedValues = addedFilters.map(item => item.value);
    addFilter(selectedValues);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchRestaurantInfo()
  }, [])

  useEffect(() => {
    filterTagsArrForSelect()
  }, [tags])

  useEffect(() => {
    filterFiltersArrForSelect()
  }, [filters])

  const addToFavorites = async () => {
    const docRef = doc(db, "favorites", user.uid);
    try {
      await setDoc(docRef, { restaurants: favorites ? [...favorites, restaurant] : [restaurant] });
    } catch (err) {
      alert(err.message);
    }
  }

  const removeFromFavorites = async () => {
    const docRef = doc(db, "favorites", user.uid);
    try {
      await setDoc(docRef, { restaurants: favorites.filter(fav => fav !== restaurant) }, { merge: "true" });
    } catch (err) {
      alert(err.message);
    }
  }

  const deleteRestaurant = async () => {
    try {
      await deleteDoc(db, 'restaurants', where('name', '==', restaurant));
      alert('Questo locale è stato eliminato dal database');
      navigate('/home');
    } catch (error) {
      console.log(error.message);
    }
  }

  const customStyles = {
    container: (provided) => ({
      ...provided,
      flex: 1,
      textAlign: "left"
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "none",
      border: "2px solid",
      width: "100%"
    })
  }

  return (
    <div className='restaurant-info'>
      <header className='restaurant-header'>
        <div className='info-section half-row-section'>
          <h2 className='restaurant-name'>{restaurant}</h2>
          <section className='user-notes-section'>
            {
              user && <button className='favorites-btn' onClick={inFavorites ? removeFromFavorites : addToFavorites}>
                {
                  inFavorites ?
                    <>
                      Rimuovi dai preferiti
                      <FontAwesomeIcon icon={faHeartCrack} style={{ color: "#ffffff" }} className='icon' />
                    </>
                    :
                    <>
                      Aggiungi ai preferiti
                      <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} className='icon' />
                    </>
                }
              </button>
            }
            {
              user && <button className='favorites-btn'>
                Rimuovi dalla lista
                <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} className='icon' onClick={deleteRestaurant} />
              </button>
            }
          </section>
        </div>
        <div className='half-row-section'>
          <MapComponent restaurant={restaurant} />
        </div>
      </header>

      <div className='tags-and-filters-wrapper'>
        <div className='container-row'>
          <div className='half-row-section'>
            <h3>Tag associati a questo locale: </h3>
            <div className='list-container' id='tags-container'>
              {
                tags.length !== 0
                  ?
                  tags.map((tag, index) => {
                    return (
                      <SingleEntry
                        key={index}
                        category="tag"
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
                        category="filter"
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
            <div className='select-container'>
              <Select
                options={selectTags}
                isMulti
                placeholder="Seleziona un tag"
                onChange={handleTagsSelectChange}
                styles={customStyles}
              />
              <button onClick={handleTagsConfirmClick}>conferma</button>
            </div>
            <div className="divider">
              - oppure -
            </div>
            <div className='user-entry'>
              <InputField
                category="tags"
                restaurantID={restaurantID}
                setTags={setTags}
                setFilters={setFilters}
              />
            </div>
          </div>
          <div className='half-row-section'>
            <div className='select-container'>
              <Select
                options={selectFilters}
                isMulti
                onChange={handleFiltersSelectChange}
                placeholder="Seleziona un filtro"
                styles={customStyles}
              />
              <button onClick={handleFiltersConfirmClick}>conferma</button>
            </div>
            <div className="divider">
              - oppure -
            </div>
            <div className='user-entry'>
              <InputField
                category="filters"
                restaurantID={restaurantID}
                setTags={setTags}
                setFilters={setFilters}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='btn-wrapper'>
        <button id='go-back-btn' onClick={() => navigate(-1)}>Torna ai risultati</button>
      </div>
    </div>
  )
})