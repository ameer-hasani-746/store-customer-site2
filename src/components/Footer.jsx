import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, lang } = useLanguage();
    const [activeModal, setActiveModal] = useState(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const supportContent = {
        'Terms of Service': {
            title: lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service',
            content: lang === 'ar'
                ? 'مرحباً بك في متجرنا البريميوم. باستخدامك لهذا الموقع، فأنت توافق على الالتزام بالشروط والأحكام التالية...'
                : 'Welcome to our Premium Store. By using this website, you agree to comply with and be bound by the following terms and conditions...'
        },
        'Privacy Policy': {
            title: lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy',
            content: lang === 'ar'
                ? 'نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا لمعلوماتك...'
                : 'We respect your privacy and are committed to protecting your personal data. This policy explains how we collect and use your information...'
        },
        'Shipping Policy': {
            title: lang === 'ar' ? 'سياسة الشحن' : 'Shipping Policy',
            content: lang === 'ar'
                ? 'نوفر شحناً سريعاً وموثوقاً لجميع المنتجات. تستغرق طلباتنا عادة من 2-4 أيام عمل للوصول...'
                : 'We provide fast and reliable shipping for all products. Our orders typically take 2-4 business days to arrive...'
        },
        'Returns': {
            title: lang === 'ar' ? 'سياسة الإرجاع' : 'Returns',
            content: lang === 'ar'
                ? 'إذا لم تكن راضياً عن مشترياتك، يمكنك إرجاع المنتج في حالته الأصلية خلال 14 يوماً من الاستلام...'
                : 'If you are not satisfied with your purchase, you can return the product in its original condition within 14 days of receipt...'
        }
    };

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
                            <a key={i} href="#" className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-all">
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
                        {[
                            { name: 'All Products', id: 'all-products' },
                            { name: 'Categories', id: 'categories' },
                            { name: 'New Arrivals', id: 'new-arrivals' }
                        ].map((link, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className="hover:text-[var(--accent-primary)] transition-colors text-left w-full"
                                >
                                    {lang === 'ar' ? t(link.name.toLowerCase().replace(' ', '')) || link.name : link.name}
                                </button>
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
                        {Object.keys(supportContent).map((link, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => setActiveModal(link)}
                                    className="hover:text-[var(--accent-primary)] transition-colors text-left w-full"
                                >
                                    {supportContent[link].title}
                                </button>
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
                            <Mail size={18} className="text-[var(--accent-primary)]" />
                            <span>support@store.com</span>
                        </li>
                        <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                            <Phone size={18} className="text-[var(--accent-primary)]" />
                            <span>+1 234 567 890</span>
                        </li>
                        <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                            <MapPin size={18} className="text-[var(--accent-primary)]" />
                            <span>{lang === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
                <p>© 2026 Premium Store. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
                <div className="flex items-center gap-6">
                    <button className="hover:text-[var(--text-secondary)] transition-colors">Security</button>
                    <button className="hover:text-[var(--text-secondary)] transition-colors">Status</button>
                    <button className="hover:text-[var(--text-secondary)] transition-colors">Privacy</button>
                </div>
            </div>

            {/* Support Modal */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-3xl font-display font-bold text-[var(--text-primary)]">
                                        {supportContent[activeModal].title}
                                    </h3>
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="prose prose-stone max-w-none text-[var(--text-secondary)] leading-relaxed">
                                    <p className="text-lg">
                                        {supportContent[activeModal].content}
                                    </p>
                                    <div className="mt-8 p-6 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
                                        <p className="text-sm font-medium text-[var(--accent-primary)]">
                                            {lang === 'ar'
                                                ? 'للمزيد من المعلومات، يرجى التواصل مع فريق الدعم لدينا.'
                                                : 'For more information, please contact our support team.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;
