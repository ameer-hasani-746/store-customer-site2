import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = ({ className = "" }) => {
    const { lang, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 py-2 px-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all ${className}`}
            title={lang === 'en' ? 'Switch to Arabic' : 'التحويل إلى الإنجليزية'}
        >
            <Languages size={18} className="text-[var(--accent-primary)]" />
            <span className="text-sm font-bold uppercase tracking-wider">
                {lang === 'en' ? 'AR' : 'EN'}
            </span>
        </button>
    );
};

export default LanguageSelector;
