import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';

const stores = [
    {
        id: 1,
        city: "Mumbai",
        name: "Aurea Vestis Flagship",
        address: "123 Fashion Avenue, Design District, Mumbai, Maharashtra 400001",
        phone: "+91 98765 43210",
        hours: "10:00 AM - 9:00 PM",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        city: "Delhi",
        name: "Connaught Place Boutique",
        address: "Block B, Connaught Place, New Delhi, Delhi 110001",
        phone: "+91 98765 43211",
        hours: "10:30 AM - 9:30 PM",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        city: "Bangalore",
        name: "Indiranagar Experience Center",
        address: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
        phone: "+91 98765 43212",
        hours: "10:00 AM - 10:00 PM",
        image: "https://images.unsplash.com/photo-1629299342303-3f3622666c41?w=2070&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fENMT1RIJTIwU1RPUkV8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 4,
        city: "Hyderabad",
        name: "Jubilee Hills Studio",
        address: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
        phone: "+91 98765 43213",
        hours: "11:00 AM - 9:00 PM",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
    }
];

const StoreLocatorPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStores = stores.filter(store =>
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-brand-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Find Our Boutiques</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">
                            Experience luxury in person. Visit one of our flagship stores for personal styling and fitting sessions.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative cursor-text">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by City or Store Name..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Stores Grid */}
                {filteredStores.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {filteredStores.map((store, index) => (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow"
                            >
                                <div className="aspect-[16/9] overflow-hidden relative">
                                    <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                                        {store.city}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{store.name}</h3>
                                    <div className="space-y-4 text-gray-600 mb-8">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={20} className="text-brand-primary flex-shrink-0 mt-1" />
                                            <p className="text-sm leading-relaxed">{store.address}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone size={20} className="text-brand-primary flex-shrink-0" />
                                            <p className="text-sm">{store.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={20} className="text-brand-primary flex-shrink-0" />
                                            <p className="text-sm">{store.hours}</p>
                                        </div>
                                    </div>
                                    <button className="w-full border-2 border-black text-black py-3 rounded-xl font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Navigation size={18} />
                                        Get Directions
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-xl">No stores found matching "{searchTerm}"</p>
                        <button onClick={() => setSearchTerm('')} className="mt-4 text-brand-primary font-medium hover:underline">View All Locations</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreLocatorPage;
