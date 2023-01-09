import React, { useState, useEffect, useContext } from 'react'
import './TagItem.css'
import { AppContext } from '../../../App'

const TagItem = ({ tag }) => {

  let { selectedTagsState, setSelectedTagsState } = useContext(AppContext)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = async (e) => {

    setActiveBtn(activeBtn => !activeBtn)

    if (selectedTagsState.indexOf(tag) === -1) {
      setSelectedTagsState(selectedTagsState => [...selectedTagsState, tag]) 
    } else {
      setSelectedTagsState(selectedTagsState => selectedTagsState.filter(el => el !== tag))
    }
  }

  return (
    <div className={`tag-item ${toggleActiveClass}`} onClick={(e) => handleSelect(e)}>
      <p>{tag}</p>
    </div>
  )
}

export default TagItem