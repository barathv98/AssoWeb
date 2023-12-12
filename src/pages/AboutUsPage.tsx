import { useEffect } from "react";
import AboutUs from "../components/AboutUs";

const AboutUsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <AboutUs />
        </>
    );
};

export default AboutUsPage;
