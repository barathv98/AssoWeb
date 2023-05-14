import styles from './styles.module.scss';
import {ReactComponent as SuccessIcon} from '../../assets/icons/success.svg';

const MarqueeRibbon = () => {
    const text = '2023 - 2024 Academic Year Books, Diaries booking open';
    return <div className={styles.marquee}>
        <SuccessIcon />
        <div className={styles.text}>{text}</div>
    </div>
};

export default MarqueeRibbon;
