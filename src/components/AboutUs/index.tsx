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
                Associate Prints is a leading educational publisher in Sivakasi. We have vast experience in printing field for about three decades. We are the printers and publishers of KG books, Hindi books, Writing practice books, Computer Science books, Drawing books etc. We are specialist in school assignment diaries and customised compliment diaries. You can contact us for any type of printing work.
                <div className={styles.innerContent}>Other than books, diaries, we are supplying exam papers, exam pads and printing school function invitations, certificates, pamphlets, brochures and any other printing needs.</div>
                <div className={styles.innerContent}>We are highly known for the
                    <ul> 
                        <li>High quality products</li>
                        <li>Competitive price</li>
                        <li>Timely delivery</li>
                    </ul>
                </div> 
            </div>
        </div>
    </div>)
};

export default AboutUs;
