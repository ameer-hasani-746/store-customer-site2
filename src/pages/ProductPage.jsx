
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Loader2, ShoppingCart, Check, X, Tag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const ProductPage = () => {
    const { t, lang } = useLanguage();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Products')
                .select('*')
                .eq('Product_id', id)
                .single();

            if (error) throw error;
            setProduct(data);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="h-[50vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
        </div>
    );

    if (!product) return (
        <div className="h-[50vh] flex flex-col items-center justify-center gap-4 text-gray-400">
            <p>{t('productNotFound')}</p>
            <Link to="/" className="text-indigo-400 hover:underline">{t('backToStore')}</Link>
        </div>
    );

    const isAvailable = product.status === 'Available';

    const handleBuyNow = () => {
        addToCart(product);
        // The drawer will open automatically via addToCart
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
            <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors">
                <ArrowLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                {t('backToInventory')}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image */}
                <div className="aspect-[4/3] bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] overflow-hidden">
                    <img
                        src={product.image_URL || 'https://via.placeholder.com/800'}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isAvailable
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}>
                                {isAvailable ? <Check size={12} /> : <X size={12} />}
                                {isAvailable ? t('inStock') : t('outOfStock')}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4">
                            {product.product_name}
                        </h1>

                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed whitespace-pre-wrap mb-6">
                            {product.describtion_ai || product.description_ai || product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-secondary)]">
                                {product.category}
                            </span>
                        </div>

                    </div>

                    <div className="pt-8 border-t border-[var(--border-color)]">
                        <div className="flex items-end justify-between mb-8">
                            <div className={`flex flex-col ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
                                <span className="text-sm text-[var(--text-muted)] block mb-1">{t('priceLabel')}</span>
                                <span className="text-4xl font-bold text-[var(--text-primary)]">
                                    <span className="text-indigo-400 text-2xl align-top mr-1">$</span>
                                    {product.Price}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                disabled={!isAvailable}
                                onClick={() => addToCart(product)}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isAvailable
                                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--glass-bg)]'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-color)] opacity-50'
                                    }`}
                            >
                                <ShoppingCart size={24} />
                                {t('addToCart')}
                            </button>
                            <button
                                disabled={!isAvailable}
                                onClick={handleBuyNow}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isAvailable
                                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed border border-border-color] opacity-50'
                                    }`}
                            >
                                <Zap size={24} />
                                {t('buyNow')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
