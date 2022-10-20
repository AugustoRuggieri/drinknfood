import React, { useState, useEffect, useContext } from 'react'
import './TagItem.css'
import { DrinkNFood } from '../../../context/Context'

var selectedTags = []

const TagItem = ({ tag }) => {

  let { setSelectedTagsState } = useContext(DrinkNFood)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = async (e) => {

    setActiveBtn(activeBtn => !activeBtn)

    if (selectedTags.indexOf(tag) === -1) {
      selectedTags = [...selectedTags, tag]
    } else {
      selectedTags = selectedTags.filter(el => el !== tag)
    }
    setSelectedTagsState(selectedTags)
  }

  return (
    <div className={`tag-item ${toggleActiveClass}`} onClick={(e) => handleSelect(e)}>
      <p>{tag}</p>
    </div>
  )
}

export default TagItem