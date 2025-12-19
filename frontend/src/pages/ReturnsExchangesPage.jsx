import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, ShieldCheck, AlertCircle, CheckCircle, Package, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReturnsExchangesPage = () => {
    const { isAuthenticated, openAuthModal, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [mockSuccess, setMockSuccess] = useState(false);

    useEffect(() => {
        const fetchOrdersForReturn = async () => {
            if (!isAuthenticated) return;
            setLoading(true);
            try {
                // Fetch orders using the same endpoint
                const res = await axios.get('https://aureavestis.netlify.app/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Filter for eligible orders (e.g., delivered within last 30 days)
                // For this demo, we'll just show Delivered orders
                const eligible = res.data.data.filter(order => order.status === 'Delivered');
                setOrders(eligible);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchOrdersForReturn();
        }
    }, [isAuthenticated, token]);

    const handleReturnSubmit = (e) => {
        e.preventDefault();
        setMockSuccess(true);
        setTimeout(() => {
            setSelectedOrder(null);
            setMockSuccess(false);
        }, 3000);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <RefreshCw size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Returns & Exchanges</h2>
                    <p className="text-gray-500 mb-8">
                        Please log in to initiate a return or exchange for your recent purchases.
                    </p>
                    <button
                        onClick={openAuthModal}
                        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                    >
                        Login to Process Return
                    </button>
                    <div className="mt-8 border-t border-gray-100 pt-6 text-left space-y-3">
                        <h4 className="font-bold text-sm text-gray-900">Our Return Policy</h4>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 text-green-600" /> 30-day return window</li>
                            <li className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 text-green-600" /> Items must be unworn with tags</li>
                            <li className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 text-green-600" /> Free exchanges on all orders</li>
                        </ul>
                    </div>
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
                <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-8">Returns & Exchanges</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Info & Policy */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Start a Return</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Select an eligible order from your history. We offer free returns and exchanges within 30 days of delivery.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">1</div>
                                    <p className="text-sm text-gray-600">Choose the item(s) you wish to return or exchange from the list.</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">2</div>
                                    <p className="text-sm text-gray-600">Select your reason and preferred resolution (refund or exchange).</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">3</div>
                                    <p className="text-sm text-gray-600">Print the prepaid shipping label and drop off the package.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Selection / Form */}
                    <div>
                        {mockSuccess ? (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                                <p className="text-gray-600">We've received your return request. Check your email for the shipping label.</p>
                            </div>
                        ) : selectedOrder ? (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg">
                                <button onClick={() => setSelectedOrder(null)} className="text-sm text-gray-500 hover:text-black mb-4 flex items-center gap-1">
                                    ← Back to orders
                                </button>
                                <h3 className="font-bold text-lg mb-1">Return Items from #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
                                <p className="text-xs text-gray-400 mb-6">Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>

                                <form onSubmit={handleReturnSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Return</label>
                                        <select className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-black transition-colors text-sm">
                                            <option>Size doesn't fit</option>
                                            <option>Changed my mind</option>
                                            <option>Item defective/damaged</option>
                                            <option>Received wrong item</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                                <input type="radio" name="resolution" defaultChecked /> Refund to original payment method
                                            </label>
                                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                                <input type="radio" name="resolution" /> Exchange for different size
                                            </label>
                                        </div>
                                    </div>
                                    <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors mt-2">
                                        Submit Return Request
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-900 px-1">Select an Order</h3>
                                {loading ? (
                                    <div className="text-center py-8"><RefreshCw className="animate-spin mx-auto text-gray-400" /></div>
                                ) : orders.length === 0 ? (
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                                        <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500 text-sm">No eligible orders found for return.</p>
                                    </div>
                                ) : (
                                    orders.map(order => (
                                        <div
                                            key={order._id}
                                            onClick={() => setSelectedOrder(order)}
                                            className="bg-white p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-black/20 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-sm">#{order._id.slice(-8).toUpperCase()}</span>
                                                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">Delivered</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {/* Mock item previews */}
                                                <div className="flex -space-x-2">
                                                    {order.orderItems.slice(0, 3).map((item, i) => (
                                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border border-white overflow-hidden">
                                                            {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <Package size={12} className="m-2 text-gray-400" />}
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500 group-hover:text-black transition-colors">Select for return →</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnsExchangesPage;
