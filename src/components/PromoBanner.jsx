import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PromoBanner = ({ title, subtitle, image, color = "theme", reverse = false }) => {
    const { lang } = useLanguage();

    const colorClasses = {
        theme: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
        slate: "from-slate-700 to-slate-900",
        bronze: "from-[#B38B67] to-[#8C6D51]",
        charcoal: "from-[#2D2D2D] to-[#1A1A1A]"
    };

    return (
        <section className="py-12 px-4 md:px-0">
            <div className={`rounded-[2rem] overflow-hidden bg-gradient-to-r ${colorClasses[color]} relative`}>
                <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
                    {/* Content */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 z-10 text-white">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold mb-6"
                        >
                            {subtitle}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight"
                        >
                            {title}
                        </motion.h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 group transition-all"
                        >
                            {lang === 'ar' ? 'اكتشف المزيد' : 'Explore Now'}
                            <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </motion.button>
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 h-64 md:h-[400px] w-full relative">
                        <img
                            src={image || 'https://via.placeholder.com/800x600'}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-${reverse ? 'r' : 'l'} from-${color}-700/50 to-transparent`} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
