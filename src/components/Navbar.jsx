import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User, Sun, Moon, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, toggleDrawer } = useCart();
    const { theme, toggleTheme } = useTheme();
    const { user, signOut } = useAuth();
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false);
        }
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)] py-2'
            : 'bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setSearchQuery('');
                        }}
                        className="flex items-center gap-2 group relative z-50 cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[var(--accent-primary)]/20 group-hover:shadow-[var(--accent-primary)]/40 transition-all">
                            S
                        </div>
                        <span className="font-display font-bold text-xl text-[var(--text-primary)] tracking-tight">
                            Store<span className="text-[var(--accent-primary)]">Dash</span>
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/50 transition-all"
                            />
                        </form>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <LanguageSelector />
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] rounded-xl transition-all"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="flex items-center gap-4 pl-4 border-l border-[var(--border-color)]">
                            <button
                                onClick={toggleDrawer}
                                className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-primary)] rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center gap-3 ml-2 group cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
                                    <User size={18} />
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSelector />
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-[var(--text-secondary)]"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="text-[var(--text-secondary)]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-[var(--bg-primary)] border-b border-[var(--border-color)] p-4 shadow-xl"
                >
                    <form onSubmit={handleSearch} className="relative w-full mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl py-3 pl-10 text-[var(--text-primary)] focus:outline-none focus:border-indigo-500/50"
                        />
                    </form>
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-[var(--border-color)]">
                        <button
                            onClick={() => {
                                toggleDrawer();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center justify-center gap-2 py-3 bg-[var(--bg-tertiary)] rounded-xl text-[var(--text-primary)]"
                        >
                            <ShoppingCart size={20} />
                            <span className="text-sm font-medium">{t('cart')} ({cartCount})</span>
                        </button>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center justify-center gap-2 py-3 bg-[var(--bg-tertiary)] rounded-xl text-red-400"
                        >
                            <LogOut size={20} />
                            <span className="text-sm font-medium">{t('signOut')}</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
