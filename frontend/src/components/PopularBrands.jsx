import React from 'react';
import { popularBrands } from '../data/mockData';

const PopularBrands = () => {
  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Popular <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">Brands</span>
          </h2>
        </div>

        {/* Infinite Scroll Animation */}
        <div className="relative">
          <div className="flex animate-scroll">
            {[...popularBrands, ...popularBrands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 mx-6 group cursor-pointer"
              >
                <div className="w-40 h-24 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 group-hover:-translate-y-1">
                  <span className="text-lg font-bold text-gray-400 group-hover:text-emerald-500 transition-colors">
                    {brand.logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PopularBrands;
