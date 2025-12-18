import React, { useState } from 'react';

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'material', label: 'Material & Care' },
        { id: 'shipping', label: 'Shipping & Returns' },
    ];

    // Dynamic Content Generation based on missing backend fields
    const generateMaterialCare = () => {
        if (product.materialAndCare) return product.materialAndCare;

        // Fallback logic
        const fabric = product.fabric || 'Cotton Blend';
        return (
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Fabric: {fabric}</li>
                <li>Machine wash cold with like colors</li>
                <li>Do not bleach</li>
                <li>Tumble dry low</li>
                <li>Iron on low heat if needed</li>
            </ul>
        );
    };

    return (
        <div className="mt-12">
            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
              ${activeTab === tab.id
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="py-6 min-h-[200px]">
                {activeTab === 'description' && (
                    <div className="prose prose-sm max-w-none text-gray-600">
                        <p className="mb-4 text-lg font-medium text-gray-900 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Highlights derivation */}
                        <h4 className="text-gray-900 font-bold mb-2">Product Highlights</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Premium Quality {product.category}</li>
                            <li>Designed for {product.occasion || 'Casual'} Wear</li>
                            <li>Fit: {product.fit || 'Regular'}</li>
                            {product.brand && <li>Authentic {product.brand} Merchandise</li>}
                            <li>Style Code: AV-{product._id.slice(-6).toUpperCase()}</li>
                        </ul>
                    </div>
                )}

                {activeTab === 'material' && (
                    <div className="prose prose-sm max-w-none text-gray-600">
                        {generateMaterialCare()}
                    </div>
                )}

                {activeTab === 'shipping' && (
                    <div className="prose prose-sm max-w-none text-gray-600">
                        <p><strong>Shipping:</strong> Free shipping on all orders above ₹999. We typically dispatch orders within 24-48 hours.</p>
                        <p><strong>Returns:</strong> Easy 14-day return policy. Items must be unused and in original packaging with tags intact.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
