import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Slide } from "react-awesome-reveal";
import { Product, OrderItem } from '../../data/interface';
import useGeneral from '../../useGeneral';
import SimpleSnackbar from '../../common/components/Snackbar';
import styles from './styles.module.scss';

interface ProductCardProps {
    product: Product;
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { cart, setCart, setShowSnackbar } = useGeneral();
    const [quantityError, setQuantityError] = useState<boolean>(false);
    const itemInCart = cart.filter((cartItem) => {
        return cartItem.id === product.id;
    });
    const [orderItem, setOrderItem] = useState<OrderItem>({
        id: product.id,
        name: product.name,
        quantity: itemInCart.length ? itemInCart[0].quantity : 0,
        question: itemInCart.length ? itemInCart[0].question : false,
        cd: itemInCart.length ? itemInCart[0].cd : false,
        price: product.price,
    });
    const finalizePrice = useCallback(() => {
        let finalPrice = product.price;
        if (orderItem.question && product?.questionPrice) finalPrice += product?.questionPrice;
        if (orderItem.cd && product?.cdPrice) finalPrice += product?.cdPrice;
        setOrderItem((prev) => {
            return {
                ...prev,
                price: finalPrice
            }
        });
    }, [orderItem, product]);

    const imgSrc = require(`../../assets/images/${product.imgName}`);

    const onClickAddCart = useCallback(() => {
        if (!orderItem.quantity) {
            setQuantityError(true);
        }
        else {
            setCart((current: any) =>
                current.filter((obj: any) => {
                    return obj.id !== product.id;
                }),
            );
            setCart((current: any) => [...current, orderItem]);
            setShowSnackbar(true);
        }
    }, [product, orderItem, setCart, setShowSnackbar]);

    const onClickRemove = useCallback(() => {
        setCart((current: any) =>
            current.filter((obj: any) => {
                return obj.id !== product.id;
            }),
        );
        setOrderItem((prev) => {
            return({
                ...prev,
                question: false,
                cd: false,
                quantity: 0,
                price: product.price,
            })
        });
    }, [product.id, product.price, setCart]);

    const onChangeQuestion = useCallback((e: any) => {
        setOrderItem((prev) => {
            return({
                ...prev,
                question: e.target.checked,
            })
        });
    }, []);

    const onChangeCD = useCallback((e: any) => {
        setOrderItem((prev) => {
            return({
                ...prev,
                cd: e.target.checked,
            })
        });
    }, []);

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

    useEffect(() => {
        finalizePrice();
        // eslint-disable-next-line
    }, [orderItem.question, orderItem.cd]);

    useEffect(() => {
        finalizePrice();
        // eslint-disable-next-line
    }, []);

    return (
        <Slide direction='right' duration={200} fraction={0.2} triggerOnce>
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                <img className={styles.image} src={imgSrc} alt={`${product.name}`} />
                {product?.badgeText && <div className={styles.badgeText}>{product.badgeText}</div>}
            </div>
            <div className={styles.productContent}>
                <div className={styles.contentTop}>
                    <div className={styles.productName}>{product.name} {product?.description && `- ${product.description}`}</div>
                    {product?.question && (
                        product?.questionPrice === 0
                            ? <div className={styles.extrasStmt}>Free Question Paper</div>
                            : (
                                <div className={styles.extrasStmt} onClick={onChangeQuestion}>
                                    <input type="checkbox" id="question" name="question" checked={orderItem.question} onClick={onChangeQuestion} />
                                    <label htmlFor="question">Include Question (₹ {product.questionPrice})</label>
                                </div>
                            )
                    )}
                    {product?.cd && (
                        product?.cdPrice === 0 
                            ? <div className={styles.extrasStmt}>Free CD</div>
                            : (
                                <div className={styles.extrasStmt} onClick={onChangeCD}>
                                    <input type="checkbox" id="cd" name="cd" checked={orderItem.cd} onClick={onChangeCD} />
                                    <label htmlFor="cd">Include CD (₹ {product.cdPrice})</label>
                                </div>
                            )
                    )}
                </div>
                <div className={styles.contentBottom}>
                    <div className={styles.price}>
                        <span className={styles.symbol}>₹</span>
                        {orderItem.price}
                        {(orderItem.question || orderItem.cd) && 
                            <span className={styles.extraCost}>({product.price}(B) {orderItem.question && <>+ {product.questionPrice}(Q)</>} {orderItem.cd && <>+ {product.cdPrice}(CD)</>})</span>}
                    </div>
                    <div className={styles.quantityRow}>
                        <div className={styles.quantityInput}>Qty
                            <input type="number" className={`${styles.inputField} ${quantityError ? styles.error : ''}`} id="quantity" name="quantity" value={orderItem.quantity} 
                            onChange={onChangeQuantity} />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button className={`${styles.addCartButton} ${buttonText === 'Add' ? styles.add : styles.added}`} onClick={onClickAddCart}>
                                {buttonText}
                            </button>
                            {itemInCart[0] &&
                                <div className={styles.deleteButton} onClick={onClickRemove}>
                                    <RiDeleteBin6Line />Remove
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SimpleSnackbar text="Item added" />
        </div>
        </Slide>
    );
};

export default ProductCard;
