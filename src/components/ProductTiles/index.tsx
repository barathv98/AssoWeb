import productTiles from '../../data/productTiles';
import styles from './styles.module.scss';

const ProductTiles = () => {
    return (
        <div className={styles.productTiles}>
            <div className={styles.title}>Book Categories</div>
            <div className={styles.tileContainer}>
                {productTiles.map((tile) => {
                    return (
                        <div className={styles.tile}>
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
