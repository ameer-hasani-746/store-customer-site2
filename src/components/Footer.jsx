import React from 'react';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, lang } = useLanguage();

    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Column */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-display font-bold text-[var(--accent-primary)]">
                        Premium Store
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                        {lang === 'ar'
                            ? 'وجهتك الأولى للحصول على أرقى المنتجات العالمية بأفضل الأسعار وأعلى جودة.'
                            : 'Your premier destination for the finest products at the best prices with unmatched quality.'}
                    </p>
                    <div className="flex items-center gap-4">
                        {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                            <a key={i} href="#" className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-indigo-500 hover:bg-indigo-500/10 transition-all">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">
                        {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                    </h3>
                    <ul className="space-y-4 text-[var(--text-secondary)]">
                        {['All Products', 'Categories', 'Featured', 'New Arrivals'].map((link, i) => (
                            <li key={i}>
                                <a href="#" className="hover:text-indigo-500 transition-colors">
                                    {lang === 'ar' ? t(link.toLowerCase().replace(' ', '')) || link : link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">
                        {lang === 'ar' ? 'الدعم' : 'Support'}
                    </h3>
                    <ul className="space-y-4 text-[var(--text-secondary)]">
                        {['Terms of Service', 'Privacy Policy', 'Shipping Policy', 'Returns'].map((link, i) => (
                            <li key={i}>
                                <a href="#" className="hover:text-indigo-500 transition-colors">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">
                        {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                            <Mail size={18} className="text-indigo-500" />
                            <span>support@store.com</span>
                        </li>
                        <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                            <Phone size={18} className="text-indigo-500" />
                            <span>+1 234 567 890</span>
                        </li>
                        <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                            <MapPin size={18} className="text-indigo-500" />
                            <span>{lang === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
                <p>© 2026 Premium Store. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Security</a>
                    <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Status</a>
                    <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
