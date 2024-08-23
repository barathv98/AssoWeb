import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import sidebarLinks from '../../data/sidebarLinks';
import { primaryColor } from '../../utils/constants';
import styles from './styles.module.scss';

interface ProductsSidebarProps {
	onClick?: any;
}
const ProductsSidebar: FC<ProductsSidebarProps> = ({ onClick }) => {
	return (
		<div className={styles.sidebarContent}>
			<div className={styles.title}>Quick Links</div>
			{sidebarLinks.map((link: any) => {
				return (
					<div className={styles.bookSidebar} key={link.text}>
						<NavLink
							to={link.link}
							className={styles.navlink}
							style={({ isActive }) => (isActive ? { color: primaryColor } : {})}
							onClick={onClick}
							key={link.text}
						>
							{link.text}
						</NavLink>
						{link?.child &&
							link.child.map((link: any) => {
								return (
									<NavLink
										to={link.link}
										className={`${styles.navlink} ${styles.childLink}`}
										style={({ isActive }) => (isActive ? { color: primaryColor } : {})}
										onClick={onClick}
										key={link.text}
									>
										- {link.text}
									</NavLink>
								);
							})}
					</div>
				);
			})}
		</div>
	);
};

export default ProductsSidebar;
