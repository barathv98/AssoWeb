import { FC, useCallback, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import styles from './styles.module.scss';

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
    
    const onClickConfirm = useCallback(() => {
        if (!schoolName.length)
            setNameError('School Name is empty');
        else if (schoolName.length <= 5)
            setNameError('Please enter valid school name');
        if (!schoolAddress.length)
            setAddressError('School Address is empty');
        else if (schoolAddress.length <= 5)
            setAddressError('Please enter valid address');
            var phoneno = /^\d{10,11}$/;
        if (!contactNum.length)
            setContactError('Contact number is empty');
        else if (!contactNum.match(phoneno))
            setContactError('Please enter valid contact number');
    }, [schoolName, schoolAddress, contactNum]);
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
