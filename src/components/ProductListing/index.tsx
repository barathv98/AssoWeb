import { FC } from "react";
import SimpleSnackbar from '../../common/components/Snackbar';
import { ProductsLists } from '../../data/interface';
import useGeneral from "../../useGeneral";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import GeneralCard from '../GeneralCard';
import ProductCard from "../ProductCard";
import ProductsSidebar from '../ProductsSidebar';
import StickyCart from "../StickyCart";
import styles from './styles.module.scss';

interface ProductListingProps {
    productList: ProductsLists;
    generalProduct: boolean;
}
const ProductListing: FC<ProductListingProps> = ({ productList, generalProduct }) => {
    const { isMobile, isMobileTablet } = useDeviceDetect();
    const { cart } = useGeneral();
    return (
        <div className={styles.listingPage}>
            {!isMobileTablet && <div className={styles.sidebar}><ProductsSidebar /></div>}
            <div className={styles.productListing}>
                {productList.map((list: any) => {
                    return (
                        <div className={styles.productCategories} key={list.categoryId}>
                            <div className={styles.categoryName}>{list.categoryName}</div>
                            <div className={styles.categoryBooks}>
                                {list.categoryBooks.map((book: any) => {
                                    return (
                                        generalProduct
                                        ? <GeneralCard product={book} key={book.id} />
                                        : <ProductCard product={book} key={book.id} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                {isMobile && cart.length > 0 && <StickyCart />}
            </div>
            <SimpleSnackbar text="Item added" />
        </div>
    );
};

export default ProductListing;
