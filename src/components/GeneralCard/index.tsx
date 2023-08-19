import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import useGeneral from '../../useGeneral';
import { OrderItem, Product } from '../../data/interface';
import styles from './styles.module.scss';

interface Props {
    product: Product;
}
const GeneralCard: FC<Props> = ({ product }) => {
    const { cart, setCart, setShowSnackbar } = useGeneral();
    const imgSrc = require(`../../assets/images/${product.imgName}`);
    const [quantityError, setQuantityError] = useState<boolean>(false);

    const itemInCart = cart.filter((cartItem) => {
        return cartItem.id === product.id;
    });

    const [orderItem, setOrderItem] = useState<OrderItem>({
        id: product.id,
        billingName: product.billingName,
        quantity: itemInCart.length ? itemInCart[0].quantity : 0,
        price: product.price,
    });

    const addingToCart = useCallback(() => {
        setCart((current: any) =>
                current.filter((obj: any) => {
                    return obj.id !== product.id;
                }),
            );
            setCart((current: any) => [...current, orderItem]);
    }, [orderItem, product.id, setCart]);

    const onClickAddCart = useCallback(() => {
        if (!orderItem.quantity) {
            setQuantityError(true);
        }
        else {
            addingToCart();
            setShowSnackbar('Item added');
        }
    }, [orderItem, addingToCart, setShowSnackbar]);

    const onClickRemove = useCallback(() => {
        setCart((current: any) =>
            current.filter((obj: any) => {
                return obj.id !== product.id;
            }),
        );
        setOrderItem((prev) => {
            return({
                ...prev,
                quantity: 0,
                price: product.price,
            })
        });
    }, [product.id, product.price, setCart]);

    const onChangeQuantity = useCallback((e: any) => {
        setQuantityError(false);
        setOrderItem((prev) => {
            return({
                ...prev,
                quantity: parseInt(e.target.value),
            })
        });
    }, []);

    const updateLocalStorageCart = useCallback(() => {
        localStorage.setItem('asso_cart', JSON.stringify(cart));
    }, [cart]);

    const buttonText = useMemo(() => {
        if (itemInCart[0] && (itemInCart[0].quantity === orderItem.quantity))
            return 'Added';
        return 'Add';
    }, [itemInCart, orderItem.quantity]);

    useEffect(() => {
        updateLocalStorageCart();
    }, [cart, updateLocalStorageCart]);
    
    return (
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
                        {itemInCart[0] && 
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
    );
};

export default GeneralCard;
