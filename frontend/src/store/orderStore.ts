import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SavedOrder = {
  orderNumber: string;
  /** Date and time the order was placed, as an ISO string */
  placedAt: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  payment: 'online' | 'cod';
  addressLines: string[];
};

type OrderState = {
  orders: SavedOrder[];
  addOrder: (order: SavedOrder) => void;
};

// DEMO: orders are kept on this device only. Replace with orders from the backend later.
export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    { name: 'daylight-pantry-orders' },
  ),
);
