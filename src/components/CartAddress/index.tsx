import { FC, useCallback, useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import BounceLoader from "react-spinners/BounceLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { useRequestGetPODetails, useRequestGetUserDetail, useRequestPlaceOrder } from "../../useRequest";
import { mobileRegex, pincodeRegex, rupee } from "../../utils/constants";
import CountryFlag from "../../common/components/CountryFlag";
import useTextInput from "../../common/useTextInput";
import Input from "../../common/components/Input";
import useGeneral from "../../useGeneral";
import Modal from "../../common/components/Modal";
import { UserDetail } from "../../data/interface";
import ConfirmationContent from "../ConfirmationContent";
import styles from './styles.module.scss';

interface CartAddressProps {}
const CartAddress: FC<CartAddressProps> = () => {
    const { cart, setCart, orderTotal, userDetail, setUserDetail, isAuthenticated } = useGeneral();
    const [name, setName] = useTextInput('');
    const [address, setAddress] = useTextInput('');
    const [city, setCity] = useTextInput('');
    const [pincode, setPincode] = useTextInput('');
    const [secContactNum, setSecContactNum] = useTextInput('');
    const [transport, setTransport] = useTextInput('');
    const [orderBtnDisabled, setOrderBtnDisabled] = useState<boolean>(true);
    const [district, setDistrict] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [formErrors, setFormErrors] = useState<any>({});
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [orderState, setOrderState] = useState<string>('');

    const { getUserDetail, isLoading } = useRequestGetUserDetail({
        onSuccess: (data: UserDetail) => {
            setUserDetail({...data});
        },
    });

    const { getPODetails } = useRequestGetPODetails({
        onSuccess: (data: any) => {
            setDistrict(data?.District);
            setState(data?.State);
        },
        params: String(pincode.value)?.replace(/ /g, ""),
    });

    const { placeOrder } = useRequestPlaceOrder({
        onSuccess: () => {
            setOrderState('success');
            setCart([]);
        },
        onError: () => {
            setOrderState('failure');
        },
        params: {
            name: name.value,
            address: address.value,
            city: city.value,
            pincode: pincode.value,
            district: district,
            state: state,
            secContactNum: secContactNum.value,
            transport: transport.value,
            orderItems: cart,
        }
    });
    
    const onClickConfirm = useCallback(() => {
        if (!pincodeRegex.test(pincode.value))
            return setFormErrors({ pincode: 'Invalid pincode' });
        if (secContactNum.value && !mobileRegex.test(secContactNum.value))
            return setFormErrors({ secContactNum: 'Invalid mobile number' });
        setShowPopup(true);
        setOrderState('loading');
        setFormErrors({});
        placeOrder();
    }, [pincode.value, secContactNum.value, placeOrder]);

    useEffect(() => {
        if (pincodeRegex.test(pincode.value))
            getPODetails();
    }, [pincode.value, getPODetails]);

    useEffect(() => {
        if (name.value && address.value && city.value && pincode.value)
            setOrderBtnDisabled(false);
        else
            setOrderBtnDisabled(true);
    }, [name.value, address.value, city.value, pincode.value]);

    useEffect(() => {
        setName(userDetail?.name || '');
        setAddress(userDetail?.address || '');
        setCity(userDetail?.city || '');
        if (userDetail?.pincode)
            setPincode(userDetail?.pincode);
        setSecContactNum(userDetail?.secContactNum || '');
        setTransport(userDetail?.transport || '');
    }, [userDetail, setName, setAddress, setCity, setPincode, setSecContactNum, setTransport]);

    useEffect(() => {
        getUserDetail();
        // eslint-disable-next-line
    }, []);

    if (!isAuthenticated) return <div className={styles.unAuthenticated}>Please login to place your order</div>

    if (isLoading) {
        return <div className={styles.detailsLoader}><PuffLoader color="#2d9bf0" />Fetching Details</div>
    }

    return (
        <div className={styles.cartAddress}>
            <div className={styles.backLink} onClick={() => {}}>
                <MdOutlineKeyboardBackspace color='#222' size={14} />
                Back to Cart
            </div>
            <div className={styles.orderSummary}>
                <div className={styles.title}>Order Summary</div>
                <div className={styles.summaryContainer}>
                    <div>Total Items: {cart.length}</div>
                    <div>Total Price: {rupee.format(orderTotal)}</div>
                </div>
            </div>
            <div className={styles.title}>Your shipping address</div>
            <div className={styles.addressForms}>
                <Input type="text" label="Name" required {...name} />
                <Input type="text" label="Address" required {...address} />
                <div className={styles.sameRowFields}>
                    <Input type="text" label="City" required {...city} />
                    <div className={styles.pincodeField}>
                        <Input type="number" label="Pincode" required 
                            helperText={(district && state) ? `${district} Dt., ${state}` : ''}
                            errorMessage={formErrors?.pincode ? formErrors?.pincode : ''} {...pincode}
                        />
                    </div>
                </div>
                <div className={styles.sameRowFields}>
                    <div className={styles.disabledField}>
                        <Input type="text" label="Primary Contact Number" 
                            prefix={<div className={styles.prefixFlag}><CountryFlag />+91</div>}
                            value={userDetail?.mobile} disabled 
                            helperText="This is the mobile number you used to login. This can't be changed"
                        />
                    </div>
                    <Input type="text" label="Other Contact Number (optional)"
                        prefix={<div className={styles.prefixFlag}><CountryFlag />+91</div>}
                        errorMessage={formErrors?.secContactNum ? formErrors?.secContactNum : ''}
                        {...secContactNum}
                    />
                </div>
                <Input type="text" label="Transport (Optional)" {...transport} />
            </div>
            <div className={styles.orderButtonRow}>
                <button className={`${styles.orderButton} ${orderBtnDisabled ? styles.disabled : styles.enabled}`}
                onClick={onClickConfirm} disabled={orderBtnDisabled}>
                    CONFIRM ORDER
                </button>
            </div>
            {showPopup && 
                <Modal title="" openState={showPopup}
                    cssClass={styles.modal}
                    content={
                        orderState === 'loading'
                        ? (
                            <div className={styles.loader}>
                                <BounceLoader color='#2d9bf0' />
                                <div className={styles.text}>Order Processing</div>
                            </div>
                        )
                        : <ConfirmationContent success={orderState === 'success'} />
                    }
                    mobileModalPosition="center"
                />
            }
        </div>
    );
};

export default CartAddress;
