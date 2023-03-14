import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameName } from '../actions';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!name.length) {
            alert('Please enter a videogame');
        } else {
            dispatch(getVideogameName(name));
            setName('Search Videogame');
        }
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.search_container}>
                    <input className={styles.search}
                        type='text'
                        value={name}
                        placeholder='Search Videogame'
                        onChange={(e) => handleInputChange(e)}
                    />
                    <button className={styles.search_button} type='submit' onClick={(e) => handleSubmit(e)}>🔎</button>
                </div>
            </form>
        </>
    )
}