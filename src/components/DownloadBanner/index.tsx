import { FC, useCallback } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { ReactComponent as BookIcon } from '../../assets/icons/book.svg';
import { ReactComponent as DiaryIcon } from '../../assets/icons/diary.svg';
import { ReactComponent as RegisterIcon } from '../../assets/icons/register.svg';
import priceListLinks from '../../utils/constants';
import styles from './styles.module.scss';

interface DownloadBannerProps {
	product: string;
}
const DownloadBanner: FC<DownloadBannerProps> = ({ product }) => {
	const onClickBanner = useCallback(() => {
		if (product === 'books') window.open(priceListLinks.book, '_blank', 'noreferrer');
		else if (product === 'registers') window.open(priceListLinks.register, '_blank', 'noreferrer');
		else if (product === 'diaries') window.open(priceListLinks.diary, '_blank', 'noreferrer');
	}, [product]);
	return (
		<Zoom duration={400} triggerOnce>
			<div className={`${styles.downloadBanner} download-banner`} onClick={onClickBanner}>
				<div className={styles.icon}>
					{product === 'registers' && <RegisterIcon />}
					{product === 'books' && <BookIcon />}
					{product === 'diaries' && <DiaryIcon />}
				</div>
				<div className={styles.title}>
					{product === 'registers' &&
						'Click to view the catalogue of attendance registers, mark registers and other registers'}
					{product === 'books' && 'Click to view the catalogue of school books'}
					{product === 'diaries' && 'Click to view the catalogue of school diaries'}
				</div>
			</div>
		</Zoom>
	);
};

export default DownloadBanner;
