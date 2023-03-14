import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.landing_page}>
            <div>
                <h1 className={styles.landing_title}>HENRY AWESOME VIDEOGAMES</h1>
                <h2 className={styles.landing_subtitle}>
                    If you are looking for videogames, you are in the right place...
                    <br />
                    You can also create new videogames!</h2>

                <Link to='/home'>
                    <button className={styles.landing_button}>ENTER</button>
                </Link>
            </div>
        </div>
    )
}