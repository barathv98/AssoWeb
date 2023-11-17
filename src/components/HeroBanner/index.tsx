import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './styles.module.scss';

const HeroBanner = () => {
	const properties = {
		duration: 5000,
		autoplay: true,
		transitionDuration: 500,
		arrows: true,
		infinite: true,
		easing: 'ease',
	};
	const slideImages = () => {
		return [
			{ imgSrc: require('../../assets/images/offers-1.jpg') },
			{ imgSrc: require('../../assets/images/offers-2.jpg') },
			{ imgSrc: require('../../assets/images/offers-3.jpg') },
		];
	};
	return (
		<div className={styles.heroBanner}>
			<div className={styles.slideContainer}>
				<Slide {...properties}>
					{slideImages().map((img, index) => (
						<div key={index} className={styles.eachSlide}>
							<img className={styles.image} src={img.imgSrc} alt="sample" loading="lazy" />
						</div>
					))}
				</Slide>
			</div>
		</div>
	);
};

export default HeroBanner;
