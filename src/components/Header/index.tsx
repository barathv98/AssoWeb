import { FC, useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import useDeviceDetect from '../../utils/hooks/useDeviceDetect';
import { motion } from 'framer-motion';
import { transitionConfig } from '../../utils/config/transitionConfig';
import Sidebar from '../../common/components/Sidebar';
import { BiCategory } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import { CgOrganisation } from "react-icons/cg";

interface HeaderProps {
    aboutRef: any;
    productRef: any;
    contactRef: any;
}
const Header: FC<HeaderProps> = ({ aboutRef, productRef, contactRef }) => {
    const { isMobile } = useDeviceDetect();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const onSidebarItemClick = useCallback((refElement: any) => {
        setShowPopup(false);
        refElement.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, [setShowPopup]);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <img className={styles.logo} src={require('../../assets/images/logo.png')} alt='company logo' />
                    {isMobile ? <h2 className={styles.title}>ASSOCIATE PRINTS</h2> : <h1 className={styles.title}>ASSOCIATE PRINTS</h1>}
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
                    <div className={styles.option} onClick={() => aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>About Us</div>
                    <div className={styles.option} onClick={() => productRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Products</div>
                    <div className={styles.option} onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })}>Contact Us</div>
                </div>
            </div>
            <motion.div {...transitionConfig}>
                {showPopup && 
                    <Sidebar
                        onClose={() => setShowPopup(false)}
                        content={
                            <>
                                <div className={styles.sidebarItem} onClick={() => onSidebarItemClick(aboutRef)}><CgOrganisation /><span>About Us</span></div>
                                <div className={styles.sidebarItem} onClick={() => onSidebarItemClick(productRef)}><BiCategory /><span>Products</span></div>
                                <div className={styles.sidebarItem} onClick={() => onSidebarItemClick(contactRef)}><GrContactInfo /><span>Contact Us</span></div>
                            </>
                        } 
                    />
                }
            </motion.div>
        </>
    )
};

export default Header;
