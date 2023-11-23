import { FC } from "react";
import SimpleSnackbar from '../../common/components/Snackbar';
import { ProductsLists } from '../../data/interface';
import useGeneral from "../../useGeneral";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import DownloadBanner from '../DownloadBanner';
import GeneralCard from '../GeneralCard';
import ProductCard from '../ProductCard';
import ProductsSidebar from '../ProductsSidebar';
import StickyCart from '../StickyCart';
import styles from './styles.module.scss';

interface ProductListingProps {
	productList: ProductsLists;
	product: string;
}
const ProductListing: FC<ProductListingProps> = ({ productList, product }) => {
	const { isMobile, isMobileTablet } = useDeviceDetect();
	const { cart } = useGeneral();
	return (
		<div className={styles.listingPage}>
			{!isMobileTablet && (
				<div className={styles.sidebar}>
					<ProductsSidebar />
				</div>
			)}
			<div className={styles.productListing}>
				{product === 'registers' && <DownloadBanner product={product} />}
				{productList.map((list: any) => {
					return (
						<div className={styles.productCategories} key={list.categoryId}>
							<div className={styles.categoryName}>{list.categoryName}</div>
							<div className={styles.categoryBooks}>
								{list.categoryBooks.map((book: any) => {
									return product === 'registers' ? (
										<GeneralCard product={book} key={book.id} />
									) : (
										<ProductCard product={book} key={book.id} />
									);
								})}
							</div>
						</div>
					);
				})}
				{isMobile && cart.length > 0 && <StickyCart />}
			</div>
			<SimpleSnackbar text="Item added" />
		</div>
	);
};

export default ProductListing;
