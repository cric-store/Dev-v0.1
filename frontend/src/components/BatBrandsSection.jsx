import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { batBrands } from '../data/mockData';

const BatBrandsSection = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Cricket Bats <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">Collection</span>
            </h2>
          </div>
          <Link
            to="/collections/cricket-bats"
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 border-2 border-emerald-500 text-emerald-500 font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
          >
            View All
          </Link>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-emerald-50 transition-colors -ml-2"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-emerald-50 transition-colors -mr-2"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          )}

          {/* Brands Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {batBrands.map((brand) => (
              <Link
                key={brand.id}
                to={brand.link}
                className="flex-shrink-0 w-[280px] group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{brand.name}</h3>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 mt-2 transition-all duration-300 group-hover:w-16" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            to="/collections/cricket-bats"
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-emerald-500 text-emerald-500 font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BatBrandsSection;
