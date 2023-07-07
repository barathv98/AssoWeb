import Downloads from '../Downloads';
import styles from './styles.module.scss';

const Products = () => {
    return (<div className={styles.products}>
        <div className={styles.image}>
            <img src={require('../../assets/images/products.jpg')} alt="about us" />
        </div>
        <div className={styles.textContainer}>
            <div className={styles.sectionTitle}>Products</div>
            <div className={styles.content}>
                We offer a wide variety of text books and activity books for kids from Pre KG to Std V.
                <Downloads />
            </div>
        </div>
    </div>)
};

export default Products;
