import React, { useContext } from 'react'
import './Sidebar.css'
import TagItem from './tagItem/TagItem'
import FilterItem from './filterItem/FilterItem'
import { AppContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {

    const { tagsArr, filtersArr } = useContext(AppContext)

    const closeSidebar = () => {
        document.getElementById('sidebar').classList.toggle('active')
    }

    return (
        <div id='sidebar'>
            <div className='close-sidebar-btn' onClick={() => closeSidebar()}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </div>
            <div className='tags-list'>
                <h5 className='list-title'>Tipo di cucina:</h5>
                {tagsArr.map((tag, index) => <TagItem key={index} tag={tag} />)}
            </div>

            <hr />

            <div className='filters-list'>
                <h5 className='list-title'>Filtri:</h5>
                {filtersArr.map((filter, index) => <FilterItem key={index} filter={filter} />)}
            </div>
        </div>
    )
}

export default Sidebar