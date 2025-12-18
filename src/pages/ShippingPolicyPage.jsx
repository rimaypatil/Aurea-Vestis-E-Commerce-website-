import React from 'react';
import { Truck, MapPin, Clock, AlertTriangle, Globe } from 'lucide-react';

const ShippingPolicyPage = () => {
    return (
        <section className="py-16 bg-brand-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">Shipping Policy</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        At Aurea Vestis, we are committed to delivering your luxury fashion finds with the utmost care and efficiency. Please read our shipping guidelines below.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Shipping Coverage */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-charcoal">
                                <Globe size={20} />
                            </div>
                            <h2 className="text-xl font-heading font-bold text-brand-charcoal">Shipping Coverage</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Domestic Shipping</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    We ship to over 25,000 pin codes across India. From metro cities to remote locations, our logistics partners ensure your package reaches you safely.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">International Shipping</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Currently, we facilitate international shipping to select countries including USA, UK, UAE, and Canada. Additional customs duties may apply upon delivery.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timelines */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-charcoal">
                                    <Clock size={20} />
                                </div>
                                <h2 className="text-xl font-heading font-bold text-brand-charcoal">Processing Time</h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                All orders are processed within <strong>24-48 hours</strong> of placement. Orders placed on weekends or public holidays will be processed on the next business day. You will receive a confirmation email once your order is packed and ready for dispatch.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-charcoal">
                                    <Truck size={20} />
                                </div>
                                <h2 className="text-xl font-heading font-bold text-brand-charcoal">Estimated Delivery</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-600">Metro Cities (Delhi, Mumbai, etc.)</span>
                                    <span className="font-bold text-brand-charcoal">2-4 Business Days</span>
                                </li>
                                <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-600">Rest of India</span>
                                    <span className="font-bold text-brand-charcoal">4-7 Business Days</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Remote / J&K / NE India</span>
                                    <span className="font-bold text-brand-charcoal">7-10 Business Days</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Shipping Charges */}
                    <div className="bg-brand-charcoal text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-2">Shipping Charges</h2>
                                <p className="text-gray-300 text-sm">Transparent pricing. No hidden fees.</p>
                            </div>
                            <div className="flex flex-col gap-2 w-full md:w-auto">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between gap-8 border border-white/10">
                                    <span className="font-medium">Orders above ₹2,000</span>
                                    <span className="font-bold text-green-400">FREE</span>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between gap-8 border border-white/5">
                                    <span className="font-medium text-gray-300">Standard Shipping</span>
                                    <span className="font-bold">₹99</span>
                                </div>
                            </div>
                        </div>
                        {/* Abstract background element */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl"></div>
                    </div>

                    {/* Exceptions */}
                    <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100 flex gap-4 items-start">
                        <AlertTriangle className="text-orange-600 shrink-0 mt-1" size={24} />
                        <div>
                            <h3 className="font-bold text-orange-900 mb-2">Delays & Exceptions</h3>
                            <p className="text-orange-800 text-sm leading-relaxed mb-4">
                                Shipping times are estimates and may vary due to external factors such as extreme weather conditions, strikes, or public holidays.
                            </p>
                            <h4 className="font-bold text-orange-900 text-sm mb-1">Incorrect Address</h4>
                            <p className="text-orange-800 text-xs leading-relaxed">
                                Please ensure your shipping address is correct at checkout. We are not responsible for failed deliveries due to incorrect addresses. Re-shipping will incur an additional charge.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ShippingPolicyPage;
