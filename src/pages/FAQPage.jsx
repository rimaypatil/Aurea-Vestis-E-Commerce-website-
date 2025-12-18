import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Send, Check } from 'lucide-react';

const faqData = [
    {
        question: "How do I place an order?",
        answer: "Simply browse our collection, select your size, and click 'Add to Cart'. Proceed to checkout, enter your shipping details, and choose your payment method."
    },
    {
        question: "Do I need an account to make a purchase?",
        answer: "No, you can checkout as a guest. However, creating an account allows you to track orders and save your details for faster checkout next time."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking ID. You can also track your order from the 'Track Order' link in the footer."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD) for select pin codes."
    },
    {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 4-7 business days. Metro cities usually receive orders within 2-4 business days."
    },
    {
        question: "Can I cancel or modify my order?",
        answer: "You can cancel your order within 24 hours of placing it by contacting our support team. Once shipped, orders cannot be cancelled."
    },
    {
        question: "What is your return and exchange policy?",
        answer: "We offer a 30-day return policy for unworn items with tags. Exchanges are free of charge. Please visit our 'Returns & Exchanges' page for more details."
    },
    {
        question: "Are there any shipping charges?",
        answer: "Shipping is free for orders above ₹2,000. A standard fee of ₹99 applies to orders below this amount."
    },
    {
        question: "How do I contact customer support?",
        answer: "You can reach us via the contact form below or email us at support@aureavestis.com. Our team is available Mon-Fri, 9 AM - 6 PM."
    },
    {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and processed via secure payment gateways. We do not store your card details."
    }
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return (
        <section className="py-16 bg-brand-white min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-500">
                        Find answers to common questions about your shopping experience.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4 mb-20">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl border transition-all duration-300 ${openIndex === index ? 'border-brand-charcoal shadow-md' : 'border-gray-100'}`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                            >
                                <span className={`font-medium ${openIndex === index ? 'text-brand-charcoal' : 'text-gray-700'}`}>
                                    {item.question}
                                </span>
                                {openIndex === index ? <ChevronUp size={20} className="text-brand-charcoal" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-50 mt-2">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-charcoal">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-brand-charcoal">Still have questions?</h2>
                                <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you.</p>
                            </div>
                        </div>

                        {formSubmitted ? (
                            <div className="bg-green-50 text-green-800 p-6 rounded-xl flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-green-600">
                                    <Check size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                                <p className="text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal outline-none transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal outline-none transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button type="submit" className="bg-brand-charcoal text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-all flex items-center gap-2 group">
                                    Send Message
                                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQPage;
