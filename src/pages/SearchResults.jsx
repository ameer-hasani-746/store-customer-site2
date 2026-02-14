import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import { Search, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SearchResults = () => {
    const { t, lang } = useLanguage();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('Newest');

    useEffect(() => {
        if (query) {
            fetchResults();
        }
    }, [query]);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Products')
                .select('*');

            if (error) throw error;

            let filtered = data.filter(p => {
                const name = p.product_name || '';
                const cat = p.category || '';
                return name.toLowerCase().includes(query.toLowerCase()) ||
                    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) ||
                    cat.toLowerCase().includes(query.toLowerCase());
            });

            // Apply Sorting
            filtered = filtered.sort((a, b) => {
                const priceA = parseFloat(a.Price) || 0;
                const priceB = parseFloat(b.Price) || 0;
                if (sortBy === 'Price: Low to High') return priceA - priceB;
                if (sortBy === 'Price: High to Low') return priceB - priceA;
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });

            setProducts(filtered);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Re-sort when sortBy changes without re-fetching everything if possible, 
    // but fetchResults already handles it and it's fast enough for local filter.
    useEffect(() => {
        if (products.length > 0) {
            const sorted = [...products].sort((a, b) => {
                const priceA = parseFloat(a.Price) || 0;
                const priceB = parseFloat(b.Price) || 0;
                if (sortBy === 'Price: Low to High') return priceA - priceB;
                if (sortBy === 'Price: High to Low') return priceB - priceA;
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });
            setProducts(sorted);
        }
    }, [sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
            <div className="mb-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
                >
                    <ArrowLeft size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                    {lang === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-[var(--text-primary)]">
                            {lang === 'ar' ? 'نتائج البحث عن' : 'Search results for'}:
                            <span className="text-[var(--accent-primary)] ml-2">"{query}"</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-2">
                            {products.length} {lang === 'ar' ? 'منتج تم العثور عليه' : 'products found'}
                        </p>
                    </div>
                    {products.length > 0 && (
                        <div className="w-full md:w-auto">
                            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-[var(--accent-primary)]" size={40} />
                    <p className="text-[var(--text-secondary)] font-medium">{t('loadingStore')}</p>
                </div>
            ) : (
                <>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map(product => (
                                <ProductCard key={product.Product_id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-6 bg-[var(--bg-secondary)] rounded-[2rem] border border-dashed border-[var(--border-color)]">
                            <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)]">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                                {lang === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}
                            </h3>
                            <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
                                {lang === 'ar'
                                    ? 'جرب البحث بكلمات مختلفة أو العودة للصفحة الرئيسية.'
                                    : 'Try searching with different keywords or browse our collections on the home page.'}
                            </p>
                            <Link
                                to="/"
                                className="inline-block px-8 py-4 bg-[var(--accent-primary)] hover:opacity-90 text-white rounded-2xl font-bold transition-all shadow-xl shadow-[var(--accent-primary)]/20"
                            >
                                {lang === 'ar' ? 'تصفح كل المنتجات' : 'Browse All Products'}
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;
