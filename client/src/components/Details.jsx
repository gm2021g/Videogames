import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index.js';
import { useEffect } from "react";
import styles from './Details.module.css';


export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch]);

    const detail = useSelector((state) => state.detail);
    function handleReset() {
        dispatch(getDetails());
    }

    return (
        <div >
            <div className={styles.detail_button_container}>
                <Link to={'/home'} onClick={handleReset}>
                    <button className={styles.detail_button}>HOME</button>
                </Link>
                <br />
                <div className={styles.detail_container_form}>
                    <h1 className={styles.detail_title}> {detail.name}</h1>
                    <h2> <b>ID:</b>{detail.id}</h2>
                    <img className={styles.detail_image} src={detail.image} alt='not found' />
                    <p className={styles.detail_genres}><b>Genres:</b> {detail.genres} </p>

                    <div className={styles.detail_title_container}>
                        <p className={styles.detail_description}><b>Description:</b> {detail.description}</p>
                        <p className={styles.detail_rating}><b>Rating:</b> {detail.rating}</p>
                        <p className={styles.detail_released}><b>Released:</b> {detail.released}</p>
                    </div>

                    <p className={styles.detail_platforms}>
                        <b>Platforms:</b> {detail.platforms} </p>

                </div>
            </div>
        </div>
    )
}
