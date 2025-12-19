import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ArrowRight, Loader } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`https://aurea-vestis-e-commerce-website.onrender.com/api/products?search=${query}`);
                setProducts(res.data.data);
            } catch (err) {
                console.error("Error fetching search results:", err);
                setError("Failed to load search results. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (!query) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center">
                <Search size={48} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Search for products</h2>
                <p className="text-gray-500">Enter a keyword to start searching.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-gray-500 text-sm mb-2">Search Results</p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-charcoal">
                        Results for "{query}"
                    </h1>
                </div>

                {/* Content */}
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        <p>{error}</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="group">
                                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4 relative">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Quick overlay or badges could go here */}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                                    <p className="font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            We couldn't find any products matching "{query}". Try checking for typos or using broader keywords.
                        </p>
                        <Link to="/" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:underline">
                            Go back home <ArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
