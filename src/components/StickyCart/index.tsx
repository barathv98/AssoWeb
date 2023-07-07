import useGeneral from "../../useGeneral";
import { MdPlayArrow } from "react-icons/md";
import styles from './styles.module.scss';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const StickyCart = () => {
    const { cart } = useGeneral();
    const navigate = useNavigate();

    const onCartClick = useCallback(() => {
        navigate('/shopping-cart');
    }, [navigate]);
    return (
        <div className={styles.stickyCart}>
            <div>{cart.length} items</div>
            <div className={styles.cartArrow} onClick={onCartClick}>View Cart<MdPlayArrow color="#fff" /></div>
        </div>
    )
};

export default StickyCart;
