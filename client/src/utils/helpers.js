

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US');
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US');
};

export const calculateDaysDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
};

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};
