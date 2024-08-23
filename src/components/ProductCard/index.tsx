import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { RiDeleteBin6Line } from "react-icons/ri";
import { OrderItem, Product } from '../../data/interface';
import useGeneral from '../../useGeneral';
import { useRequestRemoveCart, useRequestUpdateCart } from '../../useRequest';
import styles from './styles.module.scss';

interface ProductCardProps {
    product: Product;
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { cart, setCart, setShowSnackbar, isAuthenticated, setShowLoginModal } = useGeneral();
    const [quantityError, setQuantityError] = useState<boolean>(false);   
    const [itemInCart, setItemInCart] = useState<any>(null);

    const [orderItem, setOrderItem] = useState<OrderItem>({
        id: product.id,
        billingName: product.billingName,
        quantity: itemInCart ? itemInCart.quantity : 0,
        question: itemInCart ? itemInCart.question : false,
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

    const finalizePrice = useCallback(() => {
        let finalPrice = product.price;
        if (orderItem.question && product?.questionPrice) finalPrice += product?.questionPrice;
        setOrderItem((prev) => {
            return {
                ...prev,
                price: finalPrice
            }
        });
    }, [orderItem, product]);

    const imgSrc = require(`../../assets/images/${product.imgName}`);

    const onClickAddCart = useCallback(() => {
        if (!orderItem.quantity)
            setQuantityError(true);
        else {
            if (!isAuthenticated) {
                setShowLoginModal(true);
            }
            else {
                updateCart({
                    productId: orderItem.id,
                    billingName: orderItem.billingName,
                    quantity: orderItem.quantity,
                    question: orderItem.question,
                });
            }
        }
    }, [orderItem, updateCart, isAuthenticated, setShowLoginModal]);

    const onClickRemove = useCallback(() => {
        setOrderItem((prev) => {
            return({
                ...prev,
                question: false,
                quantity: 0,
                price: product.price,
            })
        });
        removeCart({ productId: orderItem.id });
    }, [product.price, orderItem.id, removeCart]);

    const onChangeQuestion = useCallback((e: any) => {
        let finalPrice = product.price;
        if (product?.questionPrice && e.target.checked) finalPrice += product?.questionPrice;
        setOrderItem((prev) => {
            return({
                ...prev,
                price: finalPrice,
                question: e.target.checked,
            })
        });
        if (orderItem.quantity) {
            updateCart({
                productId: orderItem.id,
                billingName: orderItem.billingName,
                quantity: orderItem.quantity,
                question: e.target.checked,
            });
        }
    }, [product.price, product?.questionPrice, orderItem, updateCart]);

    const onChangeQuantity = useCallback((e: any) => {
        setQuantityError(false);
        setOrderItem((prev) => {
            return { ...prev, quantity: parseInt(e.target.value) };
        });
    }, []);

    const buttonText = useMemo(() => {
        if (itemInCart && (itemInCart.quantity === orderItem.quantity))
            return 'Added';
        return 'Add';
    }, [itemInCart, orderItem.quantity]);

    useEffect(() => {
        finalizePrice();
        // eslint-disable-next-line
    }, [orderItem.question]);

    useEffect(() => {
        finalizePrice();
        // eslint-disable-next-line
    }, []);

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
            question: itemInCart ? itemInCart.question : false,
            price: product.price,
        })
    }, [itemInCart, product]);

    const price = useMemo(() => {
        let finalPrice = product.price;
        if (orderItem.question && product?.questionPrice) finalPrice += product?.questionPrice;
        return finalPrice;
    }, [orderItem, product]);

    return (
        <Slide direction='right' duration={200} fraction={0.2} triggerOnce>
            <div className={styles.productCard}>
                <div className={styles.productImage}>
                    <img className={styles.image} src={imgSrc} alt={`${product.name}`} loading='lazy' />
                    {product?.badgeText && <div className={styles.badgeText}>{product.badgeText}</div>}
                </div>
                <div className={styles.productContent}>
                    <div className={styles.contentTop}>
                        <div className={styles.productName}>
                            {product.name} {product?.description && `- ${product.description}`}
                        </div>
                        {product?.question && (
                            product?.questionPrice === 0
                                ? <div className={styles.extrasStmt}>Free Question Paper</div>
                                : (
                                    <div className={styles.extrasStmt}>
                                        <label>
                                            <input type="checkbox" id={`question-${product.id}`} name="question" checked={orderItem.question} onChange={onChangeQuestion} />
                                            Include Question (₹ {product.questionPrice})
                                        </label>
                                    </div>
                                )
                        )}
                    </div>
                    <div className={styles.contentBottom}>
                        <div className={styles.price}>
                            <span className={styles.symbol}>₹</span>
                            {price}
                            {(orderItem.question) && 
                                <span className={styles.extraCost}>
                                    ({product.price}(B) {orderItem.question && <>+ {product.questionPrice}(Q)</>})
                                </span>
                            }
                        </div>
                        <div className={styles.quantityRow}>
                            <div className={styles.quantityInput}>Qty
                                <input type="number"
                                    className={`${styles.inputField} ${quantityError ? styles.error : ''}`} id="quantity"
                                    name="quantity"
                                    value={orderItem.quantity} 
                                    onChange={onChangeQuantity}
                                />
                            </div>
                            <div className={styles.buttonsContainer}>
                                <button
                                    className={`${styles.addCartButton} ${buttonText === 'Add' ? styles.add : styles.added}`} 
                                    onClick={onClickAddCart}
                                >
                                    {buttonText}
                                </button>
                                {itemInCart &&
                                    <div className={styles.deleteButton} onClick={onClickRemove}>
                                        <RiDeleteBin6Line />Remove
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default ProductCard;
