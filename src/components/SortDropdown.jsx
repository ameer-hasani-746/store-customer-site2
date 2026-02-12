
import React from 'react';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
    { value: 'created_at', label: 'Newest Arrivals' },
    { value: 'Price', label: 'Price' },
    { value: 'product_name', label: 'Name' },
];

const SortDropdown = ({ currentSort, sortDirection, onSortChange, onDirectionChange }) => {
    return (
        <div className="flex items-center gap-2 bg-[#1c1c21] rounded-xl border border-white/5 p-1">

            {/* Field Selector */}
            <div className="relative group">
                <select
                    value={currentSort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="appearance-none bg-transparent text-sm text-gray-300 font-medium pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#1c1c21] text-gray-300">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-white transition-colors"
                />
            </div>

            {/* Direction Toggle */}
            <button
                onClick={() => onDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            >
                {sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            </button>

        </div>
    );
};

export default SortDropdown;
