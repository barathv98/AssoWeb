import { useEffect, useRef, useState } from 'react';
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
import Modal from '../../common/components/Modal';
import LoginContent from '../LoginContent';
import Cookies from 'js-cookie';
import { useRequestVerifyToken } from '../../useRequest';
import { FaRegUserCircle } from "react-icons/fa";
import MyAccountPopup from '../MyAccountPopup';
import useClickOutside from '../../utils/hooks/useClickOutside';

const Header = () => {
    const { isMobile, isTablet } = useDeviceDetect();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const { cart, getCartQuery, isAuthenticated, setIsAuthenticated, showLoginModal, setShowLoginModal, showMyAccountModal, setShowMyAccountModal } = useGeneral();
    const navigate = useNavigate();
    const clickRef = useRef<HTMLDivElement>(null);

    const { verifyToken } = useRequestVerifyToken({
        onSuccess: () => {
            setIsAuthenticated(true);
            getCartQuery.getCart();
        },
    });

    useEffect(() => {
        if (Cookies.get('token')) {
            verifyToken();
        }
        // eslint-disable-next-line
    }, []);

    useClickOutside(clickRef, () => {setShowMyAccountModal(false)});

    return (
        <>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <div className={styles.leftIcons}>
                        <Link to="/">
                            <img className={styles.logo} src={require('../../assets/images/logo.png')} alt='company logo' />
                        </Link>
                        <Link to="/">
                            {isMobile
                                ? <h2 className={styles.title}>ASSOCIATE</h2>
                                : <h1 className={styles.title}>ASSOCIATE PRINTS</h1>
                            }
                        </Link>
                    </div>
                    {isMobile &&
                        <div className={styles.mobileRightIcons}>
                            <div className={styles.cartIcon} onClick={() => navigate('/shopping-cart')}>
                                <BsCartFill size={20} />
                                <div className={styles.cartItem}>{cart.length > 9 ? '9+' : cart.length}</div>
                            </div>
                            {isAuthenticated
                                ? <div onClick={() => setShowMyAccountModal(true)}><FaRegUserCircle size={20} /></div>
                                : <div className={styles.loginLink} onClick={() => setShowLoginModal(true)}>Login</div>
                            }
                            <div className={styles.hamburgerIcon} 
                                onClick={() => {
                                    if(showPopup) window.scrollTo({top: 0,left: 0,behavior: "smooth",});
                                    setShowPopup((showPopup) => !showPopup)
                                }}>
                                <GiHamburgerMenu />
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.rightIcons}>
                    <div className={styles.optionsContainer}>
                        <Link to="/products/books"><div className={styles.option}>Books</div></Link>
                        {!isTablet && <Link to="/products/diaries"><div className={styles.option}>Diaries</div></Link>}
                        {!isTablet && <Link to="/products/registers"><div className={styles.option}>Registers</div></Link>}
                        <div className={styles.cartOption} onClick={() => navigate('/shopping-cart')}>
                            <motion.svg
                                whileHover={{
                                    rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                                    transition: { duration: 0.5 },
                                }}
                            >
                                <BsCartFill color='#fff' />
                            </motion.svg>
                            <div>
                                {cart?.length > 0 ? <div>{cart.length} Items</div> : <div>Cart</div>}
                            </div>
                        </div>
                    </div>
                    {!isMobile && <>
                        {isAuthenticated ?
                            <div className={`${styles.loginBtn} ${styles.accountText}`} onClick={() => setShowMyAccountModal(true)} ref={clickRef}>
                                {isTablet
                                    ? 'Account'
                                    : <>
                                        <div><FaRegUserCircle size={18} /></div>
                                        <div>My Account</div>
                                    </>
                                }
                            </div>
                        :
                            <div className={styles.loginBtn} onClick={() => setShowLoginModal(true)}>
                                {isTablet ? 'Login' : 'Login/Sign up'}
                            </div>
                        }
                        </>
                    }
                </div>
                {showLoginModal && 
                    <Modal
                        title="Login/Signup"
                        content={
                            <LoginContent closeModal={() => setShowLoginModal(false)} />
                        }
                        openState={showLoginModal}
                        isClosable
                        cssClass={styles.modalCss}
                        onCloseModal={() => setShowLoginModal(false)}
                        mobileModalPosition='bottom'
                    />
                }
                {showMyAccountModal && <MyAccountPopup />}
            </div>
            <motion.div {...transitionConfig}>
                {showPopup && 
                    <Sidebar
                        onClose={() => setShowPopup(false)}
                        content={<ProductsSidebar onClick={isMobile ? () => setShowPopup(false) : () => {}} />}
                    />
                }
            </motion.div>

        </>
    )
};

export default Header;
