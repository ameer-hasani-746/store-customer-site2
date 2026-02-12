
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const isAvailable = product.status === 'Available';
    const { addToCart } = useCart();

    // Ensure price is a number for display
    const price = parseFloat(product.Price) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 h-full flex flex-col"
        >
            <Link to={`/product/${product.Product_id}`}>
                {/* Image Container */}
                <div className="aspect-[4/3] bg-[var(--bg-tertiary)] overflow-hidden relative">
                    <img
                        src={product.image_URL || 'https://via.placeholder.com/400'}
                        alt={product.product_name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isAvailable
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-500 border border-red-500/20'
                            }`}>
                            {product.status}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                    <Link to={`/product/${product.Product_id}`}>
                        <h3 className="font-display font-medium text-lg text-[var(--text-primary)] mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">
                            {product.product_name}
                        </h3>
                    </Link>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                        {product.describtion_ai || product.description_ai || product.description || product.category}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">Price</span>
                        <span className="text-xl font-bold text-[var(--text-primary)]">
                            <span className="text-indigo-400 text-sm align-top mr-0.5">$</span>
                            {price.toFixed(2)}
                        </span>
                    </div>

                    <button
                        disabled={!isAvailable}
                        onClick={() => addToCart(product)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isAvailable
                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed opacity-50'
                            }`}
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
