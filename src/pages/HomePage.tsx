import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Products from "../components/Products";
import Copyright from "../components/Copyright";
import { FC } from "react";

interface HomePageProps {
    aboutRef: any;
    productRef: any;
    contactRef: any;
}
const HomePage: FC<HomePageProps> = ({ aboutRef, productRef, contactRef }) => {
    return (
        <>
            <AboutUs aboutRef={aboutRef} />
            <Products productRef={productRef} />
            <ContactUs contactRef={contactRef} />
            <Copyright />
        </>
    );
};

export default HomePage;
