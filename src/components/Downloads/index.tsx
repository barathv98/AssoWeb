import { MdArrowForwardIos } from 'react-icons/md';
import { ReactComponent as BookIcon } from '../../assets/icons/book.svg';
import { ReactComponent as DiaryIcon } from '../../assets/icons/diary.svg';
import { ReactComponent as RegisterIcon } from '../../assets/icons/register.svg';
import useAnalytics from '../../useAnalytics';
import priceListLinks, { MixpanelEvent } from '../../utils/constants';
import styles from './styles.module.scss';

const Downloads = () => {
	const { trackEvent } = useAnalytics();

	const onProductClick = (url: string) => {
		window.open(url, '_blank', 'noreferrer');
	};

	return (
		<div className={styles.downloads}>
			<div className={styles.title}>Downloads</div>
			<div className={styles.subTitle}>Please click below each link to view our catalogues</div>
			<div className={styles.productLinks}>
				<div
					className={styles.linkContainer}
					onClick={() => {
						trackEvent(MixpanelEvent.BOOK_PRICELIST_CLICK, {});
						onProductClick(priceListLinks.book);
					}}
				>
					<div className={`${styles.iconContainer} ${styles.book}`}>
						<BookIcon />
					</div>
					<div className={styles.text}>
						<div className={styles.title}>School Books</div>
						<div className={styles.subTitle}>
							Term books with Ques paper, Writing books, Hindi, GK, Computer Science Books, Drawing Books
						</div>
					</div>
					<div className={styles.arrowContainer}>
						<MdArrowForwardIos />
					</div>
				</div>
				<div
					className={styles.linkContainer}
					onClick={() => {
						trackEvent(MixpanelEvent.REGISTER_PRICELIST_CLICK, {});
						onProductClick(priceListLinks.register);
					}}
				>
					<div className={`${styles.iconContainer} ${styles.register}`}>
						<RegisterIcon />
					</div>
					<div className={styles.text}>
						<div className={styles.title}>Attendance Registers</div>
						<div className={styles.subTitle}>
							Term books with Ques paper, Writing books, Hindi, GK, Computer Science Books, Drawing Books
						</div>
					</div>
					<div className={styles.arrowContainer}>
						<MdArrowForwardIos />
					</div>
				</div>
				<div
					className={styles.linkContainer}
					onClick={() => {
						trackEvent(MixpanelEvent.DIARY_PRICELIST_CLICK, {});
						onProductClick(priceListLinks.diary);
					}}
				>
					<div className={`${styles.iconContainer} ${styles.diary}`}>
						<DiaryIcon />
					</div>
					<div className={styles.text}>
						<div className={styles.title}>School Diaries</div>
						<div className={styles.subTitle}>Customised Diaries, PVC diaries etc</div>
					</div>
					<div className={styles.arrowContainer}>
						<MdArrowForwardIos />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Downloads;
