import { FC } from 'react';
import styles from './styles.module.scss';

interface AboutUsProps {
    aboutRef: any;
}
const AboutUs:FC<AboutUsProps> = ({ aboutRef }) => {
    return (<div className={styles.aboutUs} ref={aboutRef}>
        <div className={styles.image}>
            <img src={require('../../assets/images/about_us.jpg')} alt="about us" />
        </div>
        <div className={styles.text}>
            <div className={styles.title}>About Us</div>
            <div className={styles.content}>
                
            </div>
        </div>
    </div>)
};

export default AboutUs;
