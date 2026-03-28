// Currency conversion utility
const currencyConverter = {
  // Sample conversion rates
  rates: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    CAD: 1.36,
  },

  convert: (amount, fromCurrency, toCurrency) => {
    try {
      if (!currencyConverter.rates[fromCurrency] || !currencyConverter.rates[toCurrency]) {
        throw new Error('Invalid currency code');
      }

      const amountInUSD = amount / currencyConverter.rates[fromCurrency];
      return amountInUSD * currencyConverter.rates[toCurrency];
    } catch (error) {
      throw error;
    }
  },

  getRate: (currency) => {
    return currencyConverter.rates[currency] || null;
  },
};

module.exports = currencyConverter;
