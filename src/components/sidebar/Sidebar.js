import React, { useContext } from 'react'
import './Sidebar.css'
import TagItem from './tagItem/TagItem'
import FilterItem from './filterItem/FilterItem'
import { DrinkNFood } from '../../context/Context'

const Sidebar = () => {

    const { tagsArr, filtersArr } = useContext(DrinkNFood)

    return (
        <div className='sidebar'>
            <div className='tags-list'>
                <h5>Tipo di cucina:</h5>
                {tagsArr.map((tag, index) => <TagItem key={index} tag={tag} />)}
            </div>

            <hr />

            <div className='filters-list'>
                <h5>Filtri:</h5>
                {filtersArr.map((filter, index) => <FilterItem key={index} filter={filter} />)}
            </div>
        </div>
    )
}

export default Sidebar