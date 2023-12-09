import Cookies from 'js-cookie';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import PulseLoader from 'react-spinners/PulseLoader';
import CountryFlag from '../../common/components/CountryFlag';
import useAnalytics from '../../useAnalytics';
import useGeneral from '../../useGeneral';
import { useRequestRequestOTP, useRequestVerifyOTP } from '../../useRequest';
import { MixpanelEvent } from '../../utils/constants';
import styles from './styles.module.scss';

interface Props {
	closeModal: () => void;
}
const LoginContent: FC<Props> = ({ closeModal }) => {
	const { setIsAuthenticated } = useGeneral();
	const { trackEvent } = useAnalytics();
	const [loginStep, setLoginStep] = useState<string>('mobileNumberForm');
	const [mobileNumber, setMobileNumber] = useState<string>('');
	const [otp, setOtp] = useState<string>('');
	const [resendOffset, setResendOffset] = useState<number>(30);
	let timer: any = useRef(null);
	const [requestError, setRequestError] = useState<boolean>(false);
	const [verifyError, setVerifyError] = useState<boolean>(false);

	const { requestOTP, isLoading: loadingRequestOTP } = useRequestRequestOTP({
		onSuccess: () => {
			if (resendOffset !== 0) setLoginStep('OTPForm');
			setRequestError(false);
		},
		onError: () => {
			setRequestError(true);
		},
		params: { mobile_number: mobileNumber },
	});

	const { verifyOTP, isLoading: loadingVerifyOTP } = useRequestVerifyOTP({
		onSuccess: (res: any) => {
			setIsAuthenticated(true);
			Cookies.set('token', res.token, { expires: 365, path: '/' });
			closeModal();
			setVerifyError(false);
			window.location.reload();
		},
		onError: () => {
			setVerifyError(true);
		},
		params: { mobile_number: mobileNumber, otp: otp },
	});

	const onChangeMobileNumber = useCallback(
		(e: any) => {
			if (mobileNumber.length === 10) {
				if (e.target.value.length < 10) {
					setMobileNumber(e.target.value);
				}
			} else {
				setMobileNumber(e.target.value);
			}
		},
		[mobileNumber.length]
	);

	const onResendOTP = useCallback(() => {
		setOtp('');
		setVerifyError(false);
		requestOTP();
		trackEvent(MixpanelEvent.OTP_RESEND_CLICK, {});
	}, [requestOTP, trackEvent]);

	useEffect(() => {
		if (loginStep === 'OTPForm') {
			timer.current = setInterval(() => {
				if (resendOffset > 0) setResendOffset((prev) => --prev);
			}, 1000);
			return () => clearInterval(timer.current);
		}
	}, [loginStep, resendOffset]);

	return (
		<div className={styles.loginContent}>
			{loginStep === 'mobileNumberForm' ? (
				<>
					<div className={styles.title}>Enter your phone number to login/sign up</div>
					<div className={styles.inputField}>
						<div className={styles.mobileCode}>
							<CountryFlag /> +91 -{' '}
						</div>
						<input type="number" value={mobileNumber} onChange={(e) => onChangeMobileNumber(e)} />
					</div>
					<button
						className={`
                        ${mobileNumber.length === 10 ? styles.active : ''}
                        ${loadingRequestOTP ? styles.loading : ''}`}
						onClick={() => {
							requestOTP();
							trackEvent(MixpanelEvent.SEND_OTP_CLICK, {});
						}}
					>
						{loadingRequestOTP ? <PulseLoader color="#fff" size={20} /> : 'Send OTP'}
					</button>
					{requestError && <div className={styles.error}>Server error, please try again</div>}
				</>
			) : (
				<>
					<div className={styles.title}>Phone number verification</div>
					<div className={styles.subTitle}>Enter 6 digit code sent to your phone +91-{mobileNumber}</div>
					<div className={styles.otpField}>
						<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							renderSeparator={<span>-</span>}
							renderInput={(props) => <input {...props} />}
							shouldAutoFocus
							inputType="number"
						/>
					</div>
					<button
						className={`
                        ${otp.length === 6 ? styles.active : ''}
                        ${loadingVerifyOTP ? styles.loading : ''}`}
						onClick={() => {
							verifyOTP();
							trackEvent(MixpanelEvent.VERIFY_OTP_CLICK, {});
						}}
					>
						{loadingVerifyOTP ? <PulseLoader color="#fff" size={20} /> : 'Verify'}
					</button>
					{resendOffset === 0 ? (
						<div className={styles.resendLink} onClick={onResendOTP}>
							Resend OTP
						</div>
					) : (
						<div className={styles.resendText}>Resend in {resendOffset} seconds</div>
					)}
					{verifyError && <div className={styles.error}>OTP mismatched/expired</div>}
				</>
			)}
		</div>
	);
};

export default LoginContent;
