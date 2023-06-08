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
            <div className={styles.productName}>{book.name} - {book.description}</div>
            {book.question && book.questionPrice > 0 && <div>Include Question</div>}
            {book.cd && book.cdPrice > 0 && <div>Include CD</div>}
            </div>
        </div>
    );
};

export default ProductCard;
