import { useCallback, useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { ImLocation2 } from 'react-icons/im';
import PulseLoader from 'react-spinners/PulseLoader';
import CountryFlag from '../../common/components/CountryFlag';
import Input from '../../common/components/Input';
import useTextInput from '../../common/useTextInput';
import useAnalytics from '../../useAnalytics';
import { useRequestSendEmail } from '../../useRequest';
import { MixpanelEvent } from '../../utils/constants';
import styles from './styles.module.scss';

const ContactUs = () => {
	const { trackEvent } = useAnalytics();
	const [name, setName] = useTextInput('');
	const [city, setCity] = useTextInput('');
	const [contactNumber, setContactNumber] = useTextInput('');
	const [message, setMessage] = useTextInput('');
	const successMsg = 'Enquiry sent successfully, our team will contact you soon';
	const errorMsg = 'Something went wrong! You can contact on our mobile number';
	const [showMessage, setShowMessage] = useState<string>('');
	const [formError, setFormError] = useState<string>('');
	const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

	const { sendEmail, isLoading } = useRequestSendEmail({
		onSuccess: () => {
			setShowMessage(successMsg);
			setName('');
			setCity('');
			setContactNumber('');
			setMessage('');
			trackEvent(MixpanelEvent.CONTACT_QUERY_SUCCESS, {});
		},
		onError: () => {
			setShowMessage(errorMsg);
		},
		params: {
			toEmail: 'barathkumarv98@gmail.com',
			subject: 'Enquiry from website',
			emailContent: `
                Name: ${name.value}\n
                City: ${city.value}\n
                Contact number: ${contactNumber.value}\n
                Message: ${message.value}\n`,
		},
	});

	const isValid = useCallback(() => {
		if (contactNumber.value.length && !contactNumber.value.match(/^\d{10,11}$/)) {
			setFormError('Please enter a valid contact number');
			return false;
		}
		setFormError('');
		return true;
	}, [contactNumber]);

	const onClickSubmit = useCallback(() => {
		setShowMessage('');
		if (isValid()) {
			sendEmail();
			trackEvent(MixpanelEvent.CONTACT_QUERY_CLICK, {});
		}
	}, [isValid, sendEmail, trackEvent]);

	useEffect(() => {
		if (name.value.length && city.value.length && contactNumber.value.length) setBtnDisabled(false);
		else setBtnDisabled(true);
	}, [name.value.length, city.value.length, contactNumber.value.length]);

	useEffect(() => {
		trackEvent(MixpanelEvent.CONTACTUS_VIEW, {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.contactUs}>
			<div className={styles.title}>Contact Us</div>
			<div className={styles.data}>
				<div className={styles.detailsColumn}>
					<div className={styles.addressContainer}>
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
								<div>04562 - 276943</div>
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
				</div>
				<div className={styles.formColumn}>
					<Input type="text" label="Name / School Name" required {...name} />
					<Input type="text" label="City" required {...city} />
					<Input
						type="text"
						label="Contact Number"
						prefix={
							<div className={styles.prefixFlag}>
								<CountryFlag />
								+91
							</div>
						}
						required
						errorMessage={formError ? 'Please enter valid contact number' : ''}
						{...contactNumber}
					/>
					<Input type="text" label="Message" {...message} />
					<button
						type="submit"
						className={`${styles.submitButton} ${btnDisabled ? styles.disabled : ''} ${
							isLoading ? styles.loading : ''
						}`}
						onClick={onClickSubmit}
					>
						{isLoading ? <PulseLoader color="#fff" size={20} /> : 'Submit'}
					</button>
					{showMessage && (
						<div className={`${styles.message} ${showMessage === errorMsg && styles.error}`}>{showMessage}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
