import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  
  // Computed values
  itemCount: number;
  subtotal: number;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.productId === product.id);

        let newItems: CartItem[];
        if (existingItem) {
          newItems = items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            userId: '', // Will be set by backend
            productId: product.id,
            product,
            quantity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          newItems = [...items, newItem];
        }

        const subtotal = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({
          items: newItems,
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
        });
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((item) => item.productId !== productId);
        const subtotal = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({
          items: newItems,
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );

        const subtotal = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({
          items: newItems,
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
        });
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          subtotal: 0,
        });
      },

      setItems: (items) => {
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({
          items,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
        });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Made with Bob
