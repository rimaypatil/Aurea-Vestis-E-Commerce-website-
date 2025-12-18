import React, { useState } from 'react';
import { Star, User } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext'; // For write review check

const ReviewsSection = ({ product }) => {
    //   const { user } = useAuth();
    const [showWriteReview, setShowWriteReview] = useState(false);

    // Mock reviews if none exist in DB yet
    const reviews = product.reviews && product.reviews.length > 0 ? product.reviews : [
        { _id: '1', name: 'John Doe', rating: 5, comment: 'Amazing quality! Fits perfectly.', createdAt: new Date().toISOString() },
        { _id: '2', name: 'Jane Smith', rating: 4, comment: 'Good material but slightly loose.', createdAt: new Date().toISOString() }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "text-yellow-500" : "text-gray-300"} />
        ));
    };

    return (
        <div className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Ratings & Reviews</h2>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Summary Column */}
                <div className="md:col-span-1">
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-5xl font-bold text-gray-900">{product.rating || 4.5}</span>
                        <span className="text-sm text-gray-500 mb-2">/ 5</span>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill={i < Math.floor(product.rating || 4.5) ? "currentColor" : "none"} className={i < Math.floor(product.rating || 4.5) ? "" : "text-gray-300"} />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Based on {product.numReviews} ratings</p>

                    <button
                        onClick={() => setShowWriteReview(!showWriteReview)}
                        className="w-full py-3 border border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Write a Review
                    </button>
                </div>

                {/* List Column */}
                <div className="md:col-span-2 space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                        <User size={16} />
                                    </div>
                                    <span className="font-medium text-gray-900">{review.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex text-yellow-500 mb-2">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsSection;
