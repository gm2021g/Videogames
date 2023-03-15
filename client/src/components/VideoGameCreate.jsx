import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postVideogame, getGenres } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from './VideoGameCreate.module.css';

function validate(input) {
    let errors = {};
    if (!input.name.trim()) {
        errors.name = 'Name is required';
    }
    if (!input.description.trim()) {
        errors.description = 'Description is required';
    }

    return errors;
}

export default function VideogameCreate() {
    const dispatch = useDispatch();
    const genre = useSelector((state) => state.genres);
    const platform = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '0',
        genres: [],
        platforms: [],
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelectGenre(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        })
    }

    function handleSelectPlatform(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        //valida campos del formulario
        if (!input.name) { return alert('Name is required') }
        if (!input.description) { return alert('Description is required') }
        if (input.rating < 0 || input.rating > 5) {
            return alert('Rating should be a number between 0-5')
        }
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );

        if (Object.keys(errors).length === 0) {
            dispatch(postVideogame(input));
            alert('Videogame created');

            setInput({
                name: '',
                image: '',
                description: '',
                released: '',
                rating: '0',
                genres: [],
                platforms: [],
            })
        } else {
            alert('ERROR: videogame not created ');
            return;
        }
    }

    function handleDeletePlatform(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== e),

        })
    }

    function handleDeleteGenre(e) {
        setInput({
            ...input, //me traigo el estado anterior
            genres: input.genres.filter(g => g !== e), //filtrar por todo lo que NO sea ese elemento 

        })
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    return (
        <>
            <div className={styles.create_home_container} >
                <Link className={styles.create_home} to='/home'>HOME</Link>

                <div className={styles.create_container_form}>
                    <h1 className={styles.create_ready}>Create Videogame</h1>
                    <form className={styles.create_form} onSubmit={(e) => handleSubmit(e)}>

                        <div>
                            <input className={styles.create_input}
                                placeholder='Videogame Name'
                                type='text'
                                value={input.name}
                                name='name'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className={styles.create_error}> {errors.name}  </p>
                            )}
                        </div>

                        <div>
                            <input className={styles.create_input}
                                placeholder='Image'
                                type='img'
                                value={input.image}
                                name='image'
                                alt='not found'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.image && (
                                <p className={styles.create_error}> {errors.image} </p>
                            )}
                        </div>

                        <div>
                            <input className={styles.create_input}
                                placeholder='Description'
                                type='text'
                                value={input.description}
                                name='description'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.description && (
                                <p className={styles.create_error}> {errors.description} </p>
                            )}
                        </div>

                        <div className={styles.create_released_container} >
                            <label className={styles.create_released}> Released </label>
                            <input className={styles.create_released_input}
                                type='date'
                                value={input.released}
                                name='released'
                                onChange={(e) => handleChange(e)}
                            />

                            <label className={styles.create_rating} >Rating </label>
                            <input className={styles.create_rating_input}
                                placeholder='0 to 5'
                                type='number'
                                value={input.rating}
                                name='rating'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className={styles.create_genres_container}>
                            <label className={styles.create_genres}> Genres </label>
                            <select className={styles.create_genres_input} onChange={(e) => handleSelectGenre(e)}>
                                {genre.map(g => (
                                    <option value={g.name}>{g.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.create_platforms_container}>
                            <label className={styles.create_platforms}>Platforms </label>
                            <select className={styles.create_platforms_input} onChange={(e) => handleSelectPlatform(e)}>
                                {platform.map(p => (
                                    <option value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <button className={styles.create} type='submit'>CREATE</button>
                        </div>
                    </form>

                    {input.genres.map(g =>
                        <div className={styles.create_x_genre_container}>
                            <label className={styles.create_x_genre}>{g}</label>
                            <button className={styles.create_x_genre_buttom} onClick={() => handleDeleteGenre(g)}>X</button>
                        </div>
                    )}

                    {input.platforms.map(p =>
                        <div className={styles.create_x_platform_container}>
                            <label className={styles.create_x_platform}> {p} </label>
                            <button className={styles.create_x_platform_buttom} onClick={() => handleDeletePlatform(p)}>X</button>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}