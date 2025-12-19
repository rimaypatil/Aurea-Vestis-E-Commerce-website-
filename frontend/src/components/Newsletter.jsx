import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter a valid email address.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'https://aurea-vestis-e-commerce-website.onrender.com'}/api/newsletter/subscribe`, { email });
            if (res.data.success) {
                navigate('/home/newsletter-success');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <section className="py-20 bg-brand-charcoal text-white text-center">
            <div className="max-w-xl mx-auto px-6">
                <h2 className="text-2xl font-heading font-bold mb-2">Detailed for Style. Delivered to You.</h2>
                <p className="text-gray-400 mb-8">Subscribe to our newsletter for style updates and new drops.</p>

                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className={`flex-1 bg-white/10 border ${error ? 'border-red-500' : 'border-white/20'} rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-accent transition-colors`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="bg-brand-accent text-brand-charcoal font-bold px-6 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
                            Subscribe <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    {error && <div className="text-red-500 text-sm text-left mt-1">{error}</div>}
                </form>
            </div>
        </section>
    );
}
