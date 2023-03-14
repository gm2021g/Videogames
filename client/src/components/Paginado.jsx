import React from 'react';
import styles from './Paginado.module.css';

export default function Paginado({ videogamesPerPage, allVideoGames, paginado, currPage }) {
    const pageNumbers = []
    const maxpage = Math.ceil(allVideoGames / videogamesPerPage)

    for (let i = 0; i < maxpage; i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul className={styles.pag_pagination}>
                {pageNumbers && pageNumbers.map(num => {
                    return (
                        <li className={styles.pag_each} key={num}>
                            <a onClick={() => paginado(num)}>{num}</a>
                        </li>
                    )
                })}
                <span>{`  Current Page:  ${currPage} `}</span>
            </ul>
        </nav>
    )
}
