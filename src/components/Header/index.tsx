import { useState } from 'react';
import styles from './styles.module.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCartFill, BsCart2 } from "react-icons/bs";
import useDeviceDetect from '../../utils/hooks/useDeviceDetect';
import { motion } from 'framer-motion';
import { transitionConfig } from '../../utils/config/transitionConfig';
import Sidebar from '../../common/components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import useGeneral from '../../useGeneral';
import ProductsSidebar from '../ProductsSidebar';

const Header = () => {
    const { isMobile, isTablet } = useDeviceDetect();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const { cart } = useGeneral();
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <Link to="/"><img className={styles.logo} src={require('../../assets/images/logo.png')} alt='company logo' /></Link>
                    <Link to="/">{isMobile ? <h2 className={styles.title}>ASSOCIATE PRINTS</h2> : <h1 className={styles.title}>ASSOCIATE PRINTS</h1>}</Link>
                    {isMobile && <div className={styles.cartIcon} onClick={() => navigate('/shopping-cart')}>
                        <BsCart2 size={20} />
                        <div className={styles.cartItem}>{cart.length > 9 ? '9+' : cart.length}</div>
                    </div>}
                    {isMobile &&
                        <div className={styles.hamburgerIcon} 
                            onClick={() => {
                                if(showPopup) window.scrollTo({top: 0,left: 0,behavior: "smooth",});
                                setShowPopup((showPopup) => !showPopup)
                            }}>
                            <GiHamburgerMenu />
                        </div>}
                </div>
                <div className={styles.optionsContainer}>
                    <Link to="/products/books"><div className={styles.option}>Books</div></Link>
                    {!isTablet && <Link to="/products/diaries"><div className={styles.option}>Diaries</div></Link>}
                    {!isTablet && <Link to="/products/registers"><div className={styles.option}>Registers</div></Link>}
                    <div className={styles.cartOption} onClick={() => navigate('/shopping-cart')}>
                        <BsCartFill color='#fff' />
                        <div>
                            {cart.length > 0 ? <div>{cart.length} Items</div> : <div>Cart</div>}
                        </div>
                    </div>
                </div>
            </div>
            <motion.div {...transitionConfig}>
                {showPopup && 
                    <Sidebar
                        onClose={() => setShowPopup(false)}
                        content={<ProductsSidebar />}
                    />
                }
            </motion.div>
        </>
    )
};

export default Header;
