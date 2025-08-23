import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; product: Product; quantity?: number }
    | { type: 'REMOVE_ITEM'; productId: string }
    | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
    | { type: 'CLEAR_CART' };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.product.id === action.product.id
            );

            let newItems: CartItem[];

            if (existingItemIndex >= 0) {
                // Update existing item quantity
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + (action.quantity || 1) }
                        : item
                );
            } else {
                // Add new item
                newItems = [...state.items, { product: action.product, quantity: action.quantity || 1 }];
            }

            const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        }

        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.product.id !== action.productId);
            const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        }

        case 'UPDATE_QUANTITY': {
            if (action.quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_ITEM', productId: action.productId });
            }

            const newItems = state.items.map(item =>
                item.product.id === action.productId
                    ? { ...item, quantity: action.quantity }
                    : item
            );

            const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return { items: newItems, total, itemCount };
        }

        case 'CLEAR_CART':
            return { items: [], total: 0, itemCount: 0 };

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        total: 0,
        itemCount: 0,
    });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
