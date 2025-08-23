import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types';

interface WishlistState {
    items: Product[];
}

type WishlistAction =
    | { type: 'ADD_ITEM'; product: Product }
    | { type: 'REMOVE_ITEM'; productId: string }
    | { type: 'TOGGLE_ITEM'; product: Product };

const WishlistContext = createContext<{
    state: WishlistState;
    dispatch: React.Dispatch<WishlistAction>;
    isInWishlist: (productId: string) => boolean;
} | null>(null);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const exists = state.items.find(item => item.id === action.product.id);
            if (exists) return state;

            return { items: [...state.items, action.product] };
        }

        case 'REMOVE_ITEM': {
            return { items: state.items.filter(item => item.id !== action.productId) };
        }

        case 'TOGGLE_ITEM': {
            const exists = state.items.find(item => item.id === action.product.id);
            if (exists) {
                return { items: state.items.filter(item => item.id !== action.product.id) };
            } else {
                return { items: [...state.items, action.product] };
            }
        }

        default:
            return state;
    }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, {
        items: [],
    });

    const isInWishlist = (productId: string) => {
        return state.items.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ state, dispatch, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
