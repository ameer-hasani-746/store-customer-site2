import React, { createContext, useContext, useState, useEffect } from 'react';

import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Initial Load from LocalStorage (Guest Mode)
    useEffect(() => {
        const savedCart = localStorage.getItem('store_cart');
        if (savedCart && !user) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse local cart", e);
            }
        }
    }, []);

    // Sync with Supabase when User state changes
    useEffect(() => {
        if (user) {
            syncWithRemote();
        } else {
            // Logout: Clear cart for privacy
            setCart([]);
            localStorage.removeItem('store_cart');
        }
    }, [user]);

    // Persistent LocalStorage backup
    useEffect(() => {
        if (cart.length > 0 || !user) {
            localStorage.setItem('store_cart', JSON.stringify(cart));
        }
    }, [cart, user]);

    const syncWithRemote = async () => {
        if (!user) return;
        setIsSyncing(true);

        try {
            // 1. Fetch remote items
            const { data: remoteItems, error } = await supabase
                .from('cart_items')
                .select('*, Products(*)')
                .eq('user_id', user.id);

            if (error) throw error;

            // 2. Map remote items to standard cart format
            const formattedRemote = remoteItems.map(item => ({
                ...item.Products,
                quantity: item.quantity
            }));

            // 3. Merge Local with Remote (Local takes precedence for quantities if just logged in)
            const localCart = JSON.parse(localStorage.getItem('store_cart') || '[]');

            const mergedCart = [...formattedRemote];
            localCart.forEach(localItem => {
                const existing = mergedCart.find(r => r.Product_id === localItem.Product_id);
                if (existing) {
                    existing.quantity = Math.max(existing.quantity, localItem.quantity);
                } else {
                    mergedCart.push(localItem);
                }
            });

            setCart(mergedCart);

            // 4. Update Remote with Merged result
            for (const item of mergedCart) {
                await supabase.from('cart_items').upsert({
                    user_id: user.id,
                    product_id: item.Product_id,
                    quantity: item.quantity
                });
            }

        } catch (err) {
            console.error("Cart Sync Error:", err);
        } finally {
            setIsSyncing(false);
        }
    };

    const addToCart = async (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.Product_id === product.Product_id);
            let newCart;
            if (existingItem) {
                newCart = prevCart.map(item =>
                    item.Product_id === product.Product_id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newCart = [...prevCart, { ...product, quantity }];
            }
            return newCart;
        });

        if (user) {
            const currentQuantity = cart.find(i => i.Product_id === product.Product_id)?.quantity || 0;
            await supabase.from('cart_items').upsert({
                user_id: user.id,
                product_id: product.Product_id,
                quantity: currentQuantity + quantity
            });
        }
        setIsDrawerOpen(true);
    };

    const removeFromCart = async (productId) => {
        setCart(prevCart => prevCart.filter(item => item.Product_id !== productId));
        if (user) {
            await supabase.from('cart_items')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.Product_id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        if (user) {
            await supabase.from('cart_items').upsert({
                user_id: user.id,
                product_id: productId,
                quantity: newQuantity
            });
        }
    };

    const clearCart = async () => {
        setCart([]);
        if (user) {
            await supabase.from('cart_items')
                .delete()
                .eq('user_id', user.id);
        }
    };

    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.Price) || 0;
        return total + (price * item.quantity);
    }, 0);

    const checkout = async (customerName) => {
        if (!user || cart.length === 0) return { success: false, error: 'User not logged in or cart empty' };

        try {
            const orderData = {
                user_id: user.id,
                customer_name: customerName || user.email,
                items: cart.map(item => ({
                    product_id: item.Product_id,
                    product_name: item.product_name,
                    price: item.Price,
                    quantity: item.quantity
                })),
                total_price: subtotal,
                status: 'Pending'
            };

            const { data, error } = await supabase
                .from('Orders')
                .insert(orderData)
                .select()
                .single();

            if (error) throw error;

            await clearCart();
            return { success: true, order: data };
        } catch (err) {
            console.error("Checkout Error:", err);
            return { success: false, error: err.message };
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            checkout,
            subtotal,
            isDrawerOpen,
            setIsDrawerOpen,
            toggleDrawer,
            isSyncing
        }}>
            {children}
        </CartContext.Provider>
    );
};
