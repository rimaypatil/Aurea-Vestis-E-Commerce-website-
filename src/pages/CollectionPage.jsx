import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useShop } from '../context/ShopContext'; // Assuming ShopContext exposes a way to fetch or we simple fetch here.
// Note: Direct fetch is often easier for specific pages if context is complex. 
// I'll use direct fetch for now to ensure "backend-controlled" behavior without relying on potentially missing context methods.
// But wait, the environment usually has an API url.

const CollectionPage = ({ collectionName, title, description }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // If passed via props (for specific routes), use that.
    // If we want it dynamic, we could also map URL params.

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Determine API URL. Assuming Vite proxy or standard localhost
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

                // Fetch products with the specific collection name
                // Using generic /products endpoint with query param
                const response = await fetch(`${apiUrl}/products?collectionName=${encodeURIComponent(collectionName)}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data.data || []);
            } catch (err) {
                console.error("Error fetching collection:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (collectionName) {
            fetchProducts();
        }
    }, [collectionName]);

    return (
        <div className="min-h-screen bg-brand-white flex flex-col">
            {/* Header/Footer are hidden via Layout/App.jsx logic for these routes, 
                so this component just renders the content. 
            */}

            <main className="flex-1">
                {/* Hero / Title Section */}
                <section className="relative py-20 px-6 text-center max-w-4xl mx-auto">
                    <button
                        onClick={() => window.history.back()}
                        className="absolute top-10 left-0 md:left-6 flex items-center text-gray-500 hover:text-brand-charcoal transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                        Back
                    </button>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-4">
                        {title}
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                        {description}
                    </p>
                </section>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        <p>Unable to load collection. Please try again later.</p>
                    </div>
                ) : (
                    <ProductGrid
                        products={products}
                        title="" // Hide title in grid since we have page title
                        showViewAll={false}
                    />
                )}
            </main>
        </div>
    );
};

export default CollectionPage;
