import { booksList } from "../../data/booksList";
import ProductCard from "../ProductCard";
import styles from './styles.module.scss';

const ProductListing = () => {
    return (
        <div className={styles.productListing}>
            {booksList.map((list) => {
                return (
                    <div className={styles.productCategories}>
                        <div className={styles.categoryName}>{list.categoryName}</div>
                        <div className={styles.categoryBooks}>
                            {list.categoryBooks.map((book) => {
                                return (
                                    <ProductCard book={book} />
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ProductListing;
