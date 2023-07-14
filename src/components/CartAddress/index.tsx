import { FC, useCallback, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import emailjs from '@emailjs/browser';
import styles from './styles.module.scss';
import { useNavigate } from "react-router-dom";
import useGeneral from "../../useGeneral";

interface CartAddressProps {
    setCartDetails: (state: boolean) => void;
}
const CartAddress: FC<CartAddressProps> = ({ setCartDetails }) => {
    const [schoolName, setSchoolName] = useState<string>('');
    const [schoolAddress, setSchoolAddress] = useState<string>('');
    const [contactNum, setContactNum] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');
    const [contactError, setContactError] = useState<string>('');
    const { cart, setCart } = useGeneral();
    const navigate = useNavigate();
    const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
    const templateId = process.env.REACT_APP_ORDER_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

    const isValid = useCallback(() => {
        let flag: boolean = true;
        if (!schoolName.length) {
            setNameError('School Name is empty');
            flag = false;
        }
        else if (schoolName.length <= 5) {
            setNameError('Please enter valid school name');
            flag = false;
        }
        if (!schoolAddress.length) {
            setAddressError('School Address is empty');
            flag = false;
        }
        else if (schoolAddress.length <= 5) {
            setAddressError('Please enter valid address');
            flag = false;
        }
        if (!contactNum.length) {
            setContactError('Contact number is empty');
            flag = false;
        }
        else if (!contactNum.match(/^\d{10,11}$/)) {
            setContactError('Please enter valid contact number');
            flag = false;
        }
        return flag;
    }, [contactNum, schoolAddress.length, schoolName.length]);
    
    const onClickConfirm = useCallback(() => {
        if (isValid() && serviceId && templateId && publicKey) {
            let cartItemsStr: string = '';
            cart?.forEach((item) => {
                return (
                    cartItemsStr += `${item.name} - ${item.quantity}\n`
                );
            })
            emailjs.send(serviceId, templateId, {name: schoolName, address: schoolAddress, contactNum: contactNum, cart: cartItemsStr}, publicKey)
                .then(() => {
                    navigate('/order-confirmation/success');
                    setCart([]);
                })
                .catch(() => {
                    navigate('/order-confirmation/failed');
                });
        }
    }, [isValid, navigate, publicKey, serviceId, templateId, schoolName, schoolAddress, contactNum, cart, setCart]);
    return (
        <div className={styles.cartAddress}>
            <div className={styles.backLink} onClick={() => setCartDetails(true)}>
                <MdOutlineKeyboardBackspace color='#222' size={14} />
                Back to Cart
            </div>
            <div className={styles.title}>Your shipping address</div>
            <div className={styles.addressForms}>
                <div className={styles.labelText}>School Name</div>
                <textarea className={`${styles.inputField} ${nameError ? styles.error : ''}`} rows={2} 
                    onChange={e => {setNameError('');setSchoolName(e.target.value);}} />
                {nameError && <div className={styles.errorText}>{nameError}</div>}
                <div className={styles.labelText}>School Address (full address)</div>
                <textarea className={`${styles.inputField} ${addressError ? styles.error : ''}`} rows={4} onChange={e => {setAddressError('');setSchoolAddress(e.target.value);}} />
                {addressError && <div className={styles.errorText}>{addressError}</div>}
                <div className={styles.labelText}>Contact number</div>
                <input type="number" className={`${styles.inputField} ${contactError ? styles.error : ''}`} onChange={e => {setContactError('');setContactNum(e.target.value);}} />
                {contactError && <div className={styles.errorText}>{contactError}</div>}
            </div>
            <div className={styles.orderButtonRow}>
                <button className={styles.orderButton} onClick={onClickConfirm}>CONFIRM ORDER</button>
            </div>
        </div>
    );
};

export default CartAddress;
