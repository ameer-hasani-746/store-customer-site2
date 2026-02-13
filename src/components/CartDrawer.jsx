import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartDrawer = () => {
    const { lang, t } = useLanguage();
    const { cart, removeFromCart, updateQuantity, subtotal, isDrawerOpen, setIsDrawerOpen, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate API call
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutSuccess(true);
            setTimeout(() => {
                setCheckoutSuccess(false);
                clearCart();
                setIsDrawerOpen(false);
            }, 3000);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`fixed top-0 ${lang === 'ar' ? 'left-0 border-r' : 'right-0 border-l'} h-full w-full sm:w-[400px] bg-[var(--bg-secondary)] border-[var(--border-color)] shadow-2xl z-50 flex flex-col transition-colors duration-300`}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                            <h2 className="text-xl font-display font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <ShoppingBag className="text-indigo-400" />
                                {t('yourBag')}
                                <span className={`text-sm font-normal text-[var(--text-secondary)] ${lang === 'ar' ? 'mr-2' : 'ml-2'}`}>({cart.length} {t('items')})</span>
                            </h2>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 hover:bg-[var(--glass-bg)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {checkoutSuccess ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500"
                                    >
                                        <CheckCircle size={40} />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{t('orderConfirmed')}</h3>
                                    <p className="text-[var(--text-secondary)]">{t('orderConfirmedDesc')}</p>
                                </div>
                            ) : cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <ShoppingBag size={48} className="text-[var(--text-muted)]" />
                                    <p className="text-lg text-[var(--text-primary)]">{t('emptyCart')}</p>
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                                    >
                                        {t('startShopping')}
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.Product_id} className="flex gap-4 group">
                                        <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden flex-shrink-0 border border-[var(--border-color)]">
                                            <img
                                                src={item.image_URL || 'https://via.placeholder.com/200'}
                                                alt={item.product_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-medium text-[var(--text-primary)] line-clamp-1">{item.product_name}</h4>
                                                <p className="text-sm text-[var(--text-muted)]">{item.category}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-[var(--bg-tertiary)] rounded-lg p-1 border border-[var(--border-color)]">
                                                    <button
                                                        onClick={() => updateQuantity(item.Product_id, item.quantity - 1)}
                                                        className="p-1 hover:text-[var(--text-primary)] text-[var(--text-muted)] transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center text-[var(--text-primary)]">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.Product_id, item.quantity + 1)}
                                                        className="p-1 hover:text-[var(--text-primary)] text-[var(--text-muted)] transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-[var(--text-primary)]">
                                                    ${(parseFloat(item.Price) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {!checkoutSuccess && cart.length > 0 && (
                            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[var(--text-secondary)]">{t('subtotal')}</span>
                                    <span className="text-2xl font-bold text-[var(--text-primary)]">${subtotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t('processing')}
                                        </>
                                    ) : (
                                        <>
                                            {t('checkoutNow')}
                                            <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
