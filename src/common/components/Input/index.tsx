import { ReactFCC } from '../../interface';
import './styles.scss';

interface InputProps {
	type?: string;
	id?: string;
	label?: string;
	errorMessage?: string;
	helperText?: string;
	required?: boolean;
	prefix?: string | number | JSX.Element | JSX.Element[];
	suffix?: string | number | JSX.Element | JSX.Element[];
	testId?: string;
	name?: string;
	[key: string]: any;
}
const Input: ReactFCC<InputProps> = (props) => {
	const {
		type,
		id,
		label,
		errorMessage,
		helperText,
		required,
		className,
		prefix,
		suffix,
		testId,
		...restOfTheAttributes
	} = props;
	const inputId = id || `input_id_${Math.floor(Math.random() * 1000) + 1}`;
	const classNames = [className || '', 'form-input']
		.filter((val) => val)
		.join(' ')
		.trim();
	const attributes = {
		required,
		className: classNames,
		'data-testid': testId,
		...restOfTheAttributes,
	};
	const formFieldClassNames = ['form-control', errorMessage ? 'has-error' : '']
		.filter((val) => val)
		.join(' ')
		.trim();

	return (
		<div className={formFieldClassNames} data-testid="input-form-control">
			{label && (
				<label htmlFor={inputId} className={'form-label'}>
					{label}
					{required && '*'}
				</label>
			)}
			<div className={prefix || suffix ? 'input-group' : undefined}>
				{prefix && <span className="input-group__prefix">{prefix}</span>}
				<input type={type} id={inputId} {...attributes} />
				{suffix && <span className="input-group__suffix">{suffix}</span>}
			</div>
			{errorMessage && (
				<span className="form-control__error" data-testid={`${testId}-error`}>
					{errorMessage}
				</span>
			)}
			{helperText && <span className="form-control__help">{helperText}</span>}
		</div>
	);
};

Input.defaultProps = {
	errorMessage: '',
};

export default Input;
