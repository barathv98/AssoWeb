import { FC } from 'react';
import { GrClose } from "react-icons/gr";
import styles from './styles.module.scss';

interface SidebarProps {
    logo?: boolean;
    onClose: () => void;
    content: React.ReactNode;
}
const Sidebar: FC<SidebarProps> = (props) => {
    const { logo = true, onClose, content } = props;
    return (
        <div className={styles.sidebar}>
            <div className={styles.container}>
                <div className={styles.closeBtn} onClick={onClose}><GrClose /></div>
                <div className={styles.title}>
                    {logo && 
                        <img className={styles.logo}
                            src={require('../../../assets/images/logo.png')}
                            alt='company logo'
                        />
                    }
                </div>
                {content}
            </div>
        </div>
    );
};

export default Sidebar;
