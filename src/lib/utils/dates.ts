export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
) => {
  return new Intl.DateTimeFormat('en', options).format(date);
};
