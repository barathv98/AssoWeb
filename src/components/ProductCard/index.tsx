import { FC } from 'react';
import styles from './styles.module.scss';
import { Book } from '../../data/interface';

interface ProductCardProps {
    book: Book;
}
const ProductCard: FC<ProductCardProps> = ({ book }) => {
    const imgSrc = require(`../../assets/images/${book.imgName}`);
    return (
        <div className={styles.productCard}>
            <img className={styles.productImage} src={imgSrc} alt={`${book.name}`} />
            <div className={styles.productContent}>
                <div className={styles.contentTop}>
                    <div className={styles.productName}>{book.name} {book.description && `- ${book.description}`}</div>
                    {book.question && book.questionPrice === 0 && <div className={styles.extrasStmt}>Free Question Paper</div>}
                    {book.question && book.questionPrice > 0 && <div>
                        <input type="checkbox" id="question" name="question"></input>
                        <label htmlFor="question">Include Question</label>
                    </div>}
                    {book.cd && book.cdPrice === 0 && <div className={styles.extrasStmt}>Free CD</div>}
                    {book.cd && book.cdPrice > 0 && <div>
                        <input type="checkbox" id="cd" name="cd" />
                        <label htmlFor="cd">Include CD</label>
                    </div>}
                </div>
                <div className={styles.contentBottom}>
                    <div className={styles.price}><span className={styles.symbol}>₹</span> {book.price}</div>
                    <div className={styles.quantityRow}>
                        <div className={styles.quantityInput}>Qty
                            <input type="number" className={styles.inputField} id="quantity" name="quantity" />
                        </div>
                        <button className={styles.addCartButton}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
