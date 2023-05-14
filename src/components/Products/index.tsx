import { FC } from 'react';
import styles from './styles.module.scss';

interface ProductsProps {
    productRef: any;
}
const Products: FC<ProductsProps> = ({ productRef }) => {
    return (<div className={styles.products} ref={productRef}>
        <div className={styles.image}>
            <img src={require('../../assets/images/about.jpg')} alt="about us" />
        </div>
        <div className={styles.text}>
            <div className={styles.title}>Products</div>
            The DVC Group has served society through various ventures for more than 100 years. Peepal Tree, the Educational Wing of DVC Group, was  established in 2015 and is a group of premier foundation educational  institutions that offer quality preschool education, daycare, activity  centres, and after school programmes.
        </div>
    </div>)
};

export default Products;
