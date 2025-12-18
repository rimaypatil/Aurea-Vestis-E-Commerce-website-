import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { ChevronLeft, Plus, Minus, Edit2, Trash2, Lock, CreditCard, Banknote } from 'lucide-react';
import axios from 'axios';

const CheckoutPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { cart, cartCount, updateQuantity, removeFromCart } = useShop();
    const { showToast } = useToast();
    const navigate = useNavigate();

    // State
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        fullName: '', phone: '', street: '', city: '', state: '', zip: '', country: 'India', label: 'Home'
    });
    const [errors, setErrors] = useState({});

    const [deliveryMethod, setDeliveryMethod] = useState('Standard'); // Standard, Express
    const [paymentMethod, setPaymentMethod] = useState(''); // Card, UPI, COD

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Derived Financials
    const subtotal = cart?.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
    const deliveryCharge = deliveryMethod === 'Express' ? 200 : (subtotal > 1000 ? 0 : 100);
    const tax = Math.round(subtotal * 0.18); // 18% GST Mock
    const discount = 0; // Coupon logic to be added
    const totalAmount = subtotal + deliveryCharge + tax - discount;

    // Effects
    useEffect(() => {
        if (!isAuthenticated) {
            showToast('Please login to proceed with checkout', 'info');
            navigate('/login');
        } else {
            fetchAddresses();
        }
    }, [isAuthenticated]);

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('http://localhost:5000/api/addresses', config);
            if (res.data.success) {
                setAddresses(res.data.data);
                // Auto-select default or first
                const def = res.data.data.find(a => a.isDefault) || res.data.data[0];
                if (def) setSelectedAddress(def._id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!newAddress.fullName.trim() || newAddress.fullName.length < 3) {
            tempErrors.fullName = "Name must be at least 3 characters";
            isValid = false;
        }
        if (!/^\d{10}$/.test(newAddress.phone)) {
            tempErrors.phone = "Phone must be 10 digits";
            isValid = false;
        }
        if (!newAddress.street.trim()) {
            tempErrors.street = "Street address is required";
            isValid = false;
        }
        if (!newAddress.city.trim()) {
            tempErrors.city = "City is required";
            isValid = false;
        }
        if (!newAddress.state.trim()) {
            tempErrors.state = "State is required";
            isValid = false;
        }
        if (!/^\d{6}$/.test(newAddress.zip)) {
            tempErrors.zip = "Zip code must be 6 digits";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.post('http://localhost:5000/api/addresses', newAddress, config);
            if (res.data.success) {
                setAddresses(res.data.data);
                setIsAddressModalOpen(false);
                setSelectedAddress(res.data.data[res.data.data.length - 1]._id);
                showToast('Address added', 'success');
                setNewAddress({ fullName: '', phone: '', street: '', city: '', state: '', zip: '', country: 'India', label: 'Home' });
                setErrors({});
            }
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to add address', 'error');
        }
    };

    const handleDeleteAddress = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this address?')) return;

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.delete(`http://localhost:5000/api/addresses/${id}`, config);
            if (res.data.success) {
                setAddresses(res.data.data);
                if (selectedAddress === id) {
                    setSelectedAddress(null);
                }
                showToast('Address deleted', 'success');
            }
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to delete address', 'error');
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress || !paymentMethod) {
            showToast('Please select address and payment method', 'error');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const selectedAddrObj = addresses.find(a => a._id === selectedAddress);

            const orderData = {
                orderItems: cart.items.map(item => ({
                    product: item.product._id, // Back to object ID for backend
                    name: item.name,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price,
                    size: item.size,
                    color: item.color
                })),
                shippingAddress: {
                    fullName: selectedAddrObj.fullName,
                    phone: selectedAddrObj.phone,
                    address: selectedAddrObj.street,
                    city: selectedAddrObj.city,
                    state: selectedAddrObj.state,
                    postalCode: selectedAddrObj.zip,
                    country: selectedAddrObj.country,
                    addressType: selectedAddrObj.label
                },
                paymentMethod,
                deliveryMethod,
                deliveryCharge,
                tax,
                discount,
                totalPrice: totalAmount
            };

            const res = await axios.post('http://localhost:5000/api/orders', orderData, config);
            if (res.data.success) {
                showToast('Order Placed Successfully!', 'success');
                navigate(`/order-success/${res.data.data._id}`);
                // Context should ideally refresh cart or clear it here
            }
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to place order', 'error');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-8 text-gray-500 text-sm">
                    <span onClick={() => navigate('/cart')} className="cursor-pointer hover:text-black">Cart</span>
                    <ChevronLeft size={16} />
                    <span className="font-semibold text-black">Checkout</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Details */}
                    <div className="w-full lg:w-[65%] space-y-6">
                        {/* 1. Address Section */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-heading font-bold">Delivery Address</h2>
                                <button onClick={() => setIsAddressModalOpen(true)} className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-dark">
                                    <Plus size={16} /> Add New
                                </button>
                            </div>

                            {addresses.length === 0 ? (
                                <p className="text-gray-500 text-sm">No addresses saved. Please add one.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map(addr => (
                                        <div
                                            key={addr._id}
                                            onClick={() => setSelectedAddress(addr._id)}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all relative group ${selectedAddress === addr._id ? 'border-brand-primary bg-brand-ivory ring-1 ring-brand-primary' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                                {/* Radio Selection Indicator */}
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedAddress === addr._id ? 'border-brand-primary' : 'border-gray-300'}`}>
                                                    {selectedAddress === addr._id && <div className="w-2 h-2 bg-brand-primary rounded-full" />}
                                                </div>
                                                {/* Delete Button */}
                                                <button
                                                    onClick={(e) => handleDeleteAddress(e, addr._id)}
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                                    title="Delete Address"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-start pr-16">
                                                <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded text-gray-600">{addr.label}</span>
                                            </div>
                                            <p className="mt-2 font-bold text-gray-900">{addr.fullName}</p>
                                            <p className="text-sm text-gray-600">{addr.street}</p>
                                            <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.zip}</p>
                                            <p className="mt-2 text-sm font-medium text-gray-800">Phone: {addr.phone}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 2. Order Review */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-heading font-bold mb-4">Your Order <span className="text-gray-400 text-base font-normal">({cartCount} items)</span></h2>
                            <div className="divide-y divide-gray-100">
                                {cart?.items?.map((item, idx) => (
                                    <div key={idx} className="py-4 flex gap-4">
                                        <Link to={`/product/${item.product._id}`} className="w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0 cursor-pointer block">
                                            <img src={item.image || item.product.images[0]} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                        </Link>
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product._id}`}>
                                                <h3 className="font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors inline-block">{item.name}</h3>
                                            </Link>
                                            <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>

                                            <div className="flex items-center gap-4 mt-2">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border border-gray-200 rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                        className="px-2 py-1 hover:bg-gray-100"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.product._id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Remove Item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <p className="mt-1 font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Delivery Method */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-heading font-bold mb-4">Delivery Method</h2>
                            <div className="space-y-3">
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'Standard' ? 'border-brand-primary bg-brand-ivory' : 'border-gray-200'}`}>
                                    <input type="radio" name="delivery" checked={deliveryMethod === 'Standard'} onChange={() => setDeliveryMethod('Standard')} className="hidden" />
                                    <div className="flex-1">
                                        <span className="font-bold text-gray-900 block">Standard Delivery</span>
                                        <span className="text-sm text-gray-500">Estimated 5-7 days</span>
                                    </div>
                                    <span className="font-bold text-green-600">Free</span>
                                </label>
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'Express' ? 'border-brand-primary bg-brand-ivory' : 'border-gray-200'}`}>
                                    <input type="radio" name="delivery" checked={deliveryMethod === 'Express'} onChange={() => setDeliveryMethod('Express')} className="hidden" />
                                    <div className="flex-1">
                                        <span className="font-bold text-gray-900 block">Express Delivery</span>
                                        <span className="text-sm text-gray-500">Estimated 2-3 days</span>
                                    </div>
                                    <span className="font-bold text-gray-900">₹200</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary & Payment */}
                    <div className="w-full lg:w-[35%] space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-heading font-bold mb-6">Billing Summary</h2>

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (18% GST estimate)</span>
                                    <span>₹{tax.toLocaleString()}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount</span>
                                        <span>-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-lg font-bold text-gray-900">
                                    <span>Total Payable</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Coupon (Placeholder) */}
                            <div className="flex gap-2 mb-6">
                                <input type="text" placeholder="Coupon Code" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary" />
                                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800">Apply</button>
                            </div>

                            {/* Payment Method */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                                <div className="space-y-2">
                                    <label className={`flex items-center p-3 border rounded cursor-pointer ${paymentMethod === 'Card' ? 'border-brand-primary' : 'border-gray-200'}`}>
                                        <input type="radio" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3" />
                                        <CreditCard size={18} className="mr-2 text-gray-500" /> Credit / Debit Card
                                    </label>
                                    <label className={`flex items-center p-3 border rounded cursor-pointer ${paymentMethod === 'COD' ? 'border-brand-primary' : 'border-gray-200'}`}>
                                        <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3" />
                                        <Banknote size={18} className="mr-2 text-gray-500" /> Cash on Delivery
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isPlacingOrder || !selectedAddress || !paymentMethod}
                                className="w-full bg-brand-accent text-brand-black py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPlacingOrder ? 'Processing...' : (paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${totalAmount.toLocaleString()}`)}
                                <Lock size={16} />
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                                <Lock size={12} /> Secure Checkout. 100% Data Protection.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            {isAddressModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Add New Address</h3>
                        <form onSubmit={handleAddAddress} className="space-y-4">
                            <div>
                                <input placeholder="Full Name" className={`w-full border p-2 rounded text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })} />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>
                            <div>
                                <input placeholder="Phone Number" className={`w-full border p-2 rounded text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} value={newAddress.phone} onChange={e => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setNewAddress({ ...newAddress, phone: val })
                                }} />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <input placeholder="Street Address" className={`w-full border p-2 rounded text-sm ${errors.street ? 'border-red-500' : 'border-gray-300'}`} value={newAddress.street} onChange={e => setNewAddress({ ...newAddress, street: e.target.value })} />
                                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <input placeholder="City" className={`w-full border p-2 rounded text-sm ${errors.city ? 'border-red-500' : 'border-gray-300'}`} value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div className="flex-1">
                                    <input placeholder="State" className={`w-full border p-2 rounded text-sm ${errors.state ? 'border-red-500' : 'border-gray-300'}`} value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <input placeholder="Zip Code" className={`w-full border p-2 rounded text-sm ${errors.zip ? 'border-red-500' : 'border-gray-300'}`} value={newAddress.zip} onChange={e => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setNewAddress({ ...newAddress, zip: val })
                                    }} />
                                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                                </div>
                                <div className="flex-1">
                                    <input placeholder="Country" className="w-full border border-gray-300 p-2 rounded text-sm bg-gray-50" value={newAddress.country} readOnly />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center"><input type="radio" checked={newAddress.label === 'Home'} onChange={() => setNewAddress({ ...newAddress, label: 'Home' })} className="mr-2" /> Home</label>
                                <label className="flex items-center"><input type="radio" checked={newAddress.label === 'Work'} onChange={() => setNewAddress({ ...newAddress, label: 'Work' })} className="mr-2" /> Work</label>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="flex-1 py-2 border rounded hover:bg-gray-50 text-black">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800">Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
