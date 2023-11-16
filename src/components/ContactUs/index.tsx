import { FC } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";
import styles from "./styles.module.scss";

interface ContactUsProps {
  contactRef: any;
}
const ContactUs: FC<ContactUsProps> = ({ contactRef }) => {
  return (
    <div className={styles.contactUs} ref={contactRef}>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15742.5308138468!2d77.8089179!3d9.4535695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cfd95ececb51%3A0x21746788d74e6a4f!2sAssociate%20Prints!5e0!3m2!1sen!2sin!4v1683974416648!5m2!1sen!2sin"
          title="location map"
          width="500"
          height="350"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={styles.addressContainer}>
        <div className={styles.title}>Contact Us</div>
        <div className={styles.address}>
          <div className={styles.icon}>
            <ImLocation2 />
          </div>
          <div className={styles.text}>
            <div>Associate Prints,</div>
            <div>4/1299-A, Samipuram Colony,</div>
            <div>Rice Mill Street,</div>
            <div>Sivakasi - 626 189,</div>
            <div>Tamilnadu, India.</div>
          </div>
        </div>
        <div className={styles.address}>
          <div className={styles.icon}>
            <FaPhoneAlt />
          </div>
          <div className={styles.text}>
            <div>9486287443</div>
          </div>
        </div>
        <div className={styles.address}>
          <div className={styles.icon}>
            <GrMail />
          </div>
          <div className={styles.text}>
            <div>printsassociate@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
