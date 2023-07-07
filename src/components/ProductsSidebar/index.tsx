import { NavLink } from "react-router-dom";
import sidebarLinks from "../../data/sidebarLinks";
import styles from './styles.module.scss';
import { FC } from "react";

interface ProductsSidebarProps {
    onClick?: any;
}
const ProductsSidebar: FC<ProductsSidebarProps> = ({ onClick }) => {
    return (
        <div className={styles.sidebarContent}>
            <div className={styles.title}>Quick Links</div>
            {sidebarLinks.map((link: any) => {
                return (
                    <>
                        <NavLink
                            to={link.link}
                            className={styles.navlink}
                            style={({isActive}) => (isActive ? {color:'#2d9bf0'} : {})}
                            onClick={onClick}
                        >
                            {link.text}
                        </NavLink>
                        {link?.child && link.child.map((link: any) => {
                            return (
                                <NavLink
                                    to={link.link}
                                    className={`${styles.navlink} ${styles.childLink}`}
                                    onClick={onClick}
                                >
                                    - {link.text}
                                </NavLink>
                            )
                        })}
                    </>
                );
            })}
        </div>
    );
};

export default ProductsSidebar;
