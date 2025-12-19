import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Edit2, Trash2, MapPin, Home, Briefcase, ChevronLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const SavedAddressesPage = () => {
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // If null, we are adding new

    const initialFormState = {
        fullName: '', phone: '', street: '', city: '', state: '', zip: '', country: 'India', label: 'Home'
    };
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // Fetch Addresses
    useEffect(() => {
        if (isAuthenticated) {
            fetchAddresses();
        } else {
            setLoading(false); // Or redirect
        }
    }, [isAuthenticated]);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('https://aurea-vestis-e-commerce-website.onrender.com/api/addresses', config);
            if (res.data.success) {
                setAddresses(res.data.data);
            }
        } catch (err) {
            console.error(err);
            showToast('Failed to load addresses', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Form Validation
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.fullName.trim() || formData.fullName.length < 3) {
            tempErrors.fullName = "Name must be at least 3 characters";
            isValid = false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            tempErrors.phone = "Phone must be 10 digits";
            isValid = false;
        }
        if (!formData.street.trim()) {
            tempErrors.street = "Street address is required";
            isValid = false;
        }
        if (!formData.city.trim()) {
            tempErrors.city = "City is required";
            isValid = false;
        }
        if (!formData.state.trim()) {
            tempErrors.state = "State is required";
            isValid = false;
        }
        if (!/^\d{6}$/.test(formData.zip)) {
            tempErrors.zip = "Zip code must be 6 digits";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData(initialFormState);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleOpenEdit = (addr) => {
        setEditingId(addr._id);
        setFormData({
            fullName: addr.fullName,
            phone: addr.phone,
            street: addr.street,
            city: addr.city,
            state: addr.state,
            zip: addr.zip, // backend uses 'zip' or 'postalCode'? Model usually has postalCode but checking CheckoutPage uses 'zip' in state. 
            // Checking CheckoutPage.jsx: state uses 'zip'. 
            // Checking addressController/Model: Model usually has schemas. Let's assume the API returns consistently.
            // Wait, looking at CheckoutPage, it maps res.data to setAddresses.
            // Let's rely on what we get.
            // IMPORTANT: If backend returns 'postalCode', we need to map it. 
            // CheckoutPage uses 'zip' in input state, but sends 'postalCode' in order? 
            // No, CheckoutPage sends 'postalCode: selectedAddrObj.zip'.
            // Address Model likely uses 'street', 'city', 'state', 'zip' or 'postalCode'.
            // I'll stick to 'zip' as per CheckoutPage for consistency, assuming backend handles it or it matches.
            country: addr.country || 'India',
            label: addr.label || 'Home'
        });
        setErrors({});
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            let res;
            if (editingId) {
                // Update
                res = await axios.put(`https://aurea-vestis-e-commerce-website.onrender.com/api/addresses/${editingId}`, formData, config);
                showToast('Address updated successfully', 'success');
            } else {
                // Create
                res = await axios.post('https://aurea-vestis-e-commerce-website.onrender.com/api/addresses', formData, config);
                showToast('Address added successfully', 'success');
            }

            if (res.data.success) {
                // Determine new list
                if (editingId) {
                    setAddresses(prev => prev.map(a => a._id === editingId ? res.data.data : a));
                } else {
                    // Add supports returning new array or single item? 
                    // Usually returns list or single. CheckoutPage expects list from POST? 
                    // CheckoutPage: setAddresses(res.data.data) -> implies POST returns the updated LIST.
                    // addressController.js typically returns the new list for convenience.
                    // If it returns single object, I should verify.
                    // Based on CheckoutPage: setAddresses(res.data.data), it seems it returns the array.
                    setAddresses(res.data.data);
                }
                setIsModalOpen(false);
                // If update returned single object, we might need a refresh or manual update. 
                // Let's play safe and re-fetch if unsure, OR trust the CheckoutPage pattern.
                // Re-fetching is safer for sync.
                if (editingId) fetchAddresses(); // If PUT returns single doc
            }
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.error || 'Failed to save address', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.delete(`https://aurea-vestis-e-commerce-website.onrender.com/api/addresses/${id}`, config);
            if (res.data.success) {
                // DELETE usually returns updated list or success msg
                // CheckoutPage: setAddresses(res.data.data) -> implies list.
                setAddresses(res.data.data);
                showToast('Address deleted', 'success');
            }
        } catch (err) {
            showToast('Failed to delete address', 'error');
        }
    };

    if (loading) return <LoadingSpinner fullScreen />;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-gray-900">Saved Addresses</h1>
                        <p className="text-gray-500 mt-1">Manage your delivery locations</p>
                    </div>
                    <button
                        onClick={handleOpenAdd}
                        className="bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> Add New Address
                    </button>
                </div>

                {/* Address Grid */}
                {addresses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No addresses saved</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">Add a shipping address to speed up your checkout process.</p>
                        <button onClick={handleOpenAdd} className="text-brand-primary font-bold hover:underline">
                            Add Address Now
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {addresses.map((addr) => (
                            <div key={addr._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 transition-all group relative">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${addr.label === 'Work' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                                        {addr.label === 'Work' ? <Briefcase size={12} /> : <Home size={12} />}
                                        {addr.label}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(addr)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(addr._id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">{addr.fullName}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {addr.street}<br />
                                    {addr.city}, {addr.state} - {addr.zip}<br />
                                    {addr.country}
                                </p>
                                <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                                    <span className="text-gray-400">Phone:</span> {addr.phone}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
                        <h3 className="text-xl font-bold mb-6 text-gray-900">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <input
                                    placeholder="Full Name"
                                    className={`w-full border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                            </div>
                            <div>
                                <input
                                    placeholder="Phone Number"
                                    className={`w-full border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                                    value={formData.phone}
                                    onChange={e => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setFormData({ ...formData, phone: val })
                                    }}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <input
                                    placeholder="Street Address"
                                    className={`w-full border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${errors.street ? 'border-red-500' : 'border-gray-200'}`}
                                    value={formData.street}
                                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                                />
                                {errors.street && <p className="text-red-500 text-xs mt-1 ml-1">{errors.street}</p>}
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        placeholder="City"
                                        className={`w-full border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1 ml-1">{errors.city}</p>}
                                </div>
                                <div className="flex-1">
                                    <input
                                        placeholder="State"
                                        className={`w-full border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${errors.state ? 'border-red-500' : 'border-gray-200'}`}
                                        value={formData.state}
                                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1 ml-1">{errors.state}</p>}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        placeholder="Zip Code"
                                        className={`w-full border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${errors.zip ? 'border-red-500' : 'border-gray-200'}`}
                                        value={formData.zip}
                                        onChange={e => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setFormData({ ...formData, zip: val })
                                        }}
                                    />
                                    {errors.zip && <p className="text-red-500 text-xs mt-1 ml-1">{errors.zip}</p>}
                                </div>
                                <div className="flex-1">
                                    <input placeholder="Country" className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed" value={formData.country} readOnly />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-2">
                                <label className="flex items-center cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 transition-colors ${formData.label === 'Home' ? 'border-brand-primary' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                        {formData.label === 'Home' && <div className="w-2.5 h-2.5 bg-brand-primary rounded-full" />}
                                    </div>
                                    <input type="radio" checked={formData.label === 'Home'} onChange={() => setFormData({ ...formData, label: 'Home' })} className="hidden" />
                                    <span className="text-sm font-medium text-gray-700">Home</span>
                                </label>
                                <label className="flex items-center cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 transition-colors ${formData.label === 'Work' ? 'border-brand-primary' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                        {formData.label === 'Work' && <div className="w-2.5 h-2.5 bg-brand-primary rounded-full" />}
                                    </div>
                                    <input type="radio" checked={formData.label === 'Work'} onChange={() => setFormData({ ...formData, label: 'Work' })} className="hidden" />
                                    <span className="text-sm font-medium text-gray-700">Work</span>
                                </label>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-medium transition-colors">Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedAddressesPage;
