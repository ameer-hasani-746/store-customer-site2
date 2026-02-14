import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, BarChart, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SortDropdown = ({ sortBy, setSortBy }) => {
    const { t, lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { id: 'Newest', label: t('newest'), icon: <Clock size={16} /> },
        { id: 'Price: Low to High', label: t('priceLowToHigh'), icon: <ArrowDown size={16} /> },
        { id: 'Price: High to Low', label: t('priceHighToLow'), icon: <ArrowUp size={16} /> }
    ];

    const currentOption = options.find(opt => opt.id === sortBy) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--accent-primary)]/50 transition-all min-w-[240px] text-[var(--text-primary)] shadow-sm"
            >
                <div className="text-[var(--accent-primary)]">
                    <BarChart size={20} />
                </div>
                <span className={`flex-1 text-sm font-bold ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {currentOption.label}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={18} className="text-[var(--text-muted)]" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute top-full mt-2 w-full z-50 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl ${lang === 'ar' ? 'right-0' : 'left-0'}`}
                    >
                        <div className="p-2 space-y-1">
                            {options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSortBy(option.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${sortBy === option.id
                                        ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/20'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    <span className={sortBy === option.id ? 'text-white' : 'text-[var(--accent-primary)]'}>
                                        {option.icon}
                                    </span>
                                    <span className="text-sm font-bold">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SortDropdown;
