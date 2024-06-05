import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useContext, useState } from 'react';
import styles from './input-field.module.css';
import { AppContext } from '../App';
import { fetchFromDB } from '../utils';

export const InputField = ({ category, restaurantID, setTags, setFilters }) => {

    const { tagsArr, setTagsArr, filtersArr, setFiltersArr } = useContext(AppContext);

    const [newEntry, setNewEntry] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newEntry === "") {
            alert("Scrivi qualcosa prima di confermare!")
        } else {
            try {
                await addDoc(collection(db, category), {
                    name: newEntry
                });
                const restaurantRef = doc(db, 'restaurants', restaurantID);
                const restaurantSnap = await getDoc(restaurantRef);
                const restaurantData = restaurantSnap.data();
                const currentValues = restaurantData[category] || [];
                const updatedValues = [...currentValues, newEntry];
                await updateDoc(restaurantRef, {
                    [category]: updatedValues
                })
                if (category === "tags") {
                    setTags(updatedValues);
                    fetchFromDB('tags', tagsArr, setTagsArr);
                } else if (category === "filters") {
                    setFilters(updatedValues);
                    fetchFromDB('filters', filtersArr, setFiltersArr);
                }
                setNewEntry('');
            } catch (err) {
                alert("Error: " + err.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
            <input
                value={newEntry}
                className={styles["text-input"]}
                placeholder='Aggiungine uno nuovo'
                onChange={(e) => setNewEntry(e.target.value)}
            />
            <button type='submit'>
                Conferma
            </button>
        </form>
    )
};