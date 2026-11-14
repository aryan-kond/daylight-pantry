// DEMO values: replace with the real delivery rules and promo codes.
export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_FROM = 999;

/** Promo codes and the share of the subtotal they take off */
export const PROMO_CODES: Record<string, number> = {
  DAYLIGHT10: 0.1,
};

export function getTotals(subtotal: number, discountRate: number) {
  const discount = Math.round(subtotal * discountRate);
  const deliveryFee = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const total = subtotal - discount + deliveryFee;
  return { discount, deliveryFee, total };
}
