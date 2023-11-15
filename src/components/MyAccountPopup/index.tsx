import Modal from "../../common/components/Modal";
import useGeneral from "../../useGeneral";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import PopupContent from "./PopupContent";
import styles from './styles.module.scss'

const MyAccountPopup = () => {
    const { isMobile } = useDeviceDetect();
    const { showMyAccountModal, setShowMyAccountModal } = useGeneral();

    return (
        isMobile
            ? <Modal
                title='My account'
                openState={showMyAccountModal}
                isClosable
                onCloseModal={() => setShowMyAccountModal(false)}
                content={<PopupContent />}
                mobileModalPosition='bottom'
                closeOnOverlayClick
            />
            : <div className={styles.myAccountPopup}>
                <PopupContent />
            </div>       
    );
};

export default MyAccountPopup;
