import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Truck, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TrackOrderPage = () => {
    const { isAuthenticated, openAuthModal, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated) return;

            try {
                // Assuming the backend is running on localhost:5000 based on previous context
                // Adjust base URL if configured differently in axios defaults
                const res = await axios.get('https://aurea-vestis-e-commerce-website.onrender.com/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
            case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'processing': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <CheckCircle size={16} />;
            case 'shipped': return <Truck size={16} />;
            case 'processing': return <Package size={16} />;
            default: return <Clock size={16} />;
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Track Your Order</h2>
                    <p className="text-gray-500 mb-8">
                        Please log in to view your order history and tracking status.
                    </p>
                    <button
                        onClick={openAuthModal}
                        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                    >
                        Login to View Orders
                    </button>
                    <p className="mt-4 text-xs text-gray-400">
                        Don't have an account? <button onClick={openAuthModal} className="text-black underline font-medium">Sign up</button>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="py-16 bg-gray-50 from-gray-50 to-white min-h-screen relative">
            <div className="absolute top-6 left-6">
                <Link to="/home" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-brand-charcoal">
                    <ArrowLeft size={24} />
                </Link>
            </div>
            <div className="max-w-4xl mx-auto px-6 pt-12">
                <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-2">Your Orders</h1>
                <p className="text-gray-500 mb-8">Track and manage your recent purchases</p>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse h-40" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-4 rounded-xl text-red-600 flex items-center gap-3">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                        <Link to="/home/new" className="inline-block bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Order ID</p>
                                            <p className="font-mono text-sm font-bold text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Date Placed</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'long', day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Total Amount</p>
                                            <p className="text-sm font-bold text-gray-900">₹{order.totalPrice}</p>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status || 'Processing')}`}>
                                                {getStatusIcon(order.status || 'Processing')}
                                                {(order.status || 'Processing').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex -space-x-3">
                                                {/* In a real app we'd map order items images here */}
                                                {order.orderItems.slice(0, 3).map((item, idx) => (
                                                    <div key={idx} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                                        {item.image ? (
                                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Package size={16} className="text-gray-400" />
                                                        )}
                                                    </div>
                                                ))}
                                                {order.orderItems.length > 3 && (
                                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        +{order.orderItems.length - 3}
                                                    </div>
                                                )}
                                            </div>

                                            <button className="text-sm font-medium text-brand-charcoal hover:text-brand-accent transition-colors underline underline-offset-4">
                                                View Order Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrackOrderPage;
