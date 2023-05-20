import { FC } from 'react';
import styles from './styles.module.scss';
import { MdArrowForwardIos } from "react-icons/md";
import {ReactComponent as BookIcon} from '../../assets/icons/book.svg';
import {ReactComponent as DiaryIcon} from '../../assets/icons/diary.svg';
import {ReactComponent as RegisterIcon} from '../../assets/icons/register.svg';

interface ProductsProps {
    productRef: any;
}
const Products: FC<ProductsProps> = ({ productRef }) => {
    return (<div className={styles.products} ref={productRef}>
        <div className={styles.image}>
            <img src={require('../../assets/images/about.jpg')} alt="about us" />
        </div>
        <div className={styles.textContainer}>
            <div className={styles.sectionTitle}>Products</div>
            <div className={styles.content}>
                We offer a wide variety of text books and activity books for kids from Pre KG to Std V.
                Please click below to view our catalogues
                <div className={styles.productLinks}>
                    <div className={styles.linkContainer}>
                        <div className={`${styles.iconContainer} ${styles.book}`}><BookIcon /></div>
                        <div className={styles.text}>
                            <div className={styles.title}>School Books</div>
                            <div className={styles.subTitle}>
                                Term books with Ques paper, Writing books, Hindi, GK, Computer Science Books, Drawing Books
                            </div>
                        </div>
                        <div className={styles.arrowContainer}>
                            <MdArrowForwardIos />
                        </div>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={`${styles.iconContainer} ${styles.register}`}><RegisterIcon /></div>
                        <div className={styles.text}>
                            <div className={styles.title}>Attendance Registers</div>
                            <div className={styles.subTitle}>
                                Term books with Ques paper, Writing books, Hindi, GK, Computer Science Books, Drawing Books
                            </div>
                        </div>
                        <div className={styles.arrowContainer}>
                            <MdArrowForwardIos />
                        </div>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={`${styles.iconContainer} ${styles.diary}`}><DiaryIcon /></div>
                        <div className={styles.text}>
                            <div className={styles.title}>School Diaries</div>
                            <div className={styles.subTitle}>
                                Term books with Ques paper, Writing books, Hindi, GK, Computer Science Books, Drawing Books
                            </div>
                        </div>
                        <div className={styles.arrowContainer}>
                            <MdArrowForwardIos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
};

export default Products;
