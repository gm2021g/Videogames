import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index.js';
import { useEffect } from "react";
import styles from './Details.module.css';
import Loader from './Loader';

export default function Details() {
    const dispatch = useDispatch(); // trae datos del est. global del reducer
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch]);

    const detail = useSelector((state) => state.detail);

    function handleReset() {
        dispatch(getDetails()); // llama sin el id
    }

    if (Object.entries(detail).length === 0) {
        return (<Loader />);
    }
    else
        return (
            <div >
                <div>
                    <Link to={'/home'} onClick={handleReset}>
                        <button className={styles.detail_button}>HOME</button>
                    </Link>
                    <br />
                    <div className={styles.detail_container_form}>
                        <h1 className={styles.detail_title}> {detail.name} </h1>

                        <img className={styles.detail_image} src={detail.image} />

                        <div>
                            <p className={styles.detail_genres}><b>Genres:</b> {detail.genres} </p>
                            <p className={styles.detail_rating}> <b>ID:</b>{detail.id}</p>
                            <p className={styles.detail_rating}><b>Rating:</b> {detail.rating}</p>
                            <p className={styles.detail_released}><b>Released:</b> {detail.released}</p>
                            <p className={styles.detail_platforms}> <b>Platforms:</b> {detail.platforms} </p>
                        </div>

                        <div className={styles.detail_description_form}>
                            <p className={styles.detail_description}> {detail.description}</p>
                        </div>

                    </div>

                </div>
            </div>
        )
}
