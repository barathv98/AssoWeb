import { useEffect } from 'react';
import useAnalytics from '../../useAnalytics';
import { MixpanelEvent } from '../../utils/constants';
import styles from './styles.module.scss';

const AboutUs = () => {
	const { trackEvent } = useAnalytics();

	useEffect(() => {
		trackEvent(MixpanelEvent.ABOUTUS_VIEW, {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.aboutUs}>
			<div className={styles.image}>
				<img src={require('../../assets/images/about_us.webp')} alt="about us" loading="lazy" />
			</div>
			<div className={styles.text}>
				<div className={styles.title}>About Us</div>
				<div className={styles.content}>
					Associate Prints is a leading educational publisher in Sivakasi. We have vast experience in printing field for
					about three decades. We are the printers and publishers of KG books, Hindi books, Writing practice books,
					Computer Science books, Drawing books etc. We are specialist in school assignment diaries and customised
					compliment diaries. You can contact us for any type of printing work.
					<div className={styles.innerContent}>
						Other than books, diaries, we are supplying exam papers, exam pads and printing school function invitations,
						certificates, pamphlets, brochures and any other printing needs.
					</div>
					<div className={styles.innerContent}>
						We are highly known for the
						<ul>
							<li>High quality products</li>
							<li>Competitive price</li>
							<li>Timely delivery</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
