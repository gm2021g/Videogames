
import loading_gif from '../images/loading_649vy31n.gif';
import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader} >
            <img src={loading_gif} alt="loading" />
        </div>
    )
};