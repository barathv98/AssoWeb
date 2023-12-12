import { FC } from 'react';

interface CountryFlagProps {
	country?: string;
	width?: number;
	height?: number;
}
const CountryFlag: FC<CountryFlagProps> = ({ country = 'IN', width = 22, height = 16 }) => {
	const attributes = {
		style: {
			width: `${width}px`,
			height: `${height}px`,
			border: `solid 1px #ccc`,
		},
	};
	return (
		<img
			{...attributes}
			src={`https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/png100px/${country.toLowerCase()}.png`}
			alt={`country-flag-${country.toLowerCase()}`}
		/>
	);
};

export default CountryFlag;
