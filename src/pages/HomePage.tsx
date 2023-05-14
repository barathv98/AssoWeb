import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Header from "../components/Header";
import MarqueeRibbon from "../components/MarqueeRibbon";
import Products from "../components/Products";
import Copyright from "../components/Copyright";
import { useRef } from "react";

const HomePage = () => {
    const aboutRef = useRef();
    const productRef = useRef();
    const contactRef = useRef();
    return <><MarqueeRibbon /><Header aboutRef={aboutRef} productRef={productRef} contactRef={contactRef} /><AboutUs aboutRef={aboutRef} /><Products productRef={productRef} /><ContactUs contactRef={contactRef} /><Copyright /></>;
};

export default HomePage;
