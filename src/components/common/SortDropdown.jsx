import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SortDropdown({ currentSort, onSortChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortOptions = [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' },
        { label: 'Highest Rated', value: 'rating_desc' },
        { label: 'Best Sellers', value: 'bestsellers' },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Recommended';

    return (
        <div className="relative z-20" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-sm border border-gray-300 rounded px-4 py-2 hover:border-brand-charcoal transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
            >
                {selectedLabel} <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    {sortOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                onSortChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-ivory transition-colors ${currentSort === opt.value ? 'font-bold text-brand-accent bg-brand-ivory/50' : 'text-brand-charcoal'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
