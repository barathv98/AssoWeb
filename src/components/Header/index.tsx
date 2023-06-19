import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCartFill } from "react-icons/bs";
import useDeviceDetect from '../../utils/hooks/useDeviceDetect';
import { motion } from 'framer-motion';
import { transitionConfig } from '../../utils/config/transitionConfig';
import Sidebar from '../../common/components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import useGeneral from '../../useGeneral';
import ProductsSidebar from '../ProductsSidebar';

interface HeaderProps {
    aboutRef: any;
    productRef: any;
    contactRef: any;
}
const Header: FC<HeaderProps> = ({ aboutRef, productRef, contactRef }) => {
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
                    {!isTablet && <div className={styles.option} onClick={() => aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>About Us</div>}
                    <div className={styles.option} onClick={() => productRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Products</div>
                    {!isTablet && <div className={styles.option} onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Contact Us</div>}
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
