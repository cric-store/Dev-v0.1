import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PromoBanners = () => {
  return (
    <div className="space-y-0">
      {/* Shoes Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                Shoes <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Anyone?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-md">
                Check our range of cricket shoes in both spikes and rubber studs and other footwear accessories.
              </p>
              <Link
                to="/collections/footwear"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 group"
              >
                Shop Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
                  alt="Cricket Shoes"
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Jerseys Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-2xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Customised Jerseys
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Design your team's unique identity with our premium custom jersey service. High-quality fabric, vibrant colors, and professional finishing.
            </p>
            <Link
              to="/collections/customs-uniforms"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-full hover:shadow-xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              Try Out Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white/20 rounded-full hidden lg:block" />
        <div className="absolute right-10 top-1/3 w-24 h-24 border-4 border-white/20 rounded-full hidden lg:block" />
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-sm font-bold text-emerald-500 tracking-widest mb-4 uppercase">About Us</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            It was back in mid 2011s, when the idea of starting a cricket store came to our mind. 
            Those days we did not have too many cricket exclusive stores. We started with a simple vision - 
            to provide genuine, top-quality cricket equipment to passionate cricketers across India. 
            Today, CRIC STORE has grown to become one of the most trusted names in cricket retail.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-emerald-500 font-semibold hover:text-emerald-600 transition-colors group"
          >
            Continue to read more
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PromoBanners;
