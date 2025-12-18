import { Check, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsletterSuccessPage = () => {
    return (
        <div className="bg-brand-charcoal min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-lg text-center shadow-xl">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center animate-bounce-slow">
                        <Check className="w-10 h-10 text-brand-charcoal" strokeWidth={3} />
                    </div>
                </div>

                <h1 className="text-3xl font-heading font-bold text-white mb-4">You're Subscribed!</h1>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    Thank you for subscribing to Aurea Vestis. <br />
                    You’ll now receive style updates and exclusive drops straight to your inbox.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-brand-accent text-brand-charcoal font-bold px-8 py-3 rounded hover:bg-yellow-500 transition-all transform hover:scale-105"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default NewsletterSuccessPage;
