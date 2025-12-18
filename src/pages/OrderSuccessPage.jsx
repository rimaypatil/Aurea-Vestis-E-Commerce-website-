import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const OrderSuccessPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
                <p className="text-gray-500 mb-6">Thank you for your purchase. Your order has been confirmed.</p>

                <div className="bg-gray-50 p-4 rounded-lg mb-8 text-sm">
                    <p className="text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono font-medium text-gray-900">{orderId}</p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/home/trackOrder')}
                        className="w-full bg-brand-charcoal text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
                    >
                        Track Order
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-gray-900 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
