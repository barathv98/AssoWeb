import { useRef } from "react";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Copyright from "../components/Copyright";
import Header from "../components/Header";
import MarqueeRibbon from "../components/MarqueeRibbon";
import Products from "../components/Products";

const HomePage = () => {
  const aboutRef = useRef();
  const productRef = useRef();
  const contactRef = useRef();

  return (
    <>
      <MarqueeRibbon />
      <Header
        aboutRef={aboutRef}
        productRef={productRef}
        contactRef={contactRef}
      />
      <Products productRef={productRef} />
      <AboutUs aboutRef={aboutRef} />
      <ContactUs contactRef={contactRef} />
      <Copyright />
    </>
  );
};

export default HomePage;
