import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import useDeviceDetect from '../../utils/hooks/useDeviceDetect';
import { motion } from 'framer-motion';
import { transitionConfig } from '../../utils/config/transitionConfig';

interface HeaderProps {
    aboutRef: any;
    productRef: any;
    contactRef: any;
}
const Header: FC<HeaderProps> = ({ aboutRef, productRef, contactRef }) => {
    const { isMobile } = useDeviceDetect();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    return (
        <>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <img className={styles.logo} src={require('../../assets/images/logo.png')} alt='company logo' />
                    <div className={styles.title}>ASSOCIATE PRINTS</div>
                    {isMobile && <div className={styles.hamburgerIcon} onClick={() => setShowPopup((showPopup) => !showPopup)}><GiHamburgerMenu /></div>}
                </div>
                <div className={styles.optionsContainer}>
                    <div className={styles.option} onClick={() => aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>About Us</div>
                    <div className={styles.option} onClick={() => productRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Products</div>
                    <div className={styles.option} onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Contact Us</div>
                </div>
            </div>
            <motion.div {...transitionConfig}>
                {showPopup && <div className={styles.popup}>
                    <div className={styles.option} onClick={() => aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>About Us</div>
                    <div className={styles.option} onClick={() => productRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Products</div>
                    <div className={styles.option} onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Contact Us</div>
                </div>}
            </motion.div>
        </>
    )
};

export default Header;
