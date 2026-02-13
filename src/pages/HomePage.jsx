
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import ProductSlider from '../components/ProductSlider';
import FeaturesBar from '../components/FeaturesBar';
import PromoBanner from '../components/PromoBanner';
import SortDropdown from '../components/SortDropdown';
import { Search, Loader2, ArrowRight, LayoutGrid, Cpu, Smartphone, Sparkles, ShoppingBasket, Armchair, Shirt, Home, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
    const { t, lang } = useLanguage();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'All', icon: <LayoutGrid size={20} />, label: t('allProducts') },
        { name: 'Food & Groceries', icon: <ShoppingBasket size={20} />, label: lang === 'ar' ? 'البقالة والمواد الغذائية' : 'Food & Groceries' },
        { name: 'Electronics', icon: <Cpu size={20} />, label: lang === 'ar' ? 'إلكترونيات' : 'Electronics' },
        { name: 'Furniture', icon: <Armchair size={20} />, label: lang === 'ar' ? 'أثاث' : 'Furniture' },
        { name: 'Clothing', icon: <Shirt size={20} />, label: lang === 'ar' ? 'ملابس' : 'Clothing' },
        { name: 'Personal Care', icon: <Sparkles size={20} />, label: lang === 'ar' ? 'عناية شخصية' : 'Personal Care' },
        { name: 'Home Supplies', icon: <Home size={20} />, label: lang === 'ar' ? 'مستلزمات منزلية' : 'Home Supplies' },
        { name: 'Other', icon: <MoreHorizontal size={20} />, label: lang === 'ar' ? 'أخرى' : 'Other' }
    ];

    const filteredProducts = products
        .filter(p => {
            const matchesSearch = p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.Price - b.Price;
            if (sortBy === 'Price: High to Low') return b.Price - a.Price;
            return new Date(b.created_at) - new Date(a.created_at);
        });

    const featuredProducts = products.filter(p => p.status === 'Available').slice(0, 8);
    const newArrivals = products.slice(0, 6);

    const heroImages = [
        {
            url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
            title: lang === 'ar' ? 'سلسلة بريميوم اليكس' : 'Premium Alex Series',
            subtitle: lang === 'ar' ? 'إصدار محدود' : 'Limited Edition'
        },
        {
            url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
            title: lang === 'ar' ? 'أزياء راقية' : 'High-End Fashion',
            subtitle: lang === 'ar' ? 'موضة 2026' : '2026 Trends'
        },
        {
            url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
            title: lang === 'ar' ? 'ديكور عصري' : 'Modern Decor',
            subtitle: lang === 'ar' ? 'منزلك بأسلوبك' : 'Your Home, Your Style'
        }
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-12 pb-20 overflow-hidden">
            {/* Hero Section - Pro Redesign */}
            <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-12 md:pt-20">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent -z-10 ltr-only" />
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-500/10 to-transparent -z-10 rtl-only" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-center lg:${lang === 'ar' ? 'text-right' : 'text-left'} space-y-8`}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-bold text-sm tracking-wide uppercase">
                            <Sparkles size={16} />
                            {lang === 'ar' ? 'مجموعة 2026 الجديدة' : 'New 2026 Collection'}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-[var(--text-primary)]">
                            {t('premiumInventory')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">{lang === 'en' ? 'Stock' : ''}</span>
                            <br /> {t('collection')}
                        </h1>

                        <p className="text-[var(--text-secondary)] text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {t('heroDescription')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
                                {lang === 'ar' ? 'تسوق الآن' : 'Shop Collections'}
                                <ArrowRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Visual - Slideshow */}
                    <div className="hidden lg:block relative h-full py-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-[var(--border-color)] aspect-square"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImage}
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-100%' }}
                                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img
                                        src={heroImages[currentImage].url}
                                        alt="Hero"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                                        <div className="text-white">
                                            <p className="text-white/60 text-sm font-medium mb-2">
                                                {heroImages[currentImage].subtitle}
                                            </p>
                                            <h3 className="text-2xl font-bold">
                                                {heroImages[currentImage].title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4">
                {/* Features Bar */}
                <FeaturesBar />

                {/* Visual Categories */}
                <section className="py-12">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`flex flex-col items-center gap-3 p-4 md:p-6 rounded-3xl transition-all duration-300 min-w-[100px] md:min-w-[140px] ${selectedCategory === cat.name
                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 scale-105'
                                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-indigo-500/50 hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <div className={`p-3 rounded-2xl ${selectedCategory === cat.name ? 'bg-white/10' : 'bg-[var(--bg-tertiary)] group-hover:bg-indigo-500/10'}`}>
                                    {cat.icon}
                                </div>
                                <span className="font-bold text-sm md:text-base">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Product Search & Sort Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-12">
                    <div className="relative w-full md:w-96 group">
                        <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-indigo-500 transition-colors`} size={20} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className={`w-full ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                    </div>
                </div>

                {/* Product Sliders */}
                {selectedCategory === 'All' && !searchQuery && (
                    <div className="space-y-16">
                        <ProductSlider
                            title={lang === 'ar' ? 'وصلنا حديثاً' : 'New Arrivals'}
                            products={newArrivals}
                        />

                        <PromoBanner
                            title={lang === 'ar' ? 'وفر حتى 50% على الهواتف' : 'Save up to 50% on Phones'}
                            subtitle={lang === 'ar' ? 'عرض خاص' : 'Special Offer'}
                            color="blue"
                            image="https://images.unsplash.com/photo-1556656793-062ff9878258?auto=format&fit=crop&q=80&w=800"
                        />

                        <PromoBanner
                            title={lang === 'ar' ? 'إكسسوارات بريميوم لجهازك' : 'Premium Accessories for Your Device'}
                            subtitle={lang === 'ar' ? 'الجديد وصل' : 'Just in'}
                            color="rose"
                            reverse={true}
                            image="https://images.unsplash.com/photo-1625514523024-47340173bc31?auto=format&fit=crop&q=80&w=800"
                        />
                    </div>
                )}

                {/* Main Product Grid */}
                <div className="py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-display font-bold text-[var(--text-primary)]">
                            {searchQuery || selectedCategory !== 'All'
                                ? `${t('allProducts')} (${filteredProducts.length})`
                                : t('allProducts')
                            }
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-indigo-500" size={40} />
                            <p className="text-[var(--text-secondary)] font-medium">{t('loadingStore')}</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.Product_id} product={product} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-20 px-6 bg-[var(--bg-secondary)] rounded-[2rem] border border-dashed border-[var(--border-color)]">
                            <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)]">
                                <Search size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t('productNotFound')}</h3>
                            <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
                                {lang === 'ar' ? 'لم نجد أي نتائج لبحثك. جرب كلمات بحث أخرى.' : 'No results found for your search. Try different keywords.'}
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="text-indigo-500 font-bold hover:underline"
                            >
                                {lang === 'ar' ? 'مسح كل الفلاتر' : 'Clear all filters'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
