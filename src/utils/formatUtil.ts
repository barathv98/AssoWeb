function getDecimalResult(decimalCount: number, amount: number, i: string, decimal: string) {
	if (amount && decimalCount)
		return `${decimal}${Math.abs(Math.abs(amount) - parseFloat(i))
			.toFixed(decimalCount)
			.slice(2)}`;
	return decimalCount ? `${decimal}00` : '';
}

export function formatCurrency(
	amount: number,
	decimalCount: number = 2,
	decimal: string = '.',
) {
	decimalCount = Math.abs(decimalCount);
	decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;

	const i: string = parseInt(Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();

	const negativeSign = amount < 0 ? '-' : '';
	
	const decimalResult = getDecimalResult(decimalCount, amount, i, decimal);

	return `${negativeSign}${amount}${decimalResult}`;
}