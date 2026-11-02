import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MAX_QUANTITY = 99;

type CartState = {
  /** Quantity in the cart for each product id. Products with 0 are removed. */
  quantities: Record<string, number>;
  addItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      quantities: {},

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
    }),
    { name: 'daylight-pantry-cart' },
  ),
);

/** Total number of items in the cart */
export const selectCartCount = (state: CartState): number =>
  Object.values(state.quantities).reduce((sum, quantity) => sum + quantity, 0);
