import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import ReviewsSection from '../components/product/ReviewsSection';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Correct API endpoint as confirmed in backend inspection
                const { data } = await axios.get(`https://aurea-vestis-e-commerce-website.onrender.com/api/products/${id}`);
                if (data.success) {
                    setProduct(data.data);
                    // Dynamic Title SEO
                    document.title = `${data.data.name} | Aurea Vestis`;
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.response?.data?.message || 'Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }

        return () => {
            document.title = 'Aurea Vestis | Premium Fashion'; // Reset title on cleanup
        };
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
                <AlertCircle size={48} className="text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Product Not Found</h2>
                <p className="text-gray-600 mb-6">{error || "We couldn't find the product you're looking for."}</p>
                <Link to="/" className="bg-brand-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="lg:hidden mb-4 flex items-center gap-2 text-brand-charcoal hover:text-brand-accent transition-colors font-medium"
            >
                <ArrowLeft size={20} />
                Back
            </button>
            {/* Top Section: Gallery + Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <ProductGallery images={product.images} />
                <ProductInfo product={product} />
            </div>

            {/* Details Tabs */}
            <ProductTabs product={product} />

            {/* Reviews */}
            <ReviewsSection product={product} />
        </div>
    );
};

export default ProductDetailsPage;
