import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

const ProductSlider = ({ title, products }) => {
    const { lang } = useLanguage();
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 350; // Width of a card + gap

            // Adjust scroll for RTL
            const isRTL = lang === 'ar';
            let moveAmount = direction === 'left' ? -scrollAmount : scrollAmount;

            // In RTL, scrollLeft might be negative or decreasing
            if (isRTL) moveAmount = -moveAmount;

            container.scrollBy({
                left: moveAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!products || products.length === 0) return null;

    return (
        <div className="mb-16 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6 px-4 md:px-0">
                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar px-4 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map(product => (
                    <div key={product.Product_id} className="min-w-[300px] md:min-w-[320px] w-[300px] md:w-[320px] flex-none snap-start h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;
