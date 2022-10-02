import React from 'react'
import SingleEntry from './SingleEntry'

const EntriesList = ({ inputList, user }) => {

    return (
        <div className='entries-list'>
            {inputList?.map((input, index) =>
                <SingleEntry key={index} input={input} inputList={inputList} user={user} />
            )}
        </div>
    )
}

export default EntriesList