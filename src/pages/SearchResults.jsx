import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Search, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SearchResults = () => {
    const { t, lang } = useLanguage();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

            const filtered = data.filter(p =>
                p.product_name.toLowerCase().includes(query.toLowerCase()) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) ||
                p.category.toLowerCase().includes(query.toLowerCase())
            );

            setProducts(filtered);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
            <div className="mb-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-indigo-400 mb-6 transition-colors"
                >
                    <ArrowLeft size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                    {lang === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
                </Link>

                <h1 className="text-4xl font-display font-bold text-[var(--text-primary)]">
                    {lang === 'ar' ? 'نتائج البحث عن' : 'Search results for'}:
                    <span className="text-indigo-500 ml-2">"{query}"</span>
                </h1>
                <p className="text-[var(--text-secondary)] mt-2">
                    {products.length} {lang === 'ar' ? 'منتج تم العثور عليه' : 'products found'}
                </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-indigo-500" size={40} />
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
                                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20"
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
