import React from 'react';
import { Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FeaturesBar = () => {
    const { t, lang } = useLanguage();

    const features = [
        {
            icon: <Truck className="text-indigo-500" size={24} />,
            title: lang === 'ar' ? 'شحن سريع' : 'Fast Shipping',
            desc: lang === 'ar' ? 'توصيل في غضون 2-4 أيام' : 'Delivery within 2-4 days'
        },
        {
            icon: <ShieldCheck className="text-emerald-500" size={24} />,
            title: lang === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee',
            desc: lang === 'ar' ? 'منتجات أصلية 100%' : '100% original products'
        },
        {
            icon: <Clock className="text-amber-500" size={24} />,
            title: lang === 'ar' ? 'دعم 24/7' : '24/7 Support',
            desc: lang === 'ar' ? 'نحن هنا لمساعدتك دائماً' : 'Always here to help you'
        },
        {
            icon: <CreditCard className="text-purple-500" size={24} />,
            title: lang === 'ar' ? 'دفع آمن' : 'Secure Payment',
            desc: lang === 'ar' ? 'طرق دفع مشفرة وآمنة' : 'Encrypted & secure payments'
        }
    ];

    return (
        <section className="py-12 px-4 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-indigo-500/30 transition-all hover:shadow-xl group"
                    >
                        <div className="mb-4 p-3 rounded-xl bg-[var(--bg-tertiary)] w-fit group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesBar;
