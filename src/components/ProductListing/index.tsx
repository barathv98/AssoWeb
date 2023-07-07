import { FC } from "react";
import useGeneral from "../../useGeneral";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import ProductCard from "../ProductCard";
import StickyCart from "../StickyCart";
import styles from './styles.module.scss';
import ProductsSidebar from "../ProductsSidebar";

interface ProductListingProps {
    productList: any;
}
const ProductListing: FC<ProductListingProps> = ({ productList }) => {
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
                                        <ProductCard book={book} key={book.id} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                {isMobile && cart.length > 0 && <StickyCart />}
            </div>
        </div>
    );
};

export default ProductListing;
