import { FC, useCallback, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './styles.module.scss';
import { Book, OrderItem } from '../../data/interface';
import useGeneral from '../../useGeneral';
import SimpleSnackbar from '../../common/components/Snackbar';

interface ProductCardProps {
    book: Book;
}
const ProductCard: FC<ProductCardProps> = ({ book }) => {
    const { cart, setCart, setShowSnackbar } = useGeneral();
    const [quantityError, setQuantityError] = useState<boolean>(false);
    const itemInCart = cart.filter((cartItem) => {
        return cartItem.id === book.id;
    });
    const [orderItem, setOrderItem] = useState<OrderItem>({
        id: book.id,
        name: book.name,
        quantity: itemInCart.length ? itemInCart[0].quantity : 0,
        question: itemInCart.length ? itemInCart[0].question : false,
        cd: itemInCart.length ? itemInCart[0].cd : false,
        price: book.price,
    });
    const finalizePrice = useCallback(() => {
        let finalPrice = book.price;
        if (orderItem.question) finalPrice += book.questionPrice;
        if (orderItem.cd) finalPrice += book.cdPrice;
        setOrderItem((prev) => {
            return {
                ...prev,
                price: finalPrice
            }
        });
    }, [orderItem, book]);

    const imgSrc = require(`../../assets/images/${book.imgName}`);

    const onClickAddCart = useCallback(() => {
        if (!orderItem.quantity) {
            setQuantityError(true);
        }
        else {
            setCart((current: any) =>
                current.filter((obj: any) => {
                    return obj.id !== book.id;
                }),
            );
            setCart((current: any) => [...current, orderItem]);
            setShowSnackbar(true);
        }
    }, [book, orderItem, setCart, setShowSnackbar]);

    const onClickRemove = useCallback(() => {
        setCart((current: any) =>
            current.filter((obj: any) => {
                return obj.id !== book.id;
            }),
        );
        setOrderItem((prev) => {
            return({
                ...prev,
                question: false,
                cd: false,
                quantity: 0,
                price: book.price,
            })
        });
    }, [book.id, book.price, setCart]);

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
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                <img className={styles.image} src={imgSrc} alt={`${book.name}`} />
                {book?.badgeText && <div className={styles.badgeText}>{book.badgeText}</div>}
            </div>
            <div className={styles.productContent}>
                <div className={styles.contentTop}>
                    <div className={styles.productName}>{book.name} {book.description && `- ${book.description}`}</div>
                    {book.question && book.questionPrice === 0 && <div className={styles.extrasStmt}>Free Question Paper</div>}
                    {book.question && book.questionPrice > 0 && <div className={styles.extrasStmt} onClick={onChangeQuestion}>
                        <input type="checkbox" id="question" name="question" checked={orderItem.question} onClick={onChangeQuestion} />
                        <label htmlFor="question">Include Question (₹ {book.questionPrice})</label>
                    </div>}
                    {book.cd && book.cdPrice === 0 && <div className={styles.extrasStmt}>Free CD</div>}
                    {book.cd && book.cdPrice > 0 && <div className={styles.extrasStmt} onClick={onChangeCD}>
                        <input type="checkbox" id="cd" name="cd" checked={orderItem.cd} onClick={onChangeCD} />
                        <label htmlFor="cd">Include CD (₹ {book.cdPrice})</label>
                    </div>}
                </div>
                <div className={styles.contentBottom}>
                    <div className={styles.price}>
                        <span className={styles.symbol}>₹</span>
                        {orderItem.price}
                        {(orderItem.question || orderItem.cd) && 
                            <span className={styles.extraCost}>({book.price}(B) {orderItem.question && <>+ {book.questionPrice}(Q)</>} {orderItem.cd && <>+ {book.cdPrice}(CD)</>})</span>}
                    </div>
                    <div className={styles.quantityRow}>
                        <div className={styles.quantityInput}>Qty
                            <input type="number" className={`${styles.inputField} ${quantityError ? styles.error : ''}`} id="quantity" name="quantity" value={orderItem.quantity} 
                            onChange={onChangeQuantity} />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.addCartButton} onClick={onClickAddCart}>
                                {itemInCart[0] ? ((itemInCart[0].quantity !== orderItem.quantity) ? 'Add' : 'Added') : 'Add'}
                            </button>
                            {itemInCart[0] && <div className={styles.deleteButton} onClick={onClickRemove}><RiDeleteBin6Line />Remove</div>}
                        </div>
                    </div>
                </div>
            </div>
            <SimpleSnackbar text="Item added" />
        </div>
    );
};

export default ProductCard;
