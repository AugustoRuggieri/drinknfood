import React, { useContext, useState } from 'react'
import { DrinkNFood } from '../../../context/Context'
import './filterItem.css'

const FilterItem = ({ filter }) => {

  let { selectedFiltersState, setSelectedFiltersState } = useContext(DrinkNFood)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = async () => {
    
    setActiveBtn(activeBtn => !activeBtn)

    if (selectedFiltersState.indexOf(filter) === -1) {
      setSelectedFiltersState(selectedFiltersState => [...selectedFiltersState, filter]) 
    } else {
      setSelectedFiltersState(selectedFiltersState => selectedFiltersState.filter(el => el !== filter))
    }
  }

  return (
    <div className={`filter-item ${toggleActiveClass}`} onClick={(e) => handleSelect(e)}>
      <p>{filter}</p>
    </div>
  )
}

export default FilterItem