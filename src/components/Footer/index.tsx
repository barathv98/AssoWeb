import { Link } from "react-router-dom";
import styles from './styles.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.linksContainer}>
                <div className={styles.linksColumn}>
                    <Link to='/about-us'>About Us</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/shopping-cart'>Cart</Link>
                    <Link to='/contact-us'>Contact Us</Link>
                </div>
                <div className={styles.linksColumn}>
                    <Link to=''>Books</Link>
                    <Link to=''>Diaries</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
