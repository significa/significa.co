export const getWidthPercentage = (fraction: string): string => {
  if (!/^\d\/\d{1,}$/.test(fraction)) {
    return `100%`
  }

  return `${(parseInt(fraction.split('/')[0], 10) /
    parseInt(fraction.split('/')[1], 10)) *
    100}%`
}
