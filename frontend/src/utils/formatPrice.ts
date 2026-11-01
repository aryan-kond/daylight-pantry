const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Formats a rupee amount with Indian digit grouping, for example ₹1,25,000 */
export function formatPrice(amount: number): string {
  return rupees.format(amount);
}
