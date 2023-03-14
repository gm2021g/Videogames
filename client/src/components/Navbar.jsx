import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar({ handleFilterGenre, handleFilterCreated, handleRating, handleSort }) {

    const allGenre = useSelector(state => state.genres);

    return (
        <div>
            <div>
                <h1 className={styles.navbar_title}>HENRY AWESOME VIDEOGAMES</h1>
                <div className={styles.navbar_container}>
                    <SearchBar />
                </div>
            </div>


            <select className={styles.select} onChange={(e) => handleSort(e)}>
                <option>Option</option>
                <option value='Asc'>A-Z</option>
                <option value='Desc'>Z-A</option>
            </select>

            <select className={styles.select} onChange={(e) => handleRating(e)}>
                <option>Rating</option>
                <option value="Top">Rating Top</option>
                <option value="Low">Rating Low</option>
            </select>

            <select className={styles.select} onChange={(e) => handleFilterCreated(e)}>
                <option>Games</option>
                <option value='All'>All</option>
                <option value='Created'>Created</option>
                <option value='Api'>Existent</option>
            </select>

            <select className={styles.select} onChange={(e) => handleFilterGenre(e)}>
                <option>Genres</option>
                <option value='All'>All</option>

                {allGenre.map((genre) => (
                    <option key={genre.name} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>

            <Link className={styles.button_create_videogame} to='/videogames'>CREATE VIDEOGAME</Link>
        </div>
    )
}