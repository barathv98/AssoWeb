import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Slide } from "react-awesome-reveal";
import useGeneral from '../../useGeneral';
import { OrderItem, Product } from '../../data/interface';
import styles from './styles.module.scss';
import { useRequestRemoveCart, useRequestUpdateCart } from '../../useRequest';

interface Props {
    product: Product;
}
const GeneralCard: FC<Props> = ({ product }) => {
    const { cart, setCart, setShowSnackbar, isAuthenticated, setShowLoginModal } = useGeneral();
    const imgSrc = require(`../../assets/images/${product.imgName}`);
    const [quantityError, setQuantityError] = useState<boolean>(false);
    const [itemInCart, setItemInCart] = useState<any>(null);

    const [orderItem, setOrderItem] = useState<OrderItem>({
        id: product.id,
        billingName: product.billingName,
        quantity: itemInCart ? itemInCart.quantity : 0,
        price: product.price,
    });

    const { updateCart } = useRequestUpdateCart({
        onSuccess: (res: any) => {
            setCart(res.cart);
            setShowSnackbar('Item added');
        },
    });

    const { removeCart } = useRequestRemoveCart({
        onSuccess: (res: any) => {
            setCart(res.cart);
        },
    });

    const onClickAddCart = useCallback(() => {
        if (!orderItem.quantity)
            setQuantityError(true);
        else {
            if (!isAuthenticated) {
                setShowLoginModal(true);
            }
            else {
                updateCart({
                    itemId: orderItem.id,
                    name: orderItem.billingName,
                    quantity: orderItem.quantity,
                });
            }
        }
    }, [orderItem, updateCart, isAuthenticated, setShowLoginModal]);

    const onClickRemove = useCallback(() => {
        setOrderItem((prev) => {
            return({
                ...prev,
                quantity: 0,
                price: product.price,
            })
        });
        removeCart({ itemId: orderItem.id });
    }, [product.price, orderItem.id, removeCart]);

    const onChangeQuantity = useCallback((e: any) => {
        setQuantityError(false);
        setOrderItem((prev) => {
            return({
                ...prev,
                quantity: parseInt(e.target.value),
            })
        });
    }, []);

    const buttonText = useMemo(() => {
        if (itemInCart && (itemInCart.quantity === orderItem.quantity))
            return 'Added';
        return 'Add';
    }, [itemInCart, orderItem.quantity]);

    useEffect(() => {
        if (cart && cart?.length > 0) {
            for(let i = 0; i < cart.length; i++) {
                if (cart[i].id === product.id) {
                    setItemInCart(cart[i]);
                    return;
                }
            }
        }
        setItemInCart(null);
    }, [cart, product.id]);

    useEffect(() => {
        setOrderItem({
            id: product.id,
            billingName: product.billingName,
            quantity: itemInCart ? itemInCart.quantity : 0,
            price: product.price,
        })
    }, [itemInCart, product]);
    
    return (
        <Slide direction='right' duration={200} fraction={0.2} triggerOnce className={styles.generalCardContainer}>
            <div className={styles.generalCard}>
                <div className={styles.productImage}>
                    <img className={styles.image} src={imgSrc} alt={`${product.name}`} loading="lazy" />
                    {product?.badgeText && <div className={styles.badgeText}>{product.badgeText}</div>}
                </div>
                <div className={styles.productContent}>
                    <div className={styles.contentTop}>
                        <div className={styles.title}>{product.name}</div>
                        <div className={styles.description}>{product.description}</div>
                        <div className={styles.highlights}>{product.highlights}</div>
                        <div className={styles.price}>₹ {product.price}</div>
                    </div>
                    <div className={styles.contentBottom}>
                        <div className={styles.quantityInput}>
                            Quantity
                            <input
                                type="number"
                                className={`${styles.inputField}
                                ${quantityError ? styles.error : ''}`}
                                id="quantity"
                                name="quantity"
                                value={orderItem.quantity} 
                                onChange={onChangeQuantity}
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            {itemInCart && 
                                <div className={styles.deleteButton} onClick={onClickRemove}>
                                    <RiDeleteBin6Line />Remove
                                </div>
                            }
                            <button className={`${styles.addCartButton} ${buttonText === 'Add' ? styles.add : styles.added}`} 
                                onClick={onClickAddCart}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default GeneralCard;
