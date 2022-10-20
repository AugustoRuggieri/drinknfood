import React, { useContext, useState } from 'react'
import { DrinkNFood } from '../../../context/Context'
import './filterItem.css'

var selectedFilters = []

const FilterItem = ({ filter }) => {

  let { setSelectedFiltersState } = useContext(DrinkNFood)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = async () => {
    
    setActiveBtn(activeBtn => !activeBtn)

    if (selectedFilters.indexOf(filter) === -1) {
      selectedFilters = [...selectedFilters, filter]
    } else {
      selectedFilters = selectedFilters.filter(el => el !== filter)
    }
    setSelectedFiltersState(selectedFilters)
  }

  return (
    <div className={`filter-item ${toggleActiveClass}`} onClick={(e) => handleSelect(e)}>
      <p>{filter}</p>
    </div>
  )
}

export default FilterItem