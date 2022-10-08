import React, { useState } from 'react';
import { db } from '../firebase';
import { getDocs, collection, query, where } from "firebase/firestore";

const SearchField = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [checkedTags, setCheckedTags] = useState([])
    const [filteredList, setFilteredList] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault();

        const restaurantRef = collection(db, "restaurants");

        // Create a query against the collection.
        const q = query(restaurantRef, where("name", "==", search.toLowerCase()));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setSearchResult(doc.data().tags);
        });
    }

    const addTag = (tag) => {
        if (checkedTags.includes(tag)) {
            checkedTags.splice(checkedTags.indexOf(tag), 1)
        } else {
            setCheckedTags([...checkedTags, tag])
        }
    }

    const searchRestaurants = async (e) => {
        e.preventDefault();

        const restaurantRef = collection(db, "restaurants");

        const q1 = query(restaurantRef, where("tags", "array-contains-any", checkedTags));

        const querySnapshot1 = await getDocs(q1);

        querySnapshot1.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setFilteredList(filteredList => [...filteredList, doc.data().name]);
        });
    }

    return (
        <>

            <form onSubmit={handleSearch}>
                <input onChange={(e) => setSearch(e.target.value)} placeholder='Cerca un locale...' />
                <button type='submit'>Ricerca</button>
            </form>

            <div style={{
                background: "#494949",
                marginTop: "15px",
                padding: "15px 40px 30px 40px"
            }}>
                <h2 style={{ color: "#fff" }}>Seleziona le tag che ti interessano: </h2>
                <div>
                    {searchResult.map((tag, index) => {
                        return (
                            <div key={index}>
                                <label style={{ color: "#fff", marginLeft: "8px" }}>
                                    <input type='checkbox' onChange={() => addTag(tag)} />{tag}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <button onClick={searchRestaurants}>Cerca locali simili</button>

                <div>
                    {filteredList.map((restaurant, index) => {
                        return (
                            <div key={index} style={{color: "#fff"}}>{restaurant}</div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default SearchField