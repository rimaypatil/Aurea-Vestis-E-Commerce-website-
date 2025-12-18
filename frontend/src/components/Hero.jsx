import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex flex-col md:flex-row overflow-hidden">

            {/* Men's Section (Left) */}
            <div className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer bg-brand-charcoal">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1622497170185-5d668f816a56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG1lbiUyMGluJTIwc3VpdHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Men's Fashion"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white z-10 translate-y-4 md:translate-y-0 opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                    <div className="md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tighter">MEN</h2>
                        <Link to="/home/men" className="flex items-center gap-2 border-b-2 border-white pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors text-lg font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300">
                            Shop Collection <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Center Brand Message (Absolute Overlay) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4 pointer-events-none text-white mix-blend-overlay md:mix-blend-normal">
                <div className="md:bg-black/20 backdrop-blur-sm p-8 rounded-xl inline-block shadow-2xl border border-white/10">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-2 leading-tight tracking-tight drop-shadow-lg">
                        OWN YOUR <br /> <span className="text-brand-accent italic">PRESENCE</span>
                    </h1>
                    <p className="hidden md:block text-lg md:text-xl font-light text-gray-100 tracking-wide mb-0 drop-shadow-md">
                        Premium everyday fashion.
                    </p>
                </div>
            </div>


            {/* Women's Section (Right) */}
            <div className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer bg-brand-ivory">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1652590480678-ad2baa51f76c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdGhpbmclMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Women's Fashion"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white z-10">
                    <div className="md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tighter">WOMEN</h2>
                        <Link to="/home/women" className="flex items-center gap-2 border-b-2 border-white pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors text-lg font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300">
                            Shop Collection <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}
