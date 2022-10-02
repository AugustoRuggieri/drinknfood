import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { db } from '../../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import TagItem from './tagItem/TagItem'
import { CryptoState } from '../../context/Context'

const Sidebar = () => {

    const tags = CryptoState()

    const fetchTagsFromDB = async () => {

        const tagsRef = collection(db, "tags");

        const q = query(tagsRef, where("name", "!=", ""))

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setTags(tags => [...tags, doc.data().name]);
        });

    }

    useEffect(() => {
        fetchTagsFromDB()
    }, [])

    return (
        <div className='sidebar'>

            {
                tags
                ?
                tags.map((tag, index) => {
                    return (
                        <TagItem key={index} tag={tag} />
                    )
                })
                :
                <p>No tags</p>
            }
            
        </div>
    )
}

export default Sidebar