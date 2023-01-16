import React, { useState, useContext, useEffect } from 'react'
import './TagItem.css'
import { AppContext } from '../../../App'

const TagItem = ({ tag }) => {

  let { selectedTagsState, setSelectedTagsState } = useContext(AppContext)

  const [activeBtn, setActiveBtn] = useState(false)

  let toggleActiveClass = activeBtn ? 'active' : null

  const handleSelect = () => {

    setActiveBtn(activeBtn => !activeBtn)

    if (selectedTagsState.indexOf(tag) === -1) {
      setSelectedTagsState(selectedTagsState => [...selectedTagsState, tag]) 
    } else {
      setSelectedTagsState(selectedTagsState => selectedTagsState.filter(el => el !== tag))
    }
  }

  const checkIfSelected = () => {
    if (selectedTagsState.indexOf(tag) !== -1) {
      setActiveBtn(true)
    }
  }

  useEffect(() => {
    checkIfSelected()
  }, [])

  return (
    <div className={`tag-item ${toggleActiveClass}`} onClick={() => handleSelect()}>
      <p>{tag}</p>
    </div>
  )
}

export default TagItem