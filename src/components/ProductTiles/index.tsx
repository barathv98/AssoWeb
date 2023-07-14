import { useNavigate } from 'react-router-dom';
import productTiles from '../../data/productTiles';
import styles from './styles.module.scss';

const ProductTiles = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.productTiles}>
            <div className={styles.title}>Book Categories</div>
            <div className={styles.tileContainer}>
                {productTiles.map((tile) => {
                    return (
                        <div className={styles.tile} onClick={() => navigate(tile.url)}>
                            <img className={styles.image} src={require(`../../assets/images/${tile.image}`)} alt={'tile'} />
                            <div className={styles.label}>{tile.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductTiles;
