import { useEffect } from "react";
import ContactUs from "../components/ContactUs";

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <ContactUs />
        </>
    );
};

export default ContactPage;
