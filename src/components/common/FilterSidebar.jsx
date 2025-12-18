import { ChevronDown, Filter, X } from 'lucide-react';
import { useState } from 'react';

export default function FilterSidebar({ filters, selectedFilters, onFilterChange, clearFilters, loading, showDiscount = false, className = "w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-gray-100 h-screen sticky top-24 overflow-y-auto custom-scrollbar" }) {
    const [openSection, setOpenSection] = useState({
        Category: true,
        Size: true,
        Price: true,
        Discount: true,
        Brand: true,
        Color: true,
        Occasion: false,
        Fabric: false,
        Fit: false
    });

    const toggleSection = (section) => {
        setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCheckboxChange = (type, value) => {
        const current = selectedFilters[type] || [];
        const newValues = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        onFilterChange(type, newValues);
    };

    const handlePriceChange = (rangeLabel, min, max) => {
        const currentRanges = selectedFilters.priceRanges || [];
        const isSelected = currentRanges.some(r => r.label === rangeLabel);

        let newRanges;
        if (isSelected) {
            newRanges = currentRanges.filter(r => r.label !== rangeLabel);
        } else {
            newRanges = [...currentRanges, { label: rangeLabel, min, max }];
        }

        // Calculate global min/max from selected ranges
        let minPrice = undefined;
        let maxPrice = undefined;

        if (newRanges.length > 0) {
            minPrice = Math.min(...newRanges.map(r => r.min));
            maxPrice = Math.max(...newRanges.map(r => r.max === undefined ? Infinity : r.max));
        }

        onFilterChange('priceRanges', newRanges, minPrice, maxPrice);
    };

    const handleDiscountChange = (label, min, max) => {
        const currentRanges = selectedFilters.discountRanges || [];
        const isSelected = currentRanges.some(r => r.label === label);

        let newRanges;
        if (isSelected) {
            newRanges = currentRanges.filter(r => r.label !== label);
        } else {
            newRanges = [...currentRanges, { label, min, max }];
        }
        onFilterChange('discountRanges', newRanges);
    };

    // Predefined Price Ranges
    const priceOptions = [
        { label: 'Below ₹999', min: 0, max: 999 },
        { label: '₹1,000 - ₹1,999', min: 1000, max: 1999 },
        { label: '₹2,000 - ₹2,999', min: 2000, max: 2999 },
        { label: '₹3,000 - ₹4,999', min: 3000, max: 4999 },
        { label: '₹5,000 & Above', min: 5000, max: undefined },
    ];

    // Predefined Discount Ranges
    const discountOptions = [
        { label: '10% - 20%', min: 10, max: 20 },
        { label: '30% - 50%', min: 30, max: 50 },
        { label: '50% +', min: 50, max: undefined },
    ];

    if (!filters) return <div>Loading filters...</div>;

    const sections = [
        { id: 'Category', key: 'categories', label: 'Category' },
        { id: 'Discount', key: 'discount', label: 'Discount Range', type: 'discount' },
        { id: 'Size', key: 'sizes', label: 'Size', type: 'box' },
        { id: 'Price', key: 'price', label: 'Price Range', type: 'price' },
        { id: 'Brand', key: 'brands', label: 'Brand' },
        { id: 'Color', key: 'colors', label: 'Color' },
        { id: 'Fabric', key: 'fabrics', label: 'Fabric' },
        { id: 'Occasion', key: 'occasions', label: 'Occasion' },
        { id: 'Fit', key: 'fits', label: 'Fit' },
    ];

    return (
        <aside className={className}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                </h3>
                <button onClick={clearFilters} className="text-xs text-brand-accent font-medium hover:underline">
                    Clear All
                </button>
            </div>

            {sections.map((section) => {
                // If backend didn't return options for this section, skip it (unless it's static like Price/Discount)
                const options = filters[section.key];
                if (section.type === 'discount' && !showDiscount) return null;
                if (section.type !== 'price' && section.type !== 'discount' && (!options || options.length === 0)) return null;

                return (
                    <div key={section.id} className="mb-6 border-b border-gray-100 pb-4 last:border-0">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center justify-between w-full text-sm font-medium text-brand-charcoal mb-3 group hover:text-brand-accent"
                        >
                            {section.label}
                            <ChevronDown
                                className={`w-4 h-4 text-gray-400 group-hover:text-brand-accent transition-transform ${openSection[section.id] ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {openSection[section.id] && (
                            <div className="space-y-2 animate-fade-in-down">
                                {section.type === 'box' ? (
                                    <div className="flex flex-wrap gap-2">
                                        {options.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => handleCheckboxChange(section.key, opt)}
                                                className={`min-w-[2rem] h-8 px-2 flex items-center justify-center border rounded text-xs transition-all ${selectedFilters[section.key]?.includes(opt)
                                                    ? 'bg-brand-charcoal text-white border-brand-charcoal'
                                                    : 'border-gray-200 hover:border-brand-charcoal'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                ) : section.type === 'price' ? (
                                    <div className="space-y-2">
                                        {priceOptions.map((opt) => (
                                            <div key={opt.label} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`price-${opt.label}`}
                                                    checked={selectedFilters.priceRanges?.some(r => r.label === opt.label) || false}
                                                    onChange={() => handlePriceChange(opt.label, opt.min, opt.max)}
                                                    className="rounded border-gray-300 text-brand-charcoal focus:ring-brand-accent cursor-pointer"
                                                />
                                                <label htmlFor={`price-${opt.label}`} className="text-sm text-gray-600 cursor-pointer select-none">
                                                    {opt.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : section.type === 'discount' ? (
                                    <div className="space-y-2">
                                        {discountOptions.map((opt) => (
                                            <div key={opt.label} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`discount-${opt.label}`}
                                                    checked={selectedFilters.discountRanges?.some(r => r.label === opt.label) || false}
                                                    onChange={() => handleDiscountChange(opt.label, opt.min, opt.max)}
                                                    className="rounded border-gray-300 text-brand-charcoal focus:ring-brand-accent cursor-pointer"
                                                />
                                                <label htmlFor={`discount-${opt.label}`} className="text-sm text-red-500 font-medium cursor-pointer select-none">
                                                    {opt.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Default Checkbox List
                                    options.map((opt) => (
                                        <div key={opt} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`${section.id}-${opt}`}
                                                checked={selectedFilters[section.key]?.includes(opt) || false}
                                                onChange={() => handleCheckboxChange(section.key, opt)}
                                                className="rounded border-gray-300 text-brand-charcoal focus:ring-brand-accent cursor-pointer"
                                            />
                                            <label htmlFor={`${section.id}-${opt}`} className="text-sm text-gray-600 cursor-pointer select-none">
                                                {opt}
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </aside>
    );
}