import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '../types';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    addToCart: (itemId: string, quantity?: number) => Promise<void>;
    updateCartItem: (itemId: string, quantity: number) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    getCartItemsCount: () => number;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const refreshCart = async () => {
        if (!isAuthenticated) {
            setCart(null);
            return;
        }

        try {
            setLoading(true);
            const cartData = await cartAPI.getCart();
            setCart(cartData);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshCart();
        } else {
            setCart(null);
        }
    }, [isAuthenticated, user]);

    const addToCart = async (itemId: string, quantity: number = 1) => {
        try {
            setLoading(true);
            const response = await cartAPI.addToCart(itemId, quantity);
            setCart(response.cart);
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (itemId: string, quantity: number) => {
        try {
            setLoading(true);
            const response = await cartAPI.updateCartItem(itemId, quantity);
            setCart(response.cart);
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId: string) => {
        try {
            setLoading(true);
            const response = await cartAPI.removeFromCart(itemId);
            setCart(response.cart);
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            const response = await cartAPI.clearCart();
            setCart(response.cart);
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getCartItemsCount = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartItemsCount,
        refreshCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
