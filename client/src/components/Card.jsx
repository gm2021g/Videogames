import React from 'react';
import { Link } from "react-router-dom";
import styles from './Card.module.css';

export default function Card({ id, image, name, genre }) {
    return (
        <>
            <div className={styles.card}>
                <li className={styles.card_game}>
                    <Link to={'/videogames/' + id}>
                        <img className={styles.card_image} src={image} alt={name} />
                    </Link>
                    <div className={styles.card_name}> <h3>{name}</h3> </div>
                    <div className={styles.card_genre}> <h5>{genre.map(e => { return e.name + ", " })}</h5> </div>
                </li>
            </div>
        </>
    );
}