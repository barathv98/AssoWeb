import { useNavigate } from 'react-router-dom';
import { bookTiles } from '../../data/productTiles';
import styles from './styles.module.scss';

const ProductTiles = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.productTiles}>
			<div className={styles.title}>Book Categories</div>
			<div className={styles.tileContainer}>
				{bookTiles.map((tile) => {
					return (
						<div className={styles.tile} onClick={() => navigate(tile.url)} key={tile.label}>
							<img
								className={styles.image}
								src={require(`../../assets/images/${tile.image}`)}
								alt={'tile'}
								loading="lazy"
							/>
							<div className={styles.label}>{tile.label}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductTiles;
