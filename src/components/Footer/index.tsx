import { BsInfoCircleFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import useGeneral from '../../useGeneral';
import styles from './styles.module.scss';

const Footer = () => {
	const { cart } = useGeneral();
	const { pathname } = useLocation();

	return (
		<>
			{pathname === '/shopping-cart' && cart.length ? (
				<div className={styles.noteRow}>
					<div className={styles.note}>
						<BsInfoCircleFill color="#757575" />
						Educational reading books exempted(4901)
					</div>
					<div className={styles.note}>
						<BsInfoCircleFill color="#757575" />
						Composition dealer not to charge GST
					</div>
				</div>
			) : (
				''
			)}
			<footer className={styles.footer}>
				<div className={styles.linksContainer}>
					<div className={`${styles.linksColumn} ${styles.firstRow}`}>
						<Link to="/about-us">About Us</Link>
						<Link to="/products">Products</Link>
						<Link to="/shopping-cart">Cart</Link>
						<Link to="/contact-us">Contact Us</Link>
					</div>
					<div className={styles.linksColumn}>
						<Link to="/products/books">Books</Link>
						<Link to="/products/diaries">Diaries</Link>
						<Link to="/products/registers">Registers</Link>
						<Link to="/products/hindi">Hindi Books</Link>
					</div>
					<div className={styles.linksColumn}>
						<Link to="/products/prekg">PreKG Books</Link>
						<Link to="/products/term-books">Term Books</Link>
						<Link to="/products/tamil-writing">Tamil Writing</Link>
						<Link to="/products/english-writing">English Writing</Link>
					</div>
					<div className={`${styles.linksColumn} ${styles.linksCompany}`}>
						<div>
							<img
								className={styles.logo}
								src={require('../../assets/images/logo.png')}
								alt="company logo"
								loading="lazy"
							/>
						</div>
						<div className={styles.address}>
							<div>Associate Prints</div>
							<div>4/1299-A, Samipuram Colony,</div>
							<div>Rice Mill Street,</div>
							<div>Sivakasi - 626 189,</div>
							<div>TamilNadu, India.</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
