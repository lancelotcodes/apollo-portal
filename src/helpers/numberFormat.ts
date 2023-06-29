export const numberFormat = (
  number: number,
  type: 'number' | 'currency' = 'number',
  options?: Intl.NumberFormatOptions,
) => {
  if (type === 'currency') {
    return number
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          currencyDisplay: 'code',
          ...options,
        }).format(number)
      : 0;
  }

  return new Intl.NumberFormat('en-US').format(number);
};
