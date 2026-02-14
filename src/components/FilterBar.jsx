
import React from 'react';
import { Filter, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    'All',
    'Food & Groceries',
    'Electronics',
    'Furniture',
    'Clothing',
    'Personal Care',
    'Home Supplies',
    'Other'
];

const FilterBar = ({ activeCategory, onCategoryChange, showAvailableOnly, onAvailabilityChange }) => {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[var(--text-primary)] font-display font-semibold text-lg flex items-center gap-2">
                    <Filter size={20} className="text-[var(--accent-primary)]" />
                    Filters
                </h3>
            </div>

            {/* Categories */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === category
                                ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/25'
                                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Availability Toggle */}
            <div className="pt-6 border-t border-white/5">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${showAvailableOnly
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-[var(--border-color)] group-hover:border-[var(--text-muted)]'
                        }`}>
                        {showAvailableOnly && <Check size={14} className="text-white" />}
                    </div>
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={showAvailableOnly}
                        onChange={(e) => onAvailabilityChange(e.target.checked)}
                    />
                    <span className={`text-sm ${showAvailableOnly ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} group-hover:text-[var(--text-primary)] transition-colors`}>
                        Show Available Only
                    </span>
                </label>
            </div>
        </div>
    );
};

export default FilterBar;
