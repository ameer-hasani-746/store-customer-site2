
import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import ProductSlider from '../components/ProductSlider';
import { Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search from Outlet Context (Navbar)
    const { searchQuery } = useOutletContext();
    const { t, lang } = useLanguage();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Products')
                .select('*')
                .eq('status', 'Available') // Default to showing available items, or fetch all if needed
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(t('failedLoadProducts'));
        } finally {
            setLoading(false);
        }
    };

    // Group products by category
    const groupedProducts = useMemo(() => {
        if (!products.length) return {};

        // 1. Filter by Search
        let filtered = products;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = products.filter(p =>
                p.product_name.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        }

        // 2. Group by Category
        return filtered.reduce((acc, product) => {
            const category = product.category || 'Other Collections';
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
        }, {});

    }, [products, searchQuery]);

    const categories = Object.keys(groupedProducts).sort();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-4">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
                <p className="text-sm font-medium tracking-wider uppercase">{t('loadingStore')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-400 gap-4">
                <AlertCircle size={32} />
                <p>{error}</p>
                <button
                    onClick={fetchProducts}
                    className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                >
                    {t('retryConnection')}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
            <div className="flex flex-col gap-12">
                {/* Hero Section */}
                <div className={`text-center md:${lang === 'ar' ? 'text-right' : 'text-left'} space-y-4 mb-4`}>
                    <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight text-[var(--text-primary)]">
                        {t('premiumInventory')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">{t('premiumInventory').includes('Premium') ? 'Inventory' : ''}</span>
                        <br /> {t('collection')}
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl text-lg leading-relaxed">
                        {t('heroDescription')}
                    </p>
                </div>

                {/* Content Area */}
                <div className="w-full">
                    {categories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] border-dashed">
                            <ShoppingBag size={48} className="text-[var(--text-muted)] mb-4" />
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t('noItemsFound')}</h3>
                            <p className="text-[var(--text-secondary)]">{t('tryAdjustingSearch')}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <ProductSlider
                                    key={category}
                                    title={category}
                                    products={groupedProducts[category]}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
