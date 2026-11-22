import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MAX_QUANTITY = 99;

type CartState = {
  /** Quantity in the cart for each product id. Products with 0 are removed. */
  quantities: Record<string, number>;
  /** Promo code applied in the cart. Kept here so checkout shows the same total. */
  promoCode: string | null;
  addItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => void;
  removePromo: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      quantities: {},
      promoCode: null,

      addItem: (productId) =>
        set((state) => ({
          quantities: {
            ...state.quantities,
            [productId]: Math.min((state.quantities[productId] ?? 0) + 1, MAX_QUANTITY),
          },
        })),

      decreaseItem: (productId) =>
        set((state) => {
          const next = (state.quantities[productId] ?? 0) - 1;
          const quantities = { ...state.quantities };
          if (next > 0) {
            quantities[productId] = next;
          } else {
            delete quantities[productId];
          }
          return { quantities };
        }),

      removeItem: (productId) =>
        set((state) => {
          const quantities = { ...state.quantities };
          delete quantities[productId];
          return { quantities };
        }),

      clearCart: () => set({ quantities: {}, promoCode: null }),

      applyPromo: (code) => set({ promoCode: code }),

      removePromo: () => set({ promoCode: null }),
    }),
    { name: 'daylight-pantry-cart' },
  ),
);

/** Total number of items in the cart */
export const selectCartCount = (state: CartState): number =>
  Object.values(state.quantities).reduce((sum, quantity) => sum + quantity, 0);
