import { useAuth } from '../context/AuthContext';

export default function JoinClub() {
    const { isAuthenticated, openAuthModal } = useAuth();

    if (isAuthenticated) {
        return null;
    }

    return (
        <section className="py-16 bg-brand-ivory text-center">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-charcoal mb-4">Unlock the World of Aurea</h2>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                    Create an account to enjoy faster checkout, track your orders, and get exclusive access to member-only drops.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={openAuthModal}
                        className="bg-brand-charcoal text-white px-8 py-3 rounded hover:bg-black transition-colors font-medium"
                    >
                        Create Account
                    </button>
                    <button
                        onClick={openAuthModal}
                        className="px-8 py-3 rounded border border-gray-300 hover:border-brand-charcoal text-brand-charcoal transition-colors font-medium bg-white"
                    >
                        Login
                    </button>
                </div>
            </div>
        </section>
    );
}
