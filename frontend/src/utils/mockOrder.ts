// DEMO: there is no backend yet, so placing an order is simulated here.
// Replace submitOrder with a real request when the backend exists.

/** Set to true to preview the "payment did not complete" state */
export const SIMULATE_PAYMENT_FAILURE = false;

export type OrderResult = { ok: true; orderNumber: string } | { ok: false };

export function submitOrder(): Promise<OrderResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (SIMULATE_PAYMENT_FAILURE) {
        resolve({ ok: false });
        return;
      }
      const digits = Math.floor(100000 + Math.random() * 900000);
      resolve({ ok: true, orderNumber: `DP-${digits}` });
    }, 1200);
  });
}
