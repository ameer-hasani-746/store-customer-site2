import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, Sun, Moon, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ onSearch }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, toggleDrawer } = useCart();
    const { theme, toggleTheme } = useTheme();
    const { user, signOut } = useAuth();
    const { t } = useLanguage();

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            onSearch('');
                            setSearchQuery('');
                        }}
                        className="flex items-center gap-2 group relative z-50 cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                            S
                        </div>
                        <span className="font-display font-bold text-xl text-[var(--text-primary)] tracking-tight">
                            Store<span className="text-indigo-400">Dash</span>
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
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
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center gap-3 ml-2 group cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
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
