import { FC } from "react";
import styles from './styles.module.scss';

interface ConfirmationContentProps {
    success: boolean;
}
const ConfirmationContent: FC<ConfirmationContentProps> = ({ success }) => {
    return (
        <div className={styles.confirmationContent}>
            {success}
        </div>
    );
};

export default ConfirmationContent;
