import { useCallback, useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";
import { useRequestSendEmail } from '../../useRequest';
import styles from './styles.module.scss';

const ContactUs = () => {
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const [city, setCity] = useState<string>('');
    const [cityError, setCityError] = useState<boolean>(false);
    const [contactNumber, setContactNumber] = useState<string>('');
    const [contactError, setContactError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messageError, setMessageError] = useState<boolean>(false);
    const successMsg = 'Enquiry sent successfully, our team will contact you soon';
    const errorMsg = 'Something went wrong! You can contact on our mobile number';
    const [showMessage, setShowMessage] = useState<string>('');

    const { sendEmail } = useRequestSendEmail({
        onSuccess: () => {
            setShowMessage(successMsg);
            setName('');
            setCity('');
            setContactNumber('');
            setMessage('');
        },
        onError: () => {
            setShowMessage(errorMsg);
        },
        params: {
            toEmail: 'printsassociate@gmail.com',
            subject: 'Enquiry from website',
            emailContent: `<div>
                <div>Name: ${name}</div>
                <div>City: ${city}</div>
                <div>Contact number: ${contactNumber}</div>
                <div>Message: ${message}</div>`
        }
    });

    const isValid = useCallback(() => {
        let flag: boolean = true;
        if (!name.length) {
            setNameError(true);
            flag = false;
        }
        if (!city.length) {
            setCityError(true);
            flag = false;
        }
        if (!contactNumber.length || !contactNumber.match(/^\d{10,11}$/)) {
            setContactError('Please enter a valid contact number');
            flag = false;
        }
        if (!message.length) {
            setMessageError(true);
            flag = false;
        }
        return flag;
    }, [name.length, city.length, contactNumber, message.length]);

    const onClickSubmit = useCallback(() => {
        setShowMessage('');
        if (isValid()) {
            sendEmail();
        }
    }, [isValid, sendEmail]);

    return (
      <>
        <div className={styles.contactUs}>
            <div className={styles.title}>Contact Us</div>
            <div className={styles.data}>
                <div className={styles.detailsColumn}>
                    <div className={styles.addressContainer}>
                        <div className={styles.address}>
                            <div className={styles.icon}><ImLocation2 /></div>
                            <div className={styles.text}>
                                <div>Associate Prints,</div>
                                <div>4/1299-A, Samipuram Colony,</div>
                                <div>Rice Mill Street,</div>
                                <div>Sivakasi - 626 189,</div>
                                <div>Tamilnadu, India.</div>
                            </div>
                        </div>
                        <div className={styles.address}>
                            <div className={styles.icon}><FaPhoneAlt /></div>
                            <div className={styles.text}>
                                <div>04562 - 276943</div>
                            </div>
                        </div>
                        <div className={styles.address}>
                            <div className={styles.icon}><GrMail /></div>
                            <div className={styles.text}>
                                <div>printsassociate@gmail.com</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapContainer}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15742.5308138468!2d77.8089179!3d9.4535695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cfd95ececb51%3A0x21746788d74e6a4f!2sAssociate%20Prints!5e0!3m2!1sen!2sin!4v1683974416648!5m2!1sen!2sin" title="location map" width="500" height="350" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div className={styles.formColumn}>
                    <label htmlFor="name" className={styles.label}>Name / School Name</label>
                    <input type="text" id="name" 
                        className={`${styles.inputField} ${nameError ? styles.error : ''}`} 
                        value={name} onChange={e => {setNameError(false);setName(e.target.value)}}
                    />
                    <label htmlFor="city" className={styles.label}>City</label>
                    <input type="text" id="city" 
                        className={`${styles.inputField} ${cityError ? styles.error : ''}`}
                        value={city} onChange={e => {setCityError(false);setCity(e.target.value)}}
                    />
                    <label htmlFor="contact-number" className={styles.label}>Contact Number</label>
                    <input type="text" id="contact-number"
                        className={`${styles.inputField} ${contactError ? styles.error : ''}`} 
                        value={contactNumber} onChange={e => {setContactError('');setContactNumber(e.target.value)}}
                    />
                    {contactError && <div className={styles.errorMessage}>{contactError}</div>}
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea rows={4} value={message}
                        className={`${styles.textarea} ${messageError ? styles.error : ''}`}
                        onChange={e => {setMessageError(false);setMessage(e.target.value)}}
                    />
                    <button type='submit' className={styles.submitButton} onClick={onClickSubmit}>Submit</button>
                    {showMessage && <div className={`${styles.message} ${showMessage === errorMsg && styles.error}`}>
                        {showMessage}
                    </div>}
                </div>
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
        </>
  );
};

export default ContactUs;
