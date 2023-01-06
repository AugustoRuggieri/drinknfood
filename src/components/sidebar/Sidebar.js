import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { db } from '../../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import TagItem from './tagItem/TagItem'
import FilterItem from './filterItem/FilterItem'

const Sidebar = () => {

    const [tags, setTags] = useState([])
    const [filters, setFilters] = useState([])

    const fetchTagsFromDB = async () => {
        setTags(tags => [])
        const tagsRef = collection(db, "tags");
        const q = query(tagsRef, where("name", "!=", ""))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setTags(tags => [...tags, doc.data().name]);
        })
    }

    const fetchFiltersFromDB = async () => {
        setFilters(filters => [])
        const filtersRef = collection(db, "filters");
        const q = query(filtersRef, where("name", "!=", ""))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setFilters(filters => [...filters, doc.data().name]);
        })
    }

    useEffect(() => {
        fetchTagsFromDB()
        fetchFiltersFromDB()
    }, [])

    return (
        <div className='sidebar'>
            <div className='tags-list'>
                <h6>Tipo di cucina</h6>
                {tags.map((tag, index) => <TagItem key={index} tag={tag} />)}
            </div>

            <hr />

            <div className='filters-list'>
                <h6>Filtri</h6>
                {filters.map((filter, index) => <FilterItem key={index} filter={filter} />)}
            </div>
        </div>
    )
}

export default Sidebar