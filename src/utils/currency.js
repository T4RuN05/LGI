export function convertPrice(price, currency, rates) {
  if (!rates || !rates[currency]) return price;

  return price * rates[currency];
}

export function formatCurrency(price, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}