import React, { useEffect, useContext, useState } from 'react'
import './filterItem.css'
import { AppContext } from '../../../App'

const FilterItem = ({ filter }) => {

  let { selectedFiltersState, setSelectedFiltersState } = useContext(AppContext)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = () => {
    
    setActiveBtn(activeBtn => !activeBtn)

    if (selectedFiltersState.indexOf(filter) === -1) {
      setSelectedFiltersState(selectedFiltersState => [...selectedFiltersState, filter]) 
    } else {
      setSelectedFiltersState(selectedFiltersState => selectedFiltersState.filter(el => el !== filter))
    }
  }

  const checkIfSelected = () => {
    if (selectedFiltersState.indexOf(filter) !== -1) {
      setActiveBtn(true)
    }
  }

  useEffect(() => {
    checkIfSelected()
  }, [])

  return (
    <div className={`filter-item ${toggleActiveClass}`} onClick={() => handleSelect()}>
      <p>{filter}</p>
    </div>
  )
}

export default FilterItem