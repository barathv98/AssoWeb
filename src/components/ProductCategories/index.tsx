import DownloadBanner from '../DownloadBanner';
import ProductTiles from '../ProductTiles';
import styles from './styles.module.scss';

const ProductCategories = () => {
	return (
		<div className={styles.productCategories}>
			<DownloadBanner product={'books'} />
			<ProductTiles />
		</div>
	);
};

export default ProductCategories;
