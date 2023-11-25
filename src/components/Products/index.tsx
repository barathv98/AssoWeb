import { useNavigate } from 'react-router-dom';
import { productTiles } from '../../data/productTiles';
import Downloads from '../Downloads';
import styles from './styles.module.scss';

const Products = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.products}>
			<div className={styles.image}>
				<img src={require('../../assets/images/products.webp')} alt="products" loading="lazy" />
			</div>
			<div className={styles.textContainer}>
				<div className={styles.sectionTitle}>Products</div>
				<div className={styles.content}>
					We offer a wide variety of text books and activity books for kids from Pre KG to Std V.
					<div className={styles.productTiles}>
						{productTiles.map((tile) => {
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
					<Downloads />
				</div>
			</div>
		</div>
	);
};

export default Products;
